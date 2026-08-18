import { describe, it, expect } from "vitest";
import { BOOT_LINES } from "../../content/boot";
import {
  BOOT_IDLE_MS,
  bootDurationMs,
  bootFrame,
  completeBootFrame,
  formatFullLine,
  typeDuration,
} from "./bootFrame";

describe("boot copy", () => {
  it("is about Adriana's work, not a borrowed OS myth", () => {
    const text = BOOT_LINES.map(formatFullLine).join("\n").toLowerCase();
    expect(text).toContain("adriana");
    expect(text).toContain("selected work");
    expect(text).toContain("product");
    expect(text).toContain("ai");
    expect(text).not.toMatch(/neural|willbot|handshake|substrate/);
  });
});

describe("bootFrame", () => {
  it("idles on a blank cursor before the first glyph", () => {
    const start = bootFrame(0);
    expect(start.lines[0]).toBe("");
    expect(start.waiting).toBe(true);
    expect(start.typing).toBe(false);
    expect(start.complete).toBe(false);
  });

  it("types the first line after the idle beat", () => {
    const first = BOOT_LINES[0];
    if (first.kind !== "plain") throw new Error("expected a plain first line");
    const mid = bootFrame(BOOT_IDLE_MS + typeDuration(first.text) / 2);
    expect(mid.lines[0]?.length).toBeGreaterThan(0);
    expect(mid.lines[0]?.length).toBeLessThan(first.text.length);
    expect(mid.lines).toHaveLength(1);
    expect(mid.typing).toBe(true);
  });

  it("finishes with every line written", () => {
    const done = bootFrame(bootDurationMs());
    expect(done.complete).toBe(true);
    expect(done.lines).toEqual(completeBootFrame().lines);
    expect(done.typing).toBe(false);
  });
});
