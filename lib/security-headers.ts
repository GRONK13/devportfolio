/**
 * Response headers for every route. Pages stay static (no per-request nonce), so the CSP is a
 * fixed header; see docs/redesign-plan.md, "Security checklist" for the reasoning.
 */

export function buildCsp({ dev = false, enforced = false } = {}): string {
  const directives: Record<string, string[]> = {
    "default-src": ["'self'"],
    // Next.js inlines its bootstrap scripts; 'unsafe-inline' stays until experimental.sri is adopted.
    "script-src": ["'self'", "'unsafe-inline'", ...(dev ? ["'unsafe-eval'"] : [])],
    // next/image and animation libraries set inline style attributes.
    "style-src": ["'self'", "'unsafe-inline'"],
    "img-src": ["'self'", "data:", "blob:"],
    "font-src": ["'self'"],
    "connect-src": ["'self'", ...(dev ? ["ws:"] : [])],
    "worker-src": ["'self'", "blob:"],
    "manifest-src": ["'self'"],
    "object-src": ["'none'"],
    "base-uri": ["'self'"],
    "form-action": ["'self'"],
    "frame-ancestors": ["'none'"],
  };
  const policy = Object.entries(directives).map(([name, values]) => `${name} ${values.join(" ")}`);
  // Browsers ignore (and log an error for) upgrade-insecure-requests in a Report-Only policy.
  if (!dev && enforced) policy.push("upgrade-insecure-requests");
  return policy.join("; ");
}

export function securityHeaders({ dev = false, enforceCsp = false } = {}): { key: string; value: string }[] {
  return [
    // Ship Report-Only first; flip enforceCsp once the browser console shows no violations.
    { key: enforceCsp ? "Content-Security-Policy" : "Content-Security-Policy-Report-Only", value: buildCsp({ dev, enforced: enforceCsp }) },
    { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
    { key: "X-Frame-Options", value: "DENY" },
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    {
      key: "Permissions-Policy",
      value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=(), interest-cohort=()",
    },
    { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  ];
}
