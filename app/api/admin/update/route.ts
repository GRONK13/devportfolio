import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';
import { getFileFromGitHub, updateFileOnGitHub } from '@/lib/github';

const sectionToPath: Record<string, string> = {
  'personal-info': 'data/personal-info.ts',
  'projects': 'data/projects.ts',
  'certificates': 'data/certificates.ts',
  'experience': 'data/experience.ts',
};

function generatePersonalInfo(data: Record<string, unknown>): string {
  return `export const personalInfo = ${JSON.stringify(data, null, 2)};

// Helper functions for common use cases
export const getFullName = () => personalInfo.name;
export const getEmail = () => personalInfo.email;
export const getPhone = () => personalInfo.phone;
export const getGithubUrl = () => personalInfo.social.github;
export const getLinkedInUrl = () => personalInfo.social.linkedin;
export const getWebsiteUrl = () => personalInfo.website.url;
export const getResumeUrl = () => personalInfo.resume.path;
export const getFullLocation = () =>
  \`\${personalInfo.location.city}, \${personalInfo.location.province}, \${personalInfo.location.country}\`;

export default personalInfo;
`;
}

function generateProjects(data: Record<string, unknown>[]): string {
  return `export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  isFeatured: boolean;
}

export const projects: Project[] = ${JSON.stringify(data, null, 2)};
`;
}

function generateCertificates(data: Record<string, unknown>[]): string {
  return `export interface Certificate {
  id: number;
  title: string;
  issuer: string;
  date: string;
  credentialId: string;
  verificationUrl: string;
  skills: string[];
  description: string;
  isFeatured: boolean;
}

export const certificates: Certificate[] = ${JSON.stringify(data, null, 2)};
`;
}

function generateExperience(data: { professionalExperience?: Record<string, unknown>[]; education?: Record<string, unknown>[] }): string {
  return `export interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  description: string;
  achievements?: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  description: string;
  gpa?: string;
  honors?: string[];
}

export const professionalExperience: ExperienceItem[] = ${JSON.stringify(data.professionalExperience || [], null, 2)};

export const education: EducationItem[] = ${JSON.stringify(data.education || [], null, 2)};
`;
}

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token')?.value;

    if (!token || !(await verifyToken(token))) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { section, data } = await req.json();

    if (!sectionToPath[section]) {
      return NextResponse.json({ error: 'Invalid section' }, { status: 400 });
    }

    const filePath = sectionToPath[section];
    let fileContent = '';

    switch (section) {
      case 'personal-info':
        fileContent = generatePersonalInfo(data);
        break;
      case 'projects':
        fileContent = generateProjects(data);
        break;
      case 'certificates':
        fileContent = generateCertificates(data);
        break;
      case 'experience':
        fileContent = generateExperience(data);
        break;
    }

    let sha = '';
    try {
      const currentFile = await getFileFromGitHub(filePath);
      sha = currentFile.sha;
    } catch {
      // File might not exist yet, which is fine
    }

    await updateFileOnGitHub(filePath, fileContent, `admin: update ${section}`, sha);

    return NextResponse.json({ message: 'Updated successfully' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
