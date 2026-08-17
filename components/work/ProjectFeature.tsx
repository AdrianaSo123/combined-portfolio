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
    <article className="group grid gap-6 border-t border-line-ink py-12 sm:py-16 lg:grid-cols-12 lg:gap-10">
      <div
        className={`lg:col-span-4 ${reversed ? "lg:order-2 lg:col-start-9" : ""}`}
      >
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-muted-ink">
          {project.index} / Selected work
        </p>
        <h3 className="mt-4 font-display text-4xl leading-none tracking-tight text-ink sm:text-5xl">
          {project.name}
        </h3>
        <p className="mt-1 font-display text-lg text-ink/70">{project.subtitle}</p>
        <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink/80">
          {project.oneLiner}
        </p>
        <p className="mt-5 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted-ink">
          {meta}
        </p>
        <Link
          href={routes.work(project.slug)}
          className="mt-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-ink underline-offset-4 hover:underline"
          style={{ color: project.brand.accent }}
        >
          View case study →
        </Link>
      </div>

      <div className={`lg:col-span-8 ${reversed ? "lg:order-1 lg:col-start-1" : ""}`}>
        <Link
          href={routes.work(project.slug)}
          aria-label={`View ${project.name} case study`}
          className="block transition-transform duration-500 will-change-transform group-hover:-translate-y-1"
        >
          <Media
            media={project.cover}
            label={`${project.index} / ${project.name}`}
            accent={project.brand.accent}
            ratio="16 / 10"
          />
        </Link>
      </div>
    </article>
  );
}
