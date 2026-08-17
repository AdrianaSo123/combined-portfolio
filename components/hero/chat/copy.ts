// UI copy for the conversational portfolio, kept out of the components so it
// can be edited without touching layout (audit finding #7).

export const CHAT_COPY = {
  emptyTitle: "What would you like to explore?",
  emptySubtitle: "Portfolio guide · grounded in Adriana's work",
  inputLabel: "Ask something about Adriana's portfolio",
  placeholder: "Ask something...",
  send: "Send",
} as const;

export const SUGGESTIONS = [
  "What have you shipped?",
  "Show me your product design work.",
  "What are you researching about AI?",
  "Show me something technical.",
] as const;
