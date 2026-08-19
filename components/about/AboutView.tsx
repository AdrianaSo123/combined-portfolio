import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { MetaList } from "@/components/system/MetaList";
import { SectionLabel } from "@/components/system/TechnicalRule";
import type { publishedAbout } from "@/content/published";
import { isExternal, routes } from "@/lib/routes";

type Published = ReturnType<typeof publishedAbout>;

function Prose({ paragraphs, className = "" }: { paragraphs: string[]; className?: string }) {
  return (
    <div className={`space-y-4 text-base leading-relaxed text-ink/85 ${className}`}>
      {paragraphs.map((p) => (
        <p key={p}>{p}</p>
      ))}
    </div>
  );
}

function Block({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <section aria-labelledby={id} className="mt-12">
      <h2
        id={id}
        className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-ink"
      >
        {label}
      </h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

export function AboutView({ published }: { published: Published }) {
  const {
    headline,
    greeting,
    portrait,
    snapshot,
    origin,
    philosophy,
    prior,
    community,
    offline,
    focus,
    skills,
    experience,
    education,
    socials,
    contactEmail,
    resumeUrl,
    location,
  } = published;

  const specRows = [
    { label: "Focus", value: focus.join(" · ") },
    ...(location ? [{ label: "Location", value: location }] : []),
  ];

  return (
    <article className="min-h-[100svh] bg-cream text-ink">
      <div className="mx-auto max-w-[1100px] px-5 pt-32 pb-24 sm:px-8">
        <div className="flex items-baseline justify-between gap-4">
          <SectionLabel index="02" label="About" />
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-accent-dim">
            sys.ready
          </p>
        </div>

        <header className="mt-8 grid items-center gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <h1 className="font-display text-4xl leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
              {greeting}
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink/75">{headline}</p>
          </div>
          {portrait && (
            <div className="lg:col-span-5 lg:flex lg:justify-end">
              <Image
                src={portrait.src}
                alt={portrait.alt}
                width={portrait.width}
                height={portrait.height}
                priority
                sizes="(max-width: 1024px) 220px, 280px"
                className="h-64 w-auto sm:h-80 lg:h-[22rem]"
              />
            </div>
          )}
        </header>

        <div className="mt-14 max-w-[72ch]">
            {snapshot.length > 0 && (
              <Block id="who" label="Who I am">
                <Prose paragraphs={snapshot} />
              </Block>
            )}

            {origin.length > 0 && (
              <Block id="why" label="Why UX / AI">
                <Prose paragraphs={origin} />
              </Block>
            )}

            {philosophy.length > 0 && (
              <Block id="philosophy" label="Philosophy">
                <div className="space-y-8">
                  {philosophy.map((item) => (
                    <div key={item.hook} className="border-t border-line-ink pt-4">
                      <p className="font-display text-xl tracking-tight">{item.hook}</p>
                      {item.body.length > 0 && (
                        <div className="mt-3">
                          <Prose paragraphs={item.body} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </Block>
            )}

            {(prior.length > 0 || experience.length > 0) && (
              <Block id="experience" label="Experience">
                {prior.length > 0 ? (
                  <Prose paragraphs={prior} />
                ) : (
                  <div className="space-y-6">
                    {experience.map((e) => (
                      <div key={`${e.role}-${e.org}-${e.period}`} className="border-t border-line-ink pt-4">
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <p className="font-display text-xl">
                            {e.role} · {e.org}
                          </p>
                          <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted-ink">
                            {e.location ? `${e.period} · ${e.location}` : e.period}
                          </p>
                        </div>
                        {e.summary && (
                          <p className="mt-2 text-sm leading-relaxed text-ink/75">{e.summary}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </Block>
            )}

            {community.length > 0 && (
              <Block id="community" label="Community">
                <Prose paragraphs={community} />
              </Block>
            )}

            {offline.length > 0 && (
              <Block id="offline" label="Offline">
                <Prose paragraphs={offline} />
              </Block>
            )}

            {education.length > 0 && (
              <Block id="education" label="Education">
                <div className="space-y-4">
                  {education.map((ed) => (
                    <div
                      key={`${ed.credential}-${ed.org}`}
                      className="border-t border-line-ink pt-4"
                    >
                      <p className="font-display text-xl">
                        {ed.credential} · {ed.org}
                      </p>
                      <p className="mt-1 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted-ink">
                        {ed.period}
                      </p>
                    </div>
                  ))}
                </div>
              </Block>
            )}
        </div>

        <section
          aria-label="Spec, skills, and links"
          className="mt-20 grid gap-10 border-t border-line-ink pt-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-12"
        >
          <div className="lg:col-span-3">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-ink">
              Spec
            </p>
            <MetaList className="mt-4 text-ink" rows={specRows} />
          </div>

          <div className="sm:col-span-2 lg:col-span-6">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-ink">
              Skills
            </p>
            <div className="mt-4 grid gap-6 sm:grid-cols-3">
              {skills.map((g) => (
                <div key={g.group}>
                  <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-accent-dim">
                    {g.group}
                  </p>
                  <ul className="mt-2 space-y-1 text-sm text-ink/80">
                    {g.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-ink">
              Links
            </p>
            <ul className="mt-3 space-y-2 font-mono text-xs uppercase tracking-[0.18em]">
              {socials.map((s) => {
                const external = isExternal(s.href);
                return (
                  <li key={s.label}>
                    <Link
                      href={s.href}
                      className="text-accent-dim underline-offset-4 hover:underline"
                      {...(external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      {s.label}
                      {external ? " ↗" : ""}
                    </Link>
                  </li>
                );
              })}
              {resumeUrl && (
                <li>
                  <Link
                    href={resumeUrl}
                    className="text-accent-dim underline-offset-4 hover:underline"
                  >
                    Résumé
                  </Link>
                </li>
              )}
              {contactEmail && (
                <li>
                  <Link
                    href={routes.mailto(contactEmail)}
                    className="text-accent-dim underline-offset-4 hover:underline"
                  >
                    Email
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </section>
      </div>
    </article>
  );
}
