const FALLBACK_URL = "https://greggmarayan.me";

function resolveSiteUrl(): URL {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : FALLBACK_URL);
  try {
    return new URL(raw);
  } catch {
    return new URL(FALLBACK_URL);
  }
}

export const siteUrl = resolveSiteUrl();
