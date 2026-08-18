import { describe, it, expect } from "vitest";
import { promptFromInput, SUGGESTIONS, menuDigitToSend } from "./copy";

describe("promptFromInput", () => {
  it("returns null for empty or whitespace", () => {
    expect(promptFromInput("")).toBeNull();
    expect(promptFromInput("   ")).toBeNull();
  });

  it("maps 1–3 to the numbered menu lines", () => {
    expect(promptFromInput("1")).toBe(SUGGESTIONS[0]);
    expect(promptFromInput(" 3 ")).toBe(SUGGESTIONS[2]);
  });

  it("passes a freeform question through trimmed", () => {
    expect(promptFromInput("  what have you shipped?  ")).toBe("what have you shipped?");
  });
});

describe("menuDigitToSend", () => {
  it("maps 1–3 when the field is empty and idle", () => {
    expect(menuDigitToSend("1", "", false)).toBe("1");
    expect(menuDigitToSend("3", "   ", false)).toBe("3");
  });

  it("ignores digits while a request is pending", () => {
    expect(menuDigitToSend("1", "", true)).toBeNull();
  });

  it("ignores digits when the field already has a question", () => {
    expect(menuDigitToSend("1", "hello", false)).toBeNull();
  });

  it("ignores keys that are not 1–3", () => {
    expect(menuDigitToSend("4", "", false)).toBeNull();
    expect(menuDigitToSend("5", "", false)).toBeNull();
    expect(menuDigitToSend("a", "", false)).toBeNull();
    expect(menuDigitToSend("Enter", "", false)).toBeNull();
  });
});
