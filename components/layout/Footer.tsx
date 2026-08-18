import Link from "next/link";
import { about } from "@/content/about";
import { publishedAbout } from "@/content/published";
import { routes, isExternal } from "@/lib/routes";

export function Footer() {
  const year = new Date().getFullYear();
  const { contactEmail, socials } = publishedAbout(about);

  return (
    <footer className="border-t border-line bg-bg text-fg">
      <div className="mx-auto grid max-w-[1400px] gap-8 px-5 py-14 sm:grid-cols-2 sm:px-8">
        <div>
          {contactEmail ? (
            <>
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-muted">
                Contact
              </p>
              <a
                href={routes.mailto(contactEmail)}
                className="mt-2 block font-display text-2xl text-fg underline-offset-4 hover:underline sm:text-3xl"
              >
                {contactEmail}
              </a>
            </>
          ) : (
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-muted">
              Adriana So
            </p>
          )}
        </div>
        <div className="flex flex-col gap-3 sm:items-end">
          {socials.length > 0 && (
            <ul className="flex gap-5 font-mono text-xs uppercase tracking-[0.16em]">
              {socials.map((s) => {
                const external = isExternal(s.href);
                return (
                  <li key={s.label}>
                    <Link
                      href={s.href}
                      className="text-fg/80 hover:text-fg"
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
          )}
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted">
            © {year} Adriana So
          </p>
        </div>
      </div>
    </footer>
  );
}
