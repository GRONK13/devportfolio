import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/content";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => new URL(path, siteUrl).href;
  return [
    { url: url("/"), changeFrequency: "monthly", priority: 1 },
    ...getProjects().map((p) => ({ url: url(p.href), changeFrequency: "monthly" as const, priority: 0.8 })),
    { url: url("/contact"), changeFrequency: "yearly", priority: 0.5 },
  ];
}
