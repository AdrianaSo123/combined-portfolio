import { describe, it, expect } from "vitest";
import { isPlaceholderHref, isPlaceholderText } from "./placeholders";

describe("placeholders", () => {
  it("treats example.com and hash as unfinished destinations", () => {
    expect(isPlaceholderHref("hello@example.com")).toBe(true);
    expect(isPlaceholderHref("#")).toBe(true);
    expect(isPlaceholderHref("https://linkedin.com/in/real")).toBe(false);
  });

  it("treats placeholder copy as unpublished", () => {
    expect(isPlaceholderText("Placeholder bio paragraph one.")).toBe(true);
    expect(isPlaceholderText("Product design")).toBe(false);
  });
});
