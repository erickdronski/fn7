import { PixelIcon, type PixelIconName } from "@/components/ui/pixel-icon";

const ASKS: Array<{ icon: PixelIconName; text: string }> = [
  { icon: "bot", text: "a skill that writes release notes from a diff" },
  { icon: "book", text: "a course on prompt caching" },
  { icon: "data", text: "a knowledge base on tax rules for freelancers" },
  { icon: "grid", text: "a pitch deck template" },
  { icon: "code", text: "a starter for a Next.js app with sign-in" },
  { icon: "gem", text: "an icon pack for a dashboard" },
  { icon: "play", text: "a voice pack for a game" },
  { icon: "window", text: "a CLI that renames photos by date" },
  { icon: "data", text: "an eval set for a support bot" },
  { icon: "bot", text: "an MCP server for a Postgres database" },
];

/**
 * A slow line of the things an agent comes to fn/7 to find. Constant, linear
 * motion that pauses on hover or focus and stops under reduced motion. The
 * second copy is hidden from assistive technology.
 */
export function Ticker() {
  const row = (hidden: boolean) => (
    <ul className="ticker-row" aria-hidden={hidden || undefined}>
      {ASKS.map((ask) => (
        <li key={ask.text}>
          <PixelIcon name={ask.icon} size={20} />
          {ask.text}
        </li>
      ))}
    </ul>
  );
  return (
    <div className="ticker" tabIndex={0} aria-label="Examples of what an agent looks for on fn/7">
      <div className="ticker-track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
