import localFont from "next/font/local";

// Self-hosted at build time from npm packages, so builds never depend on a font CDN.
export const display = localFont({
  src: "../node_modules/@fontsource-variable/bricolage-grotesque/files/bricolage-grotesque-latin-wght-normal.woff2",
  variable: "--font-display",
  weight: "200 800",
  display: "swap",
});

export const serif = localFont({
  src: "../node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-italic.woff2",
  variable: "--font-serif",
  style: "italic",
  weight: "400",
  display: "swap",
});
