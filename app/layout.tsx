import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { personalInfo } from "@/data/personal-info";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${personalInfo.name} - Full Stack Developer Portfolio`,
    template: `%s | ${personalInfo.name}`
  },
  description: personalInfo.descriptions.medium,
  keywords: personalInfo.keywords,
  authors: [{ name: personalInfo.name }],
  creator: personalInfo.name,
  publisher: personalInfo.name,
  metadataBase: new URL(personalInfo.website.url),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: personalInfo.website.url, 
    title: `${personalInfo.name} - Full Stack Developer Portfolio`,
    description: `Explore the portfolio of ${personalInfo.name}, a passionate full-stack developer specializing in modern web technologies. View projects, skills, and professional experience.`,
    siteName: `${personalInfo.name} Portfolio`,
    images: [
      {
        url: "/web-app-manifest-512x512.png",
        width: 1200,
        height: 630,
        alt: `${personalInfo.name} - Full Stack Developer`,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
  classification: "Portfolio Website",
  icons: {
    icon: [
      {
        url: "/favicon-32x32.png",
        type: "image/png",
        sizes: "32x32",
      },
      {
        url: "/favicon-16x16.png",
        type: "image/png", 
        sizes: "16x16",
      },
      {
        url: "/favicon.ico",
        sizes: "any",
      },
    ],
    shortcut: "/favicon.ico",
    apple: [
      {
        url: "/apple-touch-icon.png",
        type: "image/png",
        sizes: "180x180",
      },
    ],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        {/* Remove all these manual links - metadata handles them */}
        {/* Additional SEO meta tags */}
        <meta name="theme-color" content="#000000" />
        <meta name="color-scheme" content="dark light" />
        <meta name="format-detection" content="telephone=no" />
        <link rel="canonical" href={personalInfo.website.url} />
        
        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: personalInfo.name,
              jobTitle: personalInfo.title, 
              description: personalInfo.descriptions.medium.split("specializing")[0].trim(),
              url: personalInfo.website.url,
              sameAs: [
                personalInfo.social.github,
                personalInfo.social.linkedin, 
              ],
              alumniOf: {
                "@type": "CollegeOrUniversity",
                name: "University of San Carlos"
              },
              knowsAbout: [
                "React",
                "Next.js", 
                "TypeScript",
                "JavaScript",
                "Node.js",
                "PostgreSQL",
                "Full Stack Development",
                "Web Development"
              ]
            })
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
