import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
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
    <section aria-labelledby={id} className="mt-12 pt-2">
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
    experience,
    education,
    socials,
    contactEmail,
    resumeUrl,
  } = published;
  const quickLinks = [
    ...socials,
    ...(resumeUrl ? [{ label: "Resume", href: resumeUrl }] : []),
    ...(contactEmail ? [{ label: "Email", href: routes.mailto(contactEmail) }] : []),
  ];

  return (
    <article className="min-h-[100svh] bg-cream text-ink">
      <div className="mx-auto max-w-[1060px] px-5 pt-32 pb-24 sm:px-8">
        <SectionLabel index="02" label="About" />

        <header className="mt-8 grid items-center gap-10 pb-10 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <h1 className="font-display text-4xl leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
              {greeting}
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink/75">{headline}</p>
            {quickLinks.length > 0 && (
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-1 font-mono text-xs uppercase tracking-[0.16em]">
                {quickLinks.map((item) => {
                  const external = isExternal(item.href);
                  return (
                    <Link
                      key={`${item.label}-${item.href}`}
                      href={item.href}
                      className="inline-flex min-h-10 items-center py-1 text-accent-dim underline-offset-4 hover:underline"
                      {...(external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      {item.label}
                      {external ? " ↗" : ""}
                      {external ? <span className="sr-only"> (opens in new tab)</span> : null}
                    </Link>
                  );
                })}
              </div>
            )}
            <nav aria-label="About sections" className="mt-6 border-t border-line-ink/70 pt-4">
              <ul className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted-ink">
                {[
                  { href: "#who", label: "Who I am" },
                  { href: "#how", label: "How I got here" },
                  { href: "#philosophy", label: "AI" },
                  { href: "#experience", label: "Experience" },
                  { href: "#community", label: "Community" },
                ].map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="underline-offset-4 hover:underline">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
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

        <div className="mt-12 max-w-[70ch]">
          {snapshot.length > 0 && (
            <Block id="who" label="Who I am">
              <Prose paragraphs={snapshot} />
            </Block>
          )}

          {origin.length > 0 && (
            <Block id="how" label="How I got here">
              <Prose paragraphs={origin} />
            </Block>
          )}

          {philosophy.length > 0 && (
            <Block id="philosophy" label="Where AI comes in">
              <div className="space-y-8">
                {philosophy.map((item) => (
                  <div key={item.hook} className="pt-1">
                    {item.hook.trim().toLowerCase() !== "where ai comes in" ? (
                      <p className="font-display text-xl tracking-tight">{item.hook}</p>
                    ) : null}
                    {item.body.length > 0 && (
                      <div
                        className={
                          item.hook.trim().toLowerCase() === "where ai comes in"
                            ? "mt-0"
                            : "mt-3"
                        }
                      >
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
                    <div
                      key={`${e.role}-${e.org}-${e.period}`}
                      className="border-t border-line-ink/70 pt-4"
                    >
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

      </div>
    </article>
  );
}
