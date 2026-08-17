import { describe, it, expect } from "vitest";
import { about, HEADLINE } from "./about";
import { kbText } from "./kb";
import { publishedAbout, publishedLinks } from "./published";
import { siteConfig } from "../lib/site";

describe("publishedAbout", () => {
  it("strips placeholder bio, experience, email, and hash socials", () => {
    const published = publishedAbout(about);
    expect(published.bio).toEqual([]);
    expect(published.experience).toEqual([]);
    expect(published.education).toEqual([]);
    expect(published.contactEmail).toBeNull();
    expect(published.socials).toEqual([]);
    expect(published.location).toBeNull();
  });

  it("keeps real contact once placeholders are replaced", () => {
    const published = publishedAbout({
      ...about,
      bio: ["Real bio."],
      contactEmail: "hello@adriana.so",
      socials: [{ label: "LinkedIn", href: "https://linkedin.com/in/real" }],
    });
    expect(published.bio).toEqual(["Real bio."]);
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

describe("HEADLINE", () => {
  it("is the single positioning string for about, metadata, and KB", () => {
    expect(about.headline).toBe(HEADLINE);
    expect(siteConfig.description).toBe(HEADLINE);
    expect(kbText("about-1")).toBe(HEADLINE);
  });
});
