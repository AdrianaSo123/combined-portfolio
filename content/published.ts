import type { About, Experiment } from "./types";
import { isPlaceholderHref, isPlaceholderText } from "../lib/placeholders";

// One owner for "what is safe to show." Call sites should not re-filter
// placeholder email, # socials, or "Placeholder" résumé copy.
export function publishedLinks(links: Experiment["links"]): [string, string][] {
  return Object.entries(links).filter(
    (entry): entry is [string, string] =>
      typeof entry[1] === "string" && !isPlaceholderHref(entry[1])
  );
}

function liveParagraphs(paragraphs: string[]): string[] {
  return paragraphs.filter((p) => p.trim() !== "" && !isPlaceholderText(p));
}

export function publishedAbout(about: About) {
  return {
    headline: about.headline,
    greeting: about.greeting,
    portrait:
      about.portrait && !isPlaceholderHref(about.portrait.src) ? about.portrait : null,
    bio: liveParagraphs(about.bio),
    snapshot: liveParagraphs(about.snapshot),
    origin: liveParagraphs(about.origin),
    philosophy: about.philosophy
      .map((p) => ({
        hook: p.hook.trim(),
        body: liveParagraphs(p.body),
      }))
      .filter((p) => p.hook !== "" && !isPlaceholderText(p.hook)),
    prior: liveParagraphs(about.prior),
    community: liveParagraphs(about.community),
    offline: liveParagraphs(about.offline),
    location:
      about.location && !isPlaceholderText(about.location) ? about.location : null,
    focus: about.focus,
    skills: about.skills,
    experience: about.experience.filter(
      (e) => !isPlaceholderText(e.org) && !isPlaceholderText(e.role)
    ),
    education: (about.education ?? []).filter(
      (ed) => !isPlaceholderText(ed.credential) && !isPlaceholderText(ed.org)
    ),
    socials: about.socials.filter(
      (s) => !isPlaceholderHref(s.href) && !isPlaceholderText(s.label)
    ),
    resumeUrl:
      about.resumeUrl && !isPlaceholderHref(about.resumeUrl) ? about.resumeUrl : null,
    contactEmail: isPlaceholderHref(about.contactEmail) ? null : about.contactEmail,
  };
}
