import { NextResponse } from "next/server";
import { scriptedAnswer } from "@/lib/ai/fallback";
import { RateLimiter } from "@/lib/ai/rate-limit";
import { MAX_MESSAGE_LENGTH } from "@/lib/ai/constants";
import type { ChatRequest } from "@/lib/ai/types";

export const runtime = "nodejs";

const limiter = new RateLimiter();

function clientKey(req: Request): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
}

async function parseMessage(req: Request): Promise<string | null> {
  try {
    const body = (await req.json()) as Partial<ChatRequest>;
    if (typeof body.message !== "string") return null;
    const message = body.message.slice(0, MAX_MESSAGE_LENGTH).trim();
    return message.length > 0 ? message : null;
  } catch {
    return null;
  }
}

export async function POST(req: Request) {
  if (limiter.isLimited(clientKey(req))) {
    return NextResponse.json({ error: "Too many requests." }, { status: 429 });
  }

  const message = await parseMessage(req);
  if (!message) {
    return NextResponse.json({ error: "Invalid message." }, { status: 400 });
  }

  // Phase 3 (spec §19.2): when LLM + embeddings are configured, run RAG here
  // and fall back to scriptedAnswer on any error. For now the deterministic
  // intent table always answers so the portfolio works without AI.
  return NextResponse.json(scriptedAnswer(message));
}
