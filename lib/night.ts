export const NIGHT_SLUGS = new Set(["week-stamp", "bin-prompt", "dollar-label", "alias-card"]);

export function subscribeClock(): () => void {
  return () => {};
}

export function dollarNightLive(now = new Date()): boolean {
  const weekday = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    weekday: "short",
  }).format(now);
  return weekday === "Thu";
}

export function priceNow(
  good: { slug: string; priceCents: number },
  night: boolean,
): number {
  if (night && good.priceCents <= 500 && NIGHT_SLUGS.has(good.slug)) return 100;
  return good.priceCents;
}
