import Link from "next/link";
import { CrtScreen } from "@/components/hero/CrtScreen";
import { ProjectFeature } from "@/components/work/ProjectFeature";
import { ExperimentCard } from "@/components/lab/ExperimentCard";
import { SectionLabel } from "@/components/system/TechnicalRule";
import { featuredProjects } from "@/content/projects";
import { experiments } from "@/content/experiments";
import { about } from "@/content/about";
import { routes } from "@/lib/routes";

export default function Home() {
  return (
    <>
      {/* ============ HERO (near-black cybercore) ============ */}
      <section className="relative min-h-[100svh] overflow-hidden bg-bg pb-24 pt-28">
        {/* faint grid / coordinate backdrop */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(var(--color-fg) 1px, transparent 1px), linear-gradient(90deg, var(--color-fg) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        <div className="relative mx-auto grid max-w-[1400px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-accent">
              [ 00 / Adriana So ]
            </p>
            <h1 className="mt-5 font-display text-4xl leading-[1.02] tracking-tight sm:text-5xl">
              Designer &amp; builder across{" "}
              <span className="text-accent">product</span>,{" "}
              <span className="text-accent">AI</span>, and{" "}
              <span className="text-accent">human-computer interaction</span>.
            </h1>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted">
              Product experience designer working with emerging technology —
              researching interactions and building intelligent systems.
            </p>
            <div className="mt-8 flex gap-4 font-mono text-xs uppercase tracking-[0.16em]">
              <Link href={routes.workSection} className="text-fg underline-offset-4 hover:underline">
                Selected work ↓
              </Link>
              <Link href={routes.about} className="text-muted hover:text-fg">
                About →
              </Link>
            </div>
          </div>

          <div className="lg:col-span-8">
            <CrtScreen />
          </div>
        </div>
      </section>

      {/* ============ WORK (cream lower half) ============ */}
      <section id="work" className="bg-cream text-ink">
        <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8">
          <SectionLabel index="01" label="Selected work" className="text-ink" />
          <div className="mt-6">
            {featuredProjects.map((p, i) => (
              <ProjectFeature key={p.slug} project={p} reversed={i % 2 === 1} />
            ))}
          </div>
        </div>

        {/* Lab teaser */}
        <div className="mx-auto max-w-[1400px] px-5 pb-20 sm:px-8">
          <SectionLabel index="02" label="Lab / experiments" className="text-ink" />
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

        {/* About teaser */}
        <div className="mx-auto max-w-[1400px] border-t border-line-ink px-5 py-20 sm:px-8">
          <SectionLabel index="03" label="About" className="text-ink" />
          <div className="mt-6 grid gap-8 lg:grid-cols-12">
            <p className="font-display text-2xl leading-snug text-ink lg:col-span-8 lg:text-3xl">
              {about.headline}
            </p>
            <div className="lg:col-span-4 lg:pt-2">
              <Link
                href={routes.about}
                className="font-mono text-xs uppercase tracking-[0.18em] text-accent-dim hover:underline"
              >
                Read more →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
