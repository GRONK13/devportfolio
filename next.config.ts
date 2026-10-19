import { withContentCollections } from "@content-collections/next";
import type { NextConfig } from "next";
import { securityHeaders } from "./lib/security-headers";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    // Local images only: no remotePatterns and no SVG through the optimizer (smaller attack surface).
    formats: ["image/avif", "image/webp"],
    dangerouslyAllowSVG: false,
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders({ dev: process.env.NODE_ENV === "development" }) }];
  },
};

// withContentCollections must be the outermost plugin.
export default withContentCollections(nextConfig);
