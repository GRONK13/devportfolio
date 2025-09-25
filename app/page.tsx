"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { ProjectsSection } from "@/components/projects-section";
import { CertificatesSection } from "@/components/certificates-section";
import { ThemeToggle } from "@/components/theme-toggle"; // added

export default function Home() {
  const pathname = usePathname();

  return (
    <div className="min-h-screen relative">
      {/* Top-right dark mode toggle only on this page */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      {pathname !== "/" && <Navbar />}
      <main>
        <HeroSection />
        <ProjectsSection />
        <CertificatesSection />
      </main>
    </div>
  );
}
