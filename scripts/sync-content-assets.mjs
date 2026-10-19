// Copies images that live next to Markdown in content/ into public/_content/
// so Next.js can serve and optimize them. Runs before `dev` and `build`.
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const source = path.join(root, "content");
const target = path.join(root, "public", "_content");
const IMAGE = /\.(webp|png|jpe?g|avif)$/i;

fs.rmSync(target, { recursive: true, force: true });

let copied = 0;
for (const entry of fs.readdirSync(source, { recursive: true, withFileTypes: true })) {
  if (!entry.isFile() || !IMAGE.test(entry.name)) continue;
  const from = path.join(entry.parentPath, entry.name);
  const to = path.join(target, path.relative(source, from));
  fs.mkdirSync(path.dirname(to), { recursive: true });
  fs.copyFileSync(from, to);
  copied += 1;
}
console.log(`[content] copied ${copied} image(s) to public/_content`);
