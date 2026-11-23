import Link from "next/link";
import { Keeper } from "@/components/pixel";
import { goodsIn, offerings, stalls } from "@/lib/catalog";
import { formatStamp } from "@/lib/prices";

export default function Street() {
  return (
    <main>
      <section className="offerings" aria-label="What this market is">
        {offerings.map((offer) => (
          <article className="offering" key={offer.kicker} style={{ borderColor: offer.accent }}>
            <div className="kicker" style={{ color: offer.accent }}>
              {offer.kicker}
            </div>
            <h2>{offer.title}</h2>
            <p>{offer.body}</p>
          </article>
        ))}
      </section>
      <section className="lane" aria-label="Stalls">
        {stalls.map((stall) => (
          <Link key={stall.slug} href={`/stall/${stall.slug}`} className="stall">
            <div className="stall-top" style={{ background: stall.accent, color: stall.ink }}>
              <div>
                <div className="pixel">{stall.name}</div>
                <small>{stall.keeper}</small>
              </div>
              <Keeper rows={stall.sprite} label={stall.keeper} />
            </div>
            <ul className="shelf-peek">
              {goodsIn(stall.slug).map((good) => (
                <li key={good.slug}>
                  {good.title}
                  <span className={`stamp stamp-${good.priceCents}`}>{formatStamp(good.priceCents)}</span>
                </li>
              ))}
            </ul>
          </Link>
        ))}
      </section>
      <p className="foot">Eight stalls. Nothing over $5. The street is edited. The code is public.</p>
    </main>
  );
}
