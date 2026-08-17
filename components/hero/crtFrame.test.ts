import { readFileSync } from "node:fs";
import { describe, it, expect } from "vitest";
import { CRT_FRAME, wellStyle } from "./crtFrame";

function pngSize(path: string): { width: number; height: number } {
  const buf = readFileSync(path);
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}

describe("CRT_FRAME", () => {
  it("matches the on-disk PNG so a photo swap without updating constants fails", () => {
    const file = pngSize(`public${CRT_FRAME.src}`);
    expect(CRT_FRAME.width).toBe(file.width);
    expect(CRT_FRAME.height).toBe(file.height);
  });

  it("keeps the well inside the image so the bezel can crop it", () => {
    const { well } = CRT_FRAME;
    expect(well.left).toBeGreaterThan(0);
    expect(well.top).toBeGreaterThan(0);
    expect(well.left + well.width).toBeLessThan(100);
    expect(well.top + well.height).toBeLessThan(100);
  });

  it("formats the well as CSS percentages", () => {
    expect(wellStyle()).toEqual({
      left: `${CRT_FRAME.well.left}%`,
      top: `${CRT_FRAME.well.top}%`,
      width: `${CRT_FRAME.well.width}%`,
      height: `${CRT_FRAME.well.height}%`,
    });
  });
});
