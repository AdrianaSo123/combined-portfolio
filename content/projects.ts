import type { MediaRef, Project } from "./types";
import { BRAND } from "@/lib/theme";

const WAKEFERN_PHONE = { width: 833, height: 1600 };

function wakefernScreen(
  file: string,
  caption: string,
  size: {
    width: number;
    height: number;
    after?: number;
    scale?: MediaRef["scale"];
  } = WAKEFERN_PHONE,
): MediaRef {
  return {
    src: `/images/wakefern/${file}`,
    alt: `${caption} — ShopRite LPGA Classic`,
    caption,
    width: size.width,
    height: size.height,
    after: size.after,
    scale: size.scale,
  };
}

export const projects: Project[] = [
  {
    slug: "wakefern-lpga",
    index: "01",
    name: "Wakefern",
    headline: "Designing a connected tournament experience",
    client: "Wakefern · ShopRite LPGA Classic",
    subtitle: "Designing a connected tournament experience",
    oneLiner:
      "A mobile and desktop platform designed to centralize personalized schedules, tournament information, wayfinding, communications, and administrative needs for the ShopRite LPGA Classic.",
    disciplines: ["Product Design", "Systems"],
    year: 2026,
    timeline: "February–May 2026",
    status: "approved",
    role: "UX & Product Design Intern",
    demonstrates: "I can do the job.",
    brand: { accent: "#c8102e" },
    cover: {
      src: "/images/wakefern-thumb.png",
      alt: "Wakefern / ShopRite LPGA Classic — project cover",
      width: 1800,
      height: 1200,
    },
    gallery: [],
    metrics: [
      { label: "Event scale", value: "65,000+" },
      { label: "Connected experiences", value: "2" },
      { label: "Platforms", value: "iOS · Android · Desktop" },
    ],
    contributions: [
      "Product definition",
      "Information architecture",
      "User flows",
      "Competitive research",
      "Interface design",
      "Prototyping",
      "Cross-functional collaboration",
    ],
    sections: [
      {
        kind: "problem",
        heading: "The challenge",
        body: [
          "The ShopRite LPGA Classic brings together sponsors, participants, staff, volunteers, players, and thousands of attendees. Supporting the event requires coordinating schedules, hospitality experiences, maps, communications, player information, and access across multiple groups.",
          "Much of this information previously existed across emails, spreadsheets, PDFs, and other disconnected sources. Wakefern wanted to bring it together in a more cohesive digital experience.",
          "The project began with a conversation with executive leadership and a requirements packet containing features and information they believed would be valuable during the event.",
          "The packet gave us a starting point, but it did not yet define how the features should fit together. The proposed platform included several audiences, unfamiliar golf terminology, and workflows that were still being clarified.",
        ],
        callout:
          "How might we turn evolving requirements for multiple audiences into a focused, connected tournament experience?",
      },
      {
        kind: "final",
        heading: "The solution",
        body: [
          "We designed two connected experiences: a mobile application supporting sponsors to navigate the tournament and a desktop platform allowing administrators control over the information behind it.",
        ],
        annotations: [
          {
            heading: "A personalized sponsor experience",
            body: [
              "Sponsors could access relevant schedules, hospitality information, event details, announcements, and tournament content in one place.",
            ],
            mediaLabel: "Sponsor home, personalized schedule, and event details",
            media: [
              wakefernScreen("sponsor-home.png", "Sponsor home"),
              wakefernScreen("sponsor-schedule.png", "Personalized schedule"),
              wakefernScreen("event-details.png", "Event details"),
            ],
          },
          {
            heading: "Tournament information and wayfinding",
            body: [
              "Maps, tee times, scoreboards, player profiles, news, and announcements helped users find important information throughout the event.",
            ],
            mediaLabel: "Interactive map and tournament information screens",
            media: [
              wakefernScreen("map.png", "Map"),
              wakefernScreen("map-down.png", "Map filters"),
              wakefernScreen("tee-times.png", "Tee times"),
              wakefernScreen("scoreboard.png", "Scoreboard"),
            ],
          },
          {
            heading: "Administrative control",
            body: [
              "A desktop experience allowed staff to manage sponsors, accounts, access, announcements, schedules, and platform content.",
            ],
            mediaLabel: "Admin dashboard and sponsor-management screens",
            media: [
              wakefernScreen("admin-home.png", "Admin home", { width: 2185, height: 1457 }),
              wakefernScreen("sponsor-management.png", "Sponsor management", {
                width: 2200,
                height: 1398,
              }),
            ],
          },
        ],
      },
      {
        kind: "system",
        heading: "Creating an initial product structure",
        body: [
          "Because my team and I did not initially have direct access to end users, I developed provisional personas based on the roles identified by executive stakeholders.",
          "I treated these personas as working assumptions rather than validated user research. They helped us compare the potential goals and information needs of sponsors, participants, volunteers, event staff, administrators, and general attendees.",
          "We used them to consider what information each role needed, which tasks would be time-sensitive, what content should be shared or personalized, which users required different levels of access, and who would maintain the information behind the experience.",
          "We also created a sitemap to organize the requested features and confirm our understanding of tournament terminology with stakeholders. User journeys and flows helped us explore how each audience might complete important tasks.",
          "These artifacts were useful because they made our assumptions visible. As we continued speaking with stakeholders, several of those assumptions changed.",
        ],
        media: [
          wakefernScreen("personas.png", "Provisional personas", {
            width: 3200,
            height: 2020,
            after: 2,
            scale: "tight",
          }),
          wakefernScreen("sitemap.png", "Initial sitemap", {
            width: 2400,
            height: 1514,
            after: 3,
            scale: "tight",
          }),
        ],
      },
      {
        kind: "custom",
        heading: "Learning from comparable experiences",
        body: [
          "Our team did not begin with extensive knowledge of golf-event applications, so we reviewed comparable products to understand established conventions.",
          "I examined how golf applications organized schedules, tee times, scoreboards, player profiles, and event updates. I also studied map-based applications to understand patterns for markers, location categories, wayfinding, and location details. Additionally, I studied previous ShopRite apps to ensure our designs matched the company’s previous branding and felt like a seamless part of the ShopRite ecosystem.",
        ],
        media: [
          wakefernScreen("moodboard-1.png", "Moodboard 1", {
            width: 2400,
            height: 1773,
            after: 1,
            scale: "tight",
          }),
          wakefernScreen("moodboard-2.png", "Moodboard 2", {
            width: 2400,
            height: 1183,
            after: 1,
            scale: "tight",
          }),
        ],
        bodyAfter: [
          "This research helped me understand industry-familiar design patterns while identifying what needed to be adapted for the ShopRite LPGA Classic.",
        ],
      },
      {
        kind: "design",
        heading: "Exploring directions through wireframes",
        body: [
          "From the competitive analysis, I began wireframing the experience around the features that would matter most during the event.",
          "My team and I each produced a set of wireframes so we could compare different interpretations of the same product. We reviewed them together and selected the directions closest to the vision: a focused companion for the tournament rather than a dense catalog of information.",
          "Those wireframes became a shared starting point. They helped us align on structure before committing to higher-fidelity screens, and they made it easier to decide what to keep, combine, or leave out as the requirements continued to change.",
        ],
        media: [
          wakefernScreen("wireframes.jpg", "Early wireframes", {
            width: 3200,
            height: 2056,
          }),
        ],
      },
      {
        kind: "iteration",
        heading: "The scope evolved",
        body: [
          "Our initial structure attempted to accommodate every audience described in the requirements. As the deadline approached and stakeholder conversations clarified priorities, it became clear that we could not design equally complete experiences for every group.",
          "We narrowed the primary mobile experience to sponsors and administrators who needed to run the app before and during the event.",
          "Sponsors needed relevant event information. Administrators needed control over the system providing it.",
          "We knew from the beginning that some form of administrative functionality would be necessary. However, we did not initially understand that our deliverables would include a separate desktop admin platform.",
          "Five weeks before the deadline, the expectation became clear. What we had understood as supporting functionality became a distinct platform with its own navigation, information hierarchy, and workflows. We now had to define the desktop experience while continuing to revise the mobile product.",
          "To work within the remaining time, we prioritized the administrative capabilities most directly connected to the sponsor experience rather than attempting to resolve every possible workflow.",
        ],
        media: [
          wakefernScreen("timeline.png", "Project timeline", {
            width: 2400,
            height: 591,
            after: 4,
            scale: "inset",
          }),
        ],
      },
      {
        kind: "design",
        heading: "Personalize the experience instead of showing everything",
        body: [
          "A complete event schedule would contain a large amount of information, but not all of it would be relevant to every sponsor.",
          "Sponsors could have access to different events, Pro-Am activities, and hospitality experiences depending on their role or participation. Showing every event to every user would require sponsors to determine what applied to them.",
          "We prioritized a role-aware schedule that surfaced the events relevant to each sponsor.",
          "Each event emphasized the information needed for an immediate decision: what is happening, when it begins, where it is located, whether it is part of my schedule, and what I should know before attending.",
          "This changed the platform from a general repository of tournament information into a more personal event companion.",
        ],
      },
      {
        kind: "design",
        heading: "Design for decisions made during a live event",
        body: [
          "Users might check the application while moving between locations or responding to a schedule change. They needed to find answers quickly rather than carefully exploring a large content library.",
          "We grouped tournament information into predictable categories, including tee times, scoreboards, player profiles, news and announcements, and maps. Timing, location, and status were prioritized over secondary details.",
          "The map supported wayfinding to entrances, parking areas, hospitality spaces, sponsor tents, and other event destinations. As the event spanned two golf courses and a physical building, it was essential for sponsors to find information easily. Location details connected the physical destination with relevant event information.",
        ],
        callout:
          "The goal was not simply to display information. It was to help users answer immediate questions: where do I need to go, when do I need to be there, and what has changed?",
      },
      {
        kind: "design",
        heading: "Connect every sponsor feature to administrative control",
        body: [
          "Personalization on the mobile side created complexity on the administrative side.",
          "If sponsors received different schedules, administrators needed to manage those schedules and their associated access. If event information changed, staff needed a way to update it. If an announcement was time-sensitive, administrators needed to publish it without relying on engineering for routine changes.",
          "We treated the desktop platform as the system administrators used to manage the sponsor experience.",
        ],
        pairing: {
          left: "Sponsor experience",
          right: "Admin experience",
          rows: [
            {
              left: "Personalized schedule",
              right: "Sponsor and event management",
            },
            {
              left: "Role-specific information",
              right: "Account and access controls",
            },
            {
              left: "Current event details",
              right: "Centralized content updates",
            },
            {
              left: "Timely communications",
              right: "Announcement publishing",
            },
            {
              left: "Sponsor information",
              right: "Sponsor record management",
            },
          ],
        },
        bodyAfter: [
          "The admin home provided access to high-priority operational areas, while focused sections supported sponsor, account, announcement, and content management.",
          "This connection helped me prioritize the desktop experience within the compressed timeline. Instead of designing every possible administrative feature, we focused on the controls required to make the sponsor experience function.",
        ],
      },
      {
        kind: "iteration",
        heading: "Designing through continued change",
        body: [
          "The design process was not a linear progression from research to final screens. Requirements continued to evolve as stakeholders clarified the product and engineers evaluated implementation needs.",
          "Each change reduced the time available for exploring alternatives and refining completed work. Designs were continuously discussed with stakeholders and engineers rather than treated as a final handoff.",
        ],
      },
      {
        kind: "outcome",
        heading: "Outcome",
        bodyFormat: "list",
        body: [
          "By the end of the internship, the platform and its core workflows were approved for production implementation.",
          "I presented the design work directly to executive leadership and peers at NJIT.",
          "The proposed system connected sponsor schedules, maps, tournament information, announcements, access, and administrative management.",
        ],
      },
      {
        kind: "custom",
        heading: "Reflection",
        body: [
          "This project taught me that product design does not always begin with a stable problem or follow a clean, linear process.",
          "Our early personas, sitemap, and user flows changed as we learned more, but that did not make them unsuccessful. Their value was in making our assumptions visible and giving stakeholders something concrete to evaluate.",
          "When the separate desktop requirement became clear late in the project, I learned to focus on the features needed to make the mobile and desktop experiences work together instead of attempting to perfect every possible feature. It was more important to design the essential features well than to rush through everything and sacrifice quality.",
          "With more time, I would test the platform directly with sponsors and administrators, focusing on personalized schedules, event wayfinding, and high-frequency administrative tasks.",
        ],
        callout:
          "My biggest takeaway: good product design is not only about designing useful interfaces. It is about making thoughtful design decisions even when the requirements aren’t solidified.",
      },
    ],
    featured: true,
  },
  {
    slug: "lyra",
    index: "02",
    name: "Lyra",
    subtitle: "Placeholder subtitle",
    oneLiner:
      "Placeholder: a project establishing range in interaction design and emerging technology, distinct from Wakefern.",
    disciplines: ["Interaction Design", "Emerging Tech"],
    year: 2025,
    status: "prototype",
    role: "Product Design",
    demonstrates: "I have range.",
    brand: { accent: "#5b8def" },
    cover: {
      src: "/images/lyra.png",
      alt: "Lyra — project cover",
      width: 1800,
      height: 1200,
    },
    gallery: [],
    sections: [
      {
        kind: "context",
        heading: "Context",
        body: ["Placeholder context for Lyra."],
      },
      {
        kind: "design",
        heading: "Design",
        body: ["Placeholder design narrative for Lyra."],
      },
      {
        kind: "outcome",
        heading: "Outcome",
        body: ["Placeholder outcome for Lyra."],
      },
    ],
    featured: true,
  },
  {
    slug: "ai-chat-research",
    index: "03",
    name: "AI + Chat Research",
    subtitle: "Human–AI interaction study",
    oneLiner:
      "Research into conversational AI and human-AI interaction patterns, and what they imply for AI product design.",
    disciplines: ["Research", "AI Interaction"],
    year: 2026,
    status: "research",
    role: "Design Research",
    demonstrates: "This is where I'm going.",
    brand: { accent: BRAND.accent },
    cover: {
      src: "/images/ai-chat-research.png",
      alt: "AI + Chat Research — project cover",
      width: 1800,
      height: 1200,
    },
    gallery: [],
    sections: [
      {
        kind: "context",
        heading: "Research question",
        body: ["Placeholder: the guiding research question."],
      },
      {
        kind: "system",
        heading: "Methodology",
        body: ["Placeholder: how the research was conducted."],
      },
      {
        kind: "custom",
        heading: "Observations",
        body: ["Placeholder: interaction patterns and evidence observed."],
      },
      {
        kind: "outcome",
        heading: "Implications",
        body: ["Placeholder: synthesis and implications for AI product design."],
      },
    ],
    featured: true,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

// Static params for the /work/[slug] route and its OG image (one owner).
export function projectParams(): { slug: string }[] {
  return projects.map((p) => ({ slug: p.slug }));
}
