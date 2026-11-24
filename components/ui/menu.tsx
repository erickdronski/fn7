"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, type CSSProperties, type FocusEvent, type KeyboardEvent, type PointerEvent } from "react";
import { isExternal, type NavLink } from "@/lib/site";

/**
 * A dropdown of links. Opens on hover with a mouse, on click, and with the
 * keyboard. Escape closes it and returns focus. Arrow keys move between
 * items. It closes when focus or the pointer leaves it.
 */
export function Menu({ label, items }: { label: string; items: NavLink[] }) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);
  const hoverOpenedAt = useRef(0);
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
    // From the trigger (at is -1), down goes to the first item and up to the last.
    const next = event.key === "ArrowDown" ? (at + 1) % all.length : at <= 0 ? all.length - 1 : at - 1;
    window.requestAnimationFrame(() => all[next]?.focus());
  }

  function onPointerEnter(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse") return;
    window.clearTimeout(closeTimer.current);
    if (!open) hoverOpenedAt.current = performance.now();
    setOpen(true);
  }

  function onPointerLeave(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse") return;
    closeTimer.current = window.setTimeout(() => setOpen(false), 140);
  }

  function onBlur(event: FocusEvent<HTMLDivElement>) {
    if (!root.current?.contains(event.relatedTarget as Node | null)) setOpen(false);
  }

  function onTriggerClick() {
    // A click that lands just after hover opened the menu must not close it again.
    if (open && performance.now() - hoverOpenedAt.current < 400) return;
    setOpen((was) => !was);
  }

  return (
    <div className="menu" data-open={open} ref={root} onKeyDown={onKeyDown} onPointerEnter={onPointerEnter} onPointerLeave={onPointerLeave} onBlur={onBlur}>
      <button ref={trigger} type="button" className="menu-trigger link" aria-expanded={open} aria-controls={panelId} onClick={onTriggerClick}>
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
          return isExternal(item.href) ? (
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
