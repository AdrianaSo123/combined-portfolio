import { SUGGESTIONS } from "./copy";

// Numbered terminal menu. Click a line, or type that number in the field.
export function SuggestionGrid({ onSelect }: { onSelect: (prompt: string) => void }) {
  return (
    <ul className="mt-1.5 space-y-0">
      {SUGGESTIONS.map((s, i) => {
        const n = String(i + 1);
        return (
          <li key={s}>
            <button
              type="button"
              onClick={() => onSelect(s)}
              aria-keyshortcuts={n}
              className="group flex w-full items-center gap-2 rounded-sm py-1 text-left text-[0.7rem] leading-snug text-[color:var(--color-screen)]/90 transition-colors hover:bg-[color:var(--color-screen)]/12 hover:text-[color:var(--color-screen)] sm:text-xs"
            >
              <span className="w-4 shrink-0 font-mono tabular-nums text-[color:var(--color-screen)]">
                {n}
              </span>
              <span className="flex-1 underline-offset-2 group-hover:underline">{s}</span>
              <span
                aria-hidden="true"
                className="w-10 shrink-0 text-right font-mono text-[color:var(--color-screen)]/45 group-hover:text-[color:var(--color-screen)]"
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
