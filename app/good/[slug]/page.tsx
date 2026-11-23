import Link from "next/link";
import { notFound } from "next/navigation";
import { Grab } from "@/components/grab";
import { goodBySlug, goods, stallBySlug } from "@/lib/catalog";
import { formatStamp } from "@/lib/prices";

export const instant = false;

export function generateStaticParams() {
  return goods.map((good) => ({ slug: good.slug }));
}

export default async function GoodPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const good = goodBySlug(slug);
  if (!good) notFound();
  const stall = stallBySlug(good.stall);
  if (!stall) notFound();

  return (
    <main className="good-sheet">
      <Link className="back" href={`/stall/${stall.slug}`}>
        {stall.name}
      </Link>
      <header className="page-head">
        <p className="kind">
          {stall.keeper} · {good.kind}
        </p>
        <h1 className="pixel">{good.title}</h1>
        <p>{good.summary}</p>
      </header>
      <p className={`stamp stamp-${good.priceCents}`}>{formatStamp(good.priceCents)}</p>
      <p className="sample">{good.sample}</p>
      <p className="license">
        Use it in your own work, including work you sell. Do not resell the file.
      </p>
      <Grab slug={good.slug} />
    </main>
  );
}
