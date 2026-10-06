import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { ContactContent } from "@/components/contact-content";
import { personalInfo } from "@/data/personal-info";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${personalInfo.name}. Send a message for project collaborations, web development opportunities, or networking inquiries.`,
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: `Contact | ${personalInfo.name}`,
    description: `Connect with ${personalInfo.name} - ${personalInfo.title} based in ${personalInfo.location.city}, ${personalInfo.location.country}.`,
    url: `${personalInfo.website.url}/contact`,
    images: [
      {
        url: "/android-chrome-512x512.png",
        width: 512,
        height: 512,
        alt: `${personalInfo.name} - Contact`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Contact | ${personalInfo.name}`,
    description: `Connect with ${personalInfo.name} - ${personalInfo.title} based in ${personalInfo.location.city}, ${personalInfo.location.country}.`,
    images: ["/android-chrome-512x512.png"],
  },
};

export default function ContactPage() {
  return (
    <div className="flex-1 flex flex-col">
      <Navbar personalInfo={personalInfo} />
      <main className="relative flex-1">
        <ContactContent personalInfo={personalInfo} />
      </main>
    </div>
  );
}