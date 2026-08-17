// UI copy for the conversational portfolio, kept out of the components so it
// can be edited without touching layout.

export const CHAT_COPY = {
  emptyTitle: "Ask about the work.",
  emptySubtitle: "Shipped product, research, and things from the lab. Pick a number or type.",
  inputLabel: "Ask something about Adriana's portfolio",
  placeholder: "Type a question…",
  send: "Send",
} as const;

export const SUGGESTIONS = [
  "What have you shipped?",
  "Show me your product design work.",
  "What are you researching about AI?",
  "Show me something technical.",
] as const;
