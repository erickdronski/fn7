"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useSyncExternalStore } from "react";

const CHANGED = "fn7:query";

function subscribe(onChange: () => void) {
  window.addEventListener("popstate", onChange);
  window.addEventListener(CHANGED, onChange);
  return () => {
    window.removeEventListener("popstate", onChange);
    window.removeEventListener(CHANGED, onChange);
  };
}

const readQuery = () => window.location.search;
/** The server renders the plain page. The browser applies the address's choices once scripts run. */
const readOnServer = () => "";

/**
 * State that lives in the page's query string, so a view can be shared by
 * its address. Reading is synchronous, so a control never flicks back to
 * its old value between a click and the update.
 */
export function useUrlState<T>(parse: (params: URLSearchParams) => T, toQuery: (state: T) => string): [T, (next: T) => void] {
  const query = useSyncExternalStore(subscribe, readQuery, readOnServer);
  const state = useMemo(() => parse(new URLSearchParams(query)), [parse, query]);

  function set(next: T) {
    const written = toQuery(next);
    window.history.replaceState(null, "", written ? `${window.location.pathname}?${written}` : window.location.pathname);
    window.dispatchEvent(new Event(CHANGED));
  }

  return [state, set];
}

/**
 * Next changes the address itself when a link points at the page you are
 * already on. This tells the state above to read it again. It renders
 * nothing, and sits inside its own Suspense boundary so the rest of the
 * page can be prerendered.
 */
export function UrlWatcher() {
  const params = useSearchParams();
  const query = params.toString();
  useEffect(() => {
    window.dispatchEvent(new Event(CHANGED));
  }, [query]);
  return null;
}
