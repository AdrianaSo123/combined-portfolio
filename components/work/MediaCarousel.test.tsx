// @vitest-environment jsdom
import { describe, it, expect, afterEach, vi } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { MediaCarousel } from "./MediaCarousel";
import type { MediaRef } from "@/content/types";

vi.mock("next/image", () => ({
  default: ({ alt, src }: { alt: string; src: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={alt} src={src} />
  ),
}));

afterEach(cleanup);

const items: MediaRef[] = [
  {
    src: "/images/wakefern/sponsor-home.png",
    alt: "Sponsor home",
    caption: "Sponsor home",
    width: 833,
    height: 1600,
  },
  {
    src: "/images/wakefern/sponsor-schedule.png",
    alt: "Sponsor schedule",
    caption: "Personalized schedule",
    width: 833,
    height: 1600,
  },
];

describe("MediaCarousel", () => {
  it("renders grouped screens with swipe controls", () => {
    render(<MediaCarousel items={items} label="Sponsor home, schedule, and event details" />);
    expect(
      screen.getByRole("region", { name: "Sponsor home, schedule, and event details" }),
    ).toBeDefined();
    expect(screen.getByRole("button", { name: "Previous screen" })).toBeDefined();
    expect(screen.getByRole("button", { name: "Next screen" })).toBeDefined();
    expect(screen.getByAltText("Sponsor home")).toBeDefined();
    expect(screen.getByAltText("Sponsor schedule")).toBeDefined();
    expect(screen.getByText("Sponsor home")).toBeDefined();
  });

  it("locks each slide to the well width so the device can sit in the center", () => {
    const { container } = render(
      <MediaCarousel items={items} label="Sponsor home, schedule, and event details" />,
    );
    const slide = container.querySelector("figure");
    expect(slide?.className).toMatch(/min-w-full/);
    expect(slide?.className).toMatch(/basis-full/);
  });
});
