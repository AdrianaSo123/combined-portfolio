import { describe, it, expect } from "vitest";
import { about } from "./about";
import { publishedAbout } from "./published";

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
