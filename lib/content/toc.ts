/**
 * Case-study "Contents": every `## heading` gets a stable id, and the list of headings is
 * extracted from the Markdown source. Both sides use the same slug function so links match.
 * (The list comes from the source rather than from the compiled HTML because compiled Markdown
 * is cached between builds.)
 */

export type TocEntry = { id: string; text: string };

/** "What it does" → "what-it-does". Unique within a document via `seen`. */
export function slugify(text: string, seen: Map<string, number>): string {
  const base =
    text
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-") || "section";
  const count = seen.get(base) ?? 0;
  seen.set(base, count + 1);
  return count === 0 ? base : `${base}-${count}`;
}

/** Strips inline Markdown (`code`, *em*, **strong**, [links](…)) from a heading. */
const plain = (md: string) =>
  md
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[`*_~]/g, "")
    .trim();

/** Level-2 headings of a Markdown document, skipping fenced code blocks. */
export function extractToc(markdown: string): TocEntry[] {
  const seen = new Map<string, number>();
  const toc: TocEntry[] = [];
  let fenced = false;
  for (const line of markdown.split(/\r?\n/)) {
    if (/^\s*(```|~~~)/.test(line)) fenced = !fenced;
    if (fenced) continue;
    const match = /^##\s+(.+?)\s*#*\s*$/.exec(line);
    if (match?.[1]) {
      const text = plain(match[1]);
      toc.push({ id: slugify(text, seen), text });
    }
  }
  return toc;
}

type HastNode = { type: string; tagName?: string; value?: string; properties?: Record<string, unknown>; children?: HastNode[] };

const textOf = (node: HastNode): string =>
  node.type === "text" ? (node.value ?? "") : (node.children ?? []).map(textOf).join("");

/** Rehype plugin: adds the matching id to every <h2>. */
export function rehypeHeadingIds() {
  return (tree: HastNode) => {
    const seen = new Map<string, number>();
    const visit = (node: HastNode) => {
      if (node.type === "element" && node.tagName === "h2") {
        node.properties = { ...node.properties, id: slugify(textOf(node).trim(), seen) };
      }
      node.children?.forEach(visit);
    };
    visit(tree);
  };
}
