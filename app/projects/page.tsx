import { Navbar } from "@/components/navbar";
import { ProjectsFull } from "@/components/projects-full";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "Explore developer projects built by Gregg Marayan, including booking dashboards, Lost & Found student networks, and dev-kwest gamification portals.",
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-8">
        <ProjectsFull />
      </main>
    </div>
  );
}