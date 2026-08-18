import Link from "next/link";
import { STATUS_LABEL, type CaseStudyAnnotation, type CaseStudySection, type Project } from "@/content/types";
import { routes } from "@/lib/routes";
import { Media } from "./MediaPlaceholder";
import { MediaCarousel } from "./MediaCarousel";
import { MetaList } from "@/components/system/MetaList";
import { PairingTable } from "./PairingTable";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function Prose({ paragraphs }: { paragraphs: string[] }) {
  if (paragraphs.length === 0) return null;
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
}: {
  annotation: CaseStudyAnnotation;
  accent: string;
}) {
  const label = annotation.mediaLabel ?? annotation.heading;
  const shots = annotation.media ?? [];

  if (shots.length > 1) {
    return <MediaCarousel items={shots} label={label} />;
  }

  const shot = shots[0];
  const landscape = shot ? shot.width >= shot.height : false;

  return (
    <Media
      media={shot}
      label={label}
      accent={accent}
      ratio={landscape ? "16 / 10" : "4 / 5"}
      fit={shot ? "contain" : "cover"}
      sizes="(max-width: 1024px) 100vw, 58vw"
    />
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
  return (
    <div className="grid min-w-0 items-center gap-8 lg:grid-cols-12 lg:gap-12">
      <div className={`min-w-0 lg:col-span-7 ${reversed ? "lg:order-2" : ""}`}>
        <AnnotationMedia annotation={annotation} accent={accent} />
      </div>
      <div className={`lg:col-span-5 ${reversed ? "lg:order-1" : ""}`}>
        <h3 className="font-display text-2xl leading-snug tracking-tight text-ink sm:text-3xl">
          {annotation.heading}
        </h3>
        <div className="mt-4 space-y-3 text-base leading-relaxed text-ink/80">
          {annotation.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </div>
    </div>
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
  return (
    <section className="mx-auto mb-16 max-w-[1100px] px-5 sm:px-8">
      {section.heading && (
        <h2 className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-muted-ink">
          <span className="text-[color:var(--color-accent-dim)]">{pad(index)}</span> /{" "}
          {section.heading}
        </h2>
      )}
      <div className="grid lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-8">
          <Prose paragraphs={section.body} />
          {section.callout && (
            <p className="mt-6 font-display text-xl font-semibold leading-snug tracking-tight text-ink sm:text-2xl">
              {section.callout}
            </p>
          )}
        </div>
      </div>
      {section.pairing && <PairingTable pairing={section.pairing} />}
      {section.bodyAfter && section.bodyAfter.length > 0 && (
        <div className="mt-8 grid lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-8">
            <Prose paragraphs={section.bodyAfter} />
          </div>
        </div>
      )}
      {section.media?.map((m) => (
        <div key={m.src} className="mt-6">
          <Media media={m} label={project.name} accent={project.brand.accent} />
        </div>
      ))}
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
            key={section.heading ?? section.kind}
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
