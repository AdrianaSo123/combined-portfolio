import Link from "next/link";
import type { Project } from "@/content/types";
import { routes } from "@/lib/routes";
import { Media } from "./MediaPlaceholder";
import { MetaList } from "@/components/system/MetaList";

// Case-study page (spec §9). Storytelling-first, minimal cyber aesthetic.
export function CaseStudy({ project }: { project: Project }) {
  return (
    <article className="bg-cream text-ink">
      {/* system transition line (spec §15) */}
      <div className="mx-auto max-w-[1100px] px-5 pt-28 sm:px-8">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted-ink">
          OPENING / WORK_{project.index}
        </p>
      </div>

      {/* header */}
      <header className="mx-auto grid max-w-[1100px] gap-8 px-5 py-10 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <h1 className="font-display text-5xl leading-[0.95] tracking-tight sm:text-7xl">
            {project.name}
          </h1>
          <p className="mt-2 font-display text-xl text-ink/70 sm:text-2xl">
            {project.subtitle}
          </p>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-ink/85">
            {project.oneLiner}
          </p>
        </div>
        <div className="lg:col-span-4 lg:pt-2">
          <MetaList
            className="text-ink"
            rows={[
              { label: "Project", value: project.index },
              { label: "Role", value: project.role },
              { label: "Discipline", value: project.disciplines.join(", ") },
              { label: "Year", value: String(project.year) },
              { label: "Status", value: project.status },
            ]}
          />
        </div>
      </header>

      {/* hero media */}
      <div className="mx-auto max-w-[1100px] px-5 sm:px-8">
        <Media
          media={project.cover}
          label={project.name}
          accent={project.brand.accent}
          ratio="16 / 9"
        />
      </div>

      {/* metrics */}
      {project.metrics && project.metrics.length > 0 && (
        <div className="mx-auto mt-12 grid max-w-[1100px] gap-6 px-5 sm:grid-cols-3 sm:px-8">
          {project.metrics.map((m) => (
            <div key={m.label} className="border-t border-line-ink pt-3">
              <p className="font-display text-3xl" style={{ color: project.brand.accent }}>
                {m.value}
              </p>
              <p className="mt-1 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted-ink">
                {m.label}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* narrative sections */}
      <div className="mx-auto max-w-[760px] px-5 py-16 sm:px-8">
        {project.sections.map((s, i) => (
          <section key={i} className="mb-14">
            {s.heading && (
              <h2 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-muted-ink">
                <span style={{ color: project.brand.accent }}>
                  {String(i + 1).padStart(2, "0")}
                </span>{" "}
                / {s.heading}
              </h2>
            )}
            <div className="space-y-4 text-lg leading-relaxed text-ink/90">
              {s.body.map((p, j) => (
                <p key={j}>{p}</p>
              ))}
            </div>
            {s.media?.map((m, k) => (
              <div key={k} className="mt-6">
                <Media media={m} label={project.name} accent={project.brand.accent} />
              </div>
            ))}
          </section>
        ))}
      </div>

      {/* footer nav */}
      <div className="mx-auto max-w-[1100px] border-t border-line-ink px-5 py-10 sm:px-8">
        <Link
          href={routes.workSection}
          className="font-mono text-xs uppercase tracking-[0.18em] text-ink hover:underline"
        >
          ← All selected work
        </Link>
      </div>
    </article>
  );
}
