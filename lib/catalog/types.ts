import { FACTS } from "../facts";

/**
 * The catalog's vocabulary (catalog design, sections 4 and 5): categories,
 * types of goods, access modes, licenses, how a good was made, and the
 * clients a good can work with. Seed data and pages both read from here.
 */

export type Category = (typeof FACTS.categories)[number];

export const CATEGORIES: readonly Category[] = FACTS.categories;

/** The types of goods in each category (catalog design, 4.2). */
export const CATEGORY_TYPES = {
  Agents: ["skill", "prompt-pack", "mcp-server", "mcp-config", "plugin", "rules-file", "agent-template", "workflow"],
  Code: ["starter", "repo", "library", "snippet", "script"],
  Learn: ["course", "lesson", "guide", "workshop"],
  Templates: ["doc", "deck", "spreadsheet", "notion-template", "design-file", "site-theme"],
  Media: ["video", "audio", "photo-set"],
  Software: ["app", "extension", "cli"],
  Assets: ["icons", "font", "ui-kit", "sprites", "3d", "palette", "presets", "sound-pack"],
  Data: ["dataset", "eval-set", "embeddings", "model"],
} as const satisfies Record<Category, readonly string[]>;

export type GoodType = (typeof CATEGORY_TYPES)[Category][number];

export const TYPE_LABEL: Record<GoodType, string> = {
  skill: "Skill",
  "prompt-pack": "Prompt pack",
  "mcp-server": "MCP server",
  "mcp-config": "MCP config",
  plugin: "Plugin",
  "rules-file": "Rules file",
  "agent-template": "Agent template",
  workflow: "Workflow",
  starter: "Starter",
  repo: "Repo",
  library: "Library",
  snippet: "Snippet",
  script: "Script",
  course: "Course",
  lesson: "Lesson",
  guide: "Guide",
  workshop: "Recorded workshop",
  doc: "Doc",
  deck: "Deck",
  spreadsheet: "Spreadsheet",
  "notion-template": "Notion template",
  "design-file": "Design file",
  "site-theme": "Site theme",
  video: "Video",
  audio: "Audio",
  "photo-set": "Photo set",
  app: "App, as source",
  extension: "Extension",
  cli: "CLI",
  icons: "Icons",
  font: "Font",
  "ui-kit": "UI kit",
  sprites: "Sprites",
  "3d": "3D",
  palette: "Palette",
  presets: "Presets",
  "sound-pack": "Sound pack",
  dataset: "Dataset",
  "eval-set": "Eval set",
  embeddings: "Embeddings",
  model: "Model",
};

const TYPE_CATEGORY = new Map<string, Category>(
  CATEGORIES.flatMap((category) => CATEGORY_TYPES[category].map((type) => [type, category] as const)),
);

export function isCategory(value: string): value is Category {
  return (CATEGORIES as readonly string[]).includes(value);
}

export function isGoodType(value: string): value is GoodType {
  return TYPE_CATEGORY.has(value);
}

export function categoryOfType(type: GoodType): Category {
  return TYPE_CATEGORY.get(type) as Category;
}

/** How a buyer receives a good (catalog design, 4.1). */
export type AccessMode = "download" | "install" | "view" | "key";

export const ACCESS_LABEL: Record<AccessMode, string> = {
  download: "Download",
  install: "Install",
  view: "View in place",
  key: "License key",
};

/** The three licenses (catalog design, 5.4), in plain words. */
export type License = "standard" | "personal" | "open";

export const LICENSES: Record<License, { name: string; plain: string }> = {
  standard: { name: "fn/7 Standard", plain: "Use it in your own work, commercial work included. Don't redistribute it." },
  personal: { name: "fn/7 Personal", plain: "Use it in your own work. No commercial use, and don't redistribute it." },
  open: { name: "Open", plain: "Use it, sell work made with it and redistribute it. The price pays for packaging, support and updates." },
};

/** The creator's statement of how a good was made (catalog design, 5.4). */
export type Made = "by-hand" | "with-ai" | "by-agent";

export const MADE_LABEL: Record<Made, string> = {
  "by-hand": "Made by hand",
  "with-ai": "Made with AI",
  "by-agent": "Made by an agent",
};

/** What a good declares it needs (catalog design, 5.3). */
export type Permissions = {
  network: false | string[];
  secrets: string[];
  shell: string[];
  writes: string[];
};

/**
 * Clients a good can work with. `brand` names a mark in the BrandIcon set
 * where one exists; a client without one is shown by name alone.
 */
export const CLIENTS = {
  "claude-code": { label: "Claude Code", brand: "claude" },
  claude: { label: "Claude", brand: "claude" },
  cursor: { label: "Cursor", brand: "cursor" },
  windsurf: { label: "Windsurf", brand: "windsurf" },
  copilot: { label: "GitHub Copilot", brand: "copilot" },
  gemini: { label: "Gemini", brand: "gemini" },
  mcp: { label: "Any MCP client", brand: "mcp" },
  codex: { label: "Codex CLI", brand: null },
} as const satisfies Record<string, { label: string; brand: string | null }>;

export type ClientId = keyof typeof CLIENTS;
