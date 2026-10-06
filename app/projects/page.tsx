import { Navbar } from "@/components/navbar";
import { ProjectsFull } from "@/components/projects-full";
import type { Metadata } from "next";
import { projects } from "@/data/projects";
import { personalInfo } from "@/data/personal-info";
import { BackgroundBeams } from "@/components/ui/background-beams";

export const metadata: Metadata = {
  title: "Projects",
  description: "Explore developer projects built by Gregg Marayan, including booking dashboards, Lost & Found student networks, and dev-kwest gamification portals.",
  alternates: {
    canonical: "/projects",
  },
};

export default function ProjectsPage() {
  return (
    <div className="flex-1 flex flex-col">
      <Navbar personalInfo={personalInfo} />
      <main className="relative flex-1 overflow-hidden min-h-[calc(100vh-4rem)]">
        <BackgroundBeams />
        <div className="relative z-10">
          <ProjectsFull projects={projects} />
        </div>
      </main>
    </div>
  );
}