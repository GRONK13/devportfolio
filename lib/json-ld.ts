import type { Profile } from "@/lib/content";
import { siteUrl } from "@/lib/site";

/** schema.org Person, so search engines can tie the site to the name, role and profiles. */
export function personJsonLd(profile: Profile) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.fullName,
    alternateName: profile.name,
    jobTitle: profile.role,
    description: profile.intro,
    email: `mailto:${profile.email}`,
    url: siteUrl.toString(),
    image: profile.photo ? new URL(profile.photo.src, siteUrl).toString() : undefined,
    address: { "@type": "PostalAddress", addressLocality: profile.location },
    sameAs: profile.socials.map((s) => s.url),
  };
}

/** JSON for a <script type="application/ld+json">, with "<" escaped so content can't close the tag. */
export const serializeJsonLd = (data: unknown) => JSON.stringify(data).replace(/</g, "\\u003c");
