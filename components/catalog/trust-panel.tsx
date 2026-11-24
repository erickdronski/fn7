import Link from "next/link";
import { ACCESS_LABEL, LICENSES, MADE_LABEL, PREVIEW, joinWords, permissionWords } from "@/lib/catalog";
import type { Booth, Listing } from "@/lib/seed";
import { ROUTES } from "@/lib/site";
import { RankMark } from "./marks";

/**
 * What a buyer, or an agent, can check before paying: the booth's rank, the
 * license in plain words, how the good was made, how it arrives, what it
 * declares it needs, and where it stands with the Gate.
 */
export function TrustPanel({ listing, booth }: { listing: Listing; booth: Booth }) {
  const license = LICENSES[listing.license];
  return (
    <aside className="trust" aria-labelledby="trust-title">
      <h2 id="trust-title">What this release declares</h2>
      <dl>
        <div>
          <dt>Booth rank</dt>
          <dd>
            <RankMark rank={booth.rank} />{" "}
            <Link className="link link-on" href={ROUTES.rank}>
              How rank works
            </Link>
          </dd>
        </div>
        <div>
          <dt>License</dt>
          <dd>
            <strong>{license.name}.</strong> {license.plain}
          </dd>
        </div>
        <div>
          <dt>How it was made</dt>
          <dd>{MADE_LABEL[listing.made]}, by the creator&rsquo;s own statement.</dd>
        </div>
        <div>
          <dt>How you get it</dt>
          <dd>{joinWords(listing.access.map((mode, index) => (index === 0 ? ACCESS_LABEL[mode] : ACCESS_LABEL[mode].toLowerCase())))}.</dd>
        </div>
        <div>
          <dt>Permissions</dt>
          <dd>
            <ul className="trust-perms">
              {permissionWords(listing.permissions).map((sentence) => (
                <li key={sentence}>{sentence}</li>
              ))}
            </ul>
          </dd>
        </div>
        <div>
          <dt>The Gate</dt>
          <dd>
            {PREVIEW.gateNote}{" "}
            <Link className="link link-on" href={ROUTES.trust}>
              How the Gate works
            </Link>
          </dd>
        </div>
      </dl>
    </aside>
  );
}
