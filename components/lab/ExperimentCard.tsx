import Link from "next/link";
import type { Experiment } from "@/content/types";
import { isExternal } from "@/lib/routes";

// Compact Lab entry (spec §10). Intentionally subordinate to Selected Work.
export function ExperimentCard({ experiment }: { experiment: Experiment }) {
  const linkEntries = Object.entries(experiment.links).filter(([, v]) => v);

  return (
    <article className="border-t border-line-ink py-6">
      <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-muted-ink">
        LAB / {experiment.index}
      </p>
      <h3 className="mt-2 font-display text-2xl text-ink">{experiment.name}</h3>
      <p className="mt-1 max-w-md text-sm text-ink/75">{experiment.blurb}</p>
      <p className="mt-3 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted-ink">
        {experiment.stack.join(" · ")}
      </p>
      {linkEntries.length > 0 && (
        <ul className="mt-3 flex flex-wrap gap-4 font-mono text-xs uppercase tracking-[0.14em]">
          {linkEntries.map(([label, href]) => {
            const url = href as string;
            const external = isExternal(url);
            return (
              <li key={label}>
                <Link
                  href={url}
                  className="text-accent-dim hover:underline"
                  {...(external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {label}
                  {external && " ↗"}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </article>
  );
}
