"use client";

import { useEffect, useRef } from "react";
import { mountScene } from "./engine";

const INTRO_KEY = "fn7-intro-seen";

/**
 * The pixel market behind the hero. It mounts after first paint, so it never
 * delays the headline. The camera descent plays once per session, and any
 * scroll, key or press skips it. With reduced motion it draws one still frame.
 */
export function MarketScene() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = ref.current;
    if (!stage) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const controller = new AbortController();
    let scene: ReturnType<typeof mountScene> | undefined;

    const endIntro = () => stage.classList.remove("intro");

    const start = () => {
      scene = mountScene(stage, { reducedMotion, pointerTarget: stage.closest("[data-scene-host]") ?? stage });
      let seen = false;
      try {
        seen = window.sessionStorage.getItem(INTRO_KEY) === "1";
        window.sessionStorage.setItem(INTRO_KEY, "1");
      } catch {
        seen = false;
      }
      if (!reducedMotion && !seen) {
        stage.classList.add("intro");
        const options = { signal: controller.signal, once: true, passive: true } as const;
        stage.addEventListener("animationend", endIntro, options);
        window.addEventListener("wheel", endIntro, options);
        window.addEventListener("touchmove", endIntro, options);
        window.addEventListener("keydown", endIntro, options);
        window.addEventListener("pointerdown", endIntro, options);
      }
      stage.dataset.ready = "true";
    };

    window.addEventListener("fn7:party", () => scene?.party(), { signal: controller.signal });
    const timer = window.setTimeout(start, 60);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
      endIntro();
      scene?.destroy();
    };
  }, []);

  return (
    <div ref={ref} className="scene" aria-hidden="true">
      <div className="world" />
    </div>
  );
}
