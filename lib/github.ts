const GITHUB_TOKEN = process.env.GITHUB_TOKEN || '';
const GITHUB_OWNER = process.env.GITHUB_REPO_OWNER || 'GRONK13';
const GITHUB_REPO = process.env.GITHUB_REPO_NAME || 'devportfolio';
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || 'main';
const API_BASE = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}`;

interface GitHubFileResponse {
  sha: string;
  content: string;
  encoding: string;
}

export async function getFileFromGitHub(path: string): Promise<{ content: string; sha: string }> {
  const res = await fetch(`${API_BASE}/contents/${path}?ref=${GITHUB_BRANCH}`, {
    headers: {
      'Authorization': `Bearer ${GITHUB_TOKEN}`,
      'Accept': 'application/vnd.github.v3+json',
    },
  });
  
  if (!res.ok) throw new Error(`GitHub API error: ${res.status} ${res.statusText}`);
  
  const data: GitHubFileResponse = await res.json();
  const content = Buffer.from(data.content, 'base64').toString('utf-8');
  return { content, sha: data.sha };
}

export async function updateFileOnGitHub(
  path: string,
  content: string | Buffer,
  message: string,
  sha: string
): Promise<void> {
  const res = await fetch(`${API_BASE}/contents/${path}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${GITHUB_TOKEN}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message,
      content: Buffer.from(content).toString('base64'),
      sha,
      branch: GITHUB_BRANCH,
    }),
  });
  
  if (!res.ok) {
    const error = await res.json();
    throw new Error(`GitHub API error: ${res.status} — ${JSON.stringify(error)}`);
  }
}
