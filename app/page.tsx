"use client";

import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { ProjectsSection } from "@/components/projects-section";
import { CertificatesSection } from "@/components/certificates-section";
import { SecurityConsole } from "@/components/security-console";
import { personalInfo } from "@/data/personal-info";
import { projects } from "@/data/projects";
import { certificates } from "@/data/certificates";
import { skills } from "@/data/skills";

export default function Home() {
  return (
    <div className="min-h-screen">  
      <Navbar personalInfo={personalInfo} />
      <main>
        <HeroSection
          personalInfo={personalInfo}
          projects={projects}
          skills={skills}
          certificates={certificates}
        />
        <ProjectsSection projects={projects} />
        <SecurityConsole />
        <CertificatesSection certificates={certificates} />
      </main>
    </div>
  );
}
