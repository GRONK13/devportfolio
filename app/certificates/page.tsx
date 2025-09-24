import { Navbar } from "@/components/navbar";
import { CertificatesSection } from "@/components/certificates-section";

export default function CertificatesPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-8">
        <CertificatesSection />
      </main>
    </div>
  );
}