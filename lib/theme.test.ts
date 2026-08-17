import { describe, it, expect } from "vitest";
import { BRAND, BRAND_RGB, rgba } from "./theme";

describe("BRAND", () => {
  it("derives RGB from the hex so rgba() cannot drift from the token", () => {
    const n = BRAND.accent.replace("#", "");
    const expected = [
      parseInt(n.slice(0, 2), 16),
      parseInt(n.slice(2, 4), 16),
      parseInt(n.slice(4, 6), 16),
    ].join(", ");
    expect(BRAND_RGB.accent).toBe(expected);
    expect(rgba(BRAND_RGB.accent, 0.16)).toBe(`rgba(${expected}, 0.16)`);
  });
});
