"use client";

import { useEffect, useState, type ReactNode } from "react";

/**
 * The navigation bar's behavior: it turns to glass once the page scrolls,
 * and on small screens it opens a sheet with every link.
 */
export function NavShell({ bar, sheet }: { bar: ReactNode; sheet: ReactNode }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    const first = window.requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.cancelAnimationFrame(first);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="nav" data-scrolled={scrolled} data-open={open}>
      <div className="nav-in wrap">
        {bar}
        <button type="button" className="nav-toggle" aria-expanded={open} aria-controls="nav-sheet" onClick={() => setOpen((was) => !was)}>
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span className="nav-toggle-bars" aria-hidden="true">
            <i />
            <i />
          </span>
        </button>
      </div>
      <div className="nav-sheet" id="nav-sheet" onClick={() => setOpen(false)}>
        <div className="wrap">{sheet}</div>
      </div>
    </header>
  );
}
