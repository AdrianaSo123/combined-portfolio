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
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-bg">
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-4 text-fg sm:px-8"
      >
        <Link href={routes.home} className="font-display text-[0.95rem] tracking-tight">
          Adriana So
        </Link>
        <ul className="flex items-center gap-6 font-mono text-[0.65rem] uppercase tracking-[0.18em] sm:gap-8">
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
                      ? "text-fg"
                      : "text-muted transition-colors hover:text-fg"
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
