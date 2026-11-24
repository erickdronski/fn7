import Link from "next/link";
import { Keeper } from "@/components/pixel";
import type { Stall } from "@/lib/catalog";

const walkers = [
  {
    name: "Courier",
    pose: ["..c.c..", ".ccccc.", "c.c.c.c", ".ccccc.", "..c.c..", ".c...c.", "c.....c"],
    className: "walker walker-a",
  },
  {
    name: "Maker",
    pose: [".y...y.", "yyyyyyy", "y.y.y.y", ".yyyyy.", "..y.y..", ".yy.yy.", "y.....y"],
    className: "walker walker-b",
  },
  {
    name: "Shopper",
    pose: ["..m.m..", ".mmmmm.", "m.m.m.m", ".mmmmm.", "..m.m..", "m.....m", ".m...m."],
    className: "walker walker-c",
  },
  {
    name: "Browser",
    pose: ["..p.p..", ".ppppp.", "p.p.p.p", ".ppppp.", "..ppp..", ".p...p.", "p.....p"],
    className: "walker walker-d",
  },
];

export function MarketScene({ stalls }: { stalls: Stall[] }) {
  return (
    <section className="hover-scene" aria-label="A hovering view of the night market">
      <div className="hover-floor">
        <div className="booth-row">
          {stalls.map((stall) => (
            <Link key={stall.slug} href={`/stall/${stall.slug}`} className="mini-booth" style={{ background: stall.accent, color: stall.ink }}>
              <Keeper rows={stall.sprite} label={stall.keeper} />
              <span className="pixel">{stall.name}</span>
            </Link>
          ))}
        </div>
        <div className="lane-paint" />
        {walkers.map((walker) => (
          <span key={walker.name} className={walker.className} aria-hidden="true">
            <Keeper rows={walker.pose} label={walker.name} />
          </span>
        ))}
        <span className="deal deal-a">$5</span>
        <span className="deal deal-b">$1</span>
        <span className="deal deal-c">grab</span>
      </div>
      <p className="hover-caption">Hovering the night market. The stalls below are the ones you can open.</p>
    </section>
  );
}
