/** Questions and answers as native details elements. One opens at a time, by height with a fade. */
export function FaqList({ items, group = "faq" }: { items: ReadonlyArray<{ q: string; a: string }>; group?: string }) {
  return (
    <div>
      {items.map((item) => (
        <details key={item.q} className="faq-item" name={group}>
          <summary>
            {item.q}
            <svg className="faq-mark" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M7 1.5v11M1.5 7h11" />
            </svg>
          </summary>
          <p>{item.a}</p>
        </details>
      ))}
    </div>
  );
}

export function faqJsonLd(items: ReadonlyArray<{ q: string; a: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })),
  };
}

/** Our own constant data, serialized for a JSON-LD script tag. */
export function jsonLdString(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
