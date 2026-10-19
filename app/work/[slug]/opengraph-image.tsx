import { ImageResponse } from "next/og";
import { getProfile, getProject, getProjects } from "@/lib/content";

export const alt = "Project case study";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export default async function ProjectOgImage({ params }: { params: Promise<{ slug: string }> }) {
  const project = getProject((await params).slug);
  const profile = getProfile();
  const title = project?.title ?? profile.name;
  const color = project?.color ?? "#2dd4bf";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#14161c",
          color: "#f4f4f6",
          backgroundImage: `radial-gradient(900px 500px at 10% 0%, ${color}55, transparent 70%)`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 26, color: "#a1a1aa" }}>
          <div style={{ width: 14, height: 14, borderRadius: 999, background: color }} />
          Case study
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 92, fontWeight: 700, letterSpacing: -3, lineHeight: 1 }}>{title}</div>
          {project && <div style={{ fontSize: 34, color: "#c4c4cc", maxWidth: 950 }}>{project.summary}</div>}
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#a1a1aa" }}>{`${profile.name} · ${profile.role}`}</div>
      </div>
    ),
    size,
  );
}
