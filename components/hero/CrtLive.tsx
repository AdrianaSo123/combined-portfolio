"use client";

import { useCallback, useState } from "react";
import { ChatInterface } from "./ChatInterface";
import { TerminalBoot } from "./TerminalBoot";

// Boot fills the glass, then the guide takes over. Reduced motion skips ahead.

export function CrtLive() {
  const [ready, setReady] = useState(false);
  const onComplete = useCallback(() => setReady(true), []);

  return (
    <div className="flex h-full min-h-0 flex-col">
      <TerminalBoot ready={ready} onComplete={onComplete} />
      {ready ? (
        <div className="crt-chat-in mt-1.5 min-h-0 flex-1">
          <ChatInterface />
        </div>
      ) : null}
    </div>
  );
}
