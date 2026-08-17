import Link from "next/link";
import { SectionLabel } from "@/components/system/TechnicalRule";
import { about } from "@/content/about";
import { routes } from "@/lib/routes";

// Short about statement with a link through to the full About page.
export function AboutTeaser() {
  return (
    <div className="mx-auto max-w-[1400px] border-t border-line-ink px-5 py-20 sm:px-8">
      <SectionLabel index="03" label="About" />
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
  );
}
