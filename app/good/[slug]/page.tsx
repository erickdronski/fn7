import { GoodRouter } from "@/components/good-router";
import { goods } from "@/lib/catalog";

export function generateStaticParams() {
  return goods.map((good) => ({ slug: good.slug }));
}

export default async function GoodPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <GoodRouter slug={slug} />;
}
