import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { getProfile, getSite } from "@/lib/content";
import { siteUrl } from "@/lib/site";
import "./globals.css";

export function generateMetadata(): Metadata {
  const site = getSite();
  const profile = getProfile();
  return {
    metadataBase: siteUrl,
    title: { default: site.title, template: `%s — ${profile.name}` },
    description: site.description,
    keywords: site.keywords,
    authors: [{ name: profile.fullName, url: siteUrl }],
    alternates: { canonical: "/" },
    openGraph: { type: "website", siteName: profile.name, title: site.title, description: site.description, url: "/" },
    icons: {
      icon: [
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      ],
      apple: "/apple-touch-icon.png",
    },
  };
}

export const viewport: Viewport = {
  colorScheme: "light dark",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
