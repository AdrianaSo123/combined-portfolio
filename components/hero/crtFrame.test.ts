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

  it("keeps the well inside the image", () => {
    const { well } = CRT_FRAME;
    expect(well.left).toBeGreaterThan(0);
    expect(well.top).toBeGreaterThan(0);
    expect(well.left + well.width).toBeLessThan(100);
    expect(well.top + well.height).toBeLessThan(100);
  });

  it("covers the photographed glass opening, not an inset box inside it", () => {
    const { well } = CRT_FRAME;
    expect(well.left).toBeLessThan(11);
    expect(well.top).toBeLessThan(14);
    expect(well.left + well.width).toBeGreaterThan(90);
    expect(well.top + well.height).toBeGreaterThan(73);
  });

  it("formats the well as a rounded rectangle on the image box", () => {
    expect(wellStyle()).toEqual({
      left: `${CRT_FRAME.well.left}%`,
      top: `${CRT_FRAME.well.top}%`,
      width: `${CRT_FRAME.well.width}%`,
      height: `${CRT_FRAME.well.height}%`,
      borderRadius: `${CRT_FRAME.wellRadius.x} / ${CRT_FRAME.wellRadius.y}`,
    });
  });
});
