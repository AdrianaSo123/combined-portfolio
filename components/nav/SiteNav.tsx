import Link from "next/link";
import { routes } from "@/lib/routes";

const links = [
  { href: routes.workSection, label: "Work" },
  { href: routes.experiments, label: "Experiments" },
  { href: routes.about, label: "About" },
];

export function SiteNav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-4 sm:px-8"
      >
        <Link
          href={routes.home}
          className="font-mono text-xs uppercase tracking-[0.2em] text-fg mix-blend-difference"
        >
          Adriana&nbsp;So
        </Link>
        <ul className="flex items-center gap-5 font-mono text-xs uppercase tracking-[0.16em] text-fg mix-blend-difference sm:gap-7">
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
