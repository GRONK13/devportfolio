import { Navbar } from "@/components/navbar";
import { CertificatesFull } from "@/components/certificates-full";

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