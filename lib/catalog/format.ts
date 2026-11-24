import type { Listing } from "../seed";
import type { Permissions } from "./types";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "2026-11-12" as "12 Nov 2026". Written by hand so the server and every browser agree. */
export function formatDay(day: string): string {
  const [year, month, date] = day.split("-").map(Number);
  return `${date} ${MONTHS[month - 1]} ${year}`;
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  const units = ["KB", "MB", "GB"];
  let value = bytes / 1024;
  let unit = 0;
  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024;
    unit += 1;
  }
  return `${value < 10 ? value.toFixed(1) : Math.round(value)} ${units[unit]}`;
}

export function totalBytes(listing: Pick<Listing, "files">): number {
  return listing.files.reduce((sum, file) => sum + file.bytes, 0);
}

/** "a", "a and b", "a, b and c". */
export function joinWords(words: readonly string[]): string {
  if (words.length <= 1) return words.join("");
  return `${words.slice(0, -1).join(", ")} and ${words[words.length - 1]}`;
}

/**
 * A good's declared permissions as short sentences (catalog design, 5.3):
 * what it runs, what it contacts, what it reads, and where it writes.
 * The write sentence is left out when the good writes nothing.
 */
export function permissionWords(permissions: Permissions): string[] {
  const words = [
    permissions.shell.length ? `Needs ${joinWords(permissions.shell)}.` : "Runs no commands.",
    permissions.network ? `Contacts ${joinWords(permissions.network)}.` : "No network.",
    permissions.secrets.length ? `Reads ${joinWords(permissions.secrets)}.` : "No secrets.",
  ];
  if (permissions.writes.length) {
    words.push(`Writes to ${joinWords(permissions.writes.map((path) => (path === "." ? "its own folder" : path)))}.`);
  }
  return words;
}

/** The one-line version shown beside a price: "Needs git. No network. No secrets." */
export function permissionsLine(permissions: Permissions): string {
  const words = permissionWords(permissions);
  // A good that runs nothing doesn't need a sentence about commands on the short line.
  return (permissions.shell.length ? words : words.slice(1)).join(" ");
}

/** A release's one stable name (catalog design, 5.2). */
export function releaseName(listing: Pick<Listing, "booth" | "slug" | "version">): string {
  return `fn7:@${listing.booth}/${listing.slug}@${listing.version}`;
}

/** The command that will install a release once the CLI ships. */
export function installCommand(listing: Pick<Listing, "booth" | "slug">): string {
  return `fn7 add @${listing.booth}/${listing.slug}`;
}
