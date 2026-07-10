import { Navbar } from "@/components/navbar";
import { CertificatesFull } from "@/components/certificates-full";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Certifications",
  description: "View the list of professional IT certifications and security credentials obtained by Gregg Marayan, including Cisco CyberOps Associate.",
};

import { BackgroundBeams } from "@/components/ui/background-beams";

export default function CertificatesPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="relative overflow-hidden min-h-[calc(100vh-4rem)]">
        <BackgroundBeams />
        <div className="relative z-10">
          <CertificatesFull />
        </div>
      </main>
    </div>
  );
}