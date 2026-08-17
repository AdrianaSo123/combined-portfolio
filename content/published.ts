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

export function publishedAbout(about: About) {
  return {
    headline: about.headline,
    bio: about.bio.filter((p) => !isPlaceholderText(p)),
    location:
      about.location && !isPlaceholderText(about.location) ? about.location : null,
    focus: about.focus,
    skills: about.skills,
    experience: about.experience.filter(
      (e) => !isPlaceholderText(e.org) && !isPlaceholderText(e.summary)
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
