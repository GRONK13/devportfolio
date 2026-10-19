import { ImageResponse } from "next/og";
import { getProfile } from "@/lib/content";

const profile = getProfile();

export const alt = `${profile.name}, ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
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
          backgroundImage: "radial-gradient(800px 400px at 10% 0%, rgba(94, 234, 212, 0.18), transparent 70%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 16,
              background: "#f4f4f6",
              color: "#15161a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 30,
              fontWeight: 700,
            }}
          >
            {profile.initials}
          </div>
          <div style={{ fontSize: 28, color: "#5eead4" }}>{profile.availability}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 96, fontWeight: 700, letterSpacing: -3 }}>{profile.name}</div>
          <div style={{ fontSize: 56, color: "#a1a1aa", letterSpacing: -1 }}>{profile.role}</div>
        </div>
        <div style={{ fontSize: 26, color: "#a1a1aa" }}>{profile.location}</div>
      </div>
    ),
    size,
  );
}
