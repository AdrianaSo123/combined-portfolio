import Link from "next/link";
import type { Project } from "@/content/types";
import { routes } from "@/lib/routes";
import { Media } from "./MediaPlaceholder";

// Editorial homepage project block (spec §8) — not a SaaS card.
export function ProjectFeature({
  project,
  reversed = false,
}: {
  project: Project;
  reversed?: boolean;
}) {
  const meta = `${project.disciplines.join(" · ")} · ${project.year}`;

  return (
    <article className="grid items-center gap-6 border-t border-line-ink py-10 sm:py-12 lg:grid-cols-12 lg:gap-10">
      <div
        className={`${project.cover?.src ? "lg:col-span-5" : "lg:col-span-8"} ${reversed && project.cover?.src ? "lg:order-2 lg:col-start-8" : ""}`}
      >
        <h3 className="font-display text-3xl leading-none tracking-tight text-ink sm:text-4xl">
          {project.name}
        </h3>
        {project.subtitle ? (
          <p className="mt-1 font-display text-base text-ink/70">{project.subtitle}</p>
        ) : null}
        {project.oneLiner ? (
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink/80">
            {project.oneLiner}
          </p>
        ) : null}
        <p className="mt-5 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted-ink">
          {meta}
        </p>
        <Link
          href={routes.work(project.slug)}
          className="mt-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-[color:var(--color-accent-dim)] underline-offset-4 hover:underline"
        >
          View case study →
        </Link>
      </div>

      {project.cover?.src ? (
        <div className={`lg:col-span-6 ${reversed ? "lg:order-1 lg:col-start-1" : "lg:col-start-7"}`}>
          <Link
            href={routes.work(project.slug)}
            aria-label={`View ${project.name} case study`}
            className="block max-w-xl lg:max-w-none"
          >
            <Media
              media={project.cover}
              label={project.name}
              accent={project.brand.accent}
              ratio="3 / 2"
              sizes="(max-width: 768px) 100vw, 42vw"
            />
          </Link>
        </div>
      ) : null}
    </article>
  );
}
