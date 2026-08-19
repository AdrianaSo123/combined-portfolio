import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SectionLabel } from "@/components/system/TechnicalRule";
import { experimentParams, getExperiment } from "@/content/experiments";
import { publishedLinks } from "@/content/published";
import { isExternal, routes } from "@/lib/routes";
import { experimentLinkLabel } from "@/lib/experiment-links";

function DetailBlock({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-line-ink/70 pt-5 sm:pt-6">
      <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted-ink">
        {heading}
      </p>
      <div className="mt-3 text-sm leading-relaxed text-ink/85">{children}</div>
    </section>
  );
}

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
        <Link
          href={routes.experiments}
          className="mt-4 inline-flex min-h-10 items-center gap-2 py-1 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-accent-dim underline-offset-4 hover:underline"
        >
          ← Back to Lab
        </Link>
        <h1 className="mt-6 font-display text-5xl tracking-tight sm:text-6xl">
          {experiment.name}
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-ink/80 sm:text-[1.03rem]">{experiment.blurb}</p>

        <div className="mt-6 flex flex-col gap-2 font-mono text-xs uppercase tracking-[0.16em] sm:flex-row sm:flex-wrap sm:gap-5">
          <Link
            href={routes.experiments}
            className="inline-flex min-h-10 items-center py-1 text-muted-ink underline-offset-4 hover:underline"
          >
            Back to Lab
          </Link>
          {links.map(([label, href]) => {
            const external = isExternal(href);
            return (
              <Link
                key={`${label}-${href}`}
                href={href}
                className="inline-flex min-h-10 items-center py-1 text-accent-dim underline-offset-4 hover:underline"
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {experimentLinkLabel(label)}
                {external ? " ↗" : ""}
                {external ? <span className="sr-only"> (opens in new tab)</span> : null}
              </Link>
            );
          })}
        </div>

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
            {experiment.media.caption ? (
              <figcaption className="border-t border-line-ink/60 px-4 py-3 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted-ink">
                {experiment.media.caption}
              </figcaption>
            ) : null}
          </figure>
        ) : null}

        <div className="mt-8 grid gap-6 sm:mt-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <DetailBlock heading="Stack">
              <p>{experiment.stack.join(" · ")}</p>
            </DetailBlock>
          </div>
          {experiment.keyDecision ? (
            <div className="lg:col-span-7">
              <DetailBlock heading="Key Decision">
                <p>{experiment.keyDecision}</p>
              </DetailBlock>
            </div>
          ) : null}
          {experiment.outcome ? (
            <div className="lg:col-span-6">
              <DetailBlock heading="Outcome">
                <p>{experiment.outcome}</p>
              </DetailBlock>
            </div>
          ) : null}
          {experiment.proofSystem ? (
            <div className="lg:col-span-6">
              <DetailBlock heading="Proof System">
                <p>{experiment.proofSystem}</p>
              </DetailBlock>
            </div>
          ) : null}
          {experiment.highlights && experiment.highlights.length > 0 ? (
            <div className="lg:col-span-12">
              <DetailBlock heading={experiment.highlightsHeading ?? "Platform"}>
                <ul className="space-y-3">
                  {experiment.highlights.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span aria-hidden="true">●</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </DetailBlock>
            </div>
          ) : null}
        </div>

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
            {experiment.diagram.caption ? (
              <figcaption className="border-t border-line-ink/60 px-4 py-3 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted-ink">
                {experiment.diagram.caption}
              </figcaption>
            ) : null}
          </figure>
        ) : null}
      </div>
    </section>
  );
}
