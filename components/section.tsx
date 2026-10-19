import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Section({
  id,
  index,
  eyebrow,
  title,
  intro,
  children,
  className,
}: {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  intro?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={cn("container-page py-16 sm:py-24", className)}>
      <div className="reveal mb-10 max-w-2xl sm:mb-14">
        <p className="eyebrow">
          {index} / {eyebrow}
        </p>
        <h2 id={`${id}-title`} className="mt-3 text-3xl font-semibold sm:text-4xl">
          {title}
        </h2>
        {intro && <p className="mt-4 text-lg leading-relaxed text-muted">{intro}</p>}
      </div>
      {children}
    </section>
  );
}
