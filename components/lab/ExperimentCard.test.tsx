// @vitest-environment jsdom
import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { ExperimentCard } from "./ExperimentCard";
import type { Experiment } from "@/content/types";

afterEach(cleanup);

const base: Experiment = {
  slug: "ux-synthesizer",
  index: "001",
  name: "UX Synthesizer",
  blurb: "AI-assisted research synthesis with structured evidence.",
  stack: ["Next.js", "TypeScript"],
  links: { demo: "#", github: "#", notes: "#" },
};

describe("ExperimentCard", () => {
  it("does not render placeholder # links", () => {
    render(<ExperimentCard experiment={base} />);
    expect(screen.queryByRole("link")).toBeNull();
  });

  it("renders only real destinations", () => {
    render(
      <ExperimentCard
        experiment={{
          ...base,
          links: { demo: "#", github: "https://github.com/real", notes: "#" },
        }}
      />
    );
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(1);
    expect(links[0].getAttribute("href")).toBe("https://github.com/real");
  });
});
