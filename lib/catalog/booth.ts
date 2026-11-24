import { AVATAR_NAMES, isAvatarName, type AvatarName } from "./avatars";

/**
 * What a creator can change about a booth (catalog design, 8.1 and 8.2).
 * Bounded on purpose, so every booth looks designed.
 */

/** Accents come from the token set in app/globals.css. The value is the token's name. */
export const ACCENTS = ["cyan", "magenta", "amber", "mint", "violet", "coral"] as const;
export type Accent = (typeof ACCENTS)[number];

export const ACCENT_LABEL: Record<Accent, string> = {
  cyan: "Cyan",
  magenta: "Magenta",
  amber: "Amber",
  mint: "Mint",
  violet: "Violet",
  coral: "Coral",
};

export const LAYOUTS = ["shelf", "showcase", "list", "path", "gallery"] as const;
export type Layout = (typeof LAYOUTS)[number];

export const LAYOUT_INFO: Record<Layout, { label: string; looks: string; suits: string }> = {
  shelf: { label: "Shelf", looks: "A grid of covers.", suits: "Most booths." },
  showcase: { label: "Showcase", looks: "One featured listing large, then the grid.", suits: "A booth with a flagship." },
  list: { label: "List", looks: "Dense rows with the version and the last update.", suits: "Code and skills." },
  path: { label: "Path", looks: "Listings in a numbered order, with a line between them.", suits: "Courses and lessons taken in sequence." },
  gallery: { label: "Gallery", looks: "A wall of images.", suits: "Icons, photos and design assets." },
};

export const BANNERS = ["skyline", "stars", "rain", "grid", "waves", "circuit"] as const;
export type Banner = (typeof BANNERS)[number];

export const BANNER_LABEL: Record<Banner, string> = {
  skyline: "Skyline",
  stars: "Night sky",
  rain: "Rain",
  grid: "Floor grid",
  waves: "Waves",
  circuit: "Circuit",
};

export type BoothKind = "person" | "business" | "agent";

export const KIND_LABEL: Record<BoothKind, string> = {
  person: "Person",
  business: "Business",
  agent: "Agent booth",
};

/** The choices the booth builder holds in the page address. */
export type BuilderState = {
  name: string;
  avatar: AvatarName;
  accent: Accent;
  banner: Banner;
  layout: Layout;
};

export const BUILDER_DEFAULTS: BuilderState = {
  name: "Your booth",
  avatar: AVATAR_NAMES[0],
  accent: "cyan",
  banner: "skyline",
  layout: "shelf",
};

export const BOOTH_NAME_MAX = 32;

function pick<T extends string>(value: string | null, allowed: readonly T[], fallback: T): T {
  return value !== null && (allowed as readonly string[]).includes(value) ? (value as T) : fallback;
}

/** A booth name as typed: no markup characters, single spaces, a bounded length. */
export function cleanBoothName(raw: string): string {
  return raw
    .replace(/[<>]/g, "")
    .replace(/\s+/g, " ")
    .trimStart()
    .slice(0, BOOTH_NAME_MAX);
}

type Params = { get(name: string): string | null };

export function parseBuilder(params: Params): BuilderState {
  const name = cleanBoothName(params.get("name") ?? "").trim();
  const avatar = params.get("avatar");
  return {
    name: name || BUILDER_DEFAULTS.name,
    avatar: avatar !== null && isAvatarName(avatar) ? avatar : BUILDER_DEFAULTS.avatar,
    accent: pick(params.get("accent"), ACCENTS, BUILDER_DEFAULTS.accent),
    banner: pick(params.get("banner"), BANNERS, BUILDER_DEFAULTS.banner),
    layout: pick(params.get("layout"), LAYOUTS, BUILDER_DEFAULTS.layout),
  };
}

/** The query string for a set of choices. Defaults are left out, so the plain page has a plain address. */
export function builderQuery(state: BuilderState): string {
  const params = new URLSearchParams();
  const name = cleanBoothName(state.name).trim();
  if (name && name !== BUILDER_DEFAULTS.name) params.set("name", name);
  for (const key of ["avatar", "accent", "banner", "layout"] as const) {
    if (state[key] !== BUILDER_DEFAULTS[key]) params.set(key, state[key]);
  }
  return params.toString();
}

/** The alias a name would take: lowercase letters and digits only. */
export function aliasFromName(name: string): string {
  const alias = name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "")
    .slice(0, 24);
  return alias || "yourbooth";
}
