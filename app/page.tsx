"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { ProjectsSection } from "@/components/projects-section";
import { CertificatesSection } from "@/components/certificates-section";

export default function Home() {
  const pathname = usePathname();

  return (
    <div className="min-h-screen">
      {pathname !== "/" && <Navbar />}
      <main>
        <HeroSection />
        <ProjectsSection />
        <CertificatesSection />
      </main>
    </div>
  );
}
