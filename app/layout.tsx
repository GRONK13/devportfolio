import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

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
    default: "Gregg Marayan - Full Stack Developer Portfolio",
    template: "%s | Gregg Marayan"
  },
  description: "Gregg Marayan is a 4th Year Information Technology Student at University of San Carlos specializing in full-stack web development with React, Next.js, Node.js, and TypeScript. View my projects, skills, and experience.",
  keywords: [
    "Gregg Marayan",
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer", 
    "TypeScript Developer",
    "Web Developer",
    "Frontend Developer",
    "Backend Developer",
    "University of San Carlos",
    "Information Technology Student",
    "JavaScript",
    "Node.js",
    "PostgreSQL",
    "Portfolio",
    "Software Engineer"
  ],
  authors: [{ name: "Gregg Marayan" }],
  creator: "Gregg Marayan",
  publisher: "Gregg Marayan",
  metadataBase: new URL("https://greggmarayan.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://greggmarayan.vercel.app", 
    title: "Gregg Marayan - Full Stack Developer Portfolio",
    description: "Explore the portfolio of Gregg Marayan, a passionate full-stack developer specializing in modern web technologies. View projects, skills, and professional experience.",
    siteName: "Gregg Marayan Portfolio",
    images: [
      {
        url: "/web-app-manifest-512x512.png",
        width: 1200,
        height: 630,
        alt: "Gregg Marayan - Full Stack Developer",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        {/* Remove all these manual links - metadata handles them */}
        {/* Additional SEO meta tags */}
        <meta name="theme-color" content="#000000" />
        <meta name="color-scheme" content="dark light" />
        <meta name="format-detection" content="telephone=no" />
        <link rel="canonical" href="https://greggmarayan.vercel.app" />
        
        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Gregg Marayan",
              jobTitle: "Full Stack Developer", 
              description: "4th Year Information Technology Student at University of San Carlos specializing in full-stack web development",
              url: "https://greggmarayan.vercel.app",
              sameAs: [
                "https://github.com/GreggMarayan",
                "https://linkedin.com/in/gregg-marayan", 
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
      </body>
    </html>
  );
}
