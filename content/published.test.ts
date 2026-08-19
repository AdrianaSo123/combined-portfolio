import { describe, it, expect } from "vitest";
import { about, HEADLINE, HERO_LINES } from "./about";
import { kbText } from "./kb";
import { publishedAbout, publishedLinks, publishedProject } from "./published";
import { featuredProjects, getProject } from "./projects";
import { siteConfig } from "../lib/site";

describe("publishedAbout", () => {
  it("strips placeholder bio, experience, and email", () => {
    const published = publishedAbout(about);
    expect(published.bio).toEqual([]);
    expect(published.snapshot).toEqual([]);
    expect(published.origin).toEqual([]);
    expect(published.philosophy).toEqual([]);
    expect(published.prior).toEqual([]);
    expect(published.community).toEqual([]);
    expect(published.offline).toEqual([]);
    expect(published.experience.map((e) => e.org)).toEqual([
      "Skyscraper Games",
      "Wakefern Food Corp",
      "Social Interaction Lab",
    ]);
    expect(published.education).toEqual([]);
    expect(published.contactEmail).toBeNull();
    expect(published.socials).toEqual([
      { label: "LinkedIn", href: "https://www.linkedin.com/in/adriana-so-24071219b" },
      { label: "GitHub", href: "https://github.com/AdrianaSo123" },
    ]);
    expect(published.location).toBeNull();
  });

  it("keeps real contact once placeholders are replaced", () => {
    const published = publishedAbout({
      ...about,
      bio: ["Real bio."],
      snapshot: ["Born somewhere. Studying something."],
      origin: ["I started in UX, then built systems."],
      philosophy: [{ hook: "Research first.", body: ["Designs need a reason."] }],
      contactEmail: "hello@adriana.so",
      socials: [{ label: "LinkedIn", href: "https://linkedin.com/in/real" }],
    });
    expect(published.bio).toEqual(["Real bio."]);
    expect(published.snapshot).toEqual(["Born somewhere. Studying something."]);
    expect(published.origin).toEqual(["I started in UX, then built systems."]);
    expect(published.philosophy).toEqual([
      { hook: "Research first.", body: ["Designs need a reason."] },
    ]);
    expect(published.contactEmail).toBe("hello@adriana.so");
    expect(published.socials).toEqual([
      { label: "LinkedIn", href: "https://linkedin.com/in/real" },
    ]);
  });
});

describe("publishedLinks", () => {
  it("drops hash and empty experiment hrefs", () => {
    expect(
      publishedLinks({ demo: "#", github: "https://github.com/real", notes: "" })
    ).toEqual([["github", "https://github.com/real"]]);
  });
});

describe("publishedProject", () => {
  it("strips placeholder case-study copy", () => {
    const lyra = getProject("lyra");
    expect(lyra).toBeDefined();
    const published = publishedProject(lyra!);
    expect(published.subtitle).toBe("");
    expect(published.oneLiner).toBe("");
    expect(published.sections).toEqual([]);
  });

  it("keeps real Wakefern narrative", () => {
    const wakefern = getProject("wakefern-lpga");
    expect(wakefern).toBeDefined();
    const published = publishedProject(wakefern!);
    expect(published.status).toBe("approved");
    expect(published.sections.length).toBeGreaterThan(5);
    expect(published.sections.some((s) => s.heading === "Reflection")).toBe(true);
  });

  it("includes Wakefern process artifacts", () => {
    const wakefern = getProject("wakefern-lpga");
    expect(wakefern).toBeDefined();
    const srcs = wakefern!.sections.flatMap((s) => s.media?.map((m) => m.src) ?? []);
    expect(srcs).toEqual(
      expect.arrayContaining([
        "/images/wakefern/personas.png",
        "/images/wakefern/sitemap.png",
        "/images/wakefern/wireframes.jpg",
        "/images/wakefern/moodboard-1.png",
        "/images/wakefern/moodboard-2.png",
        "/images/wakefern/timeline.png",
      ]),
    );
  });
});

describe("featuredProjects", () => {
  it("includes all featured case studies", () => {
    expect(featuredProjects.map((p) => p.slug)).toEqual([
      "wakefern-lpga",
      "lyra",
      "ai-chat-research",
    ]);
  });
});

describe("HEADLINE", () => {
  it("is the single positioning string for about, metadata, and KB", () => {
    expect(about.headline).toBe(HEADLINE);
    expect(siteConfig.description).toBe(HEADLINE);
    expect(kbText("about-1")).toBe(HEADLINE);
  });

  it("stacks the same positioning as separate hero lines", () => {
    expect(HERO_LINES.join(" ")).toBe(HEADLINE);
  });
});

describe("Wakefern status language", () => {
  it("never calls Wakefern a live product", () => {
    expect(kbText("wakefern-1")).toMatch(/approved for production/i);
    expect(kbText("wakefern-1")).not.toMatch(/live product/i);
    expect(kbText("process-1")).not.toMatch(/live product/i);
  });
});
