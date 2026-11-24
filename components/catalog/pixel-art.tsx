import type { CSSProperties } from "react";
import { AVATAR_SIZE, bannerArt, coverArt, type Accent, type Art, type Banner, type GoodType } from "@/lib/catalog";

/** The accent a piece of pixel art is drawn in. The value is a color token's name. */
export function accentStyle(accent: Accent): CSSProperties {
  return { "--accent": `var(--${accent})` } as CSSProperties;
}

/** Draws generated art as inline SVG: one path per tone, colored by CSS. Decorative, so hidden from screen readers. */
export function PixelArt({ art }: { art: Art }) {
  return (
    <svg className="pxart" viewBox={`0 0 ${art.width} ${art.height}`} preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      {art.layers.map((layer) => (
        <path key={layer.tone} className={`pxart-${layer.tone}`} d={layer.d} />
      ))}
    </svg>
  );
}

/**
 * A listing's cover when it has no uploaded art: an original abstract pixel
 * pattern drawn from the slug and type, in the booth's accent. The same
 * listing always gets the same cover.
 */
export function GeneratedCover({ slug, type, accent, className }: { slug: string; type: GoodType; accent: Accent; className?: string }) {
  return (
    <span className={`cover${className ? ` ${className}` : ""}`} style={accentStyle(accent)}>
      <PixelArt art={coverArt(slug, type)} />
    </span>
  );
}

/** A booth's banner backdrop, in the booth's accent. */
export function BoothBanner({ banner, accent, className }: { banner: Banner; accent: Accent; className?: string }) {
  return (
    <span className={`bbanner${className ? ` ${className}` : ""}`} style={accentStyle(accent)}>
      <PixelArt art={bannerArt(banner)} />
    </span>
  );
}

const AVATAR_TONES = ["a", "s", "l", "d"] as const;

/** A pixel avatar in its circle. Sprite rows use `a` accent, `s` shade, `l` light and `d` dark. */
export function PixelAvatar({ rows, accent, size = 64, className }: { rows: readonly string[]; accent: Accent; size?: number; className?: string }) {
  return (
    <span className={`avatar${className ? ` ${className}` : ""}`} style={{ ...accentStyle(accent), width: size, height: size }}>
      <svg className="px" viewBox={`0 0 ${AVATAR_SIZE} ${AVATAR_SIZE}`} aria-hidden="true" focusable="false">
        {AVATAR_TONES.map((tone) => (
          <path
            key={tone}
            className={`avatar-${tone}`}
            d={rows.map((row, y) => [...row].map((cell, x) => (cell === tone ? `M${x} ${y}h1v1h-1z` : "")).join("")).join("")}
          />
        ))}
      </svg>
    </span>
  );
}
