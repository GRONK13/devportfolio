import Image from "next/image";
import type { Project } from "@/lib/content";

/**
 * A project's screenshot at a fixed 16:10 frame, or a typeset title card when there's no
 * screenshot yet. Phase 4 layers the dither-to-colour reveal on top of this.
 */
export function ProjectCover({
  project,
  sizes,
  priority = false,
}: {
  project: Project;
  sizes: string;
  priority?: boolean;
}) {
  return (
    <div className="relative aspect-[16/10] overflow-hidden bg-surface">
      {project.cover ? (
        <Image
          src={project.cover.src}
          alt={project.cover.alt}
          width={project.cover.width}
          height={project.cover.height}
          sizes={sizes}
          priority={priority}
          className="size-full object-cover object-top"
        />
      ) : (
        <div className="flex size-full flex-col justify-between p-5 md:p-8" aria-hidden="true">
          <span className="label text-muted">No screenshot yet</span>
          <span className="display text-[clamp(2rem,6vw,4.5rem)]" style={{ color: project.color }}>
            {project.title}
          </span>
        </div>
      )}
    </div>
  );
}
