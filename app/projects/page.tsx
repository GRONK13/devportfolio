import { Navbar } from "@/components/navbar";
import { ProjectsFull } from "@/components/projects-full";
import type { Metadata } from "next";
import { projects } from "@/data/projects";
import { personalInfo } from "@/data/personal-info";
import { BackgroundBeams } from "@/components/ui/background-beams";

export const metadata: Metadata = {
  title: "Projects",
  description: "Explore developer projects built by Gregg Marayan, including booking dashboards, Lost & Found student networks, and dev-kwest gamification portals.",
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen">
      <Navbar personalInfo={personalInfo} />
      <main className="relative overflow-hidden min-h-[calc(100vh-4rem)]">
        <BackgroundBeams />
        <div className="relative z-10">
          <ProjectsFull projects={projects} />
        </div>
      </main>
    </div>
  );
}