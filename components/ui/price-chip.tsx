import { formatPrice, tierTone } from "@/lib/tiers";

/** The small notched label that shows a price (glossary: price chip). */
export function PriceChip({ cents, className }: { cents: number; className?: string }) {
  return <span className={`chip chip-${tierTone(cents)} ${className ?? ""}`}>{formatPrice(cents)}</span>;
}
