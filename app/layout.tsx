import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { Footer } from "@/components/footer";
import { personalInfo } from "@/data/personal-info";
import { skillsList } from "@/data/skills";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark light",
};

export const metadata: Metadata = {
  title: {
    default: `${personalInfo.name} - Full Stack Developer Portfolio`,
    template: `%s | ${personalInfo.name}`,
  },
  description: personalInfo.descriptions.medium,
  keywords: personalInfo.keywords,
  authors: [{ name: personalInfo.name }],
  creator: personalInfo.name,
  publisher: personalInfo.name,
  formatDetection: {
    telephone: false,
  },
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
        url: "/android-chrome-512x512.png",
        width: 512,
        height: 512,
        alt: `${personalInfo.name} - Full Stack Developer`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${personalInfo.name} - Full Stack Developer Portfolio`,
    description: personalInfo.descriptions.medium,
    images: ["/android-chrome-512x512.png"],
    creator: `@${personalInfo.github}`,
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: personalInfo.name,
              jobTitle: personalInfo.title,
              description: personalInfo.descriptions.medium,
              url: personalInfo.website.url,
              image: `${personalInfo.website.url}/android-chrome-512x512.png`,
              email: personalInfo.email,
              sameAs: [
                personalInfo.social.github,
                personalInfo.social.linkedin,
              ].filter(Boolean),
              alumniOf: {
                "@type": "CollegeOrUniversity",
                name: "University of San Carlos",
              },
              address: {
                "@type": "PostalAddress",
                addressLocality: personalInfo.location.city,
                addressRegion: personalInfo.location.province,
                addressCountry: personalInfo.location.country,
              },
              knowsAbout: skillsList.map((skill) => skill.name),
            }),
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex min-h-screen flex-col`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex-1 flex flex-col">
            {children}
          </div>
          <Footer />
          <Toaster />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
