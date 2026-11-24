/** Every route and outbound link the site uses. Pages never type a URL. */

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
    conduct: `${REPO}/blob/main/CODE_OF_CONDUCT.md`,
    security: `${REPO}/security/advisories/new`,
    feedback: `${REPO}/issues/new?template=feedback.yml`,
    idea: `${REPO}/issues/new?template=idea.yml`,
    bug: `${REPO}/issues/new?template=bug.yml`,
  },
  design: {
    platform: PLATFORM,
    catalog: CATALOG,
  },
} as const;

/** Internal routes. Every one of these is a real page. */
export const ROUTES = {
  home: "/",
  agents: "/agents",
  creators: "/creators",
  rank: "/rank",
  payments: "/payments",
  trust: "/trust",
  docs: "/docs",
  faq: "/faq",
  openSource: "/open-source",
  roadmap: "/open-source#roadmap",
  changelog: "/changelog",
  security: "/security",
  legal: "/legal",
} as const;

export type NavLink = { label: string; href: string; note?: string };

export const NAV_LINKS: NavLink[] = [
  { label: "Agents", href: ROUTES.agents },
  { label: "Creators", href: ROUTES.creators },
  { label: "Earned pricing", href: ROUTES.rank },
  { label: "Payments", href: ROUTES.payments },
  { label: "Trust", href: ROUTES.trust },
];

export const RESOURCES_MENU: NavLink[] = [
  { label: "Docs", href: ROUTES.docs, note: "How fn/7 works, and where to read more" },
  { label: "Questions", href: ROUTES.faq, note: "Short answers to common questions" },
  { label: "Changelog", href: ROUTES.changelog, note: "What shipped, newest first" },
  { label: "Security", href: ROUTES.security, note: "How to report a vulnerability" },
];

export const BUILD_MENU: NavLink[] = [
  { label: "Open source", href: ROUTES.openSource, note: "How fn/7 is built, and how to help" },
  { label: "Roadmap", href: ROUTES.roadmap, note: "Eleven milestones, M0 to M10" },
  { label: "Share feedback", href: SITE.repo.feedback, note: "Tell us what you think" },
  { label: "Contribute", href: SITE.repo.contributing, note: "Send a pull request" },
  { label: "Read the design", href: SITE.design.platform, note: "The full platform design" },
];

export function isExternal(href: string): boolean {
  return /^https?:/.test(href);
}
