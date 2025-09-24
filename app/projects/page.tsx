import { Navbar } from "@/components/navbar";
import { ProjectsSection } from "@/components/projects-section";

export default function ProjectsPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-8">
        <ProjectsSection />
      </main>
    </div>
  );
}