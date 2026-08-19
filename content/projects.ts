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
          "Without direct access to end users, we created provisional personas from the roles identified by stakeholders. We treated them as working assumptions—not validated research—to compare each audience’s goals, information needs, and access requirements.",
          "We then used a sitemap and representative user flows to organize the requested features and confirm our understanding of tournament terminology. These artifacts made our assumptions visible, allowing stakeholders to correct them as the scope developed.",
        ],
        media: [
          wakefernScreen("personas.png", "Provisional personas", {
            width: 3200,
            height: 2020,
            after: 2,
            scale: "tight",
            zoom: 1.08,
            objectPosition: "center 42%",
          }),
          wakefernScreen("sitemap.png", "Initial sitemap", {
            width: 2400,
            height: 1514,
            after: 3,
            scale: "tight",
            zoom: 1.08,
            objectPosition: "center 50%",
          }),
          wakefernScreen("attendee-flow.png", "Attendee events homepage user flow", {
            width: 1600,
            height: 1100,
            after: 3,
            scale: "tight",
            zoom: 1.12,
            objectPosition: "center 52%",
          }),
          wakefernScreen("sponsors-flow.png", "Sponsors and players profile page user flow", {
            width: 1700,
            height: 980,
            after: 3,
            scale: "tight",
            zoom: 1.1,
            objectPosition: "center 52%",
          }),
        ],
      },
      {
        kind: "custom",
        heading: "Learning from comparable experiences",
        body: [
          "Because our team was unfamiliar with golf-event applications, we reviewed comparable golf and map-based products. We studied conventions for schedules, tee times, scoreboards, player profiles, location categories, and wayfinding.",
          "These patterns gave us a baseline for user expectations while helping us determine what needed to be adapted for the ShopRite LPGA Classic.",
        ],
        media: [
          wakefernScreen("moodboard-1.png", "Moodboard 1", {
            width: 2400,
            height: 1773,
            after: 1,
            scale: "inset",
            zoom: 1.08,
            objectPosition: "center 52%",
          }),
          wakefernScreen("moodboard-2.png", "Moodboard 2", {
            width: 2400,
            height: 1183,
            after: 1,
            scale: "inset",
            zoom: 1.12,
            objectPosition: "center 38%",
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
            scale: "inset",
            zoom: 1.06,
            objectPosition: "center 45%",
          }),
        ],
      },
      {
        kind: "iteration",
        heading: "The scope evolved",
        body: [
          "Our initial structure attempted to accommodate every audience described in the requirements. As the deadline approached and stakeholder conversations clarified priorities, it became clear that we could not design equally complete experiences for every group.",
          "I narrowed the primary mobile experience to sponsors and administrators who needed to run the app before and during the event.",
          "Sponsors needed relevant event information. Administrators needed control over the system providing it.",
          "I knew from the beginning that some form of administrative functionality would be necessary. I just did not initially understand that our deliverables would include a separate desktop admin platform.",
          "Five weeks before the deadline, the expectation became clear. What I had understood as supporting functionality became a distinct platform with its own navigation, information hierarchy, and workflows. I had to define the desktop experience while continuing to revise the mobile product.",
          "To work within the remaining time, I prioritized the administrative capabilities most directly connected to the sponsor experience rather than trying to resolve every possible workflow.",
        ],
        media: [
          wakefernScreen("timeline.png", "Project timeline", {
            width: 2400,
            height: 591,
            after: 4,
            scale: "inset",
            zoom: 1.08,
            objectPosition: "center 50%",
          }),
        ],
      },
      {
        kind: "design",
        heading: "Personalize the experience instead of showing everything",
        body: [
          "A complete event schedule would contain a large amount of information, but not all of it would be relevant to every sponsor.",
          "Sponsors could have access to different events, Pro-Am activities, and hospitality experiences depending on their role or participation. Showing every event to every user would require sponsors to determine what applied to them.",
          "We used a role-aware schedule that showed the events relevant to each sponsor.",
          "Each event emphasized the information needed for an immediate decision: what is happening, when it begins, where it is located, whether it is part of my schedule, and what I should know before attending.",
          "This made me rethink the platform as more than a general repository of tournament information; it became a more personal event companion.",
        ],
      },
      {
        kind: "design",
        heading: "Design for decisions made during a live event",
        body: [
          "Because users would often check the application while moving through the event, we prioritized immediate answers over extended exploration.",
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
          "I treated the desktop platform as the system administrators used to manage the sponsor experience.",
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
        kind: "custom",
        heading: "Reflection",
        body: [
          "This project taught me that early UX artifacts do not need to remain unchanged to be valuable. Our personas, sitemap, and flows exposed assumptions that stakeholders could evaluate as the product became clearer.",
          "When the desktop requirement emerged late in the process, I learned to prioritize the relationships essential to the system rather than attempting to perfect every possible feature.",
          "With more time, I would validate the experience directly with sponsors and administrators, focusing on personalized schedules, wayfinding, and the frequent administrative tasks that would shape how the system worked during the event.",
        ],
      },
      {
        kind: "outcome",
        heading: "Outcome",
        body: [
          "The platform and its core workflows were approved for production implementation.",
          "I presented the final design directly to Wakefern executive leadership and peers at NJIT.",
          "The project earned second place in its assigned capstone judging group, while the connected implementation using our designs earned first place in a separate judging group.",
          "The proposed system connected personalized schedules, maps, tournament information, announcements, access controls, and administrative management for an event serving more than 65,000 attendees.",
        ],
      },
    ],
    featured: true,
  },
  {
    slug: "lyra",
    index: "02",
    name: "Lyra",
    headline: "Lyra",
    subtitle: "Designing AI to support thinking, not replace it",
    oneLiner:
      "An AI-supported learning assistant designed to help students work through academic problems rather than immediately receive answers.",
    disciplines: ["Product Design", "Research", "AI Interaction"],
    year: 2025,
    status: "prototype",
    role: "Product Designer",
    demonstrates: "I design AI experiences around learning, reflection, and agency.",
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
        kind: "problem",
        heading: "The problem",
        body: [
          "Students often use AI to save time, especially when balancing deadlines, coursework, and extracurriculars. While it can help them finish assignments faster, relying on it too heavily can allow students to move past material without fully understanding or retaining it.",
          "Learning often requires repetition, revisiting concepts, practicing them, and working through the reasoning more than once. When AI removes that process, students may finish the assignment without giving themselves enough time to commit the material to memory.",
          "Our initial research identified a tension between students’ confidence using AI and their reported behavior. Students appreciated receiving immediate, polished responses. This becomes a problem when getting an answer quickly makes students feel like they understand the material, even when they haven’t fully learned it.",
          "The educators we interviewed raised a related concern. When submitted work only showed a finished answer, they struggled to determine what students understood, where they were confused, and what support they needed.",
        ],
        callout:
          "How might we design an AI-supported experience that helps students think through problems instead of replacing the thinking process?",
      },
      {
        kind: "system",
        body: [
          "We combined three research methods:",
        ],
        bodyAfter: [
          "A survey with 46 student responses collected over one week.",
          "Two interviews with higher-education instructors.",
          "A literature review of seven academic and educational sources.",
        ],
        bodyAfterFormat: "list",
        bodyAfterIndex: 0,
        media: [
          {
            src: "/lyra/survey1.png",
            alt: "Lyra survey result 1 showing student reliance on AI and interest in reflective support",
            caption: "Because the project lasted six weeks, we moved from survey collection into synthesis after one week to preserve time for prototyping and testing. We used these methods since they allowed us to quickly collect data while providing enough depth.",
            width: 1600,
            height: 1100,
            after: 0,
            fit: "contain",
            scale: "inset",
            zoom: 1,
            objectPosition: "center center",
          },
          {
            src: "/lyra/survey2.png",
            alt: "Lyra survey result 2 showing patterns in student behavior and learning preferences",
            caption: "Survey 1 showed that many students relied on AI too heavily while still wanting support that encouraged reflection before answers.",
            width: 1600,
            height: 1100,
            after: 0,
            fit: "contain",
            scale: "inset",
            zoom: 1,
            objectPosition: "center center",
          },
        ],
      },
      {
        kind: "system",
        body: [
          "The survey revealed a gap between perceived understanding and reported behavior. Although most students said they usually tried to understand AI-generated answers, 16 acknowledged submitting AI-generated work they did not fully understand or explain.",
          "Around two-thirds also said they did, or possibly did, rely too heavily on AI for schoolwork. At the same time, most respondents were open to a tool that asked questions and encouraged reflection before providing assistance.",
          "Across the survey, interviews, and literature review, four themes emerged: Students prioritized speed, especially under time pressure. A polished response could create confidence without comprehension. Students wanted guidance when material became difficult. Reflection needed to feel relevant and manageable rather than like additional work.",
          "These findings helped us understand that rather than preventing students from AI, we needed to utilize it in aiding student learning. This became especially apparent as we found that students do not want to rely on generative AI and would rather complete work on their own.",
        ],
        media: [
          {
            src: "/lyra/Insights (Copy).png",
            alt: "Lyra insight card showing structured guidance in the learning flow",
            caption: "Students reported relying on AI when they were under time pressure, but many still wanted support that encouraged reflection before giving them an answer.",
            width: 1400,
            height: 1000,
            after: 2,
            fit: "contain",
            scale: "inset",
            zoom: 1,
            objectPosition: "center center",
          },
          {
            src: "/lyra/Insights (Copy)-2.png",
            alt: "Lyra secondary insight card with progression cues",
            caption: "Students often felt confident using AI, but those same students said they did not always understand or explain the material they submitted.",
            width: 1400,
            height: 1000,
            after: 2,
            fit: "contain",
            scale: "inset",
            zoom: 1,
            objectPosition: "center center",
          },
          {
            src: "/lyra/Insights (Copy)-3.png",
            alt: "Lyra tertiary insight card showing how the system framed learning progression",
            caption: "Educators described a gap between the final answer and the student’s actual understanding, which made it difficult to tell where they were getting stuck.",
            width: 1400,
            height: 1000,
            after: 2,
            fit: "contain",
            scale: "inset",
            zoom: 1,
            objectPosition: "center center",
          },
        ],
      },
      {
        kind: "custom",
        heading: "Design principles",
        body: [
          "Our research and literature review led to three principles that guided the experience and acted as the baseline for our prototype.",
          "These principles drew on learning-psychology concepts including scaffolding, self-explanation, metacognition, and cognitive-load management.",
        ],
        media: [
          {
            src: "/lyra/design principles.png",
            alt: "Lyra stakeholder design principles and critical thinking framework",
            caption: "The design principles centered reflection, scaffolding, and active reasoning rather than answer-first behavior.",
            width: 1600,
            height: 1050,
            after: 0,
            fit: "contain",
            scale: "inset",
            zoom: 1,
            objectPosition: "center center",
          },
        ],
      },
      {
        kind: "custom",
        heading: "Structuring the experience",
        body: [
          "We mapped the complete flow before moving into high-fidelity design. The challenge was providing enough structure to encourage reflection without making Lyra feel restrictive or inefficient.",
          "The proposed experience included: Onboarding that positioned Lyra as a thinking tool rather than an answer engine. Flexible preferences for how information could be presented. Different modes for approaching different subjects and tasks. Guided questions that divided problems into smaller steps. Mind maps that helped students refresh and revisit previous learning.",
          "After completing the user flow, I moved on to the wireframes. The wireframes helped me quickly imagine how the proposed experience could look without worrying about perfection.",
        ],
        media: [
          {
            src: "/lyra/stakeholder.png",
            alt: "Lyra site map showing the structure of the proposed experience",
            caption: "The site map helped us organize the proposed experience before designing screens.",
            width: 1540,
            height: 980,
            after: 0,
            fit: "contain",
            scale: "full",
            zoom: 1,
            objectPosition: "center center",
          },
          {
            src: "/lyra/wireframes.png",
            alt: "Lyra wireframes showing initial screen-level ideas",
            caption: "After completing the user flow, I moved on to the wireframes. The wireframes helped me quickly imagine how the proposed experience could look without worrying about perfection.",
            width: 1540,
            height: 980,
            after: 2,
            fit: "contain",
            scale: "full",
            zoom: 1,
            objectPosition: "center center",
          },
        ],
      },
      {
        kind: "design",
        heading: "Designing for flexible learning preferences",
        body: [
          "Lyra allowed students to select how they preferred to engage with information through learning styles. If the student did not know, they were able to take a quiz to find out.",
          "I understood that learning preferences are not fixed. A student might want a visual explanation for one concept, examples for another, or sequential instructions while completing a technical task.",
          "The purpose was not to classify students into permanent learning styles or claim that one format would always produce better outcomes. Instead, the feature gave students a voice in how they received support.",
          "This served both a functional and emotional purpose: guidance could theoretically be presented in a more useful format while signaling that different ways of processing information were valid.",
          "Personalization was not about permanently labeling students. It was about helping them feel recognized.",
        ],
        media: [
          {
            src: "/lyra/learning style.png",
            alt: "Lyra learning style selection flow",
            caption: "Students could choose the way they preferred to engage with information before starting a task.",
            width: 1600,
            height: 1100,
            after: 0,
            fit: "contain",
            scale: "inset",
            zoom: 1,
            objectPosition: "center center",
          },
          {
            src: "/lyra/quiz pic 1.png",
            alt: "Lyra quiz step one for determining a preferred learning style",
            caption: "When students were unsure, the quiz helped them identify a starting point without locking them into a fixed mode.",
            width: 1600,
            height: 1100,
            after: 0,
            fit: "contain",
            scale: "inset",
            zoom: 1,
            objectPosition: "center center",
          },
          {
            src: "/lyra/quiz 2.png",
            alt: "Lyra quiz step two for determining a preferred learning style",
            caption: "The quiz gave students a lightweight way to adjust how Lyra presented support as their needs changed.",
            width: 1600,
            height: 1100,
            after: 0,
            fit: "contain",
            scale: "inset",
            zoom: 1,
            objectPosition: "center center",
          },
        ],
      },
      {
        kind: "design",
        heading: "Supporting different ways of thinking",
        body: ["Lyra also offered four modes for approaching a task:"],
        bodyAfter: [
          "Creative: Explore ideas, possibilities, and connections.",
          "Analytical: Break information into parts and work through relationships.",
          "Reflective: Examine current understanding, uncertainty, and progress.",
          "Critical: Evaluate evidence, assumptions, and alternative interpretations.",
        ],
        bodyAfterFormat: "list",
        bodyAfterIndex: 0,
        media: [
          {
            src: "/lyra/creative mode.png",
            alt: "Lyra creative mode experience",
            caption: "Creative mode encouraged exploration and helped students generate possibilities before committing to a direction.",
            width: 1400,
            height: 1000,
            after: 0,
            fit: "contain",
            scale: "inset",
            zoom: 1,
            objectPosition: "center center",
          },
          {
            src: "/lyra/analystic mode.png",
            alt: "Lyra analytical mode experience",
            caption: "Analytical mode helped students structure reasoning, compare parts, and make sense of relationships in the material.",
            width: 1400,
            height: 1000,
            after: 0,
            fit: "contain",
            scale: "inset",
            zoom: 1,
            objectPosition: "center center",
          },
          {
            src: "/lyra/refflective1.png",
            alt: "Lyra reflective mode experience",
            caption: "Reflective mode helped students examine what they understood, where they were uncertain, and how their thinking had progressed.",
            width: 1400,
            height: 1000,
            after: 0,
            fit: "contain",
            scale: "inset",
            zoom: 1,
            objectPosition: "center center",
          },
          {
            src: "/lyra/critical1.png",
            alt: "Lyra critical mode experience",
            caption: "Critical mode helped students challenge assumptions and examine evidence more intentionally.",
            width: 1400,
            height: 1000,
            after: 0,
            fit: "contain",
            scale: "inset",
            zoom: 1,
            objectPosition: "center center",
          },
        ],
      },
      {
        kind: "design",
        body: [
          "Unlike the presentation preferences, which influenced how information could appear, the modes influenced how Lyra would guide the student’s thinking.",
          "A student could select a mode based on the subject or task and change it as their needs evolved. For example, they might use Creative mode to brainstorm an essay and Critical mode to evaluate its argument.",
        ],
      },
      {
        kind: "design",
        heading: "Guiding students through the problem",
        body: [
          "The final prototype used a conversational interface to divide complex problems into smaller, more manageable steps.",
          "Instead of immediately displaying a completed answer, Lyra focused on asking targeted questions, encouraged students to explain their reasoning, and progressively revealed guidance.",
          "Key interaction decisions included: Short prompts that focused attention on one step at a time. Supportive language that reduced anxiety around being wrong. Clear hierarchy that helped students remain oriented. Opportunities to revise or revisit earlier thinking. Optional tools that did not interrupt the main conversation.",
          "These decisions were intended to make reflection feel like part of receiving help rather than an additional task standing in the student’s way. Lyra was created to be a personal tutor rather than a critic.",
        ],
      },
      {
        kind: "custom",
        heading: "Helping students revisit what they learned",
        body: [
          "Lyra included mind maps that organized concepts from a learning session into a visual overview.",
          "Rather than requiring students to reread an entire conversation, the mind map provided a faster way to refresh what they had covered and understand how ideas connected, which was based on schema theory.",
          "Students could return to an earlier concept, review the reasoning developed during the conversation, and identify areas they wanted to explore further. This allowed Lyra to help beyond the immediate guided interaction. The goal was not only to help students move through a problem, but also to make their learning easier to revisit over time. A large part of learning is revisiting concepts and re-trying problems until they are committed to memory.",
        ],
        media: [
          {
            src: "/lyra/schema.png",
            alt: "Lyra schema map showing how ideas connect across a learning session",
            caption: "",

            width: 1400,
            height: 1000,
            after: 0,
            fit: "contain",
            scale: "inset",
            zoom: 1,
            objectPosition: "center center",
          },
          {
            src: "/lyra/Mind map 1.png",
            alt: "Lyra mind map overview of concepts learned in a session",
            caption: "Mind maps supported retrieval and review by letting students revisit the structure of the conversation in a more visual way.",
            width: 1400,
            height: 1000,
            after: 0,
            fit: "contain",
            scale: "inset",
            zoom: 1,
            objectPosition: "center center",
          },
        ],
      },
      {
        kind: "custom",
        heading: "Testing the prototype",
        body: [
          "We tested the high-fidelity prototype with five participants to evaluate its clarity, navigation, pacing, and perceived support.",
          "Due to time constraints, we were unable to make additional changes after testing, but the findings still showed that students responded well to the guided structure and clearer pacing.",
        ],
        bodyAfter: [
          "Four of five participants completed the guided flow without assistance.",
          "Participants understood the purpose of the reflective questions.",
          "Some wanted clearer transitions between stages of the conversation.",
          "Breaking content into smaller prompts made the guidance easier to process.",
        ],
        bodyAfterFormat: "list",
        bodyAfterIndex: 0,
      },
      {
        kind: "outcome",
        heading: "Outcome and reflection",
        body: [
          "Over six weeks, our team translated research about student AI use into a high-fidelity, usability-tested concept centered on reflection, personalization, and agency.",
          "The project reinforced the difference between feeling like you understand something and being able to reason through it independently. Leading the literature review also helped me translate psychological concepts into interaction decisions affecting pacing, language, hierarchy, and user control.",
          "Lyra changed how I think about AI in UX. Instead of treating AI as a feature to optimize, we treated it as an experience that needed to be carefully mediated through design.",
          "With more time, I would test Lyra with a larger group, compare it with a conventional answer-first AI experience, and investigate whether students could explain their reasoning more clearly after using it.",
          "Responsible AI design is not only about what a system can produce. It is also about the behaviors its experience encourages.",
        ],
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
