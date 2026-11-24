import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/ui/copy-button";
import { PixelIcon } from "@/components/ui/pixel-icon";
import { Reveal } from "@/components/ui/reveal";
import type { DonationWay } from "@/lib/support";

/**
 * The ways to give. A way that isn't open says so and shows nothing to press.
 * An open wallet prints its public address with a button to copy it.
 */
export function DonationWays({ ways }: { ways: DonationWay[] }) {
  return (
    <ul className="backing">
      {ways.map((way, index) => (
        <li key={way.name}>
          <Reveal delay={index * 70}>
            <div className="back">
              <PixelIcon name={way.icon} size={36} />
              <h3>{way.name}</h3>
              <p>{way.text}</p>
              {!way.open ? <span className="state">Not open yet</span> : null}
              {way.open && way.kind === "link" && way.href ? (
                <Button href={way.href} size="sm">
                  {way.action}
                </Button>
              ) : null}
              {way.open && way.kind === "address"
                ? way.chains.map((entry) => (
                    <div key={entry.chain} className="give-address">
                      <p>
                        {entry.coins} on {entry.chain}
                      </p>
                      <code className="mono">{entry.address}</code>
                      <CopyButton text={entry.address} label="Copy address" />
                    </div>
                  ))
                : null}
            </div>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
