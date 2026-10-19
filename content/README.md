# Site content

Everything on the site comes from this folder. The build checks every file against
`lib/content/schemas.ts`; if a field is missing or wrong, `pnpm build` (and the Vercel deploy)
fails with the file and field, so a mistake never reaches the live site.

| To change… | Edit |
| --- | --- |
| Name, headline, links, bio, résumé | `profile.yaml` |
| The "Now" status | `now.yaml` (bump `updated`) |
| Values | `values.yaml` |
| Skills | `skills.yaml` |
| Jobs and schools | `timeline.yaml` |
| Certifications | `certifications.yaml` |
| Search/sharing title and description | `site.yaml` |
| A project and its case study | `projects/<slug>.md` |

## Editing from the browser or phone

Sign in at [app.pagescms.org](https://app.pagescms.org) with GitHub and open this repository.
Saving commits to the branch you picked; Vercel rebuilds in about a minute. Pages CMS rewrites
YAML when it saves, so `# comments` in a file you edit there are dropped.

## Add a project

1. Create `projects/<slug>.md` (the file name becomes the URL, `/work/<slug>`). Copy an existing
   one to start. The Markdown body is the case study; use `##` headings.
2. Put a screenshot in `public/media/projects/<slug>.webp` (about 1600px wide) and set
   `cover.src` and `cover.alt`.
3. Give it a unique `order` (lower shows first).

The dithered "proof" version of the cover shown on the home page is generated from the
screenshot at build time (`public/_dither/`); there is nothing to make by hand.

## Rules

- Images live in `public/media/` and are referenced as `/media/...`.
- Raw HTML in Markdown is dropped on purpose. HTML comments are handy for private notes.
- Dates are `YYYY-MM-DD`; timeline dates are `YYYY` or `YYYY-MM`, with `end: present` for an
  ongoing role.
- Skill names that match a project's `stack` entry link to that project, so spell them the same.
