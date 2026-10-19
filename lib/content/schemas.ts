import { z } from "zod";

/**
 * Schemas for everything in /content. Content Collections validates each file against these
 * at build time, so a typo or missing field fails `pnpm build` (and the Vercel deploy) with the
 * file name and field instead of reaching the live site.
 */

const url = z.url({ protocol: /^https$/, error: "Must be an https:// URL." });
const yearOrMonth = z.string().regex(/^\d{4}(-(0[1-9]|1[0-2]))?$/, "Use YYYY or YYYY-MM.");
// YAML parses unquoted 2026-10-19 as a Date; accept both and normalise to "YYYY-MM-DD".
const isoDate = z.union([z.iso.date({ error: "Use YYYY-MM-DD." }), z.date().transform((d) => d.toISOString().slice(0, 10))]);
const hexColor = z.string().regex(/^#[0-9a-fA-F]{6}$/, 'Use a 6-digit hex color like "#3b82f6".');
/** A file under public/, referenced by its site path. */
const publicPath = (pattern: RegExp, message: string) =>
  z.string().regex(/^\/[\w./-]+$/, "Must be a path starting with /, e.g. /media/photo.jpg.").regex(pattern, message);
const imagePath = publicPath(/\.(webp|avif|png|jpe?g)$/i, "Must be a .webp, .avif, .png or .jpg image.");
const image = z.strictObject({ src: imagePath, alt: z.string().min(1, "Describe the image for screen readers.") });

export const profileSchema = z.strictObject({
  name: z.string().min(1),
  fullName: z.string().min(1),
  role: z.string().min(1),
  headline: z.string().min(1),
  intro: z.string().min(1).max(280, "Keep the intro to two sentences (280 characters)."),
  availability: z.strictObject({ status: z.enum(["open", "limited", "closed"]), label: z.string().min(1) }),
  location: z.string().min(1),
  timezone: z.string().refine((tz) => {
    try {
      new Intl.DateTimeFormat("en", { timeZone: tz });
      return true;
    } catch {
      return false;
    }
  }, "Must be an IANA time zone like Asia/Manila."),
  email: z.email(),
  socials: z.array(z.strictObject({ label: z.string().min(1), url })).min(1),
  resume: z.strictObject({
    file: publicPath(/\.pdf$/i, "Must be a .pdf file."),
    updated: isoDate.optional(),
  }),
  photo: image.optional(),
  about: z.string().min(1),
});

export const valuesSchema = z.strictObject({
  items: z.array(z.strictObject({ title: z.string().min(1), description: z.string().min(1).max(200) })).min(1),
});

export const nowSchema = z.strictObject({
  updated: isoDate,
  items: z.array(z.strictObject({ label: z.string().min(1), text: z.string().min(1) })).min(1).max(4),
});

export const skillsSchema = z.strictObject({
  groups: z
    .array(z.strictObject({ name: z.string().min(1), note: z.string().optional(), items: z.array(z.string().min(1)).min(1) }))
    .min(1),
});

export const timelineSchema = z.strictObject({
  entries: z
    .array(
      z
        .strictObject({
          kind: z.enum(["work", "education"]),
          title: z.string().min(1),
          org: z.string().min(1),
          location: z.string().optional(),
          start: yearOrMonth,
          end: z.union([yearOrMonth, z.literal("present")]),
          summary: z.string().min(1),
          highlights: z.array(z.string().min(1)).default([]),
        })
        .refine((e) => e.end === "present" || e.end >= e.start, { message: "end must not be before start.", path: ["end"] }),
    )
    .min(1),
});

export const certificationsSchema = z.strictObject({
  items: z.array(
    z.strictObject({
      name: z.string().min(1),
      issuer: z.string().min(1),
      issued: isoDate,
      expires: isoDate.optional(),
      credentialId: z.string().optional(),
      summary: z.string().min(1),
      verifyUrl: url,
      skills: z.array(z.string().min(1)).default([]),
      badge: image.optional(),
    }),
  ),
});

export const siteSchema = z.strictObject({
  url,
  title: z.string().min(1),
  description: z.string().min(50).max(170, "Search engines cut descriptions after ~160 characters."),
  keywords: z.array(z.string().min(1)).default([]),
});

export const projectSchema = z.strictObject({
  title: z.string().min(1),
  summary: z.string().min(1).max(140, "Keep the summary to one line (140 characters)."),
  featured: z.boolean().default(false),
  order: z.number().int(),
  color: hexColor,
  cover: image.optional(),
  stack: z.array(z.string().min(1)).min(1),
  links: z.strictObject({ live: url.optional(), repo: url.optional(), video: url.optional() }).default({}),
  // How `pnpm screenshots` (and the weekly CI job) refreshes the cover from links.live.
  screenshot: z
    .strictObject({
      auto: z.boolean().default(true), // false keeps a hand-made cover (e.g. the live site needs a login)
      dismiss: z.string().min(1).optional(), // text of a button to click before capturing, e.g. a notice
      delay: z.number().int().min(0).max(15000).default(2500), // ms to wait after load
    })
    .default({ auto: true, delay: 2500 }),
  metrics: z.array(z.strictObject({ label: z.string().min(1), value: z.string().min(1) })).default([]),
  year: z.string().regex(/^\d{4}$/, 'Use a quoted year like "2025".').optional(),
  role: z.string().optional(),
  team: z.string().optional(),
  // The Markdown body below the front matter: the case study.
  content: z.string(),
});
