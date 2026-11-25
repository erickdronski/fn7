import Link from "next/link";
import { FACTS } from "@/lib/facts";
import { LEGAL_DOCS } from "@/lib/legal";
import { ROUTES, SITE, isExternal } from "@/lib/site";
import { SocialLinks } from "./social-links";
import { Wordmark } from "./wordmark";

type Item = { label: string; href: string };

const COLUMNS: Array<{ title: string; items: Item[] }> = [
  {
    title: "The market",
    items: [
      { label: "Browse the market", href: ROUTES.market },
      { label: "For agents", href: ROUTES.agents },
      { label: "For creators", href: ROUTES.creators },
      { label: "Build a booth", href: ROUTES.buildABooth },
      { label: "Earned pricing", href: ROUTES.rank },
      { label: "Payments", href: ROUTES.payments },
      { label: "Trust and the Gate", href: ROUTES.trust },
    ],
  },
  {
    title: "Resources",
    items: [
      { label: "Why fn/7", href: ROUTES.about },
      { label: "Add fn/7 to your tools", href: ROUTES.install },
      { label: "Docs", href: ROUTES.docs },
      { label: "Questions", href: ROUTES.faq },
      { label: "Changelog", href: ROUTES.changelog },
      { label: "Security", href: ROUTES.security },
      { label: "llms.txt", href: "/llms.txt" },
    ],
  },
  {
    title: "Build with us",
    items: [
      { label: "Open source", href: ROUTES.openSource },
      { label: "Roadmap", href: ROUTES.roadmap },
      { label: "Support the project", href: ROUTES.support },
      { label: "Contributing guide", href: SITE.repo.contributing },
      { label: "Good first issues", href: SITE.repo.goodFirstIssues },
      { label: "Discussions", href: SITE.repo.discussions },
    ],
  },
  {
    title: "Feedback",
    items: [
      { label: "Share feedback", href: SITE.repo.feedback },
      { label: "Suggest an idea", href: SITE.repo.idea },
      { label: "Report a bug", href: SITE.repo.bug },
      { label: "Report a vulnerability", href: SITE.repo.security },
    ],
  },
];

function FooterLink({ item, className }: { item: Item; className: string }) {
  return isExternal(item.href) ? (
    <a className={className} href={item.href} target="_blank" rel="noreferrer">
      {item.label}
    </a>
  ) : (
    <Link className={className} href={item.href}>
      {item.label}
    </Link>
  );
}

export function Footer() {
  const legal: Item[] = [
    ...LEGAL_DOCS.map((doc) => ({ label: doc.title, href: `${ROUTES.legal}/${doc.slug}` })),
    { label: "Code of conduct", href: SITE.repo.conduct },
  ];

  return (
    <footer className="footer">
      <div className="wrap footer-grid">
        <div className="footer-about">
          <Link href="/" aria-label="fn/7, home" className="footer-mark">
            <Wordmark />
          </Link>
          <p>{FACTS.definition}</p>
          <SocialLinks />
        </div>
        {COLUMNS.map((column) => (
          <div key={column.title}>
            <h2 className="footer-title">{column.title}</h2>
            <ul>
              {column.items.map((item) => (
                <li key={item.label}>
                  <FooterLink item={item} className="link footer-link" />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="legalbar">
        <div className="wrap legalbar-in">
          <p>© 2026 fn/7. Code under {FACTS.license}.</p>
          <nav aria-label="Legal">
            <ul>
              {legal.map((item) => (
                <li key={item.label}>
                  <FooterLink item={item} className="link legalbar-link" />
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
