import { Wordmark } from "@/components/site/wordmark";
import { BrandIcon } from "@/components/ui/brand-icon";
import { Reveal } from "@/components/ui/reveal";
import { RAILS, type Rail } from "@/lib/content";

function RailMark({ rail }: { rail: Rail }) {
  if (rail.brand) return <BrandIcon name={rail.brand} size={26} />;
  if (rail.name === "fn/7 balance") return <Wordmark className="rail-wordmark" />;
  return <span className="rail-text mono">{rail.name}</span>;
}

/** The ways to pay, each with its real mark. `compact` shows the launch rails as a row of chips. */
export function Rails({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <ul className="rails" aria-label="Ways to pay">
        {RAILS.filter((rail) => rail.when === "At launch").map((rail) => (
          <li key={rail.name}>
            {rail.brand ? <BrandIcon name={rail.brand} size={16} /> : null}
            {rail.name}
          </li>
        ))}
      </ul>
    );
  }
  return (
    <ul className="railgrid">
      {RAILS.map((rail, index) => (
        <li key={rail.name}>
          <Reveal delay={(index % 4) * 50}>
            <div className="rail">
              <div className="rail-mark">
                <RailMark rail={rail} />
              </div>
              <h3>{rail.name}</h3>
              <p>{rail.note}</p>
              <span className={`state${rail.when === "At launch" ? " state-building" : ""}`}>{rail.when}</span>
            </div>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
