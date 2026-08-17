"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { routes } from "@/lib/routes";

const links = [
  { href: routes.workSection, label: "Work", match: "/work" },
  { href: routes.experiments, label: "Lab", match: "/experiments" },
  { href: routes.about, label: "About", match: "/about" },
];

export function SiteNav() {
  const pathname = usePathname();
  const [hash, setHash] = useState("");

  useEffect(() => {
    const sync = () => setHash(window.location.hash);
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-24 bg-gradient-to-b from-bg via-bg/70 to-transparent"
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
          {links.map((l) => {
            const active =
              pathname.startsWith(l.match) ||
              (l.match === "/work" && pathname === "/" && hash === "#work");
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                  className={
                    active
                      ? "underline decoration-accent underline-offset-4 opacity-100"
                      : "opacity-80 transition-opacity hover:opacity-100"
                  }
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
