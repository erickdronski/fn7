"use client";

import { useEffect, useRef, useState } from "react";

const format = new Intl.NumberFormat("en-US");

/**
 * A number that rolls up to its value the first time it is seen. The server
 * renders the real value, so it reads correctly without JavaScript. A null
 * value renders nothing: a count we couldn't fetch is never shown as zero.
 */
export function Count({ value, className }: { value: number | null; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(value ?? 0);

  useEffect(() => {
    const element = ref.current;
    if (!element || value === null) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const started = performance.now();
      const tick = (now: number) => {
        const progress = Math.min(1, (now - started) / 900);
        setShown(Math.round(value * (1 - Math.pow(1 - progress, 4))));
        if (progress < 1) frame = window.requestAnimationFrame(tick);
      };
      frame = window.requestAnimationFrame(tick);
    });
    observer.observe(element);
    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
    };
  }, [value]);

  if (value === null) return null;
  return (
    <span ref={ref} className={`num ${className ?? ""}`}>
      {format.format(shown)}
    </span>
  );
}
