import { describe, it, expect } from "vitest";
import { SUGGESTIONS } from "../../components/hero/chat/copy";
import { scriptedAnswer } from "./fallback";

describe("scriptedAnswer", () => {
  it("routes about questions to the About page", () => {
    const result = scriptedAnswer("Who is Adriana?");
    expect(result.citations).toEqual(["about-1"]);
    expect(result.suggestedDestinations[0]?.href).toBe("/about");
    expect(result.fallback).toBe(true);
  });

  it("routes project questions to selected work", () => {
    const result = scriptedAnswer("What are the projects?");
    expect(result.citations).toEqual(["wakefern-1", "lyra-1", "ai-research-1"]);
    expect(result.answer).toMatch(/approved for production/i);
    expect(result.answer).not.toMatch(/live product/i);
    expect(result.suggestedDestinations).toHaveLength(3);
    expect(result.suggestedDestinations.map((d) => d.href)).toEqual([
      "/work/wakefern-lpga",
      "/work/lyra",
      "/work/ai-chat-research",
    ]);
  });

  it("routes process questions to how the work is done", () => {
    const result = scriptedAnswer("How does Adriana work?");
    expect(result.citations).toEqual(["process-1"]);
    expect(result.suggestedDestinations.map((d) => d.href)).toEqual([
      "/#work",
      "/about",
    ]);
  });

  it("still routes a freeform AI question to the research project", () => {
    const result = scriptedAnswer("what's the AI research?");
    expect(result.citations).toEqual(["ai-research-1"]);
    expect(result.suggestedDestinations[0]?.href).toBe("/work/ai-chat-research");
  });

  it("still routes a freeform lab question to the Lab", () => {
    const result = scriptedAnswer("what's in the lab?");
    expect(result.citations).toEqual(["lab-1"]);
    expect(result.suggestedDestinations[0]?.href).toBe("/experiments");
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
    const expected = [["about-1"], ["wakefern-1", "lyra-1", "ai-research-1"], ["process-1"]];
    expect(SUGGESTIONS).toHaveLength(expected.length);
    SUGGESTIONS.forEach((prompt, i) => {
      expect(scriptedAnswer(prompt).citations).toEqual(expected[i]);
    });
  });

  it("never fabricates: every returned destination href is internal", () => {
    const probes = ["about", "projects", "process", "ai", "lab", "nonsense"];
    for (const probe of probes) {
      for (const dest of scriptedAnswer(probe).suggestedDestinations) {
        expect(dest.href.startsWith("/")).toBe(true);
      }
    }
  });
});
