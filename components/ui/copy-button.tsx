"use client";

import { useEffect, useState } from "react";

/** Copies text. The icon swaps to a check, and a live region announces it. */
export function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!done) return;
    const timer = window.setTimeout(() => setDone(false), 1800);
    return () => window.clearTimeout(timer);
  }, [done]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setDone(true);
    } catch {
      setDone(false);
    }
  }

  return (
    <button type="button" className="minibtn" data-done={done} onClick={copy}>
      <span className="copy-icons" aria-hidden="true">
        <svg className="copy-sheet" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="4.5" y="4.5" width="8" height="8" rx="1.5" />
          <path d="M9.5 2.5h-6a1 1 0 0 0-1 1v6" />
        </svg>
        <svg className="copy-check" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.75">
          <path d="m2.5 7.5 3 3 6-7" />
        </svg>
      </span>
      <span aria-live="polite">{done ? "Copied" : label}</span>
    </button>
  );
}
