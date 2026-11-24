"use client";

import { useEffect, useState } from "react";

type State = "idle" | "done" | "failed";

/** Copies text. The icon swaps to a check, and a live region says what happened, including a failure. */
export function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  const [state, setState] = useState<State>("idle");

  useEffect(() => {
    if (state === "idle") return;
    const timer = window.setTimeout(() => setState("idle"), 1800);
    return () => window.clearTimeout(timer);
  }, [state]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setState("done");
    } catch {
      setState("failed");
    }
  }

  return (
    <button type="button" className="minibtn" data-done={state === "done"} onClick={copy}>
      <span className="copy-icons" aria-hidden="true">
        <svg className="copy-sheet" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="4.5" y="4.5" width="8" height="8" rx="1.5" />
          <path d="M9.5 2.5h-6a1 1 0 0 0-1 1v6" />
        </svg>
        <svg className="copy-check" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.75">
          <path d="m2.5 7.5 3 3 6-7" />
        </svg>
      </span>
      <span aria-live="polite">{state === "done" ? "Copied" : state === "failed" ? "Copy failed. Select the text instead." : label}</span>
    </button>
  );
}
