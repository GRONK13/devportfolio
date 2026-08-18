import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';
import { getFileFromGitHub, updateFileOnGitHub } from '@/lib/github';

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token')?.value;

    if (!token || !(await verifyToken(token))) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    if (file.type !== 'application/pdf') {
      return NextResponse.json({ error: 'File must be a PDF' }, { status: 400 });
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'File must be under 5MB' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    
    let sha = '';
    try {
      const currentFile = await getFileFromGitHub('public/Marayan_Resume.pdf');
      sha = currentFile.sha;
    } catch {
      // File might not exist yet
    }

    await updateFileOnGitHub(
      'public/Marayan_Resume.pdf',
      buffer,
      'admin: update resume',
      sha
    );

    return NextResponse.json({ message: 'Resume uploaded successfully' }, { status: 200 });
  } catch (error) {
    console.error('Resume upload error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
