import type { Metadata } from "next";
import Link from "next/link";
import { SectionLabel } from "@/components/system/TechnicalRule";
import { about } from "@/content/about";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "About",
  description: about.headline,
};

export default function AboutPage() {
  return (
    <section className="min-h-[100svh] bg-cream text-ink">
      <div className="mx-auto max-w-[1000px] px-5 pt-32 pb-20 sm:px-8">
        <SectionLabel label="About" className="text-ink" />
        <h1 className="mt-6 max-w-3xl font-display text-4xl leading-tight tracking-tight sm:text-5xl">
          {about.headline}
        </h1>

        <div className="mt-10 grid gap-12 lg:grid-cols-12">
          <div className="space-y-4 text-lg leading-relaxed text-ink/85 lg:col-span-7">
            {about.bio.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          <div className="lg:col-span-5">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-muted-ink">
              Focus
            </p>
            <ul className="mt-2 space-y-1 text-sm">
              {about.focus.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* skills */}
        <div className="mt-16">
          <SectionLabel label="Skills" className="text-ink" />
          <div className="mt-6 grid gap-8 sm:grid-cols-3">
            {about.skills.map((g) => (
              <div key={g.group}>
                <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-accent-dim">
                  {g.group}
                </p>
                <ul className="mt-2 space-y-1 text-sm text-ink/85">
                  {g.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* experience */}
        <div className="mt-16">
          <SectionLabel label="Experience" className="text-ink" />
          <div className="mt-6 space-y-6">
            {about.experience.map((e) => (
              <div key={`${e.role}-${e.org}`} className="border-t border-line-ink pt-4">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-display text-xl">
                    {e.role} · {e.org}
                  </p>
                  <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted-ink">
                    {e.period}
                  </p>
                </div>
                <p className="mt-1 text-sm text-ink/75">{e.summary}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 border-t border-line-ink pt-8">
          <Link
            href={routes.mailto(about.contactEmail)}
            className="font-display text-2xl underline-offset-4 hover:underline sm:text-3xl"
          >
            {about.contactEmail}
          </Link>
        </div>
      </div>
    </section>
  );
}
