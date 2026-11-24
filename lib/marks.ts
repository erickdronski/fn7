/**
 * Which third-party marks the site shows.
 *
 * A mark is only ever used to name the tool it belongs to. Some owners publish
 * a rule that asks for permission before their mark is used, or publish no rule
 * that could be confirmed. Those marks are held back and the name is shown in
 * text with one of fn/7's own icons. lib/install.ts records each rule and its
 * source, and a test keeps this list in step with it.
 *
 * To show them all, for example once permission is in hand, set
 * SHOW_MARKS_ON_HOLD to true. Nothing else needs to change.
 */
export const SHOW_MARKS_ON_HOLD = false;

export const MARKS_ON_HOLD = ["claude", "copilot", "gemini", "mcp", "windsurf"] as const;

const HELD: ReadonlySet<string> = new Set(MARKS_ON_HOLD);

export function canShowMark(name: string, showHeld: boolean = SHOW_MARKS_ON_HOLD): boolean {
  return showHeld || !HELD.has(name);
}
