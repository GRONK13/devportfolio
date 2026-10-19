import { existsSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { checkProjects } from "@/lib/content/checks";
import {
  getCertifications,
  getFeaturedProjects,
  getProfile,
  getProject,
  getProjects,
  getProjectsUsing,
  getSkillGroups,
  getTimeline,
} from "@/lib/content";
import { projectSchema, timelineSchema } from "@/lib/content/schemas";

const inPublic = (file: string) => existsSync(path.join(process.cwd(), "public", file));

describe("site content", () => {
  it("loads the profile and the files it points to", () => {
    const profile = getProfile();
    expect(profile.name).toBeTruthy();
    expect(inPublic(profile.resume.file)).toBe(true);
    expect(profile.aboutHtml).toContain("<p>");
  });

  it("sorts projects by order and resolves them by slug", () => {
    const projects = getProjects();
    expect(projects.map((p) => p.order)).toEqual([...projects.map((p) => p.order)].sort((a, b) => a - b));
    expect(getFeaturedProjects().length).toBeGreaterThan(0);
    for (const p of projects) expect(getProject(p.slug)).toBe(p);
  });

  it("gives every cover its intrinsic size", () => {
    for (const p of getProjects()) {
      if (!p.cover) continue;
      expect(p.cover.width).toBeGreaterThan(0);
      expect(p.cover.height).toBeGreaterThan(0);
    }
  });

  it("drops raw HTML from case studies", () => {
    for (const p of getProjects()) expect(p.html).not.toMatch(/<!--|<script/i);
  });

  it("links skills to the projects that use them", () => {
    const names = getSkillGroups().flatMap((g) => g.items);
    expect(names.some((skill) => getProjectsUsing(skill).length > 0)).toBe(true);
  });

  it("orders the timeline and certifications newest first", () => {
    const starts = getTimeline().map((e) => e.start);
    expect(starts).toEqual([...starts].sort().reverse());
    const issued = getCertifications().map((c) => c.issued);
    expect(issued).toEqual([...issued].sort().reverse());
  });
});

describe("content checks", () => {
  it("flags duplicate project order and no featured project", () => {
    const problems = checkProjects([
      { slug: "a", order: 1, featured: false },
      { slug: "b", order: 1, featured: false },
    ]);
    expect(problems).toHaveLength(2);
  });

  it("rejects non-https links and covers without alt text", () => {
    const base = { title: "X", summary: "Y", order: 1, color: "#000000", stack: ["Next.js"], content: "" };
    expect(projectSchema.safeParse({ ...base, links: { live: "http://example.com" } }).success).toBe(false);
    expect(projectSchema.safeParse({ ...base, cover: { src: "/media/x.webp", alt: "" } }).success).toBe(false);
    expect(projectSchema.safeParse({ ...base, links: { live: "javascript:alert(1)" } }).success).toBe(false);
    expect(projectSchema.safeParse(base).success).toBe(true);
  });

  it("rejects a timeline entry that ends before it starts", () => {
    const entry = { kind: "work", title: "T", org: "O", start: "2025-10", end: "2024-01", summary: "S" };
    expect(timelineSchema.safeParse({ entries: [entry] }).success).toBe(false);
  });
});
