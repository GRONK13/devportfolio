import Link from "next/link";
import { ProjectCover } from "@/components/project-cover";
import { Section } from "@/components/section";
import type { Project } from "@/lib/content";
import { pad } from "@/lib/format";

/**
 * Featured projects as a two-column index. The whole entry is clickable through the title link's
 * stretched ::after, so there's one link per project for keyboard and screen-reader users.
 */
export function Work({ projects }: { projects: Project[] }) {
  return (
    <Section id="work" index={1} title="Selected work" aside={`${pad(projects.length)} projects`}>
      <ol className="grid grid-cols-1 gap-x-6 gap-y-16 md:grid-cols-2 md:gap-y-24">
        {projects.map((project, i) => (
          <li key={project.slug} className={i % 2 === 1 ? "md:mt-32" : undefined}>
            <article className="group relative">
              <ProjectCover project={project} sizes="(min-width: 768px) 45vw, 100vw" priority={i === 0} />
              <div className="mt-5 grid grid-cols-[auto_1fr] gap-x-4">
                <span className="label pt-1.5 text-muted" aria-hidden="true">
                  {pad(i + 1)}
                </span>
                <div>
                  <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">
                    <Link
                      href={`/work/${project.slug}`}
                      className="after:absolute after:inset-0 after:content-[''] group-hover:text-accent"
                    >
                      {project.title}
                    </Link>
                  </h3>
                  <p className="mt-2 max-w-prose text-muted">{project.summary}</p>
                  <p className="label mt-4 text-muted">
                    <span className="sr-only">Built with: </span>
                    {project.stack.join(" · ")}
                  </p>
                </div>
              </div>
            </article>
          </li>
        ))}
      </ol>
    </Section>
  );
}
