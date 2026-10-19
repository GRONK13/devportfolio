import type { MetadataRoute } from "next";
import { getNow } from "@/lib/content";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: siteUrl.toString(), lastModified: getNow().updated, changeFrequency: "monthly", priority: 1 }];
}
