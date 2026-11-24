"use client";

import { useEffect, useRef } from "react";
import { mountScene } from "./engine";

const INTRO_KEY = "fn7-intro-seen";

/**
 * The pixel market behind the hero. It mounts after first paint, so it never
 * delays the headline. The camera descent plays once per session. With
 * reduced motion it draws one still frame.
 */
export function MarketScene() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = ref.current;
    if (!stage) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let scene: ReturnType<typeof mountScene> | undefined;

    const start = () => {
      scene = mountScene(stage, { reducedMotion, pointerTarget: stage.closest("[data-scene-host]") ?? stage });
      let seen = false;
      try {
        seen = window.sessionStorage.getItem(INTRO_KEY) === "1";
        window.sessionStorage.setItem(INTRO_KEY, "1");
      } catch {
        seen = false;
      }
      if (!reducedMotion && !seen) stage.classList.add("intro");
      stage.dataset.ready = "true";
    };

    const party = () => scene?.party();
    window.addEventListener("fn7:party", party);
    const timer = window.setTimeout(start, 60);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("fn7:party", party);
      scene?.destroy();
    };
  }, []);

  return (
    <div ref={ref} className="scene" aria-hidden="true">
      <div className="world" />
    </div>
  );
}
