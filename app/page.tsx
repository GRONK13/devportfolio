import { About } from "@/components/sections/about";
import { Certifications } from "@/components/sections/certifications";
import { Contact } from "@/components/sections/contact";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { Skills } from "@/components/sections/skills";
import { Work } from "@/components/sections/work";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Work />
      <Experience />
      <Skills />
      <Certifications />
      <About />
      <Contact />
    </>
  );
}
