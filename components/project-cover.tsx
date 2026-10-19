import Image from "next/image";
import { ViewTransition } from "react";
import type { Project } from "@/lib/content";

/**
 * A project's screenshot at a fixed 16:10 frame, or a typeset title card when there's no
 * screenshot yet. With `dither`, a build-time 1-bit "proof" (lib/dither.ts) sits on top and
 * develops into the colour image on hover, keyboard focus, or scroll on touch screens
 * (CSS in globals.css, "Dither covers"). The frame morphs between the project list and the
 * case study through a shared <ViewTransition> name.
 */
export function ProjectCover({
  project,
  sizes,
  priority = false,
  dither = false,
}: {
  project: Project;
  sizes: string;
  priority?: boolean;
  dither?: boolean;
}) {
  return (
    <ViewTransition name={`cover-${project.slug}`} share="morph" default="none">
      <div className="relative aspect-[16/10] overflow-hidden bg-surface">
        {project.cover ? (
          <>
            <Image
              src={project.cover.src}
              alt={project.cover.alt}
              width={project.cover.width}
              height={project.cover.height}
              sizes={sizes}
              priority={priority}
              className="size-full object-cover object-top"
            />
            {dither && (
              // Decorative duplicate of the image above, so it's hidden from assistive tech.
              // eslint-disable-next-line @next/next/no-img-element -- tiny 2-colour PNG; optimizing would blur the pixels
              <img src={project.cover.dither} alt="" aria-hidden="true" loading="lazy" decoding="async" className="dither" />
            )}
          </>
        ) : (
          <div className="flex size-full flex-col justify-between p-5 md:p-8" aria-hidden="true">
            <span className="label text-muted">No screenshot yet</span>
            <span className="display text-[clamp(2rem,6vw,4.5rem)]" style={{ color: project.color }}>
              {project.title}
            </span>
          </div>
        )}
      </div>
    </ViewTransition>
  );
}
