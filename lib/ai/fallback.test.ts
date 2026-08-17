import { describe, it, expect } from "vitest";
import { SUGGESTIONS } from "../../components/hero/chat/copy";
import { scriptedAnswer } from "./fallback";

describe("scriptedAnswer", () => {
  it("routes 'What have you shipped?' to the Wakefern project", () => {
    const result = scriptedAnswer("What have you shipped?");
    expect(result.citations).toContain("wakefern-1");
    expect(result.suggestedDestinations[0]?.href).toBe("/work/wakefern-lpga");
    expect(result.fallback).toBe(true);
  });

  it("routes 'product design work' to the multi-project overview, not 'shipped'", () => {
    // Regression for the ordering bug: bare `work` must not shadow the
    // more-specific product-design intent.
    const result = scriptedAnswer("show me your product design work");
    expect(result.citations).toEqual(["wakefern-1", "lyra-1", "ai-research-1"]);
    expect(result.suggestedDestinations).toHaveLength(3);
  });

  it("routes AI/research questions to the research project", () => {
    const result = scriptedAnswer("what are you researching about AI?");
    expect(result.citations).toEqual(["ai-research-1"]);
    expect(result.suggestedDestinations[0]?.href).toBe("/work/ai-chat-research");
  });

  it("routes technical questions to the Lab", () => {
    const result = scriptedAnswer("show me something technical");
    expect(result.citations).toEqual(["lab-1"]);
    expect(result.suggestedDestinations[0]?.href).toBe("/experiments");
  });

  it("routes about/contact questions to the About page", () => {
    const result = scriptedAnswer("who are you and how do I contact you?");
    expect(result.citations).toEqual(["about-1"]);
    expect(result.suggestedDestinations[0]?.href).toBe("/about");
  });

  it("returns the grounded unknown answer with top destinations when nothing matches", () => {
    const result = scriptedAnswer("what's your favorite pizza topping?");
    expect(result.answer).toMatch(/don't have anything about that/i);
    expect(result.citations).toEqual([]);
    expect(result.suggestedDestinations.map((d) => d.href)).toEqual([
      "/#work",
      "/experiments",
      "/about",
    ]);
  });

  it("maps each SUGGESTIONS line to the expected KB citations", () => {
    const expected = [
      ["wakefern-1"],
      ["wakefern-1", "lyra-1", "ai-research-1"],
      ["ai-research-1"],
      ["lab-1"],
    ];
    expect(SUGGESTIONS).toHaveLength(expected.length);
    SUGGESTIONS.forEach((prompt, i) => {
      expect(scriptedAnswer(prompt).citations).toEqual(expected[i]);
    });
  });

  it("never fabricates: every returned destination href is internal", () => {
    const probes = ["shipped", "ai", "lab", "about", "nonsense"];
    for (const probe of probes) {
      for (const dest of scriptedAnswer(probe).suggestedDestinations) {
        expect(dest.href.startsWith("/")).toBe(true);
      }
    }
  });
});
