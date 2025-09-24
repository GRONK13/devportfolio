import { Navbar } from "@/components/navbar";
import { ProjectsFull } from "@/components/projects-full";

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