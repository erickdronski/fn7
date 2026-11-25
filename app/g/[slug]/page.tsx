import { notFound, permanentRedirect } from "next/navigation";
import { editionHref } from "@/lib/public-market";

export const instant = false;
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const url = editionHref((await params).slug);
  if (!url) notFound();
  permanentRedirect(url);
}
