import type { Metadata } from "next";
import { ExperimentCard } from "@/components/lab/ExperimentCard";
import { SectionLabel } from "@/components/system/TechnicalRule";
import { experiments } from "@/content/experiments";

export const metadata: Metadata = {
  title: "Lab",
  description:
    "Smaller technical projects, prototypes, and tools by Adriana So.",
};

export default function ExperimentsPage() {
  return (
    <section className="min-h-[100svh] bg-cream text-ink">
      <div className="mx-auto max-w-[1100px] px-5 pt-32 pb-20 sm:px-8">
        <SectionLabel label="Lab" />
        <h1 className="mt-6 font-display text-5xl tracking-tight sm:text-6xl">
          The Lab
        </h1>
        <p className="mt-4 max-w-md text-base leading-relaxed text-ink/75">
          Technical experiments, prototypes, and tools. Smaller than the
          selected case studies — evidence that the practice includes building.
        </p>
        <div className="mt-10">
          {experiments.map((e) => (
            <ExperimentCard key={e.slug} experiment={e} />
          ))}
        </div>
      </div>
    </section>
  );
}
