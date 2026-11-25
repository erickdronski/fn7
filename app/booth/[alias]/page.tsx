import { notFound, permanentRedirect } from "next/navigation";
import { boothHref } from "@/lib/public-market";

export const instant = false;
export default async function Page({ params }: { params: Promise<{ alias: string }> }) {
  const url = boothHref((await params).alias);
  if (!url) notFound();
  permanentRedirect(url);
}
