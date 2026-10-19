import type { ReactNode } from "react";
import { pad } from "@/lib/format";

/**
 * A home-page section: a hairline rule, a mono index label and an h2. The rule and label
 * replace cards as the page's structure.
 */
export function Section({
  id,
  index,
  title,
  aside,
  children,
}: {
  id: string;
  index: number;
  title: string;
  aside?: ReactNode;
  children: ReactNode;
}) {
  const headingId = `${id}-heading`;
  return (
    <section id={id} aria-labelledby={headingId} className="frame py-20 md:py-28">
      <div className="grid-12 rule-top items-baseline pt-4">
        <p className="label col-span-1 text-muted md:col-span-2" aria-hidden="true">
          ({pad(index)})
        </p>
        <h2 id={headingId} className="col-span-3 text-2xl font-semibold tracking-tight md:col-span-7 md:text-3xl">
          {title}
        </h2>
        {aside && <div className="label col-span-4 mt-2 text-muted md:col-span-3 md:mt-0 md:text-right">{aside}</div>}
      </div>
      <div className="mt-10 md:mt-14">{children}</div>
    </section>
  );
}
