import { getProfile, getProject, getProjects } from "@/lib/content";
import { ogImage, ogSize } from "@/lib/og";

export const alt = "Project case study";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const project = getProject((await params).slug);
  const profile = getProfile();
  return ogImage({
    kicker: "Case study",
    title: project?.title ?? profile.name,
    footer: project ? `${project.summary}` : profile.role,
  });
}
