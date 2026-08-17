import { SUGGESTIONS } from "./copy";

// Suggested entry points (spec §6), presented as a numbered terminal menu.
// A persistent chevron + hover fill keep the rows readable as tappable targets
// (not just decorative text). These work even with zero AI availability via
// the scripted fallback table.
export function SuggestionGrid({ onSelect }: { onSelect: (prompt: string) => void }) {
  return (
    <ul className="mt-2 space-y-0">
      {SUGGESTIONS.map((s, i) => (
        <li key={s}>
          <button
            type="button"
            onClick={() => onSelect(s)}
            className="group flex w-full items-center gap-2 rounded-sm px-1 py-1 text-left text-[0.7rem] leading-snug text-[color:var(--color-screen)]/85 transition-colors hover:bg-[color:var(--color-screen)]/12 hover:text-[color:var(--color-screen)] sm:text-xs"
          >
            <span className="w-4 shrink-0 font-mono tabular-nums text-[color:var(--color-screen)]/70">
              {i + 1}
            </span>
            <span className="flex-1 underline-offset-2 group-hover:underline">{s}</span>
            <span
              aria-hidden="true"
              className="font-mono text-[color:var(--color-screen)]/45 transition-all group-hover:translate-x-0.5 group-hover:text-[color:var(--color-screen)]"
            >
              &gt;
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}
