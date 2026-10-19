import type { MetadataRoute } from "next";
import { getNow, getProjects } from "@/lib/content";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl.toString(), lastModified: getNow().updated, changeFrequency: "monthly", priority: 1 },
    ...getProjects().map((p) => ({
      url: new URL(`/work/${p.slug}`, siteUrl).toString(),
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
  ];
}
