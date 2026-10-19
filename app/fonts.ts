import localFont from "next/font/local";

/**
 * Self-hosted (font-src 'self'), preloaded, with size-adjusted fallbacks so text doesn't shift
 * when the font arrives. Mona Sans carries weight (200–900) and width (75–125%) axes; the width
 * axis drives the display type.
 */
export const monaSans = localFont({
  src: "../node_modules/@fontsource-variable/mona-sans/files/mona-sans-latin-standard-normal.woff2",
  weight: "200 900",
  style: "normal",
  declarations: [{ prop: "font-stretch", value: "75% 125%" }],
  variable: "--font-mona",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

export const geistMono = localFont({
  src: "../node_modules/@fontsource-variable/geist-mono/files/geist-mono-latin-wght-normal.woff2",
  weight: "100 900",
  style: "normal",
  variable: "--font-geist-mono",
  display: "swap",
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
});
