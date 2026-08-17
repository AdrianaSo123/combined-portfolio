import Link from "next/link";
import { about } from "@/content/about";
import { routes, isExternal } from "@/lib/routes";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line-ink bg-cream-deep text-ink">
      <div className="mx-auto grid max-w-[1400px] gap-8 px-5 py-14 sm:grid-cols-2 sm:px-8">
        <div>
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-muted-ink">
            Contact
          </p>
          <a
            href={routes.mailto(about.contactEmail)}
            className="mt-2 block font-display text-2xl underline-offset-4 hover:underline sm:text-3xl"
          >
            {about.contactEmail}
          </a>
        </div>
        <div className="flex flex-col gap-3 sm:items-end">
          <ul className="flex gap-5 font-mono text-xs uppercase tracking-[0.16em]">
            {about.socials.map((s) => {
              const external = isExternal(s.href);
              return (
                <li key={s.label}>
                  <Link
                    href={s.href}
                    className="opacity-80 hover:opacity-100"
                    {...(external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    {s.label}
                    {external && " ↗"}
                  </Link>
                </li>
              );
            })}
          </ul>
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted-ink">
            © {year} Adriana So · Portfolio online
          </p>
        </div>
      </div>
    </footer>
  );
}
