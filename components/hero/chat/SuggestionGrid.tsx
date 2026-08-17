import { SUGGESTIONS } from "./copy";

// Suggested entry points (spec §6), presented as a numbered terminal menu.
// These work even with zero AI availability via the scripted fallback table.
export function SuggestionGrid({ onSelect }: { onSelect: (prompt: string) => void }) {
  return (
    <ul className="mt-4 space-y-0.5">
      {SUGGESTIONS.map((s, i) => (
        <li key={s}>
          <button
            type="button"
            onClick={() => onSelect(s)}
            className="group flex w-full items-baseline gap-3 rounded-sm px-2 py-1.5 text-left text-xs text-[color:var(--color-screen)]/85 transition-colors hover:bg-[color:var(--color-screen)]/12 hover:text-[color:var(--color-screen)]"
          >
            <span className="w-4 shrink-0 font-mono tabular-nums text-[color:var(--color-screen)]/60">
              {i + 1}
            </span>
            <span className="flex-1">{s}</span>
            <span
              aria-hidden="true"
              className="font-mono text-[color:var(--color-screen)]/0 transition-colors group-hover:text-[color:var(--color-screen)]/80"
            >
              &gt;
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}
