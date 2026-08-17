import Link from "next/link";
import { CrtScreen } from "@/components/hero/CrtScreen";
import { WireframeGlobe } from "@/components/system/WireframeGlobe";
import { CornerMarks } from "@/components/system/CornerMarks";
import { routes } from "@/lib/routes";

// Near-black cybercore hero: intro copy on the left, the interactive CRT
// assistant on the right, over a faint coordinate grid + wireframe globe.
export function HeroSection() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-bg pb-24 pt-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(79,102,255,0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(79,102,255,0.16) 1px, transparent 1px)",
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
          <span className="text-accent">Adriana So</span>
          <span>Product × AI × HCI</span>
          <span>Lat 39.36° / Lon -74.42°</span>
        </div>
      </div>

      <div className="relative mx-auto grid max-w-[1400px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-accent">
            &gt; 00 / Adriana_So
          </p>
          <h1 className="mt-5 font-display text-4xl leading-[1.02] tracking-tight sm:text-5xl">
            Designer &amp; builder across{" "}
            <span className="text-accent">product</span>,{" "}
            <span className="text-accent">AI</span>, and{" "}
            <span className="text-accent">human-computer interaction</span>.
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
