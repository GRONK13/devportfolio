import Image from "next/image";
import { projects, type Project } from "@/content/projects";
import { ArrowUpRight, GitHub } from "../icons";
import { Section } from "../section";

export function Work() {
  return (
    <Section
      id="work"
      index="01"
      eyebrow="Selected work"
      title="Things I've built"
      intro="Full-stack products built solo and with teams, from booking systems to finance tooling."
    >
      <ul className="grid gap-6 md:grid-cols-2">
        {projects.map((project, i) => (
          <li key={project.slug} id={`project-${project.slug}`} className="reveal scroll-mt-24">
            <ProjectCard project={project} priority={i < 2} />
          </li>
        ))}
      </ul>
    </Section>
  );
}

function ProjectCard({ project, priority }: { project: Project; priority: boolean }) {
  const visibleStack = project.stack.slice(0, 4);
  const hiddenCount = project.stack.length - visibleStack.length;

  return (
    <article className="card group flex h-full flex-col overflow-hidden transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-xl hover:shadow-accent/5 motion-reduce:hover:translate-y-0">
      <div className="relative aspect-[16/10] overflow-hidden border-b border-border bg-surface-2">
        {project.image ? (
          <Image
            src={project.image}
            alt={`Screenshot of ${project.title}`}
            fill
            sizes="(min-width: 1152px) 540px, (min-width: 768px) 50vw, 100vw"
            placeholder="blur"
            priority={priority}
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:group-hover:scale-100"
          />
        ) : (
          <ProjectPlaceholder title={project.title} stack={project.stack} />
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-semibold">{project.title}</h3>
        <p className="mt-2 leading-relaxed text-muted">{project.summary}</p>

        <ul aria-label="Tech stack" className="mt-4 flex flex-wrap gap-1.5">
          {visibleStack.map((tech) => (
            <li key={tech} className="chip text-xs">
              {tech}
            </li>
          ))}
          {hiddenCount > 0 && (
            <li className="chip text-xs text-muted" title={project.stack.slice(4).join(", ")}>
              +{hiddenCount} more
            </li>
          )}
        </ul>

        <details className="group/details mt-4 text-sm">
          <summary className="cursor-pointer list-none text-muted transition-colors hover:text-fg [&::-webkit-details-marker]:hidden">
            <span className="underline decoration-border underline-offset-4 group-open/details:hidden">More details</span>
            <span className="hidden underline decoration-border underline-offset-4 group-open/details:inline">Less details</span>
          </summary>
          <p className="mt-3 leading-relaxed text-muted">{project.description}</p>
          <p className="mt-3 text-muted">
            <span className="font-medium text-fg">Stack:</span> {project.stack.join(", ")}
          </p>
        </details>

        <div className="mt-auto flex flex-wrap gap-2 pt-6">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-fg px-3.5 py-2 text-sm font-medium text-bg transition-opacity hover:opacity-90"
            >
              Live site
              <ArrowUpRight className="size-4" />
              <span className="sr-only">for {project.title} (opens in a new tab)</span>
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3.5 py-2 text-sm font-medium transition-colors hover:border-fg/30"
            >
              <GitHub className="size-4" />
              Source
              <span className="sr-only">code for {project.title} (opens in a new tab)</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

function ProjectPlaceholder({ title, stack }: { title: string; stack: string[] }) {
  return (
    <div aria-hidden="true" className="absolute inset-0 grid place-items-center overflow-hidden">
      <div className="hero-grid absolute inset-0 opacity-70 [mask-image:none]" />
      <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_40%,var(--accent-soft),transparent)]" />
      <div className="relative text-center">
        <p className="text-4xl font-semibold tracking-tight sm:text-5xl">{title}</p>
        <p className="mt-3 font-mono text-xs uppercase tracking-widest text-muted">{stack.slice(0, 3).join(" · ")}</p>
      </div>
    </div>
  );
}
