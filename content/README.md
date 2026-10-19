# Site content

Everything on the site comes from the files in this folder. Each file has a
YAML "front matter" block between `---` lines, followed by optional Markdown.
The build checks every file against a schema (`lib/content/schemas.ts`); if a
field is missing or misspelled, `npm run build` (and CI) fails with the file
name and field, so a mistake never reaches the live site.

| To change… | Edit |
| --- | --- |
| Name, headline, links, bio, values | `profile.md` |
| The "Now" tile | `now.md` (bump `updated`) |
| Skills | `skills.md` |
| A project | `projects/<slug>/index.md` (+ `cover.webp`) |
| A job or school | `experience/<file>.md` |
| A certification | `certifications/<file>.md` |

## Add a project

1. Copy an existing folder in `projects/`, rename it (the folder name becomes
   the URL: `/work/<folder-name>`).
2. Edit `index.md`. The body is the case study; use `##` headings.
3. Drop a screenshot in the folder as `cover.webp` (around 1600px wide) and
   set `cover: cover.webp`. Leave `cover` out to get a generated title card.
4. Run `npm run dev` and check `/work/<folder-name>`.

## Notes

- Images in this folder are copied to `public/_content/` automatically by
  `npm run dev` and `npm run build`; never edit that copy.
- Raw HTML in Markdown is ignored on purpose, so content can't inject scripts.
  HTML comments (`<!-- like this -->`) are handy for private notes.
- Dates are `YYYY-MM` (or `YYYY-MM-DD` where noted). Use `present` for an
  ongoing role.
