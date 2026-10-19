import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { themeInitScript } from "@/components/theme";
import { education } from "@/content/experience";
import { profile } from "@/content/profile";
import { allSkills } from "@/content/skills";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const title = `${profile.name} · ${profile.role}`;

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: { default: title, template: `%s · ${profile.name}` },
  description: profile.intro,
  keywords: [...profile.keywords],
  authors: [{ name: profile.name, url: siteUrl.href }],
  creator: profile.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: "/",
    siteName: profile.name,
    title,
    description: profile.intro,
  },
  twitter: { card: "summary_large_image", title, description: profile.intro },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafaf8" },
    { media: "(prefers-color-scheme: dark)", color: "#15161a" },
  ],
  colorScheme: "light dark",
};

/** Serializes JSON-LD safely: escaping "<" stops content from closing the script tag. */
function jsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const nonce = (await headers()).get("x-nonce") ?? undefined;

  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    alternateName: profile.fullName,
    jobTitle: profile.role,
    description: profile.intro,
    url: siteUrl.href,
    email: `mailto:${profile.email}`,
    sameAs: [profile.github.url, profile.linkedin.url],
    alumniOf: education[0] ? { "@type": "CollegeOrUniversity", name: education[0].org } : undefined,
    address: { "@type": "PostalAddress", addressLocality: "Taguig City", addressRegion: "Metro Manila", addressCountry: "PH" },
    knowsAbout: allSkills,
  };

  return (
    <html lang="en" suppressHydrationWarning className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        <script nonce={nonce} suppressHydrationWarning dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script type="application/ld+json" nonce={nonce} dangerouslySetInnerHTML={{ __html: jsonLd(person) }} />
      </head>
      <body id="top" className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only z-50 rounded-lg bg-fg px-4 py-2 text-bg focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
