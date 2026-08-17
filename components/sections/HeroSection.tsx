import Link from "next/link";
import { CrtScreen } from "@/components/hero/CrtScreen";
import { HEADLINE } from "@/content/about";
import { routes } from "@/lib/routes";

// Dark field, copy, CRT. Nothing else — the screen is the object.
export function HeroSection() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-bg pb-20 pt-28">
      <div className="relative mx-auto grid max-w-[1400px] items-center gap-10 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <h1 className="font-display text-4xl leading-[1.08] tracking-tight text-fg sm:text-5xl">
            {HEADLINE}
          </h1>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted">
            Product experience designer working with emerging technology —
            researching interactions and building intelligent systems.
          </p>
          <Link
            href={routes.workSection}
            className="mt-8 inline-block font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted transition-colors hover:text-fg"
          >
            Selected work
          </Link>
        </div>

        <div className="lg:col-span-8">
          <CrtScreen />
        </div>
      </div>
    </section>
  );
}
