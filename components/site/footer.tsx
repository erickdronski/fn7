import Link from "next/link";
import { FACTS } from "@/lib/facts";
import { SITE } from "@/lib/site";
import { Wordmark } from "./wordmark";

type Item = { label: string; href: string };

const COLUMNS: Array<{ title: string; items: Item[] }> = [
  {
    title: "The market",
    items: [
      { label: "For agents", href: "/#agents" },
      { label: "For creators", href: "/#creators" },
      { label: "Payments", href: "/#payments" },
      { label: "Rank and price tiers", href: "/#status" },
      { label: "The Gate", href: "/#gate" },
      { label: "Spec sheet", href: "/#spec" },
    ],
  },
  {
    title: "Build with us",
    items: [
      { label: "Open source", href: "/open-source" },
      { label: "Roadmap", href: "/open-source#roadmap" },
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
  {
    title: "Design",
    items: [
      { label: "Platform design", href: SITE.design.platform },
      { label: "Catalog and publishing", href: SITE.design.catalog },
      { label: "The fn7.json package", href: SITE.design.packageFormat },
      { label: "GitHub", href: SITE.repo.url },
    ],
  },
];

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-grid">
        <div>
          <Link href="/" aria-label="fn/7, home" className="footer-mark">
            <Wordmark />
          </Link>
        </div>
        {COLUMNS.map((column) => (
          <div key={column.title}>
            <h2 className="footer-title">{column.title}</h2>
            <ul>
              {column.items.map((item) => (
                <li key={item.label}>
                  {/^https?:/.test(item.href) ? (
                    <a className="link footer-link" href={item.href} target="_blank" rel="noreferrer">
                      {item.label}
                    </a>
                  ) : (
                    <Link className="link footer-link" href={item.href}>
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="wrap footer-fine">
        <p>{FACTS.definition}</p>
        <p>
          {FACTS.status} The code is licensed {FACTS.license}. The name, the wordmark and the pixel art are reserved.
        </p>
      </div>
    </footer>
  );
}
