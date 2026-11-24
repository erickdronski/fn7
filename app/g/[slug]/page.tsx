import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ListingCard } from "@/components/catalog/listing-card";
import { BuyButton, PermissionsLine, PreviewNote, RankMark, WorksWith, categoryIcon } from "@/components/catalog/marks";
import { GeneratedCover, PixelAvatar } from "@/components/catalog/pixel-art";
import { TrustPanel } from "@/components/catalog/trust-panel";
import { CodeBlock } from "@/components/page/blocks";
import { CopyButton } from "@/components/ui/copy-button";
import { PixelIcon } from "@/components/ui/pixel-icon";
import { PriceChip } from "@/components/ui/price-chip";
import { PREVIEW, TYPE_LABEL, filtersToQuery, formatBytes, formatDay, getBooth, getListing, installCommand, listingsForBooth, releaseName, totalBytes } from "@/lib/catalog";
import { LISTINGS } from "@/lib/seed";
import { ROUTES, boothHref, listingHref } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return LISTINGS.map((listing) => ({ slug: listing.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const listing = getListing(slug);
  if (!listing) return {};
  return {
    title: `${listing.title} (sample listing)`,
    description: `${listing.summary} A sample listing in the fn/7 market preview. Nothing can be bought yet.`,
    alternates: { canonical: listingHref(listing.slug) },
    // A sample describes something that doesn't exist, so search engines are asked to leave it out.
    robots: { index: false, follow: true },
  };
}

const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "inside", label: "What’s inside" },
  { id: "preview", label: "Preview" },
  { id: "versions", label: "Versions" },
  { id: "for-agents", label: "For agents" },
];

/**
 * Every sample is prerendered below, so a move between them is served from
 * the static copy. An address that isn't one waits on the server and gets a
 * real "not found" status, which a crawler or an agent can trust.
 */
export const instant = false;

export default async function ListingPage({ params }: Props) {
  const { slug } = await params;
  const listing = getListing(slug);
  const booth = listing ? getBooth(listing.booth) : undefined;
  if (!listing || !booth) notFound();

  const more = listingsForBooth(booth.alias)
    .filter((item) => item.slug !== listing.slug)
    .slice(0, 3);
  const command = installCommand(listing);

  return (
    <article className="lpage">
      <div className="wrap">
        <nav className="crumb lpage-crumb" aria-label="Breadcrumb">
          <Link className="link link-on" href={ROUTES.market}>
            Market
          </Link>
          <span aria-hidden="true">/</span>
          <Link className="link link-on" href={`${ROUTES.market}?${filtersToQuery({ category: listing.category })}`}>
            {listing.category}
          </Link>
        </nav>

        <header className="lpage-top">
          <GeneratedCover slug={listing.slug} type={listing.type} accent={booth.accent} className="lpage-cover" />
          <div className="lpage-buy">
            <p className="lcard-type">
              <PixelIcon name={categoryIcon(listing.category)} size={14} />
              {TYPE_LABEL[listing.type]}
              <span className="tag">Sample</span>
            </p>
            <h1 className="lpage-title">{listing.title}</h1>
            <p className="lpage-sum">{listing.summary}</p>
            <p className="lpage-by">
              <PixelAvatar rows={booth.avatar} accent={booth.accent} size={32} />
              <span>
                by{" "}
                <Link className="link link-on" href={boothHref(booth.alias)}>
                  {booth.name}
                </Link>
              </span>
              <RankMark rank={booth.rank} />
            </p>
            <div className="lpage-price">
              <PriceChip cents={listing.priceCents} className="chip-lg" />
              <BuyButton describedBy="buy-note" />
            </div>
            <p className="lpage-note" id="buy-note">
              This is a sample listing. {PREVIEW.cannotBuy}
            </p>
            {listing.worksWith.length > 0 ? (
              <div className="lpage-works">
                <span className="lpage-label">Works with</span>
                <WorksWith clients={listing.worksWith} />
              </div>
            ) : null}
            <PermissionsLine permissions={listing.permissions} />
          </div>
        </header>

        <nav className="lpage-tabs" aria-label="On this page">
          {SECTIONS.map((section) => (
            <a key={section.id} className="link" href={`#${section.id}`}>
              {section.label}
            </a>
          ))}
        </nav>

        <section className="lpage-section lpage-overview" id="overview" aria-labelledby="overview-title">
          <div className="lpage-text">
            <h2 id="overview-title">Overview</h2>
            <p>{listing.description}</p>
            <h3>What you get</h3>
            <ul className="points">
              {listing.whatYouGet.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <TrustPanel listing={listing} booth={booth} />
        </section>

        <section className="lpage-section" id="inside" aria-labelledby="inside-title">
          <h2 id="inside-title">What&rsquo;s inside</h2>
          <p className="lpage-lede">
            {listing.files.length} entries, {formatBytes(totalBytes(listing))} in all. A real release also lists a SHA-256 hash for every file, so you can check what you received.
          </p>
          <table className="files">
            <thead>
              <tr>
                <th scope="col">Path</th>
                <th scope="col" className="files-size">
                  Size
                </th>
              </tr>
            </thead>
            <tbody>
              {listing.files.map((file) => (
                <tr key={file.path}>
                  <td className="mono">{file.path}</td>
                  <td className="mono num files-size">{formatBytes(file.bytes)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="lpage-section" id="preview" aria-labelledby="preview-title">
          <h2 id="preview-title">Preview</h2>
          <p className="lpage-lede">A piece of the work itself, taken from the release&rsquo;s sample file.</p>
          <figure className="code sample">
            <figcaption>
              <span>Sample</span>
            </figcaption>
            <pre className="mono" tabIndex={0} aria-label="Sample">
              {listing.sample}
            </pre>
          </figure>
        </section>

        <section className="lpage-section" id="versions" aria-labelledby="versions-title">
          <h2 id="versions-title">Versions</h2>
          <table className="files">
            <thead>
              <tr>
                <th scope="col">Version</th>
                <th scope="col">Released</th>
                <th scope="col">The Gate</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="mono num">{listing.version}</td>
                <td className="num">{formatDay(listing.updated)}</td>
                <td>Not reviewed: a sample</td>
              </tr>
            </tbody>
          </table>
          <p className="fineprint">A release is never edited. A fix is a new release, and each one passes the Gate before it is listed here.</p>
        </section>

        <section className="lpage-section" id="for-agents" aria-labelledby="agents-title">
          <h2 id="agents-title">For agents</h2>
          <p className="lpage-lede">
            Every release has one stable name: <code className="mono">{releaseName(listing)}</code>. {PREVIEW.cliNote}
          </p>
          <CodeBlock caption="Install with the fn7 CLI" code={command} action={<CopyButton text={command} />} />
        </section>

        {more.length > 0 ? (
          <section className="lpage-section" aria-labelledby="more-title">
            <div className="lpage-more-head">
              <h2 id="more-title">More from {booth.name}</h2>
              <Link className="btn btn-line btn-sm" href={boothHref(booth.alias)}>
                Visit the booth
              </Link>
            </div>
            <ul className="lgrid">
              {more.map((item) => (
                <li key={item.slug}>
                  <ListingCard listing={item} accent={booth.accent} />
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <PreviewNote />
      </div>
    </article>
  );
}
