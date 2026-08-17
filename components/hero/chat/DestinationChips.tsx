import Link from "next/link";
import type { Destination } from "@/content/types";

// Clickable navigation targets returned alongside an answer (spec §19.3).
export function DestinationChips({ destinations }: { destinations: Destination[] }) {
  if (destinations.length === 0) return null;

  return (
    <ul className="mt-2 flex flex-wrap gap-2">
      {destinations.map((d) => (
        <li key={d.href + d.label}>
          <Link
            href={d.href}
            className="inline-block rounded-sm border border-[color:var(--color-screen)]/40 px-2 py-1 text-[0.7rem] uppercase tracking-[0.12em] text-[color:var(--color-fg)] transition-colors hover:bg-[color:var(--color-screen)]/15"
          >
            {d.label} →
          </Link>
        </li>
      ))}
    </ul>
  );
}
