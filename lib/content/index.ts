import "server-only";
import fs from "node:fs";
import path from "node:path";
import { imageSize } from "image-size";
import type { z } from "zod";
import { parseFrontMatter, renderMarkdown } from "./markdown";
import {
  certificationSchema,
  experienceSchema,
  nowSchema,
  profileSchema,
  projectSchema,
  skillsSchema,
} from "./schemas";

const CONTENT_DIR = path.join(process.cwd(), "content");
/** Content images are copied here by scripts/sync-content-assets.mjs. */
const PUBLIC_PREFIX = "/_content";

export interface ContentImage {
  src: string;
  width: number;
  height: number;
  alt: string;
}

export class ContentError extends Error {
  override name = "ContentError";
}

function readFile(relative: string) {
  return parseFrontMatter(fs.readFileSync(path.join(CONTENT_DIR, relative), "utf8"));
}

function validate<S extends z.ZodType>(schema: S, data: unknown, relative: string): z.output<S> {
  const result = schema.safeParse(data);
  if (!result.success) {
    const details = result.error.issues
      .map((issue) => `  - ${issue.path.join(".") || "(file)"}: ${issue.message}`)
      .join("\n");
    throw new ContentError(`Invalid content in content/${relative}:\n${details}`);
  }
  return result.data;
}

function listMarkdown(dir: string): string[] {
  return fs
    .readdirSync(path.join(CONTENT_DIR, dir))
    .filter((f) => f.endsWith(".md"))
    .sort()
    .map((f) => `${dir}/${f}`);
}

function image(relativeDir: string, file: string, alt: string): ContentImage {
  const buffer = fs.readFileSync(path.join(CONTENT_DIR, relativeDir, file));
  const { width, height } = imageSize(buffer);
  if (!width || !height) throw new ContentError(`Could not read the size of content/${relativeDir}/${file}`);
  return { src: path.posix.join(PUBLIC_PREFIX, relativeDir, file), width, height, alt };
}

function memo<T>(load: () => T): () => T {
  let value: T | undefined;
  // Re-read on every call in development so edits show up without a restart.
  return () => (process.env.NODE_ENV === "development" ? load() : (value ??= load()));
}

/* ---------------------------------- profile --------------------------------- */

export const getProfile = memo(() => {
  const { data, body } = readFile("profile.md");
  const profile = validate(profileSchema, data, "profile.md");
  const initials = profile.name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return {
    ...profile,
    initials,
    photo: profile.photo ? image("", profile.photo, profile.name) : undefined,
    storyHtml: renderMarkdown(body),
  };
});
export type Profile = ReturnType<typeof getProfile>;

export const getNow = memo(() => validate(nowSchema, readFile("now.md").data, "now.md"));

export const getSkills = memo(() => validate(skillsSchema, readFile("skills.md").data, "skills.md").groups);

/* --------------------------------- projects --------------------------------- */

export const getProjects = memo(() => {
  const slugs = fs
    .readdirSync(path.join(CONTENT_DIR, "projects"), { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);

  return slugs
    .map((slug) => {
      if (!/^[a-z0-9-]+$/.test(slug)) {
        throw new ContentError(`content/projects/${slug}: folder names must be lowercase letters, numbers and dashes.`);
      }
      const relative = `projects/${slug}/index.md`;
      const { data, body } = readFile(relative);
      const project = validate(projectSchema, data, relative);
      return {
        ...project,
        slug,
        href: `/work/${slug}`,
        cover: project.cover ? image(`projects/${slug}`, project.cover, project.coverAlt ?? project.title) : undefined,
        bodyHtml: renderMarkdown(body),
      };
    })
    .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
});
export type Project = ReturnType<typeof getProjects>[number];

export function getProject(slug: string): Project | undefined {
  return getProjects().find((p) => p.slug === slug);
}

/* -------------------------------- experience -------------------------------- */

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function formatYearMonth(value: string): string {
  if (value === "present") return "Present";
  const [year, month] = value.split("-");
  return month ? `${MONTHS[Number(month) - 1]} ${year}` : (year ?? value);
}

const endKey = (item: { end: string }) => (item.end === "present" ? "9999" : item.end);

export const getExperience = memo(() =>
  listMarkdown("experience")
    .map((relative) => {
      const item = validate(experienceSchema, readFile(relative).data, relative);
      return { ...item, period: `${formatYearMonth(item.start)} – ${formatYearMonth(item.end)}` };
    })
    .sort((a, b) => endKey(b).localeCompare(endKey(a)) || b.start.localeCompare(a.start)),
);
export type ExperienceItem = ReturnType<typeof getExperience>[number];

/* ------------------------------ certifications ------------------------------ */

export const getCertifications = memo(() =>
  listMarkdown("certifications")
    .map((relative) => validate(certificationSchema, readFile(relative).data, relative))
    .sort((a, b) => b.issued.localeCompare(a.issued)),
);
export type Certification = ReturnType<typeof getCertifications>[number];

/** Date of the most recent content change, injected at build time (see next.config.ts). */
export function getLastUpdated(): string | undefined {
  return process.env.NEXT_PUBLIC_CONTENT_UPDATED || undefined;
}
