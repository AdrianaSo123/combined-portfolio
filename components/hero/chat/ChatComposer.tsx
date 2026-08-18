import { MAX_MESSAGE_LENGTH } from "@/lib/ai/constants";
import { CHAT_COPY, menuDigitToSend } from "./copy";

type ChatComposerProps = {
  value: string;
  pending: boolean;
  emptyHint: boolean;
  started: boolean;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onPickDigit: (key: string) => void;
  onReset: () => void;
};

export function ChatComposer({
  value,
  pending,
  emptyHint,
  started,
  onChange,
  onSubmit,
  onPickDigit,
  onReset,
}: ChatComposerProps) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="mt-1.5 border-t border-[color:var(--color-screen)]/25 pt-1.5"
    >
      <div className="flex items-center gap-2">
        <label htmlFor={CHAT_COPY.inputId} className="sr-only">
          {CHAT_COPY.inputLabel}
        </label>
        <span aria-hidden="true" className="text-[color:var(--color-screen)]/70">
          &gt;
        </span>
        {!value && (
          <span
            aria-hidden="true"
            className="blink -ml-1 text-[color:var(--color-screen)]"
          >
            ▊
          </span>
        )}
        <input
          id={CHAT_COPY.inputId}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            const digit = menuDigitToSend(e.key, value, pending);
            if (!digit) return;
            e.preventDefault();
            onPickDigit(digit);
          }}
          placeholder={CHAT_COPY.placeholder}
          maxLength={MAX_MESSAGE_LENGTH}
          autoComplete="off"
          enterKeyHint="send"
          className="flex-1 bg-transparent text-xs text-[color:var(--color-screen)] placeholder:text-[color:var(--color-screen)]/45 focus:outline-none sm:text-sm"
        />
        {started && (
          <button
            type="button"
            onClick={onReset}
            className="shrink-0 text-[0.65rem] uppercase tracking-[0.08em] text-[color:var(--color-screen)] opacity-80 hover:opacity-100"
          >
            {CHAT_COPY.reset}
          </button>
        )}
        <button
          type="submit"
          disabled={pending}
          className="w-10 shrink-0 text-right text-[0.65rem] uppercase tracking-[0.08em] text-[color:var(--color-screen)] opacity-80 hover:opacity-100 disabled:opacity-40"
        >
          {CHAT_COPY.send}
        </button>
      </div>
      {emptyHint && (
        <p className="mt-1 text-[0.65rem] text-[color:var(--color-screen)]/70" role="status">
          {CHAT_COPY.emptyHint}
        </p>
      )}
    </form>
  );
}
