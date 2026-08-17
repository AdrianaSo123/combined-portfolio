// UI copy for the conversational portfolio, kept out of the components so it
// can be edited without touching layout.

export const CHAT_COPY = {
  emptyTitle: "Ask about the work.",
  emptySubtitle: "Type 1–4, click a line, or ask a question.",
  inputId: "chat-input",
  inputLabel: "Ask something about Adriana's portfolio",
  placeholder: "1–4 or a question…",
  send: "Send",
  emptyHint: "Type a question, or 1–4 to pick a line.",
  reset: "New question",
} as const;

export const SUGGESTIONS = [
  "What have you shipped?",
  "Show me your product design work.",
  "What are you researching about AI?",
  "Show me something technical.",
] as const;

const MENU_PICK = /^[1-4]$/;

// Digit keys only count as a menu pick when the field is empty and idle.
// Typing "1" inside a question stays a character.
export function menuDigitToSend(
  key: string,
  inputValue: string,
  pending: boolean
): string | null {
  if (pending) return null;
  if (!MENU_PICK.test(key)) return null;
  if (inputValue.trim() !== "") return null;
  return key;
}

// Maps a typed "1"–"4" to that menu line so keyboard, click, and submit
// all produce the same prompt. Anything else is sent as written.
export function promptFromInput(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  if (MENU_PICK.test(trimmed)) {
    return SUGGESTIONS[Number(trimmed) - 1] ?? trimmed;
  }
  return trimmed;
}
