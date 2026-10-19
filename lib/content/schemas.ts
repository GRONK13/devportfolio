import { z } from "zod";

const url = z.url({ protocol: /^https$/, error: "Must be an https:// URL." });
const yearOrMonth = z.string().regex(/^\d{4}(-(0[1-9]|1[0-2]))?$/, "Use YYYY or YYYY-MM.");
const isoDate = z.iso.date({ error: "Use YYYY-MM-DD." });
const hexColor = z.string().regex(/^#[0-9a-fA-F]{6}$/, 'Use a 6-digit hex color like "#3b82f6".');
const imageFile = z.string().regex(/^[\w.-]+\.(webp|png|jpe?g|avif)$/i, "Must be an image file name in the same folder.");

export const profileSchema = z.strictObject({
  name: z.string().min(1),
  fullName: z.string().min(1),
  role: z.string().min(1),
  headline: z.string().min(1),
  intro: z.string().min(1),
  availability: z.string().min(1),
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
  github: url,
  linkedin: url,
  resume: z.string().startsWith("/"),
  photo: imageFile.optional(),
  values: z.array(z.strictObject({ title: z.string(), body: z.string() })).min(1),
  keywords: z.array(z.string()).default([]),
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

export const projectSchema = z.strictObject({
  title: z.string().min(1),
  summary: z.string().min(1).max(140, "Keep the summary to one line (140 characters)."),
  order: z.number().int(),
  featured: z.boolean().default(false),
  color: hexColor,
  cover: imageFile.optional(),
  coverAlt: z.string().optional(),
  stack: z.array(z.string().min(1)).min(1),
  links: z.strictObject({ live: url.optional(), repo: url.optional() }).default({}),
  role: z.string().optional(),
  team: z.string().optional(),
  year: z.string().optional(),
}).refine((p) => !p.cover || p.coverAlt, { message: "Add coverAlt describing the cover image.", path: ["coverAlt"] });

export const experienceSchema = z
  .strictObject({
    kind: z.enum(["work", "education"]),
    title: z.string().min(1),
    org: z.string().min(1),
    start: yearOrMonth,
    end: z.union([yearOrMonth, z.literal("present")]),
    summary: z.string().min(1),
    highlights: z.array(z.string()).optional(),
  })
  .refine((e) => e.end === "present" || e.end >= e.start, { message: "end must not be before start.", path: ["end"] });

export const certificationSchema = z.strictObject({
  title: z.string().min(1),
  issuer: z.string().min(1),
  issued: isoDate,
  summary: z.string().min(1),
  verifyUrl: url,
  skills: z.array(z.string()).default([]),
});
