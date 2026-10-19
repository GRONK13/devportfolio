import { describe, expect, it } from "vitest";
import { getProjects } from "@/lib/content";
import { extractToc, slugify } from "@/lib/content/toc";

describe("case-study contents", () => {
  it("slugifies headings and keeps ids unique", () => {
    const seen = new Map<string, number>();
    expect(slugify("What it does", seen)).toBe("what-it-does");
    expect(slugify("Résumé & notes!", seen)).toBe("resume-notes");
    expect(slugify("What it does", seen)).toBe("what-it-does-1");
  });

  it("extracts level-2 headings, ignoring code blocks and inline markdown", () => {
    const md = ["## Overview", "text", "```", "## not a heading", "```", "## The `api` *layer*", "### Sub"].join("\n");
    expect(extractToc(md)).toEqual([
      { id: "overview", text: "Overview" },
      { id: "the-api-layer", text: "The api layer" },
    ]);
  });

  it("links every contents entry to a heading id in the compiled case study", () => {
    for (const p of getProjects()) {
      for (const entry of p.toc) expect(p.html).toContain(`<h2 id="${entry.id}">`);
    }
  });
});
