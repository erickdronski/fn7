import Link from "next/link";
import { SHARE } from "@/lib/copy";
import { FACTS } from "@/lib/facts";
import { ROUTES } from "@/lib/site";
import { formatPrice } from "@/lib/tiers";

/**
 * The small print behind every "90%*". The share itself never moves; what
 * changes with the way a buyer pays is who covers the cost of moving the money.
 */
export function ShareFootnote() {
  return (
    <p className="footnote">
      * {SHARE.creator} of the price the buyer pays, on every way to pay. Card processing fees come out of fn/7&rsquo;s {SHARE.fn7}, which is why a card purchase starts at {formatPrice(FACTS.cardMinimumCents)}. On-chain, the buyer pays the
      network fee. A refunded sale, or a card dispute that is lost, is reversed. <Link href={ROUTES.payments}>How payments work</Link>
    </p>
  );
}
