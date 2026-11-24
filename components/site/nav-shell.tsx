"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";

/**
 * The navigation bar's behavior: it turns to glass once the page scrolls,
 * and on small screens it opens a sheet with every link. The sheet remembers
 * which page it was opened on, so it closes by itself after any navigation.
 */
export function NavShell({ bar, sheet }: { bar: ReactNode; sheet: ReactNode }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;

  useEffect(() => {
    // The bar is on every page, so this tells the guard in the root layout that scripts are running.
    (window as unknown as { __fn7ready?: boolean }).__fn7ready = true;
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
    const close = () => setOpenOn(null);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    window.addEventListener("hashchange", close);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("hashchange", close);
    };
  }, [open]);

  return (
    <header className="nav" data-scrolled={scrolled} data-open={open}>
      <div className="nav-in wrap">
        {bar}
        <button type="button" className="nav-toggle" aria-expanded={open} aria-controls="nav-sheet" onClick={() => setOpenOn(open ? null : pathname)}>
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span className="nav-toggle-bars" aria-hidden="true">
            <i />
            <i />
          </span>
        </button>
      </div>
      <div className="nav-sheet" id="nav-sheet">
        <div className="wrap">{sheet}</div>
      </div>
    </header>
  );
}
