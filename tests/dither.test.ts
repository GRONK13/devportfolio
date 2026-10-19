import { describe, expect, it } from "vitest";
import { atkinson } from "@/lib/dither";

const fill = (value: number, n = 64) => new Float32Array(n).fill(value);
const share = (bits: Uint8Array) => bits.reduce((a, b) => a + b, 0) / bits.length;

describe("atkinson", () => {
  it("keeps pure black and white solid", () => {
    expect(share(atkinson(fill(0), 8, 8))).toBe(0);
    expect(share(atkinson(fill(255), 8, 8))).toBe(1);
  });

  it("turns mid grey into a mix of ink and paper", () => {
    const s = share(atkinson(fill(128, 32 * 32), 32, 32));
    expect(s).toBeGreaterThan(0.3);
    expect(s).toBeLessThan(0.7);
  });

  it("returns one bit per pixel", () => {
    expect(atkinson(fill(200, 12), 4, 3)).toHaveLength(12);
  });
});
