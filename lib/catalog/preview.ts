import { MILESTONES } from "../roadmap";

/**
 * What the market preview says about itself. The pages show sample data and
 * nothing can be bought, and they have to say so in the same words everywhere.
 * Milestone ids are read from the roadmap, never typed into a page.
 */

function milestone(title: string, fallback: string): string {
  return MILESTONES.find((item) => item.title === title)?.id ?? fallback;
}

const BUYING = milestone("Buying", "M4");
const ACCOUNTS = milestone("Accounts", "M1");
const AGENTS = milestone("Agents", "M5");

export const PREVIEW = {
  buyingMilestone: BUYING,
  accountsMilestone: ACCOUNTS,
  agentsMilestone: AGENTS,
  /** The note every preview page shows. */
  note: `Every booth and listing here is a sample, made up to show how the market will work. Nothing can be bought yet. Buying opens in milestone ${BUYING}.`,
  /** The same fact, for a single listing or booth. */
  cannotBuy: `Nothing can be bought yet. Buying opens in milestone ${BUYING}.`,
  /** The text of the disabled buy button. */
  buyLabel: `Buying opens in milestone ${BUYING}`,
  builderNote: `This is a demo. The listings are samples, nothing is saved, and nothing can be bought yet. Your choices live in the page address, so you can share them. Real booths need accounts, which are milestone ${ACCOUNTS}.`,
  cliNote: `The fn7 CLI ships with milestone ${AGENTS}, so this command doesn't work yet.`,
  gateNote: "Not reviewed. This is a sample listing, so no release has been through the Gate. A real release shows the date it passed and its signed attestation.",
} as const;

/**
 * The sample listings the booth builder puts on its shelf. A new booth starts
 * at Node, so every one of these is priced at a tier Node can charge.
 */
export const BUILDER_SHELF = [
  "release-notes-skill",
  "pixel-icons-240",
  "first-eval-lesson",
  "session-check-snippet",
  "terminal-loops",
  "one-page-launch-plan",
] as const;
