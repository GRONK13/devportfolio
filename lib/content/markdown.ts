import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { parse as parseYaml } from "yaml";

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  // allowDangerousHtml stays off: raw HTML in Markdown is dropped, so content can never inject markup or scripts.
  .use(remarkRehype)
  .use(rehypeStringify);

/** Renders trusted-format Markdown to HTML. Raw HTML in the source is discarded. */
export function renderMarkdown(source: string): string {
  return String(processor.processSync(source));
}

/** Splits a file into its YAML front matter and Markdown body. */
export function parseFrontMatter(raw: string): { data: unknown; body: string } {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(raw);
  if (!match) return { data: {}, body: raw };
  return { data: parseYaml(match[1] ?? "") ?? {}, body: match[2] ?? "" };
}
