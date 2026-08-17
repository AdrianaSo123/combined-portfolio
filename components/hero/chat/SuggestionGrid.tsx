import { SUGGESTIONS } from "./copy";

// Suggested entry points (spec §6). These work even with zero AI availability
// via the scripted fallback intent table.
export function SuggestionGrid({ onSelect }: { onSelect: (prompt: string) => void }) {
  return (
    <ul className="mt-4 grid gap-2 sm:grid-cols-2">
      {SUGGESTIONS.map((s) => (
        <li key={s}>
          <button
            type="button"
            onClick={() => onSelect(s)}
            className="w-full rounded-sm border border-[color:var(--color-screen)]/30 px-3 py-2 text-left text-xs text-[color:var(--color-fg)] transition-colors hover:bg-[color:var(--color-screen)]/12"
          >
            {s}
          </button>
        </li>
      ))}
    </ul>
  );
}
