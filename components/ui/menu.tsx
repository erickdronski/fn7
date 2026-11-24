"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from "react";
import type { NavLink } from "@/lib/site";

/**
 * A dropdown of links. Opens on click, on hover with a mouse, and with the
 * keyboard. Escape closes it and returns focus. Arrow keys move between items.
 */
export function Menu({ label, items }: { label: string; items: NavLink[] }) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: globalThis.PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  function links(): HTMLAnchorElement[] {
    return [...(root.current?.querySelectorAll<HTMLAnchorElement>(".menu-item") ?? [])];
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape" && open) {
      setOpen(false);
      trigger.current?.focus();
      return;
    }
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
    event.preventDefault();
    if (!open) setOpen(true);
    const all = links();
    const at = all.indexOf(document.activeElement as HTMLAnchorElement);
    const next = event.key === "ArrowDown" ? (at + 1) % all.length : (at - 1 + all.length) % all.length;
    window.requestAnimationFrame(() => all[next]?.focus());
  }

  function onPointerEnter(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse") return;
    window.clearTimeout(closeTimer.current);
    setOpen(true);
  }

  function onPointerLeave(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse") return;
    closeTimer.current = window.setTimeout(() => setOpen(false), 140);
  }

  return (
    <div className="menu" data-open={open} ref={root} onKeyDown={onKeyDown} onPointerEnter={onPointerEnter} onPointerLeave={onPointerLeave}>
      <button ref={trigger} type="button" className="menu-trigger link" aria-expanded={open} aria-controls={panelId} onClick={() => setOpen((was) => !was)}>
        {label}
        <svg className="menu-caret" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="m1.5 3.5 3.5 3.5 3.5-3.5" />
        </svg>
      </button>
      <div className="menu-panel" id={panelId}>
        {items.map((item, index) => {
          const style = { "--i": index } as CSSProperties;
          const body = (
            <>
              <strong>{item.label}</strong>
              {item.note ? <span>{item.note}</span> : null}
            </>
          );
          return /^https?:/.test(item.href) ? (
            <a key={item.href} className="menu-item" style={style} href={item.href} target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>
              {body}
            </a>
          ) : (
            <Link key={item.href} className="menu-item" style={style} href={item.href} onClick={() => setOpen(false)}>
              {body}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
