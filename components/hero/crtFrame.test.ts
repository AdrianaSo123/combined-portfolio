import { CRT_FRAME } from "./crtFrame";
import { describe, it, expect } from "vitest";

describe("CRT_FRAME", () => {
  it("keeps the well inside the image so the bezel can crop it", () => {
    const { well, width, height } = CRT_FRAME;
    const left = parseFloat(well.left);
    const top = parseFloat(well.top);
    const w = parseFloat(well.width);
    const h = parseFloat(well.height);
    expect(width / height).toBeCloseTo(1103 / 1022, 5);
    expect(left).toBeGreaterThan(0);
    expect(top).toBeGreaterThan(0);
    expect(left + w).toBeLessThan(100);
    expect(top + h).toBeLessThan(100);
  });
});
