import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';
import { getFileFromGitHub, updateFileOnGitHub } from '@/lib/github';

const sectionToPath: Record<string, string> = {
  'personal-info': 'data/personal-info.ts',
  'projects': 'data/projects.ts',
  'certificates': 'data/certificates.ts',
  'experience': 'data/experience.ts',
  'skills': 'data/skills.ts',
};

function generatePersonalInfo(data: Record<string, unknown>): string {
  return `export interface CoreValue {
  title: string;
  description: string;
  icon: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  subtitle: string;
  bio: string;
  email: string;
  phone: string;
  github: string;
  location: {
    city: string;
    province: string;
    country: string;
    availability: string;
  };
  social: {
    github: string;
    linkedin: string;
    email: string;
  };
  website: {
    url: string;
    domain: string;
  };
  resume: {
    filename: string;
    path: string;
  };
  descriptions: {
    short: string;
    medium: string;
    long: string;
  };
  keywords: string[];
  story: {
    beginning: string;
    current: string;
    personal: string;
  };
  coreValues: CoreValue[];
}

export const personalInfo: PersonalInfo = ${JSON.stringify(data, null, 2)};

// Helper functions for common use cases
export const getFullName = (info: PersonalInfo = personalInfo) => info?.name || "";
export const getEmail = (info: PersonalInfo = personalInfo) => info?.email || "";
export const getPhone = (info: PersonalInfo = personalInfo) => info?.phone || "";
export const getGithubUrl = (info: PersonalInfo = personalInfo) => info?.social?.github || info?.github || "";
export const getLinkedInUrl = (info: PersonalInfo = personalInfo) => info?.social?.linkedin || "";
export const getWebsiteUrl = (info: PersonalInfo = personalInfo) => info?.website?.url || "";
export const getResumeUrl = (info: PersonalInfo = personalInfo) => info?.resume?.path || "";
export const getFullLocation = (info: PersonalInfo = personalInfo) => {
  const loc = info?.location;
  if (!loc) return "";
  const parts = [
    loc.city,
    loc.province,
    loc.country
  ].filter(Boolean);
  return parts.join(", ");
};

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

function generateSkills(data: Record<string, unknown>[]): string {
  return `export type SkillCategory = "Frontend" | "Backend" | "Database" | "DevOps" | "Tools";

export interface Skill {
  name: string;
  category: SkillCategory;
  iconSlug: string;
  color?: string;
}

export type SkillsMap = Record<SkillCategory, Skill[]>;

export const skillsList: Skill[] = ${JSON.stringify(data, null, 2)};

export const skills: SkillsMap = {
  Frontend: skillsList.filter((s) => s.category === "Frontend"),
  Backend: skillsList.filter((s) => s.category === "Backend"),
  Database: skillsList.filter((s) => s.category === "Database"),
  DevOps: skillsList.filter((s) => s.category === "DevOps"),
  Tools: skillsList.filter((s) => s.category === "Tools"),
};

export const getSkillNames = (): Record<string, string[]> => {
  const skillNames: Record<string, string[]> = {};
  Object.entries(skills).forEach(([category, list]) => {
    skillNames[category] = list.map((skill) => skill.name);
  });
  return skillNames;
};

export default skills;
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
      case 'skills':
        fileContent = generateSkills(data);
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
    console.error('Update error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
