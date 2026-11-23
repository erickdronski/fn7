import Link from "next/link";
import { notFound } from "next/navigation";
import { Keeper } from "@/components/pixel";
import { goodsIn, stallBySlug, stalls } from "@/lib/catalog";
import { formatStamp } from "@/lib/prices";

export const instant = false;

export function generateStaticParams() {
  return stalls.map((stall) => ({ slug: stall.slug }));
}

export default async function StallPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const stall = stallBySlug(slug);
  if (!stall) notFound();
  const shelf = goodsIn(stall.slug);

  return (
    <main>
      <Link className="back" href="/">
        The street
      </Link>
      <header className="page-head">
        <div className="stall-top" style={{ background: stall.accent, color: stall.ink, border: "4px solid #f3e6c8" }}>
          <div>
            <h1 className="pixel">{stall.name}</h1>
            <p>
              {stall.keeper}. {stall.blurb}
            </p>
          </div>
          <Keeper rows={stall.sprite} label={stall.keeper} />
        </div>
      </header>
      <ul className="good-list">
        {shelf.map((good) => (
          <li key={good.slug}>
            <Link href={`/good/${good.slug}`}>
              <strong>{good.title}</strong>
              <span>{good.summary}</span>
              <b className={`stamp stamp-${good.priceCents}`}>{formatStamp(good.priceCents)}</b>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
