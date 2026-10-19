import type { Profile } from "@/lib/content";

const dot = { open: "bg-accent-fill", limited: "bg-muted", closed: "border border-muted" } as const;

/** Status dot plus label, e.g. "● Available for remote work". */
export function Availability({ availability }: { availability: Profile["availability"] }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span aria-hidden="true" className={`size-2 rounded-full ${dot[availability.status]}`} />
      {availability.label}
    </span>
  );
}
