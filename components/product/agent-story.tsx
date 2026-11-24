"use client";

import { useEffect, useRef, useState } from "react";
import { PriceChip } from "@/components/ui/price-chip";
import { egg } from "@/lib/eggs";

const STEPS = [
  { tool: "search", says: "“release notes from a git diff”", result: "3 releases match. All passed the Gate." },
  { tool: "get_listing", says: "@courier/release-notes-skill", result: "Needs git. No network. No secrets. Hub rank." },
  { tool: "checkout", says: "balance, cap $40 a month", result: "Paid $5. $31.00 left this month." },
  { tool: "install", says: "attestation and 4 file hashes verified", result: egg("kungFu", "Installed.") },
] as const;

const STEP_MS = 1900;

/**
 * A product story: the four calls an agent makes to buy and install a skill,
 * shown with the budget card they change. Sample data, real tool names.
 * It plays once in view, and can be paused and replayed.
 */
export function AgentStory() {
  const ref = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(STEPS.length - 1);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        setStep(0);
        setPlaying(true);
      },
      { threshold: 0.45 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const done = step >= STEPS.length - 1;

  useEffect(() => {
    if (!playing || done) return;
    const timer = window.setTimeout(() => setStep((at) => at + 1), STEP_MS);
    return () => window.clearTimeout(timer);
  }, [playing, done, step]);

  function onControl() {
    if (done) {
      setStep(0);
      setPlaying(true);
    } else {
      setPlaying((was) => !was);
    }
  }

  const spent = step >= 2 ? 9 : 4;
  const left = 40 - spent;

  return (
    <div className="story" ref={ref}>
      <ol className="story-calls" aria-label="The calls an agent makes">
        {STEPS.map((call, at) => (
          <li key={call.tool} className={at < step ? "is-done" : at === step ? "is-now" : "is-next"}>
            <div className="story-call">
              <code className="mono">{call.tool}</code>
              <span>{call.says}</span>
            </div>
            <p className="story-result">{call.result}</p>
          </li>
        ))}
      </ol>

      <div className="budget">
        <p className="budget-label">Agent budget, this month</p>
        <p className="budget-figure num">
          ${left}.00 <span>of $40 left</span>
        </p>
        <div className="budget-meter" role="img" aria-label={`$${spent} of $40 spent`}>
          <i style={{ transform: `scaleX(${left / 40})` }} />
        </div>
        <ul className="budget-rows">
          <li className={step >= 2 ? "is-in" : ""}>
            <span>Release-notes skill</span>
            <PriceChip cents={500} />
          </li>
          <li className="is-in">
            <span>Diff reader</span>
            <PriceChip cents={300} />
          </li>
          <li className="is-in">
            <span>Commit linter</span>
            <PriceChip cents={100} />
          </li>
        </ul>
      </div>

      <div className="story-controls">
        <button type="button" className="minibtn" onClick={onControl}>
          {done ? "Replay" : playing ? "Pause" : "Play"}
        </button>
        <span className="dim">Sample data. The tool names are the real ones.</span>
      </div>
    </div>
  );
}
