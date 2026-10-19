import { withContentCollections } from "@content-collections/next";
import { withBotId } from "botid/next/config";
import type { NextConfig } from "next";
import { securityHeaders } from "./lib/security-headers";

// Fixed path segment botid@1.5.x proxies its challenge through (see node_modules/botid/dist/next/config).
// Re-check it when upgrading botid.
const BOTID_PATH_PREFIX = "149e9513-01fa-4fb0-aad4-566afd725d1b";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    // Local images only: no remotePatterns and no SVG through the optimizer (smaller attack surface).
    formats: ["image/avif", "image/webp"],
    dangerouslyAllowSVG: false,
  },
  async headers() {
    // Everything except BotID's proxied challenge path, which withBotId gives its own framing
    // headers (it must be frameable by this origin; our X-Frame-Options: DENY would conflict).
    return [
      {
        source: `/((?!${BOTID_PATH_PREFIX}/).*)`,
        headers: securityHeaders({ dev: process.env.NODE_ENV === "development" }),
      },
    ];
  },
};

// withContentCollections must be the outermost plugin. withBotId proxies BotID's challenge
// script through this origin, so the CSP can stay same-origin.
export default withContentCollections(withBotId(nextConfig));
