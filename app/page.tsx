import { About } from "@/components/sections/about";
import { Certifications } from "@/components/sections/certifications";
import { Contact } from "@/components/sections/contact";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { Now } from "@/components/sections/now";
import { Skills } from "@/components/sections/skills";
import { Work } from "@/components/sections/work";
import {
  getCertifications,
  getFeaturedProjects,
  getNow,
  getProfile,
  getProjectsUsing,
  getSkillGroups,
  getTimeline,
  getValues,
} from "@/lib/content";

export default function HomePage() {
  const profile = getProfile();
  return (
    <>
      <Hero profile={profile} />
      <Work projects={getFeaturedProjects()} />
      <About profile={profile} values={getValues()} />
      <Now now={getNow()} />
      <Experience entries={getTimeline()} />
      <Skills groups={getSkillGroups()} projectsUsing={getProjectsUsing} />
      <Certifications items={getCertifications()} />
      <Contact profile={profile} />
    </>
  );
}
