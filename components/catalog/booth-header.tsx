import type { ReactNode } from "react";
import { KIND_LABEL, type Accent, type BoothKind } from "@/lib/catalog";
import type { Rank } from "@/lib/tiers";
import { RankMark } from "./marks";
import { PixelAvatar } from "./pixel-art";

type Props = {
  name: string;
  alias: string;
  kind: BoothKind;
  rank: Rank;
  tagline: string;
  avatar: readonly string[];
  accent: Accent;
  /** `h1` on a booth's own page, `h2` where the booth is a preview inside another page. */
  heading?: "h1" | "h2";
  children?: ReactNode;
};

/** The top of a booth (catalog design, section 8): avatar, name, alias, rank, kind and tagline. */
export function BoothHeader({ name, alias, kind, rank, tagline, avatar, accent, heading = "h1", children }: Props) {
  const Heading = heading;
  return (
    <header className="bhead">
      <PixelAvatar rows={avatar} accent={accent} size={88} className="bhead-avatar" />
      <div className="bhead-text">
        <Heading className="bhead-name">{name}</Heading>
        <p className="bhead-meta">
          <span className="mono bhead-alias">@{alias}</span>
          <RankMark rank={rank} />
          <span className="tag">{KIND_LABEL[kind]}</span>
        </p>
        <p className="bhead-tagline">{tagline}</p>
      </div>
      {children ? <div className="bhead-actions">{children}</div> : null}
    </header>
  );
}
