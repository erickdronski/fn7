import {
  siApplepay,
  siBitcoin,
  siClaude,
  siCoinbase,
  siCursor,
  siDiscord,
  siEthereum,
  siGithub,
  siGithubcopilot,
  siGooglegemini,
  siGooglepay,
  siLangchain,
  siMastercard,
  siModelcontextprotocol,
  siN8n,
  siNpm,
  siPaypal,
  siRaycast,
  siSolana,
  siStripe,
  siVisa,
  siWindsurf,
  siX,
  siZapier,
} from "simple-icons";

/**
 * Third-party marks, used only to name the service they belong to. The paths
 * come from the simple-icons set. Each mark belongs to its owner.
 */
const BRANDS = {
  visa: siVisa,
  mastercard: siMastercard,
  applepay: siApplepay,
  googlepay: siGooglepay,
  stripe: siStripe,
  paypal: siPaypal,
  solana: siSolana,
  ethereum: siEthereum,
  bitcoin: siBitcoin,
  coinbase: siCoinbase,
  github: siGithub,
  claude: siClaude,
  cursor: siCursor,
  gemini: siGooglegemini,
  copilot: siGithubcopilot,
  windsurf: siWindsurf,
  mcp: siModelcontextprotocol,
  zapier: siZapier,
  n8n: siN8n,
  discord: siDiscord,
  langchain: siLangchain,
  raycast: siRaycast,
  npm: siNpm,
  x: siX,
} as const;

export type BrandName = keyof typeof BRANDS;

export function hasBrand(name: string): name is BrandName {
  return name in BRANDS;
}

export function BrandIcon({ name, size = 20, className }: { name: BrandName; size?: number; className?: string }) {
  const brand = BRANDS[name];
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor" role="img" aria-label={brand.title}>
      <path d={brand.path} />
    </svg>
  );
}
