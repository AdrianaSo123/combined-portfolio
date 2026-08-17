import { MAX_MESSAGE_LENGTH } from "@/lib/ai/constants";
import { CHAT_COPY } from "./copy";

type ChatComposerProps = {
  value: string;
  pending: boolean;
  onChange: (value: string) => void;
  onSubmit: () => void;
};

export function ChatComposer({ value, pending, onChange, onSubmit }: ChatComposerProps) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="mt-4 flex items-center gap-2 border-t border-[color:var(--color-screen)]/25 pt-3"
    >
      <label htmlFor="chat-input" className="sr-only">
        {CHAT_COPY.inputLabel}
      </label>
      <span aria-hidden="true" className="opacity-60">
        &gt;
      </span>
      <input
        id="chat-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={CHAT_COPY.placeholder}
        maxLength={MAX_MESSAGE_LENGTH}
        autoComplete="off"
        className="flex-1 bg-transparent text-sm text-[color:var(--color-fg)] placeholder:text-[color:var(--color-screen)]/50 focus:outline-none"
      />
      <button
        type="submit"
        disabled={pending}
        className="text-xs uppercase tracking-[0.12em] text-[color:var(--color-fg)] opacity-80 hover:opacity-100 disabled:opacity-40"
      >
        {CHAT_COPY.send}
      </button>
    </form>
  );
}
