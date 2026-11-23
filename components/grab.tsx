"use client";

import { useSyncExternalStore } from "react";
import { basketSnapshot, grabSlug, subscribeBasket } from "@/lib/basket";

export function Grab({ slug }: { slug: string }) {
  const raw = useSyncExternalStore(subscribeBasket, basketSnapshot, () => "[]");
  const inCrate = (JSON.parse(raw) as string[]).includes(slug);

  if (inCrate) {
    return (
      <a className="grab grabbed" href="/basket">
        In the crate
      </a>
    );
  }

  return (
    <button className="grab" type="button" onClick={() => grabSlug(slug)}>
      Grab
    </button>
  );
}
