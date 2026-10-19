import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getProfile, getSite } from "@/lib/content";
import { personJsonLd, serializeJsonLd } from "@/lib/json-ld";
import { siteUrl } from "@/lib/site";
import { geistMono, monaSans } from "./fonts";
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
    twitter: { card: "summary_large_image" },
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
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f2efe8" },
    { media: "(prefers-color-scheme: dark)", color: "#0e0e0c" },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const profile = getProfile();
  return (
    <html lang="en" className={`${monaSans.variable} ${geistMono.variable}`}>
      <body>
        <a
          href="#main"
          className="label sr-only z-50 bg-accent-fill px-4 py-3 text-on-accent focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <SiteHeader profile={profile} />
        <main id="main" tabIndex={-1} className="focus:outline-none">
          {children}
        </main>
        <SiteFooter profile={profile} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(personJsonLd(profile)) }} />
      </body>
    </html>
  );
}
