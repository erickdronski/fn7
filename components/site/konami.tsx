"use client";

import { useEffect } from "react";
import { EGGS_ENABLED } from "@/lib/eggs";

const CODE = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

/** Easter egg: the Konami code makes the market throw a short street party. */
export function Konami() {
  useEffect(() => {
    if (!EGGS_ENABLED) return;
    let at = 0;
    const onKey = (event: KeyboardEvent) => {
      const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
      at = key === CODE[at] ? at + 1 : key === CODE[0] ? 1 : 0;
      if (at === CODE.length) {
        at = 0;
        window.dispatchEvent(new Event("fn7:party"));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  return null;
}
