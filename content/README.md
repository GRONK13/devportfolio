# Site content

> The repository README is generated from these files (`pnpm readme`), so it updates with them.

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
2. Set `links.live` and `cover` (`src: /media/projects/<slug>.webp`, plus `alt`), then run
   `pnpm screenshots <slug>` to capture the live site as the cover (the weekly Sync job keeps it
   current). For a site that can't be screenshotted (e.g. it needs a login), add your own
   1600×1000 image at that path and set `screenshot: { auto: false }`.
3. Give it a unique `order` (lower shows first).

Each `## heading` in the case study becomes an entry in the page's Contents index (with a link
anchor such as `#what-it-does`), so keep them short. Use `###` for sub-headings that shouldn't
be listed.

The dithered "proof" version of the cover shown on the home page is generated from the
screenshot at build time (`public/_dither/`); there is nothing to make by hand.

## Rules

- Images live in `public/media/` and are referenced as `/media/...`.
- Raw HTML in Markdown is dropped on purpose. HTML comments are handy for private notes.
- Dates are `YYYY-MM-DD`; timeline dates are `YYYY` or `YYYY-MM`, with `end: present` for an
  ongoing role.
- Skill names that match a project's `stack` entry link to that project, so spell them the same.
