import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

/** Shared two-tone Open Graph card: mono-style kicker, big title, footer line. */
export function ogImage({ kicker, title, footer }: { kicker: string; title: string; footer: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#0e0e0c",
          color: "#f2efe8",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 26, letterSpacing: 2, textTransform: "uppercase", color: "#8a877f" }}>
          <div style={{ width: 14, height: 14, borderRadius: 7, background: "#ff5b1f" }} />
          {kicker}
        </div>
        <div style={{ display: "flex", fontSize: title.length > 18 ? 96 : 136, fontWeight: 700, letterSpacing: -4, lineHeight: 0.95 }}>{title}</div>
        <div style={{ display: "flex", fontSize: 28, color: "#8a877f", borderTop: "1px solid #3a3935", paddingTop: 24 }}>{footer}</div>
      </div>
    ),
    ogSize,
  );
}
