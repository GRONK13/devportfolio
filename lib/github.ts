import "server-only";
import { z } from "zod";
import { serverEnv } from "./env";

const userSchema = z.object({ public_repos: z.number(), followers: z.number() });
const repoSchema = z.object({
  name: z.string(),
  html_url: z.url(),
  description: z.string().nullable(),
  language: z.string().nullable(),
  stargazers_count: z.number(),
  pushed_at: z.string(),
  fork: z.boolean(),
});

export interface GitHubSummary {
  publicRepos: number;
  followers: number;
  recent: { name: string; url: string; language: string | null; pushedAt: string }[];
}

async function getJson(url: string): Promise<unknown> {
  const response = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      ...(serverEnv.GITHUB_TOKEN ? { Authorization: `Bearer ${serverEnv.GITHUB_TOKEN}` } : {}),
    },
    // Cached for a day across requests, so the site makes ~2 GitHub calls per day.
    next: { revalidate: 86_400 },
    signal: AbortSignal.timeout(4_000),
  });
  if (!response.ok) throw new Error(`GitHub ${response.status}`);
  return response.json();
}

/** Public profile stats and recently pushed repos. Returns null when GitHub can't be reached. */
export async function getGitHubSummary(username: string): Promise<GitHubSummary | null> {
  if (!/^[a-z\d](?:[a-z\d-]{0,38})$/i.test(username)) return null;
  try {
    const [user, repos] = await Promise.all([
      getJson(`https://api.github.com/users/${username}`).then((d) => userSchema.parse(d)),
      getJson(`https://api.github.com/users/${username}/repos?sort=pushed&per_page=10`).then((d) => z.array(repoSchema).parse(d)),
    ]);
    return {
      publicRepos: user.public_repos,
      followers: user.followers,
      recent: repos
        .filter((r) => !r.fork)
        .slice(0, 3)
        .map((r) => ({ name: r.name, url: r.html_url, language: r.language, pushedAt: r.pushed_at })),
    };
  } catch {
    return null;
  }
}
