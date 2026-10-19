import { getSite } from "@/lib/content";

/**
 * The site's public URL: NEXT_PUBLIC_SITE_URL, else Vercel's production domain, else `url` in
 * content/site.yaml.
 */
function resolveSiteUrl(): URL {
  const fallback = getSite().url;
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : fallback);
  try {
    return new URL(raw);
  } catch {
    return new URL(fallback);
  }
}

export const siteUrl = resolveSiteUrl();
