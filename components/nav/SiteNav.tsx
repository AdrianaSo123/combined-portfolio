import Link from "next/link";
import { routes } from "@/lib/routes";

const links = [
  { href: routes.workSection, label: "Work" },
  { href: routes.experiments, label: "Lab" },
  { href: routes.about, label: "About" },
];

export function SiteNav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Dark scrim keeps the fixed nav legible over both the dark hero and the
          cream sections below (replaces an unpredictable mix-blend effect). */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-20 bg-gradient-to-b from-bg/85 via-bg/45 to-transparent"
      />
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-4 text-fg sm:px-8"
      >
        <Link
          href={routes.home}
          className="font-mono text-xs uppercase tracking-[0.2em]"
        >
          Adriana&nbsp;So
        </Link>
        <ul className="flex items-center gap-5 font-mono text-xs uppercase tracking-[0.16em] sm:gap-7">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="opacity-80 transition-opacity hover:opacity-100">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
