import { describe, expect, it } from "vitest";
import { buildCsp, securityHeaders } from "@/lib/security-headers";

describe("security headers", () => {
  it("locks the CSP to this origin in production", () => {
    const csp = buildCsp();
    expect(csp).toContain("default-src 'self'");
    expect(csp).toContain("frame-ancestors 'none'");
    expect(csp).toContain("object-src 'none'");
    expect(csp).not.toContain("unsafe-eval");
    expect(csp).toContain("upgrade-insecure-requests");
  });

  it("only allows eval and websockets in development", () => {
    expect(buildCsp({ dev: true })).toContain("'unsafe-eval'");
    expect(buildCsp({ dev: true })).toContain("ws:");
  });

  it("starts in Report-Only and can be enforced", () => {
    const keys = (enforceCsp: boolean) => securityHeaders({ enforceCsp }).map((h) => h.key);
    expect(keys(false)).toContain("Content-Security-Policy-Report-Only");
    expect(keys(true)).toContain("Content-Security-Policy");
    expect(keys(true)).toEqual(expect.arrayContaining(["Strict-Transport-Security", "X-Frame-Options", "X-Content-Type-Options"]));
  });
});
