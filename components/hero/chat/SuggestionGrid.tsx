import { SUGGESTIONS } from "./copy";

// Numbered terminal menu. Click a line, or type that number. These work even
// with zero AI availability via the scripted fallback table.
export function SuggestionGrid({ onSelect }: { onSelect: (prompt: string) => void }) {
  return (
    <ul className="mt-2 space-y-0">
      {SUGGESTIONS.map((s, i) => {
        const n = String(i + 1);
        return (
          <li key={s}>
            <button
              type="button"
              onClick={() => onSelect(s)}
              aria-keyshortcuts={n}
              className="group flex w-full items-center gap-2 rounded-sm px-1 py-1.5 text-left text-xs leading-snug text-[color:var(--color-screen)]/90 transition-colors hover:bg-[color:var(--color-screen)]/12 hover:text-[color:var(--color-screen)] sm:text-sm"
            >
              <span className="w-4 shrink-0 font-mono tabular-nums text-[color:var(--color-screen)]">
                {n}
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
        );
      })}
    </ul>
  );
}
