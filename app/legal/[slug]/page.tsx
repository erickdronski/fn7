import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LEGAL_DOCS, LEGAL_NOTICE, LEGAL_UPDATED } from "@/lib/legal";
import { ROUTES } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return LEGAL_DOCS.map((doc) => ({ slug: doc.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const doc = LEGAL_DOCS.find((item) => item.slug === slug);
  if (!doc) return {};
  return { title: doc.title, description: doc.summary, alternates: { canonical: `${ROUTES.legal}/${doc.slug}` } };
}

export default async function LegalDocPage({ params }: Props) {
  const { slug } = await params;
  const doc = LEGAL_DOCS.find((item) => item.slug === slug);
  if (!doc) notFound();

  return (
    <article className="prose-page">
      <div className="wrap narrow">
        <p className="crumb">
          <Link className="link link-on" href={ROUTES.legal}>
            Legal
          </Link>
        </p>
        <h1 className="display">{doc.title}</h1>
        <p className="prose-lead">{doc.summary}</p>
        <p className="draft-note">
          <strong>Draft.</strong> {LEGAL_NOTICE} Last updated {LEGAL_UPDATED}.
        </p>
        <div className="prose">
          {doc.sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.bullets ? (
                <ul>
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>
        <nav className="prose-nav" aria-label="Other legal documents">
          {LEGAL_DOCS.filter((item) => item.slug !== doc.slug).map((item) => (
            <Link key={item.slug} className="btn btn-line btn-sm" href={`${ROUTES.legal}/${item.slug}`}>
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
    </article>
  );
}
