import { Navbar } from "@/components/navbar";
import { CertificatesFull } from "@/components/certificates-full";
import type { Metadata } from "next";
import { certificates } from "@/data/certificates";
import { personalInfo } from "@/data/personal-info";
import { BackgroundBeams } from "@/components/ui/background-beams";

export const metadata: Metadata = {
  title: "Certifications",
  description: "View the list of professional IT certifications and security credentials obtained by Gregg Marayan, including Cisco CyberOps Associate.",
  alternates: {
    canonical: "/certificates",
  },
};

export default function CertificatesPage() {
  return (
    <div className="flex-1 flex flex-col">
      <Navbar personalInfo={personalInfo} />
      <main className="relative flex-1 overflow-hidden min-h-[calc(100vh-4rem)]">
        <BackgroundBeams />
        <div className="relative z-10">
          <CertificatesFull certificates={certificates} />
        </div>
      </main>
    </div>
  );
}