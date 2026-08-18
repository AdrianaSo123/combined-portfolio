import type { Metadata } from "next";
import { AboutView } from "@/components/about/AboutView";
import { HEADLINE, about } from "@/content/about";
import { publishedAbout } from "@/content/published";

export const metadata: Metadata = {
  title: "About",
  description: HEADLINE,
};

export default function AboutPage() {
  return <AboutView published={publishedAbout(about)} />;
}
