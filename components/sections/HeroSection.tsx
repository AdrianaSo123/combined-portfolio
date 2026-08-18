import Link from "next/link";
import { CrtScreen } from "@/components/hero/CrtScreen";
import { HERO_KICKER, HERO_KEYWORDS, HERO_LINES } from "@/content/about";
import { routes } from "@/lib/routes";

const KEYWORD_SPLIT = new RegExp(`\\b(${HERO_KEYWORDS.join("|")})\\b`, "gi");
const KEYWORD_ONE = new RegExp(`^(${HERO_KEYWORDS.join("|")})$`, "i");

function emphasize(line: string) {
  return line.split(KEYWORD_SPLIT).map((part, i) =>
    KEYWORD_ONE.test(part) ? (
      <em key={`${part}-${i}`} className="not-italic text-accent">
        {part}
      </em>
    ) : (
      <span key={`${part}-${i}`}>{part}</span>
    )
  );
}

// Dark field, line-stacked positioning, CRT. The screen is the object.
export function HeroSection() {
  return (
    <section className="relative overflow-x-clip bg-bg pb-6 pt-24 sm:pb-8 sm:pt-28">
      <div className="relative mx-auto grid max-w-[1400px] items-center gap-10 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <p className="hero-line font-mono text-[0.7rem] uppercase tracking-[0.22em] text-accent">
            {HERO_KICKER}
          </p>
          <h1 className="mt-4 font-display text-4xl leading-[1.12] tracking-tight text-fg/70 sm:text-5xl">
            {HERO_LINES.map((line, i) => (
              <span
                key={line}
                className="hero-line block"
                style={{ animationDelay: `${120 + i * 90}ms` }}
              >
                {emphasize(line)}
              </span>
            ))}
          </h1>
          <p
            className="hero-line mt-6 max-w-sm text-sm leading-relaxed text-muted"
            style={{ animationDelay: "420ms" }}
          >
            Researching interactions and building intelligent systems.
          </p>
          <Link
            href={routes.workSection}
            className="hero-line mt-8 inline-block font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted transition-colors hover:text-fg"
            style={{ animationDelay: "520ms" }}
          >
            Selected work
          </Link>
        </div>

        <div className="lg:col-span-8 lg:flex lg:justify-end">
          <CrtScreen />
        </div>
      </div>
    </section>
  );
}
