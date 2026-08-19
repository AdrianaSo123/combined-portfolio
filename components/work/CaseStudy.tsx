import type { ReactNode } from "react";
import Link from "next/link";
import {
  STATUS_LABEL,
  type CaseStudyAnnotation,
  type CaseStudySection,
  type MediaRef,
  type Project,
} from "@/content/types";
import { routes } from "@/lib/routes";
import { Media } from "./MediaPlaceholder";
import { MediaCarousel } from "./MediaCarousel";
import { MetaList } from "@/components/system/MetaList";
import { PairingTable } from "./PairingTable";

// Centered reading measure. Lines stay left-aligned; the column is what centers.
function Reading({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[72ch] ${className}`}>{children}</div>
  );
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function Prose({
  paragraphs,
  asList = false,
}: {
  paragraphs: string[];
  asList?: boolean;
}) {
  if (paragraphs.length === 0) return null;
  if (asList) {
    return (
      <ul className="list-disc space-y-3 pl-5 text-lg leading-relaxed text-ink/90 marker:text-ink/50">
        {paragraphs.map((p) => (
          <li key={p} className="pl-1">
            {p}
          </li>
        ))}
      </ul>
    );
  }
  return (
    <div className="space-y-4 text-lg leading-relaxed text-ink/90">
      {paragraphs.map((p) => (
        <p key={p}>{p}</p>
      ))}
    </div>
  );
}

function AnnotationMedia({
  annotation,
  accent,
  well,
}: {
  annotation: CaseStudyAnnotation;
  accent: string;
  well: "phone" | "desktop";
}) {
  const label = annotation.mediaLabel ?? annotation.heading;
  const shots = annotation.media ?? [];
  const sizes =
    well === "desktop"
      ? "(max-width: 1024px) 100vw, 66vw"
      : "(max-width: 1024px) 100vw, 58vw";

  if (shots.length > 1) {
    return <MediaCarousel items={shots} label={label} sizes={sizes} well={well} />;
  }

  const shot = shots[0];
  const landscape = shot ? shot.width >= shot.height : false;

  return (
    <Media
      media={shot}
      label={label}
      accent={accent}
      ratio={landscape ? "16 / 10" : "4 / 5"}
      fit={shot ? (shot.fit ?? "contain") : "cover"}
      sizes={sizes}
    />
  );
}

function AnnotationCopy({ annotation }: { annotation: CaseStudyAnnotation }) {
  return (
    <>
      <h3 className="font-display text-2xl leading-snug tracking-tight text-ink sm:text-3xl">
        {annotation.heading}
      </h3>
      <div className="mt-4 space-y-3 text-base leading-relaxed text-ink/80">
        {annotation.body.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
    </>
  );
}

function AnnotationRow({
  annotation,
  reversed,
  accent,
}: {
  annotation: CaseStudyAnnotation;
  reversed: boolean;
  accent: string;
}) {
  const landscape =
    (annotation.media?.[0]?.width ?? 0) >= (annotation.media?.[0]?.height ?? 1);

  if (landscape) {
    return (
      <div className="grid min-w-0 items-center gap-8 lg:grid-cols-12 lg:gap-10">
        <div className="min-w-0 lg:col-span-8">
          <AnnotationMedia annotation={annotation} accent={accent} well="desktop" />
        </div>
        <div className="lg:col-span-4">
          <AnnotationCopy annotation={annotation} />
        </div>
      </div>
    );
  }

  return (
    <div className="grid min-w-0 items-center gap-8 lg:grid-cols-12 lg:gap-12">
      <div className={`min-w-0 lg:col-span-7 ${reversed ? "lg:order-2" : ""}`}>
        <AnnotationMedia annotation={annotation} accent={accent} well="phone" />
      </div>
      <div className={`lg:col-span-5 ${reversed ? "lg:order-1" : ""}`}>
        <AnnotationCopy annotation={annotation} />
      </div>
    </div>
  );
}

function mediaScaleClass(scale?: MediaRef["scale"]) {
  if (scale === "tight") return "mx-auto w-full max-w-[48rem]";
  if (scale === "inset") return "mx-auto w-full max-w-[64rem]";
  return "w-full";
}

function mediaSizes(scale?: MediaRef["scale"]) {
  if (scale === "tight") return "(max-width: 768px) 100vw, 48rem";
  if (scale === "inset") return "(max-width: 1024px) 100vw, 64rem";
  return "(max-width: 1100px) 100vw, 1100px";
}

type BodyBlock =
  | { kind: "prose"; paragraphs: string[] }
  | { kind: "media"; items: MediaRef[] };

function interleaveBodyMedia(section: CaseStudySection): BodyBlock[] {
  const blocks: BodyBlock[] = [];
  const media = section.media ?? [];
  let prose: string[] = [];

  const flush = () => {
    if (prose.length === 0) return;
    blocks.push({ kind: "prose", paragraphs: prose });
    prose = [];
  };

  section.body.forEach((p, i) => {
    prose.push(p);
    const inserts = media.filter((m) => m.after === i);
    if (inserts.length > 0) {
      flush();
      blocks.push({ kind: "media", items: inserts });
    }
  });
  flush();

  const trailing = media.filter((m) => m.after === undefined);
  if (trailing.length > 0) {
    blocks.push({ kind: "media", items: trailing });
  }
  return blocks;
}

function SectionHeading({ index, heading }: { index: number; heading: string }) {
  return (
    <h2 className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-muted-ink">
      <span className="text-[color:var(--color-accent-dim)]">{pad(index)}</span> / {heading}
    </h2>
  );
}

function SectionFigure({
  media,
  accent,
  fallbackLabel,
}: {
  media: MediaRef[];
  accent: string;
  fallbackLabel: string;
}) {
  if (media.length === 1) {
    const item = media[0];
    return (
      <figure className={`mt-8 ${mediaScaleClass(item.scale)}`}>
        <Media
          media={item}
          label={item.caption ?? fallbackLabel}
          accent={accent}
          ratio={`${item.width} / ${item.height}`}
          fit={item.fit ?? "cover"}
          sizes={mediaSizes(item.scale)}
        />
        {item.caption ? (
          <figcaption className="mt-3 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted-ink">
            {item.caption}
          </figcaption>
        ) : null}
      </figure>
    );
  }

  const label = media.map((item) => item.caption ?? item.alt).join(", ");
  const sizes = mediaSizes(media[0]?.scale);
  const well = media[0]?.width >= media[0]?.height ? "desktop" : "phone";

  return (
    <figure className={`mt-8 ${mediaScaleClass(media[0]?.scale)}`}>
      <MediaCarousel items={media} label={label} sizes={sizes} well={well} />
    </figure>
  );
}

function NarrativeSection({
  section,
  index,
  project,
}: {
  section: CaseStudySection;
  index: number;
  project: Project;
}) {
  const blocks = interleaveBodyMedia(section);
  const lastProseIndex = blocks.reduce(
    (acc, block, i) => (block.kind === "prose" ? i : acc),
    -1,
  );

  const bodyAfterIndex = section.bodyAfterIndex ?? section.body.length;

  return (
    <section className="mx-auto mb-16 max-w-[1100px] px-5 sm:px-8">
      {section.heading && (blocks.length === 0 || blocks[0]?.kind !== "prose") && (
        <Reading>
          <SectionHeading index={index} heading={section.heading} />
        </Reading>
      )}
      {blocks.map((block, i) => {
        if (block.kind === "prose") {
          return (
            <Reading key={`prose-${i}`} className={i > 0 ? "mt-8" : undefined}>
              {i === 0 && section.heading ? (
                <SectionHeading index={index} heading={section.heading} />
              ) : null}
              <Prose
                paragraphs={block.paragraphs}
                asList={section.bodyFormat === "list"}
              />
              {section.bodyAfter &&
              i === bodyAfterIndex &&
              section.bodyAfterFormat !== undefined ? (
                <div className="mt-6">
                  <Prose
                    paragraphs={section.bodyAfter}
                    asList={section.bodyAfterFormat === "list"}
                  />
                </div>
              ) : null}
              {i === lastProseIndex && section.callout ? (
                <p className="mt-6 font-display text-xl font-semibold leading-snug tracking-tight text-ink sm:text-2xl">
                  {section.callout}
                </p>
              ) : null}
            </Reading>
          );
        }
        return (
          <SectionFigure
            key={block.items.map((item) => item.src).join("-")}
            media={block.items}
            accent={project.brand.accent}
            fallbackLabel={project.name}
          />
        );
      })}
      {section.pairing && (
        <Reading>
          <PairingTable pairing={section.pairing} />
        </Reading>
      )}
      {section.annotations && section.annotations.length > 0 && (
        <div className="mt-10 space-y-16">
          {section.annotations.map((note, i) => (
            <AnnotationRow
              key={note.heading}
              annotation={note}
              reversed={i % 2 === 1}
              accent={project.brand.accent}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export function CaseStudy({ project }: { project: Project }) {
  const heading = project.headline ?? project.name;
  const kicker = project.client ?? `OPENING / WORK_${project.index}`;
  const deck = project.subtitle && project.subtitle !== heading ? project.subtitle : null;
  const metaRows = [
    ...(project.client ? [{ label: "Client", value: project.name }] : []),
    { label: "Role", value: project.role },
    { label: "Timeline", value: project.timeline ?? String(project.year) },
    { label: "Discipline", value: project.disciplines.join(", ") },
    { label: "Status", value: STATUS_LABEL[project.status] },
  ];

  return (
    <article className="bg-cream text-ink">
      <div className="mx-auto max-w-[1100px] px-5 pt-28 sm:px-8">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted-ink">
          {kicker}
        </p>
      </div>

      <header className="mx-auto grid max-w-[1100px] gap-8 px-5 py-10 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <h1 className="font-display text-4xl leading-[1.08] tracking-tight sm:text-6xl">
            {heading}
          </h1>
          {deck && (
            <p className="mt-2 font-display text-xl text-ink/70 sm:text-2xl">
              {deck}
            </p>
          )}
          {project.oneLiner ? (
            <p className="mt-6 max-w-xl text-base leading-relaxed text-ink/85">
              {project.oneLiner}
            </p>
          ) : null}
          {project.contributions && project.contributions.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-2">
              {project.contributions.map((tag) => (
                <li
                  key={tag}
                  className="border border-line-ink px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-ink/75"
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="lg:col-span-4 lg:pt-2">
          <MetaList className="text-ink" rows={metaRows} />
        </div>
      </header>

      <div className="mx-auto max-w-[1100px] px-5 sm:px-8">
        <Media
          media={project.cover}
          label={project.name}
          accent={project.brand.accent}
          ratio="16 / 9"
          priority
        />
      </div>

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

      <div className="py-16">
        {project.sections.map((section, i) => (
          <NarrativeSection
            key={`${section.heading ?? section.kind}-${i}`}
            section={section}
            index={i + 1}
            project={project}
          />
        ))}
      </div>

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
