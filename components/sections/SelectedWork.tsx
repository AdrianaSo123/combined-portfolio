import Link from "next/link";
import { ProjectFeature } from "@/components/work/ProjectFeature";
import { SectionLabel } from "@/components/system/TechnicalRule";
import { featuredProjects } from "@/content/projects";
import { routes } from "@/lib/routes";

// Editorial list of featured case studies (alternating layout).
export function SelectedWork() {
  return (
    <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8">
      <SectionLabel index="01" label="Selected work" />
      <div className="mt-6">
        {featuredProjects.map((p, i) => (
          <ProjectFeature key={p.slug} project={p} reversed={i % 2 === 1} />
        ))}
      </div>
      <nav
        aria-label="More work"
        className="mt-4 flex flex-col gap-6 border-t border-line-ink pt-10 sm:flex-row sm:items-baseline sm:justify-between"
      >
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-ink">
          Continue
        </p>
        <ul className="flex flex-wrap gap-8 font-mono text-xs uppercase tracking-[0.18em]">
          <li>
            <Link
              href={routes.workSection}
              className="text-accent-dim underline-offset-4 hover:underline"
            >
              All projects →
            </Link>
          </li>
          <li>
            <Link
              href={routes.experiments}
              className="text-accent-dim underline-offset-4 hover:underline"
            >
              The Lab →
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
