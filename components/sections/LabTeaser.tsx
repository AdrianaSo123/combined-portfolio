import Link from "next/link";
import { ExperimentCard } from "@/components/lab/ExperimentCard";
import { SectionLabel } from "@/components/system/TechnicalRule";
import { experiments } from "@/content/experiments";
import { routes } from "@/lib/routes";

// Teaser for the Lab: subordinate to Selected Work, links through to the full
// Lab page.
export function LabTeaser() {
  return (
    <div className="mx-auto max-w-[1400px] px-5 pb-20 sm:px-8">
      <SectionLabel index="02" label="Lab" className="text-ink" />
      <div className="mt-6 grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="max-w-xs text-sm leading-relaxed text-ink/75">
            Smaller technical projects, prototypes, and tools — evidence that
            the practice includes building.
          </p>
          <Link
            href={routes.experiments}
            className="mt-4 inline-block font-mono text-xs uppercase tracking-[0.18em] text-accent-dim hover:underline"
          >
            Enter the lab →
          </Link>
        </div>
        <div className="lg:col-span-8">
          {experiments.map((e) => (
            <ExperimentCard key={e.slug} experiment={e} />
          ))}
        </div>
      </div>
    </div>
  );
}
