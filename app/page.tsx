import { About } from "@/components/sections/about";
import { Certifications } from "@/components/sections/certifications";
import { Contact } from "@/components/sections/contact";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { Skills } from "@/components/sections/skills";
import { Work } from "@/components/sections/work";
import { getExperience, getProfile, getProjects } from "@/lib/content";

export default function HomePage() {
  const profile = getProfile();
  const projects = getProjects();
  const featured = projects.find((p) => p.featured);
  return (
    <>
      <Hero profile={profile} featured={featured} />
      <Work projects={projects} />
      <Experience items={getExperience()} />
      <Skills />
      <Certifications />
      <About profile={profile} />
      <Contact profile={profile} />
    </>
  );
}
