"use client";

import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { ProjectsSection } from "@/components/projects-section";
import { CertificatesSection } from "@/components/certificates-section";


export default function Home() {


  return (

    <div className="min-h-screen">  
      <Navbar />
      <main>
        <HeroSection />
        <ProjectsSection />
        <CertificatesSection />
      </main>
    </div>
  );
}
