import type { PixelIconName } from "@/components/ui/pixel-icon";

/**
 * Ways to donate. A way opens only when the maintainer has set its public
 * link or address (see .env.example) and that value has the right shape.
 * Anything else is shown as "Not open yet", so the page never has a button
 * that leads nowhere or an address nobody checked.
 *
 * Only public values belong here. A private key or a seed phrase must never
 * be put in an environment file, this file or anywhere in the repository,
 * and the checks below refuse anything shaped like one.
 */

type Common = { name: string; icon: PixelIconName; text: string; open: boolean };

export type DonationChain = { chain: "Solana" | "Base"; coins: string; address: string };

export type DonationWay = (Common & { kind: "link"; action: string; href: string | null }) | (Common & { kind: "address"; chains: DonationChain[] });

/** The public values a deployment may set. Each one is optional. */
export type DonationSettings = { sponsors?: string; collective?: string; solana?: string; base?: string };

const SPONSORS = /^https:\/\/github\.com\/sponsors\/[A-Za-z0-9-]+$/;
const COLLECTIVE = /^https:\/\/opencollective\.com\/[A-Za-z0-9-]+$/;
/** Base58, the length of a public key. A Solana secret key is about twice as long. */
const SOLANA = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;
/** Twenty bytes. A private key is thirty-two, so it can't match. */
const EVM = /^0x[0-9a-fA-F]{40}$/;

function matching(value: string | undefined, shape: RegExp): string | null {
  const trimmed = value?.trim() ?? "";
  return shape.test(trimmed) ? trimmed : null;
}

export function sponsorsUrl(value: string | undefined): string | null {
  return matching(value, SPONSORS);
}

export function collectiveUrl(value: string | undefined): string | null {
  return matching(value, COLLECTIVE);
}

export function solanaAddress(value: string | undefined): string | null {
  return matching(value, SOLANA);
}

export function baseAddress(value: string | undefined): string | null {
  return matching(value, EVM);
}

export function donationWays(settings: DonationSettings): DonationWay[] {
  const sponsors = sponsorsUrl(settings.sponsors);
  const collective = collectiveUrl(settings.collective);
  const solana = solanaAddress(settings.solana);
  const base = baseAddress(settings.base);

  const chains: DonationChain[] = [];
  if (solana) chains.push({ chain: "Solana", coins: "USDC or SOL", address: solana });
  if (base) chains.push({ chain: "Base", coins: "USDC or ETH", address: base });

  return [
    {
      kind: "link",
      name: "GitHub Sponsors",
      icon: "star",
      text: "A one-time or monthly gift through GitHub, by card. Opens once the maintainer's sponsor profile is approved.",
      action: "Sponsor on GitHub",
      href: sponsors,
      open: sponsors !== null,
    },
    {
      kind: "address",
      name: "USDC, SOL or ETH",
      icon: "wallet",
      text: "Straight to the project's multisig wallet, on Solana or Base. An address is published here once its wallet exists.",
      chains,
      open: chains.length > 0,
    },
    {
      kind: "link",
      name: "Open Collective",
      icon: "data",
      text: "For companies that need an invoice, with every expense public. Opens if there is demand for it.",
      action: "Open the collective",
      href: collective,
      open: collective !== null,
    },
  ];
}
