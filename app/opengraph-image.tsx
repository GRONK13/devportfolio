import { getProfile } from "@/lib/content";
import { ogImage, ogSize } from "@/lib/og";

export const alt = "Gregg Marayan, full-stack developer";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  const profile = getProfile();
  return ogImage({ kicker: profile.availability.label, title: profile.name, footer: `${profile.role} · ${profile.location}` });
}
