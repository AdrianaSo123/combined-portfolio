import Link from "next/link";
import Image from "next/image";
import type { Experiment } from "@/content/types";
import { publishedLinks } from "@/content/published";
import { isExternal, routes } from "@/lib/routes";
import { experimentLinkLabel } from "@/lib/experiment-links";

// Compact Lab entry (spec §10). Intentionally subordinate to Selected Work.
export function ExperimentCard({
  experiment,
  reversed = false,
}: {
  experiment: Experiment;
  reversed?: boolean;
}) {
  const linkEntries = publishedLinks(experiment.links);
  const detailHref = routes.experiment(experiment.slug);

  return (
    <article className="grid items-center gap-6 border-t border-line-ink py-10 sm:py-12 lg:grid-cols-12 lg:gap-10">
      <div
        className={`lg:col-span-5 ${reversed ? "lg:order-2 lg:col-start-8" : ""}`}
      >
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-muted-ink">
          LAB / {experiment.index}
        </p>
        <h3 className="mt-2 font-display text-3xl leading-none tracking-tight text-ink sm:text-4xl">
          {experiment.name}
        </h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-ink/75">{experiment.blurb}</p>
        <p className="mt-5 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted-ink">
          {experiment.stack.join(" · ")}
        </p>
        <div className="mt-6 flex flex-nowrap items-center gap-5 overflow-x-auto font-mono text-xs uppercase tracking-[0.16em] whitespace-nowrap">
          <Link
            href={detailHref}
            className="inline-flex min-h-10 items-center py-1 text-accent-dim underline-offset-4 hover:underline"
          >
            View Detail
          </Link>
          {linkEntries.map(([label, href]) => {
            const external = isExternal(href);
            return (
              <Link
                key={label}
                href={href}
                className="inline-flex min-h-10 items-center py-1 text-accent-dim underline-offset-4 hover:underline"
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {experimentLinkLabel(label)}
                {external && " ↗"}
                {external && <span className="sr-only"> (opens in new tab)</span>}
              </Link>
            );
          })}
        </div>
      </div>

      <div className={`lg:col-span-6 ${reversed ? "lg:order-1 lg:col-start-1" : "lg:col-start-7"}`}>
        {experiment.media && experiment.media.src ? (
          <Link
            href={detailHref}
            aria-label={`View ${experiment.name} details`}
            className="block max-w-xl lg:max-w-none overflow-hidden rounded-sm border border-line-ink/70"
          >
            <Image
              src={experiment.media.src}
              alt={experiment.media.alt}
              width={experiment.media.width}
              height={experiment.media.height}
              className="h-auto w-full object-cover"
              sizes="(max-width: 768px) 100vw, 42vw"
            />
          </Link>
        ) : (
          <div className="flex aspect-[3/2] w-full max-w-xl items-center justify-center bg-cream-deep font-mono text-[0.7rem] uppercase tracking-[0.2em] text-muted-ink lg:max-w-none">
            Image pending
          </div>
        )}
      </div>
    </article>
  );
}
