export function multiplier(itemCount: number): number {
  if (itemCount >= 5) return 3;
  if (itemCount === 4) return 2.5;
  if (itemCount === 3) return 2;
  if (itemCount === 2) return 1.5;
  return 1;
}

export function pointsFor(totalCents: number, itemCount: number): number {
  if (itemCount <= 0) return 0;
  return Math.round((totalCents / 100) * multiplier(itemCount));
}

export type Patch = "Walk-in" | "Regular" | "Hauler" | "Keyholder";

export function patchFor(points: number): Patch {
  if (points >= 400) return "Keyholder";
  if (points >= 150) return "Hauler";
  if (points >= 30) return "Regular";
  return "Walk-in";
}

export function nextPatch(points: number): { name: Patch; at: number } | null {
  if (points < 30) return { name: "Regular", at: 30 };
  if (points < 150) return { name: "Hauler", at: 150 };
  if (points < 400) return { name: "Keyholder", at: 400 };
  return null;
}
