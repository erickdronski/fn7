import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BoothHeader } from "@/components/catalog/booth-header";
import { PreviewNote } from "@/components/catalog/marks";
import { BoothBanner } from "@/components/catalog/pixel-art";
import { ShopLayout } from "@/components/catalog/shop-layouts";
import { Facts } from "@/components/page/blocks";
import { AVATARS, KIND_LABEL, LAYOUT_INFO, PREVIEW, builderQuery, getBooth, shopOrder, type AvatarName } from "@/lib/catalog";
import { BOOTHS, type Booth } from "@/lib/seed";
import { ROUTES, boothHref } from "@/lib/site";
import { RANK_LABEL, RANK_REQUIREMENT, formatPrice, tiersForRank } from "@/lib/tiers";

type Props = { params: Promise<{ alias: string }> };

export function generateStaticParams() {
  return BOOTHS.map((booth) => ({ alias: booth.alias }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { alias } = await params;
  const booth = getBooth(alias);
  if (!booth) return {};
  return {
    title: `${booth.name} (sample booth)`,
    description: `${booth.tagline} A sample booth in the fn/7 market preview. Nothing can be bought yet.`,
    alternates: { canonical: boothHref(booth.alias) },
    // A sample describes something that doesn't exist, so search engines are asked to leave it out.
    robots: { index: false, follow: true },
  };
}

/** The booth builder, opened with this booth's own choices. */
function builderHref(booth: Booth): string {
  const avatar = (Object.keys(AVATARS) as AvatarName[]).find((name) => AVATARS[name] === booth.avatar);
  const query = builderQuery({ name: booth.name, avatar: avatar ?? "bot", accent: booth.accent, banner: booth.banner, layout: booth.layout });
  return query ? `${ROUTES.buildABooth}?${query}` : ROUTES.buildABooth;
}

/**
 * Every sample is prerendered below, so a move between them is served from
 * the static copy. An address that isn't one waits on the server and gets a
 * real "not found" status, which a crawler or an agent can trust.
 */
export const instant = false;

export default async function BoothPage({ params }: Props) {
  const { alias } = await params;
  const booth = getBooth(alias);
  if (!booth) notFound();

  const listings = shopOrder(booth);
  const layout = LAYOUT_INFO[booth.layout];
  const ceiling = tiersForRank(booth.rank).at(-1) ?? 0;

  return (
    <article className="bpage">
      <div className="wrap">
        <nav className="crumb lpage-crumb" aria-label="Breadcrumb">
          <Link className="link link-on" href={ROUTES.market}>
            Market
          </Link>
          <span aria-hidden="true">/</span>
          <span>Booths</span>
        </nav>

        <BoothBanner banner={booth.banner} accent={booth.accent} />
        <BoothHeader name={booth.name} alias={booth.alias} kind={booth.kind} rank={booth.rank} tagline={booth.tagline} avatar={booth.avatar} accent={booth.accent}>
          <Link className="btn btn-line btn-sm" href={builderHref(booth)}>
            Build a booth like this
          </Link>
        </BoothHeader>

        <PreviewNote>This is a sample booth with sample listings, made up to show how a creator&rsquo;s shop will look. {PREVIEW.cannotBuy}</PreviewNote>

        <section className="bpage-section" aria-labelledby="shop-title">
          <div className="bpage-head">
            <h2 id="shop-title">Shop</h2>
            <p>
              {listings.length} sample listings, in the {layout.label} layout. {layout.looks}
            </p>
          </div>
          <ShopLayout layout={booth.layout} listings={listings} accent={booth.accent} featured={booth.featured} />
        </section>

        <section className="bpage-section" aria-labelledby="about-title">
          <div className="bpage-head">
            <h2 id="about-title">About</h2>
            <p>{booth.bio}</p>
          </div>
          <Facts
            rows={[
              { area: "Run by", fact: `${KIND_LABEL[booth.kind]}. Every booth has a verified person or business behind it, kept private.` },
              {
                area: "Rank",
                fact: (
                  <>
                    {RANK_LABEL[booth.rank]}, which can charge up to {formatPrice(ceiling)}. On a real booth that takes: {RANK_REQUIREMENT[booth.rank].toLowerCase()}{" "}
                    <Link className="link link-on" href={ROUTES.rank}>
                      How rank works
                    </Link>
                  </>
                ),
              },
              { area: "Layout", fact: `${layout.label}. Suits: ${layout.suits.toLowerCase()}` },
            ]}
          />
        </section>

        <nav className="bpage-others" aria-label="Other sample booths">
          <h2>Other sample booths</h2>
          <ul>
            {BOOTHS.filter((item) => item.alias !== booth.alias).map((item) => (
              <li key={item.alias}>
                <Link className="btn btn-line btn-sm" href={boothHref(item.alias)}>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </article>
  );
}
