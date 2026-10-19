import { describe, expect, it } from "vitest";
import { buildCsp } from "@/lib/csp";

describe("buildCsp", () => {
  it("locks scripts to the nonce in production", () => {
    const csp = buildCsp("abc123");
    expect(csp).toContain("script-src 'self' 'nonce-abc123' 'strict-dynamic'");
    expect(csp).not.toContain("unsafe-eval");
    expect(csp).toContain("frame-ancestors 'none'");
    expect(csp).toContain("object-src 'none'");
    expect(csp).toContain("upgrade-insecure-requests");
  });

  it("allows eval only in development", () => {
    expect(buildCsp("n", { dev: true })).toContain("'unsafe-eval'");
  });
});
