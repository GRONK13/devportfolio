#!/usr/bin/env node
/**
 * Writes README.md as a profile (who Gregg is, work, experience, certifications, skills, contact)
 * from the same content/ files the site uses, so the two never disagree.
 *
 *   pnpm readme
 *
 * Runs automatically in CI when content/ changes (.github/workflows/sync.yml). Developer docs
 * live in docs/development.md, not in the README.
 */
import { writeFile } from "node:fs/promises";
import {
  allCertifications,
  allNows,
  allProfiles,
  allProjects,
  allSites,
  allSkills,
  allTimelines,
  allValues,
} from "../.content-collections/generated/index.js";
import { formatDate, formatYearMonth } from "../lib/format.ts";

const [profile] = allProfiles;
const [site] = allSites;
const [now] = allNows;
const values = allValues[0].items;
const skills = allSkills[0].groups;
const timeline = [...allTimelines[0].entries].sort((a, b) => b.start.localeCompare(a.start));
const certifications = [...allCertifications[0].items].sort((a, b) => b.issued.localeCompare(a.issued));
const projects = allProjects.filter((p) => p.featured).sort((a, b) => a.order - b.order);

const siteUrl = site.url.replace(/\/$/, "");
const plain = (text) => text.replace(/\*([^*]+)\*/g, "$1");
const range = (e) => `${formatYearMonth(e.start)} – ${formatYearMonth(e.end)}`;
const links = (items) => items.filter(Boolean).join(" · ");

const lines = [];
const add = (...xs) => lines.push(...xs);

add(
  `# ${profile.fullName}`,
  "",
  `**${profile.role}** · ${profile.location} · ${profile.availability.label}`,
  "",
  `> ${plain(profile.headline)}`,
  "",
  profile.intro,
  "",
  links([
    `[Portfolio](${siteUrl})`,
    ...profile.socials.map((s) => `[${s.label}](${s.url})`),
    `[Email](mailto:${profile.email})`,
    `[Résumé (PDF)](${siteUrl}${profile.resume.file})`,
  ]),
  "",
  "## About",
  "",
  profile.about.trim(),
  "",
  "### How I work",
  "",
  ...values.map((v) => `- **${v.title}**: ${v.description}`),
  "",
  `## Now`,
  "",
  `<sub>Updated ${formatDate(now.updated)}</sub>`,
  "",
  ...now.items.map((i) => `- **${i.label}:** ${i.text}`),
  "",
  "## Selected work",
  "",
);

for (const p of projects) {
  add(`### ${p.title}`, "");
  if (p.cover) add(`[![${p.cover.alt}](public${p.cover.src})](${p.links.live ?? `${siteUrl}/work/${p.slug}`})`, "");
  add(p.summary, "");
  const facts = [p.year, p.role, p.team].filter(Boolean);
  if (facts.length) add(`*${facts.join(" · ")}*`, "");
  add(
    `**Built with:** ${p.stack.join(", ")}`,
    "",
    links([
      p.links.live && `[Live site](${p.links.live})`,
      p.links.repo && `[Source](${p.links.repo})`,
      `[Case study](${siteUrl}/work/${p.slug})`,
    ]),
    "",
  );
}

add("## Experience & education", "");
for (const [kind, title] of [
  ["work", "Work"],
  ["education", "Education"],
]) {
  const entries = timeline.filter((e) => e.kind === kind);
  if (entries.length === 0) continue;
  add(`### ${title}`, "");
  for (const e of entries) {
    add(`- **${e.title}**, ${e.org}${e.location ? ` (${e.location})` : ""} · ${range(e)}  `, `  ${e.summary}`);
    for (const h of e.highlights) add(`  - ${h}`);
  }
  add("");
}

if (certifications.length) {
  add("## Certifications", "");
  for (const c of certifications) {
    const valid = c.expires ? ` (valid until ${formatDate(c.expires)})` : "";
    add(`- **${c.name}**, ${c.issuer} · ${formatDate(c.issued)}${valid} · [Verify](${c.verifyUrl})`);
  }
  add("");
}

add("## Skills", "");
const lowerFirst = (s) => s.charAt(0).toLowerCase() + s.slice(1);
for (const g of skills) add(`- **${g.name}**${g.note ? ` (${lowerFirst(g.note)})` : ""}: ${g.items.join(", ")}`);
add(
  "",
  "## Contact",
  "",
  `The fastest way to reach me is email: [${profile.email}](mailto:${profile.email}), or the contact form on [my portfolio](${siteUrl}/#contact).`,
  "",
  "---",
  "",
  "<sub>This README is generated from the portfolio's content (`content/`) by `pnpm readme`. To change it, edit the content files, not this README. For the codebase itself, see [docs/development.md](docs/development.md).</sub>",
  "",
);

await writeFile("README.md", lines.join("\n"));
console.log("README.md written from content/.");
