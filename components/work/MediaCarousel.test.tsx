// @vitest-environment jsdom
import { describe, it, expect, afterEach, vi } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { MediaCarousel } from "./MediaCarousel";
import { Media } from "./MediaPlaceholder";
import { CaseStudy } from "./CaseStudy";
import type { MediaRef, Project } from "@/content/types";

vi.mock("next/image", () => ({
  default: ({ alt, src, loading, priority }: { alt: string; src: string; loading?: string; priority?: boolean }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={alt} src={src} loading={loading} data-priority={priority ? "true" : "false"} />
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

  it("gives desktop screens a well a touch taller than phones", () => {
    const landscapeItems: MediaRef[] = [
      {
        src: "/images/wakefern/admin-home.png",
        alt: "Admin home",
        caption: "Admin home",
        width: 2185,
        height: 1457,
      },
    ];
    const { container } = render(
      <MediaCarousel items={landscapeItems} label="Admin dashboard and sponsor-management screens" />,
    );
    const slide = container.querySelector("figure");
    expect(slide?.getAttribute("style")).toMatch(/36rem/);
  });

  it("marks priority media as eager loading for above-the-fold images", () => {
    render(
      <Media
        media={{
          src: "/images/wakefern/moodboard-2.png",
          alt: "Moodboard 2",
          caption: "Moodboard 2",
          width: 2400,
          height: 1183,
        }}
        label="Moodboard 2"
        priority
      />,
    );

    const image = screen.getByAltText("Moodboard 2");
    expect(image.getAttribute("loading")).toBe("eager");
  });

  it("renders grouped section media as a swipeable carousel", () => {
    const project: Project = {
      slug: "wakefern-lpga",
      index: "01",
      name: "Wakefern",
      subtitle: "Designing a connected tournament experience",
      oneLiner: "A mobile and desktop platform designed for the ShopRite LPGA Classic.",
      disciplines: ["Product Design"],
      year: 2026,
      status: "approved",
      role: "UX & Product Design Intern",
      demonstrates: "I can do the job.",
      brand: { accent: "#c8102e" },
      cover: {
        src: "/images/wakefern-thumb.png",
        alt: "Wakefern cover",
        width: 1800,
        height: 1200,
      },
      gallery: [],
      featured: true,
      sections: [
        {
          kind: "system",
          heading: "Creating an initial product structure",
          body: ["User journeys and flows helped us explore how each audience might complete important tasks."],
          media: [
            {
              src: "/images/wakefern/attendee-flow.png",
              alt: "Attendee events homepage user flow",
              caption: "Attendee events homepage user flow",
              width: 1600,
              height: 1100,
              after: 0,
              scale: "tight",
            },
            {
              src: "/images/wakefern/sponsors-flow.png",
              alt: "Sponsors and players profile page user flow",
              caption: "Sponsors and players profile page user flow",
              width: 1700,
              height: 980,
              after: 0,
              scale: "tight",
            },
          ],
        },
      ],
    };

    render(<CaseStudy project={project} />);

    expect(
      screen.getByRole("region", {
        name: /Attendee events homepage user flow.*Sponsors and players profile page user flow/i,
      }),
    ).toBeDefined();
  });

  it("does not render labeled image placeholders when media is missing", () => {
    const project: Project = {
      slug: "ai-chat-research",
      index: "03",
      name: "AI + Chat Research",
      subtitle: "Human–AI interaction study",
      oneLiner: "A qualitative study.",
      disciplines: ["Research"],
      year: 2026,
      status: "research",
      role: "Lead UX Researcher",
      demonstrates: "I research how people actually experience AI.",
      brand: { accent: "#c8102e" },
      cover: { src: "", alt: "cover", width: 1800, height: 1200 },
      gallery: [],
      featured: true,
      sections: [
        {
          kind: "custom",
          heading: "What we learned",
          body: [],
          annotations: [
            {
              heading: "Understanding did not create motivation",
              body: ["The participant understood most responses."],
            },
          ],
        },
      ],
    };

    render(<CaseStudy project={project} />);

    expect(screen.queryByText("IMAGE")).toBeNull();
    expect(screen.getByRole("heading", { name: "Understanding did not create motivation" })).toBeDefined();
  });
});
