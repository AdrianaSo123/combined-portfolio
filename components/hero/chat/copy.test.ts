import { describe, it, expect } from "vitest";
import { promptFromInput, SUGGESTIONS } from "./copy";

describe("promptFromInput", () => {
  it("returns null for empty or whitespace", () => {
    expect(promptFromInput("")).toBeNull();
    expect(promptFromInput("   ")).toBeNull();
  });

  it("maps 1–4 to the numbered menu lines", () => {
    expect(promptFromInput("1")).toBe(SUGGESTIONS[0]);
    expect(promptFromInput(" 4 ")).toBe(SUGGESTIONS[3]);
  });

  it("passes a freeform question through trimmed", () => {
    expect(promptFromInput("  what have you shipped?  ")).toBe("what have you shipped?");
  });
});
