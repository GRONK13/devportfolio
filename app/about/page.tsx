import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { AboutContent } from "@/components/about-content";
import { personalInfo } from "@/data/personal-info";

export const metadata: Metadata = {
  title: "About",
  description: `Learn more about ${personalInfo.name}, a ${personalInfo.title}. Read his journey from robotics to full-stack development, technical skills, core values, and background at the University of San Carlos.`,
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: `About | ${personalInfo.name}`,
    description: personalInfo.descriptions.medium,
    url: `${personalInfo.website.url}/about`,
    images: [
      {
        url: "/android-chrome-512x512.png",
        width: 512,
        height: 512,
        alt: `${personalInfo.name} - About`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `About | ${personalInfo.name}`,
    description: personalInfo.descriptions.medium,
    images: ["/android-chrome-512x512.png"],
  },
};

export default function AboutPage() {
  return (
    <div className="flex-1 flex flex-col">
      <Navbar personalInfo={personalInfo} />
      <main className="relative flex-1">
        <AboutContent personalInfo={personalInfo} />
      </main>
    </div>
  );
}