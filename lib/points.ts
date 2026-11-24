/** Buyer points and levels. Points are never spendable and have no cash value. */

export const POINTS_PER_LINE_CAP = 25;
export const LEVEL_THRESHOLDS = [0, 30, 150, 400, 1000, 2500] as const;
export type Level = 1 | 2 | 3 | 4 | 5 | 6;

/** The cart bonus: more goods in one checkout earn a higher multiplier. */
export function multiplier(itemCount: number): number {
  if (itemCount >= 5) return 3;
  if (itemCount === 4) return 2.5;
  if (itemCount === 3) return 2;
  if (itemCount === 2) return 1.5;
  return 1;
}

/** Points for one checkout. Each line counts its dollars, capped, then the cart bonus applies. */
export function pointsFor(lineCents: readonly number[]): number {
  if (lineCents.length === 0) return 0;
  const base = lineCents.reduce((sum, cents) => sum + Math.min(cents / 100, POINTS_PER_LINE_CAP), 0);
  return Math.round(base * multiplier(lineCents.length));
}

export function levelFor(points: number): Level {
  let level = 1;
  for (let i = 1; i < LEVEL_THRESHOLDS.length; i++) {
    if (points >= LEVEL_THRESHOLDS[i]) level = i + 1;
  }
  return level as Level;
}
