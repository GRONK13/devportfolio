import { Navbar } from "@/components/navbar";
import { CertificatesFull } from "@/components/certificates-full";
import type { Metadata } from "next";
import { certificates } from "@/data/certificates";
import { personalInfo } from "@/data/personal-info";
import { BackgroundBeams } from "@/components/ui/background-beams";

export const metadata: Metadata = {
  title: "Certifications",
  description: "View the list of professional IT certifications and security credentials obtained by Gregg Marayan, including Cisco CyberOps Associate.",
};

export default function CertificatesPage() {
  return (
    <div className="min-h-screen">
      <Navbar personalInfo={personalInfo} />
      <main className="relative overflow-hidden min-h-[calc(100vh-4rem)]">
        <BackgroundBeams />
        <div className="relative z-10">
          <CertificatesFull certificates={certificates} />
        </div>
      </main>
    </div>
  );
}