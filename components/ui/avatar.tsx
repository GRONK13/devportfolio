import Image from "next/image";
import type { Profile } from "@/lib/content";
import { cn } from "@/lib/utils";

/** The profile photo when one is set in content/profile.md, otherwise a monogram. */
export function Avatar({ profile, className, priority }: { profile: Profile; className?: string; priority?: boolean }) {
  if (profile.photo) {
    return (
      <Image
        src={profile.photo.src}
        width={profile.photo.width}
        height={profile.photo.height}
        alt={profile.photo.alt}
        priority={priority}
        sizes="160px"
        className={cn("aspect-square rounded-2xl object-cover", className)}
      />
    );
  }
  return (
    <div
      role="img"
      aria-label={profile.name}
      className={cn(
        "grid aspect-square place-items-center rounded-2xl bg-[conic-gradient(from_210deg,var(--accent),var(--accent-2),var(--accent))] font-display text-2xl font-bold text-accent-fg",
        className,
      )}
    >
      <span className="drop-shadow-sm">{profile.initials}</span>
    </div>
  );
}
