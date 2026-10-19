import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/content";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "../icons";
import { SectionHeading } from "../ui/section-heading";
import { Tile } from "../ui/tile";
import { ProjectArt } from "./project-art";

export function Work({ projects }: { projects: Project[] }) {
  const [lead, ...rest] = projects;
  return (
    <section aria-labelledby="work-title" id="work" className="container-page py-20 sm:py-28">
      <SectionHeading
        id="work-title"
        eyebrow="Selected work"
        title="Things I've *built*"
        intro="Full-stack products built solo and with teams, from booking systems to finance tooling. Open any project for the full story."
      />
      <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {lead && (
          <li id={`project-${lead.slug}`} className="reveal scroll-mt-24 md:col-span-2 lg:col-span-3">
            <ProjectCard project={lead} wide />
          </li>
        )}
        {rest.map((project) => (
          <li key={project.slug} id={`project-${project.slug}`} className="reveal scroll-mt-24">
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </section>
  );
}

function ProjectCard({ project, wide }: { project: Project; wide?: boolean }) {
  return (
    <Tile tint={project.color} className="group h-full transition-transform duration-300 hover:-translate-y-1 motion-reduce:hover:translate-y-0">
      <Link href={project.href} className={cn("flex h-full flex-col", wide && "lg:grid lg:grid-cols-[1.35fr_1fr]")}>
        <div
          className={cn(
            "relative aspect-[16/10] overflow-hidden border-b border-border",
            wide && "lg:aspect-auto lg:min-h-[22rem] lg:border-b-0 lg:border-r",
          )}
        >
          {project.cover ? (
            <Image
              src={project.cover.src}
              alt={project.cover.alt}
              fill
              sizes={wide ? "(min-width: 1024px) 680px, 100vw" : "(min-width: 1024px) 380px, (min-width: 768px) 50vw, 100vw"}
              className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04] motion-reduce:group-hover:scale-100"
            />
          ) : (
            <ProjectArt project={project} large={wide} />
          )}
          <span
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
            style={{ background: project.color }}
          />
        </div>
        <div className={cn("flex flex-1 flex-col p-6", wide && "lg:justify-center lg:p-10")}>
          <p className="flex items-center gap-2 text-xs text-muted">
            <span aria-hidden="true" className="size-2 rounded-full" style={{ background: project.color }} />
            {[project.year, project.role].filter(Boolean).join(" · ") || "Case study"}
          </p>
          <h3 className={cn("mt-3 font-semibold leading-tight", wide ? "text-3xl sm:text-4xl" : "text-xl")}>{project.title}</h3>
          <p className={cn("mt-3 leading-relaxed text-muted", wide && "text-lg")}>{project.summary}</p>
          <ul aria-label="Tech stack" className="mt-5 flex flex-wrap gap-1.5">
            {project.stack.slice(0, wide ? 7 : 4).map((tech) => (
              <li key={tech} className="chip text-xs">
                {tech}
              </li>
            ))}
            {!wide && project.stack.length > 4 && <li className="chip text-xs text-muted">+{project.stack.length - 4}</li>}
          </ul>
          <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium">
            Read the case study
            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </div>
      </Link>
    </Tile>
  );
}
