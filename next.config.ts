import { execSync } from "node:child_process";
import type { NextConfig } from "next";

/** Date (YYYY-MM-DD) of the last commit that touched content/, shown in the footer. */
function contentUpdated(): string {
  for (const cmd of ["git log -1 --format=%cs -- content", "git log -1 --format=%cs"]) {
    try {
      const date = execSync(cmd, { stdio: ["ignore", "pipe", "ignore"] }).toString().trim();
      if (/^\d{4}-\d{2}-\d{2}$/.test(date)) return date;
    } catch {
      // Not a git checkout; fall through.
    }
  }
  return new Date().toISOString().slice(0, 10);
}

// Headers that apply to every response. The CSP is per-request and set in proxy.ts.
const securityHeaders = [
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()",
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  env: { NEXT_PUBLIC_CONTENT_UPDATED: contentUpdated() },
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    // Keep links shared from the previous version of the site working.
    return [
      { source: "/Marayan_Resume.pdf", destination: "/gregg-marayan-resume.pdf", permanent: true },
      { source: "/about", destination: "/#about", permanent: true },
      { source: "/projects", destination: "/#work", permanent: true },
      { source: "/work", destination: "/#work", permanent: false },
      { source: "/certificates", destination: "/#certifications", permanent: true },
    ];
  },
};

export default nextConfig;
