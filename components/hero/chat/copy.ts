// UI copy for the conversational portfolio, kept out of the components so it
// can be edited without touching layout.

export const CHAT_COPY = {
  emptyTitle: "Ask me anything about Adriana's work.",
  emptySubtitle: "Answers are grounded in real projects — or pick a starting point:",
  inputLabel: "Ask something about Adriana's portfolio",
  placeholder: "Type your question…",
  send: "Send",
} as const;

export const SUGGESTIONS = [
  "What have you shipped?",
  "Show me your product design work.",
  "What are you researching about AI?",
  "Show me something technical.",
] as const;
