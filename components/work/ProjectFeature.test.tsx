// @vitest-environment jsdom
import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { ProjectFeature } from "./ProjectFeature";
import type { Project } from "@/content/types";

afterEach(cleanup);

const project: Project = {
  slug: "wakefern-lpga",
  index: "01",
  name: "Wakefern",
  subtitle: "ShopRite LPGA Classic",
  oneLiner: "A digital platform unifying event workflows.",
  disciplines: ["Product Design", "Systems"],
  year: 2026,
  status: "shipped",
  role: "Product Design",
  demonstrates: "I can do the job.",
  brand: { accent: "#c8102e" },
  cover: { src: "", alt: "cover", width: 1600, height: 1000 },
  gallery: [],
  sections: [],
  featured: true,
};

describe("ProjectFeature", () => {
  it("renders schema fields and links to the case study", () => {
    render(<ProjectFeature project={project} />);
    expect(screen.getByRole("heading", { name: "Wakefern" })).toBeDefined();
    expect(screen.getByText("ShopRite LPGA Classic")).toBeDefined();
    expect(screen.getByText(/Product Design · Systems · 2026/)).toBeDefined();
    const links = screen
      .getAllByRole("link")
      .map((a) => a.getAttribute("href"));
    expect(links).toContain("/work/wakefern-lpga");
  });
});
