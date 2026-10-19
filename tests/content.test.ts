import { describe, expect, it } from "vitest";
import {
  formatYearMonth,
  getCertifications,
  getExperience,
  getNow,
  getProfile,
  getProjects,
  getSkills,
} from "@/lib/content";
import { parseFrontMatter, renderMarkdown } from "@/lib/content/markdown";
import { experienceSchema, projectSchema } from "@/lib/content/schemas";

describe("site content", () => {
  // These load every file in content/, so a typo in any of them fails CI with the file and field.
  it("is all valid", () => {
    expect(getProfile().name).toBeTruthy();
    expect(getNow().items.length).toBeGreaterThan(0);
    expect(getSkills().length).toBeGreaterThan(0);
    expect(getProjects().length).toBeGreaterThan(0);
    expect(getExperience().length).toBeGreaterThan(0);
    expect(getCertifications().length).toBeGreaterThan(0);
  });

  it("gives every project a unique order and a readable cover", () => {
    const projects = getProjects();
    expect(new Set(projects.map((p) => p.order)).size).toBe(projects.length);
    for (const p of projects) if (p.cover) expect(p.cover.width).toBeGreaterThan(0);
  });

  it("sorts experience newest first", () => {
    const starts = getExperience().map((e) => e.start);
    expect(starts).toEqual([...starts].sort().reverse());
  });
});

describe("markdown", () => {
  it("drops raw HTML so content can't inject scripts", () => {
    const html = renderMarkdown('Hello <script>alert(1)</script> <img src=x onerror="alert(1)">\n\n<!-- note -->');
    expect(html).not.toContain("<script");
    expect(html).not.toContain("onerror");
    expect(html).not.toContain("note");
  });

  it("parses front matter", () => {
    const { data, body } = parseFrontMatter("---\ntitle: Hi\n---\nBody");
    expect(data).toEqual({ title: "Hi" });
    expect(body).toBe("Body");
  });
});

describe("schemas", () => {
  it("rejects an end date before the start", () => {
    const result = experienceSchema.safeParse({ kind: "work", title: "t", org: "o", start: "2025-10", end: "2024-01", summary: "s" });
    expect(result.success).toBe(false);
  });

  it("requires alt text when a project has a cover", () => {
    const result = projectSchema.safeParse({ title: "t", summary: "s", order: 1, color: "#000000", cover: "c.webp", stack: ["x"] });
    expect(result.success).toBe(false);
  });

  it("rejects non-https links", () => {
    const result = projectSchema.safeParse({ title: "t", summary: "s", order: 1, color: "#000000", stack: ["x"], links: { live: "http://x.com" } });
    expect(result.success).toBe(false);
  });

  it("formats dates", () => {
    expect(formatYearMonth("2025-10")).toBe("Oct 2025");
    expect(formatYearMonth("2021")).toBe("2021");
    expect(formatYearMonth("present")).toBe("Present");
  });
});
