import Link from "next/link";
import Image from "next/image";
import type { Experiment } from "@/content/types";
import { publishedLinks } from "@/content/published";
import { isExternal, routes } from "@/lib/routes";

const LINK_LABELS: Record<string, string> = {
  demo: "View Live System",
  github: "View Architecture",
  notes: "Notes",
};

// Compact Lab entry (spec §10). Intentionally subordinate to Selected Work.
export function ExperimentCard({ experiment }: { experiment: Experiment }) {
  const linkEntries = publishedLinks(experiment.links);
  const detailHref = routes.experiment(experiment.slug);

  return (
    <article className="border-t border-line-ink py-6">
      <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-muted-ink">
        LAB / {experiment.index}
      </p>
      <h3 className="mt-2 font-display text-2xl text-ink">{experiment.name}</h3>
      <p className="mt-1 max-w-md text-sm text-ink/75">{experiment.blurb}</p>
      {experiment.media && experiment.media.src ? (
        <Link
          href={detailHref}
          aria-label={`View ${experiment.name} details`}
          className="mt-5 block max-w-3xl overflow-hidden rounded-sm border border-line-ink/70"
        >
          <Image
            src={experiment.media.src}
            alt={experiment.media.alt}
            width={experiment.media.width}
            height={experiment.media.height}
            className="h-auto w-full object-cover"
            sizes="(max-width: 768px) 100vw, 60vw"
          />
        </Link>
      ) : null}
      <p className="mt-3 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted-ink">
        {experiment.stack.join(" · ")}
      </p>
      {experiment.keyDecision && (
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink/80">
          <span className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted-ink">
            Key Decision
          </span>{" "}
          {experiment.keyDecision}
        </p>
      )}
      {experiment.outcome && (
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink/80">
          <span className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted-ink">
            Outcome
          </span>{" "}
          {experiment.outcome}
        </p>
      )}
      {experiment.proofSystem && (
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink/80">
          <span className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted-ink">
            Proof System
          </span>{" "}
          {experiment.proofSystem}
        </p>
      )}
      {linkEntries.length > 0 && (
        <ul className="mt-3 flex flex-wrap gap-4 font-mono text-xs uppercase tracking-[0.14em]">
          {linkEntries.map(([label, href]) => {
            const external = isExternal(href);
            return (
              <li key={label}>
                <Link
                  href={href}
                  className="text-accent-dim hover:underline"
                  {...(external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {LINK_LABELS[label] ?? label}
                  {external && " ↗"}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
      <Link
        href={detailHref}
        className="mt-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-accent-dim underline-offset-4 hover:underline"
      >
        View Detail
      </Link>
    </article>
  );
}
