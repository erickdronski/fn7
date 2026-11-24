import Link from "next/link";
import { BrandIcon, hasBrand } from "@/components/ui/brand-icon";
import { PixelIcon, type PixelIconName } from "@/components/ui/pixel-icon";
import { CLIENTS, PREVIEW, permissionsLine, type Category, type ClientId, type Permissions } from "@/lib/catalog";
import { CATEGORIES } from "@/lib/content";
import { canShowMark } from "@/lib/marks";
import { ROUTES } from "@/lib/site";
import { RANKS, RANK_LABEL, type Rank } from "@/lib/tiers";

export function categoryIcon(category: Category): PixelIconName {
  return CATEGORIES.find((item) => item.name === category)?.icon ?? "grid";
}

/** A booth's rank: six pixel steps, lit up to the rank, with its name. */
export function RankMark({ rank }: { rank: Rank }) {
  const at = RANKS.indexOf(rank);
  return (
    <span className="rankmark">
      <svg className="px" width="18" height="12" viewBox="0 0 12 8" aria-hidden="true" focusable="false">
        {RANKS.map((name, index) => (
          <rect key={name} x={index * 2} y={6 - index} width="1" height={index + 2} fill="currentColor" opacity={index <= at ? 1 : 0.28} />
        ))}
      </svg>
      <span className="sr-only">Rank: </span>
      {RANK_LABEL[rank]}
    </span>
  );
}

/** The clients a good works with, each with its mark where one exists and may be shown (lib/marks.ts). */
export function WorksWith({ clients, limit }: { clients: readonly ClientId[]; limit?: number }) {
  if (clients.length === 0) return null;
  const shown = limit ? clients.slice(0, limit) : clients;
  const hidden = clients.length - shown.length;
  return (
    <ul className="works" aria-label="Works with">
      {shown.map((id) => {
        const client = CLIENTS[id];
        return (
          <li key={id}>
            {client.brand && hasBrand(client.brand) && canShowMark(client.brand) ? (
              <span className="works-mark" aria-hidden="true">
                <BrandIcon name={client.brand} size={14} />
              </span>
            ) : null}
            {client.label}
          </li>
        );
      })}
      {hidden > 0 ? <li className="works-more">+{hidden} more</li> : null}
    </ul>
  );
}

/** A good's declared permissions in one plain line: "Needs git. No network. No secrets." */
export function PermissionsLine({ permissions, className }: { permissions: Permissions; className?: string }) {
  return (
    <p className={`perms${className ? ` ${className}` : ""}`}>
      <PixelIcon name="lock" size={16} />
      <span>
        <span className="sr-only">Permissions: </span>
        {permissionsLine(permissions)}
      </span>
    </p>
  );
}

/** The note every preview page carries: these are samples, and nothing can be bought yet. */
export function PreviewNote({ children, className }: { children?: React.ReactNode; className?: string }) {
  return (
    <p className={`preview-note${className ? ` ${className}` : ""}`} role="note">
      <strong>Preview.</strong> {children ?? PREVIEW.note}{" "}
      <Link className="link link-on" href={ROUTES.roadmap}>
        See the roadmap
      </Link>
    </p>
  );
}

/** The buy control. Disabled until buying exists, and it says when that is. */
export function BuyButton({ describedBy }: { describedBy?: string }) {
  return (
    <button type="button" className="btn buy-off" disabled aria-describedby={describedBy}>
      {PREVIEW.buyLabel}
    </button>
  );
}
