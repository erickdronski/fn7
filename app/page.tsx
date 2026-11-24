import { StreetHome } from "@/components/street-home";
import { goods, offerings, stalls } from "@/lib/catalog";

export default function Street() {
  return <StreetHome stalls={stalls} goods={goods} offerings={offerings} />;
}
