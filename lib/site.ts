/** Every outbound link and route the site uses. Pages never type a URL. */

const OWNER = "erickdronski";
const NAME = "fn7";
const REPO = `https://github.com/${OWNER}/${NAME}`;
const SPECS = `${REPO}/blob/main/docs/superpowers/specs`;
const PLATFORM = `${SPECS}/2026-11-24-fn7-platform-design.md`;
const CATALOG = `${SPECS}/2026-11-24-fn7-catalog-and-publishing-design.md`;

export const SITE = {
  origin: "https://fn7.ai",
  repo: {
    owner: OWNER,
    name: NAME,
    url: REPO,
    api: `https://api.github.com/repos/${OWNER}/${NAME}`,
    fork: `${REPO}/fork`,
    issues: `${REPO}/issues`,
    goodFirstIssues: `${REPO}/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22`,
    discussions: `${REPO}/discussions`,
    contributing: `${REPO}/blob/main/CONTRIBUTING.md`,
    security: `${REPO}/security/advisories/new`,
    feedback: `${REPO}/issues/new?template=feedback.yml`,
    idea: `${REPO}/issues/new?template=idea.yml`,
    bug: `${REPO}/issues/new?template=bug.yml`,
  },
  design: {
    platform: PLATFORM,
    catalog: CATALOG,
    agents: `${PLATFORM}#11-agents`,
    payments: `${PLATFORM}#10-payments`,
    status: `${PLATFORM}#8-status`,
    gate: `${PLATFORM}#9-the-gate-vetting`,
    publishing: `${CATALOG}#6-publishing`,
    packageFormat: `${CATALOG}#5-the-package`,
    whatCanBeSold: `${CATALOG}#4-what-can-be-sold`,
  },
} as const;

export type NavLink = { label: string; href: string; note?: string };

export const NAV_LINKS: NavLink[] = [
  { label: "Agents", href: "/#agents" },
  { label: "Creators", href: "/#creators" },
  { label: "Payments", href: "/#payments" },
  { label: "Trust", href: "/#gate" },
];

export const BUILD_MENU: NavLink[] = [
  { label: "Open source", href: "/open-source", note: "How fn/7 is built, and how to help" },
  { label: "Roadmap", href: "/open-source#roadmap", note: "Eleven milestones, M0 to M10" },
  { label: "Share feedback", href: SITE.repo.feedback, note: "Tell us what you think" },
  { label: "Contribute", href: SITE.repo.contributing, note: "Send a pull request" },
  { label: "Read the design", href: SITE.design.platform, note: "The full platform design" },
];
