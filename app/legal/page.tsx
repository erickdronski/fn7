import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page/blocks";
import { Reveal } from "@/components/ui/reveal";
import { LEGAL_DOCS, LEGAL_NOTICE, LEGAL_UPDATED } from "@/lib/legal";
import { ROUTES, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Legal",
  description: "fn/7's terms, privacy policy, acceptable use, copyright, refunds, licenses, cookies and payment disclosures. Drafts, before launch.",
  alternates: { canonical: ROUTES.legal },
};

export default function LegalIndex() {
  return (
    <>
      <PageHero title="Legal" lead={LEGAL_NOTICE} note={`Last updated ${LEGAL_UPDATED}.`} />
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap narrow">
          <ul className="doclist">
            {LEGAL_DOCS.map((doc, index) => (
              <li key={doc.slug}>
                <Reveal delay={index * 40}>
                  <Link className="tile docrow" href={`${ROUTES.legal}/${doc.slug}`}>
                    <h2>{doc.title}</h2>
                    <p>{doc.summary}</p>
                  </Link>
                </Reveal>
              </li>
            ))}
            <li>
              <Reveal delay={LEGAL_DOCS.length * 40}>
                <a className="tile docrow" href={SITE.repo.conduct} target="_blank" rel="noreferrer">
                  <h2>Code of conduct</h2>
                  <p>How everyone taking part in the project is expected to behave. Kept in the repository.</p>
                </a>
              </Reveal>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
