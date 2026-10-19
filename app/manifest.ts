import type { MetadataRoute } from "next";
import { profile } from "@/content/profile";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${profile.name} · ${profile.role}`,
    short_name: profile.name,
    description: profile.intro,
    start_url: "/",
    display: "standalone",
    background_color: "#15161a",
    theme_color: "#15161a",
    icons: [
      { src: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { src: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
