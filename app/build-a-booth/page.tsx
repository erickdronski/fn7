import { permanentRedirect } from "next/navigation";
import { marketOrigin } from "@/lib/public-market";

export default function Page() {
  permanentRedirect(marketOrigin + "/account/seller");
}
