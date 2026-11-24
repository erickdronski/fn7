"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type KeyboardEvent, type MouseEvent, type ReactNode } from "react";

export type InstallTab = { id: string; label: string; icon?: ReactNode };

/**
 * The selected tab lives in the URL hash, so a link to one tool can be shared.
 * replaceState fires no hashchange event, so tabs tell each other directly.
 */
const listeners = new Set<() => void>();

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  window.addEventListener("hashchange", onChange);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("hashchange", onChange);
  };
}

function readHash() {
  return decodeURIComponent(window.location.hash.slice(1));
}

function readServerHash() {
  return "";
}

function writeHash(id: string) {
  window.history.replaceState(window.history.state, "", `#${id}`);
  listeners.forEach((listener) => listener());
}

/**
 * A tablist with one sliding indicator. Arrow keys, Home and End move between
 * tabs, and each tab is a link to its own hash. Every panel is in the page, so
 * without scripts they simply stack and the tabs become jump links.
 */
export function InstallTabs({ label, tabs, panels }: { label: string; tabs: InstallTab[]; panels: ReactNode[] }) {
  const list = useRef<HTMLDivElement>(null);
  const hash = useSyncExternalStore(subscribe, readHash, readServerHash);
  const fromHash = tabs.find((tab) => tab.id === hash)?.id;
  const [active, setActive] = useState(tabs[0].id);

  // The URL wins whenever it names a tab. Any other hash leaves the choice alone.
  if (fromHash && fromHash !== active) setActive(fromHash);

  /** Puts the indicator under the selected tab. Its size and place are set with transform only. */
  const place = useCallback(() => {
    const element = list.current;
    const tab = element?.querySelector<HTMLElement>('[aria-selected="true"]');
    if (!element || !tab) return;
    element.style.setProperty("--tab-x", `${tab.offsetLeft}px`);
    element.style.setProperty("--tab-w", String(tab.offsetWidth));
    if (element.dataset.ready !== "true") {
      // Read layout once, so the first placement doesn't slide in from the edge.
      void element.offsetWidth;
      element.dataset.ready = "true";
    }
  }, []);

  useEffect(() => {
    place();
    const tab = list.current?.querySelector<HTMLElement>('[aria-selected="true"]');
    if (tab && list.current && list.current.scrollWidth > list.current.clientWidth) {
      const left = tab.offsetLeft - (list.current.clientWidth - tab.offsetWidth) / 2;
      list.current.scrollTo({ left, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    }
  }, [active, place]);

  useEffect(() => {
    const element = list.current;
    if (!element) return;
    const observer = new ResizeObserver(place);
    observer.observe(element);
    element.querySelectorAll('[role="tab"]').forEach((tab) => observer.observe(tab));
    return () => observer.disconnect();
  }, [place]);

  // A shared link to one tool lands on the tabs, not on the top of the page.
  useEffect(() => {
    if (tabs.some((tab) => tab.id === readHash())) list.current?.scrollIntoView({ block: "start" });
  }, [tabs]);

  function choose(id: string, focus: boolean) {
    writeHash(id);
    if (focus) document.getElementById(`tab-${id}`)?.focus({ preventScroll: true });
  }

  function onClick(event: MouseEvent<HTMLAnchorElement>, id: string) {
    // A modified click keeps its meaning: open the link somewhere else.
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    choose(id, false);
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const index = tabs.findIndex((tab) => tab.id === active);
    const last = tabs.length - 1;
    let next = -1;
    if (event.key === "ArrowRight") next = index === last ? 0 : index + 1;
    else if (event.key === "ArrowLeft") next = index === 0 ? last : index - 1;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = last;
    else if (event.key === " ") {
      // Links don't answer to Space by default. Tabs do.
      const id = (event.target as HTMLElement).id.replace(/^tab-/, "");
      if (tabs.some((tab) => tab.id === id)) next = tabs.findIndex((tab) => tab.id === id);
    }
    if (next < 0) return;
    event.preventDefault();
    choose(tabs[next].id, true);
  }

  return (
    <div className="install">
      <div ref={list} className="install-tabs" role="tablist" aria-label={label} aria-orientation="horizontal" onKeyDown={onKeyDown}>
        {tabs.map((tab) => (
          <a
            key={tab.id}
            id={`tab-${tab.id}`}
            className="install-tab"
            role="tab"
            href={`#${tab.id}`}
            aria-selected={tab.id === active}
            aria-controls={tab.id}
            tabIndex={tab.id === active ? 0 : -1}
            draggable={false}
            onClick={(event) => onClick(event, tab.id)}
          >
            <span>
              {tab.icon}
              {tab.label}
            </span>
          </a>
        ))}
        <span className="install-bar" aria-hidden="true" />
      </div>
      {tabs.map((tab, index) => (
        <div key={tab.id} id={tab.id} className="install-panel" role="tabpanel" aria-labelledby={`tab-${tab.id}`} tabIndex={0} data-active={tab.id === active}>
          {panels[index]}
        </div>
      ))}
    </div>
  );
}
