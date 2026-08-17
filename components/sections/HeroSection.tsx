import Link from "next/link";
import { CrtScreen } from "@/components/hero/CrtScreen";
import { WireframeGlobe } from "@/components/system/WireframeGlobe";
import { CornerMarks } from "@/components/system/CornerMarks";
import { HEADLINE } from "@/content/about";
import { routes } from "@/lib/routes";
import { BRAND_RGB, rgba } from "@/lib/theme";

const HEADLINE_ACCENTS = ["product", "AI", "human-computer interaction"] as const;

function HeadlineWithAccents({ text }: { text: string }) {
  const pattern = new RegExp(`(${HEADLINE_ACCENTS.join("|")})`);
  return (
    <>
      {text.split(pattern).map((part, i) =>
        (HEADLINE_ACCENTS as readonly string[]).includes(part) ? (
          <span key={i} className="text-accent">
            {part}
          </span>
        ) : (
          part
        )
      )}
    </>
  );
}

// Near-black cybercore hero: intro copy on the left, the interactive CRT
// assistant on the right, over a faint coordinate grid + wireframe globe.
export function HeroSection() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-bg pb-24 pt-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(${rgba(BRAND_RGB.accent, 0.22)} 1px, transparent 1px), linear-gradient(90deg, ${rgba(BRAND_RGB.accent, 0.22)} 1px, transparent 1px)`,
          backgroundSize: "56px 56px",
        }}
      />
      <WireframeGlobe className="pointer-events-none absolute -right-24 top-10 h-[42rem] w-[42rem] text-accent/[0.10] lg:-right-10" />
      <CornerMarks />
      <div className="relative mx-auto mb-10 max-w-[1400px] px-5 sm:px-8">
        <div
          aria-hidden="true"
          className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 border-y border-line py-2 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-muted"
        >
          <span className="text-accent">Product × AI × HCI</span>
          <span>Lat 39.36° / Lon -74.42°</span>
        </div>
      </div>

      <div className="relative mx-auto grid max-w-[1400px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-accent">
            &gt; 00 / Adriana_So
          </p>
          <h1 className="mt-5 font-display text-4xl leading-[1.02] tracking-tight sm:text-5xl">
            <HeadlineWithAccents text={HEADLINE} />
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
  );
}
