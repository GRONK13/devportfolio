import { Navbar } from "@/components/navbar";
import { CertificatesFull } from "@/components/certificates-full";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Certifications",
  description: "View the list of professional IT certifications and security credentials obtained by Gregg Marayan, including Cisco CyberOps Associate.",
};

export default function CertificatesPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-8">
        <CertificatesFull />
      </main>
    </div>
  );
}