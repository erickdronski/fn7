/**
 * The easter-egg registry (platform design, 4.10). Every wink lives here:
 * where it is, what triggers it, the line, and what it nods to. The rules:
 * winks not assets, plain words first, never in facts, never required.
 */
export const EGGS_ENABLED = true;

export type Egg = { id: string; where: string; trigger: string; line: string; nodsTo: string };

export const EGGS = {
  notFound: {
    id: "not-found",
    where: "404 page",
    trigger: "Visiting a page that doesn't exist",
    line: "This is not the listing you're looking for.",
    nodsTo: "Star Wars",
  },
  useTheSource: {
    id: "use-the-source",
    where: "/open-source headline",
    trigger: "Visiting the page",
    line: "Use the source.",
    nodsTo: "Star Wars",
  },
  fork: {
    id: "fork",
    where: "/open-source fork link",
    trigger: "Reading the fork link's second line",
    line: "May the fork be with you.",
    nodsTo: "Star Wars",
  },
  kungFu: {
    id: "kung-fu",
    where: "Agent story on the landing page",
    trigger: "The story reaches the install step",
    line: "Installed. Your agent knows kung fu.",
    nodsTo: "The Matrix",
  },
  konami: {
    id: "konami",
    where: "Anywhere on the landing page",
    trigger: "Typing the Konami code",
    line: "The whole market throws a short street party.",
    nodsTo: "Konami",
  },
  neverChanges: {
    id: "never-changes",
    where: "Creators section",
    trigger: "Reading the note under the split",
    line: "The 90% never changes.",
    nodsTo: "Fallout",
  },
} as const satisfies Record<string, Egg>;

/** Returns the egg's line, or the plain fallback when eggs are switched off. */
export function egg(key: keyof typeof EGGS, plain: string): string {
  return EGGS_ENABLED ? EGGS[key].line : plain;
}
