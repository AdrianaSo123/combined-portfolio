import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SectionLabel } from "@/components/system/TechnicalRule";
import { experimentParams, getExperiment } from "@/content/experiments";
import { publishedLinks } from "@/content/published";
import { isExternal, routes } from "@/lib/routes";

export function generateStaticParams() {
  return experimentParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const experiment = getExperiment(slug);
  if (!experiment) return {};

  return {
    title: `${experiment.name} - Lab`,
    description: experiment.blurb,
  };
}

export default async function ExperimentDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const experiment = getExperiment(slug);
  if (!experiment) notFound();

  const links = publishedLinks(experiment.links);

  return (
    <section className="min-h-[100svh] bg-cream text-ink">
      <div className="mx-auto max-w-[1100px] px-5 pt-32 pb-20 sm:px-8">
        <SectionLabel index={experiment.index} label="Lab" />
        <h1 className="mt-6 font-display text-5xl tracking-tight sm:text-6xl">
          {experiment.name}
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-ink/80">{experiment.blurb}</p>

        {experiment.media ? (
          <figure className="mt-8 overflow-hidden rounded-sm border border-line-ink/70">
            <Image
              src={experiment.media.src}
              alt={experiment.media.alt}
              width={experiment.media.width}
              height={experiment.media.height}
              className="h-auto w-full object-cover"
              sizes="(max-width: 768px) 100vw, 80vw"
              priority
            />
          </figure>
        ) : null}

        <p className="mt-8 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-muted-ink">
          {experiment.stack.join(" · ")}
        </p>

        {experiment.keyDecision ? (
          <div className="mt-7 max-w-3xl">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted-ink">Key Decision</p>
            <p className="mt-2 text-sm leading-relaxed text-ink/85">{experiment.keyDecision}</p>
          </div>
        ) : null}

        {experiment.outcome ? (
          <div className="mt-6 max-w-3xl">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted-ink">Outcome</p>
            <p className="mt-2 text-sm leading-relaxed text-ink/85">{experiment.outcome}</p>
          </div>
        ) : null}

        {experiment.proofSystem ? (
          <div className="mt-6 max-w-3xl">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted-ink">Proof System</p>
            <p className="mt-2 text-sm leading-relaxed text-ink/85">{experiment.proofSystem}</p>
          </div>
        ) : null}

        {experiment.diagram ? (
          <figure className="mt-10 overflow-hidden rounded-sm border border-line-ink/70">
            <Image
              src={experiment.diagram.src}
              alt={experiment.diagram.alt}
              width={experiment.diagram.width}
              height={experiment.diagram.height}
              className="h-auto w-full object-cover"
              sizes="(max-width: 768px) 100vw, 80vw"
            />
          </figure>
        ) : null}

        <div className="mt-10 flex flex-wrap gap-5 font-mono text-xs uppercase tracking-[0.16em]">
          {links.map(([label, href]) => {
            const external = isExternal(href);
            const copy = label === "demo" ? "View Live System" : label === "github" ? "View Architecture" : label;
            return (
              <Link
                key={`${label}-${href}`}
                href={href}
                className="text-accent-dim underline-offset-4 hover:underline"
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {copy}
                {external ? " ↗" : ""}
              </Link>
            );
          })}
          <Link
            href={routes.experiments}
            className="text-muted-ink underline-offset-4 hover:underline"
          >
            Back to Lab
          </Link>
        </div>
      </div>
    </section>
  );
}
