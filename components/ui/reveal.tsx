"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

/**
 * One entrance per block, played once as it scrolls into view. Without
 * JavaScript, or with reduced motion, the content is simply there.
 */
export function Reveal({ delay = 0, className, children }: { delay?: number; className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setSeen(true);
        observer.disconnect();
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal${seen ? " is-in" : ""}${className ? ` ${className}` : ""}`} style={{ "--d": `${delay}ms` } as CSSProperties}>
      {children}
    </div>
  );
}
