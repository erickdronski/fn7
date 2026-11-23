export type Kind = "file" | "skill" | "repo" | "lesson" | "tool";

export type Good = {
  slug: string;
  title: string;
  summary: string;
  sample: string;
  kind: Kind;
  priceCents: 100 | 300 | 500;
  stall: string;
};

export type Stall = {
  slug: string;
  name: string;
  keeper: string;
  blurb: string;
  accent: string;
  ink: string;
  sprite: string[];
};

const Y = "#f0a202";
const C = "#7ee0d6";
const R = "#e23d28";
const M = "#6ea84a";
const P = "#f3e6c8";
const K = "#140c1c";

function sprite(rows: string): string[] {
  return rows.trim().split("\n");
}

export const stalls: Stall[] = [
  {
    slug: "now",
    name: "Now",
    keeper: "Lamp moth",
    blurb: "This week's drops. They leave.",
    accent: Y,
    ink: K,
    sprite: sprite(`
.y...y.
yy.p.yy
yyppyyy
.ppppp.
.pc.cp.
..ppp..
.y...y.
.......
`),
  },
  {
    slug: "paper",
    name: "Paper",
    keeper: "Fold crane",
    blurb: "A template, a deck, one section.",
    accent: P,
    ink: K,
    sprite: sprite(`
...p...
..ppp..
.pp.pp.
pppy.pp
.pp.pp.
..ppp..
...p...
.......
`),
  },
  {
    slug: "agents",
    name: "Agents",
    keeper: "Courier bot",
    blurb: "One skill. Install on the receipt.",
    accent: C,
    ink: K,
    sprite: sprite(`
.y...y.
.ccccc.
c.p.p.c
.ccccc.
..ccc..
.c.y.c.
c.....c
.......
`),
  },
  {
    slug: "code",
    name: "Code",
    keeper: "Crate crab",
    blurb: "A starter, a snippet, a tiny repo.",
    accent: M,
    ink: K,
    sprite: sprite(`
p.....p
.mm.mm.
mmmmmmm
m.r.r.m
mmmmmmm
.mmmmm.
..m.m..
.......
`),
  },
  {
    slug: "lessons",
    name: "Lessons",
    keeper: "Chalk owl",
    blurb: "One idea. A course is a stack.",
    accent: P,
    ink: K,
    sprite: sprite(`
..ppp..
.p.p.p.
ppppppp
p.y.y.p
ppprppp
..ppp..
.p...p.
.......
`),
  },
  {
    slug: "packs",
    name: "Packs",
    keeper: "Tin fox",
    blurb: "Icons, a palette, presets.",
    accent: R,
    ink: P,
    sprite: sprite(`
r.....r
.rr.rr.
rrppprr
r.y.y.r
.rrrrr.
..rpr..
.r...r.
.......
`),
  },
  {
    slug: "tools",
    name: "Tools",
    keeper: "Key sparrow",
    blurb: "A small utility and a key.",
    accent: Y,
    ink: K,
    sprite: sprite(`
..yyy..
.y.c.y.
yyyyyyy
.ypppy.
..yyy..
.yy.yy.
y.....y
.......
`),
  },
  {
    slug: "bin",
    name: "The Bin",
    keeper: "Bin raccoon",
    blurb: "Dollar things, and Dollar Night.",
    accent: R,
    ink: P,
    sprite: sprite(`
.r...r.
rrppprr
r.y.y.r
ppppppp
.rrrrr.
r.p.p.r
.r...r.
.......
`),
  },
];

export const goods: Good[] = [
  {
    slug: "night-drop-deck",
    stall: "now",
    title: "Thursday drop deck",
    kind: "file",
    priceCents: 500,
    summary: "Eight slides for showing a thing that will not be here next week.",
    sample:
      "Cover, the one sentence, three proofs, the price, the ask. Built for a drop that leaves the stall on Sunday.",
  },
  {
    slug: "lamp-check",
    stall: "now",
    title: "Lamp check",
    kind: "lesson",
    priceCents: 300,
    summary: "How to tell a thin listing from one a person would grab.",
    sample:
      "Read the sample out loud. If you could swap the nouns and sell it again, it is not ready. The rest of the lesson is the checklist.",
  },
  {
    slug: "week-stamp",
    stall: "now",
    title: "Week stamp",
    kind: "file",
    priceCents: 100,
    summary: "A one-page note for what shipped this week.",
    sample: "Three lines: shipped, broke, next. No status meeting attached.",
  },
  {
    slug: "one-section",
    stall: "paper",
    title: "One section",
    kind: "file",
    priceCents: 500,
    summary: "A landing section with a promise, a proof, and a single action.",
    sample:
      "Headline, one paragraph, three stamps, one button. The section is the whole page if you let it be.",
  },
  {
    slug: "fold-deck",
    stall: "paper",
    title: "Fold deck",
    kind: "file",
    priceCents: 300,
    summary: "A six-slide deck that fits a crane's wing. Short on purpose.",
    sample: "Problem, picture, price, proof, path, pause. Speaker notes are one line each.",
  },
  {
    slug: "paper-grid",
    stall: "paper",
    title: "Paper grid",
    kind: "file",
    priceCents: 100,
    summary: "A 12-column grid drawn for pixel type, not for a dashboard.",
    sample: "Margins, a stamp column, and a place for the sample. That is the whole file.",
  },
  {
    slug: "release-skill",
    stall: "agents",
    title: "Release notes from a diff",
    kind: "skill",
    priceCents: 500,
    summary: "A skill that writes release notes a person would actually send.",
    sample:
      "Read the diff. Name what a user can do now. Leave out the file paths. Stop at eight lines.",
  },
  {
    slug: "stall-skill",
    stall: "agents",
    title: "Write the stall card",
    kind: "skill",
    priceCents: 300,
    summary: "Turns a finished good into a title, a sample, and a stamp.",
    sample:
      "If the sample is a promise instead of a piece of the work, rewrite it. Pick $1, $3, or $5. Do not invent a fourth price.",
  },
  {
    slug: "alias-card",
    stall: "agents",
    title: "Alias card",
    kind: "file",
    priceCents: 100,
    summary: "A tiny brief for naming an agent before it spends.",
    sample: "Name, cap, what it may buy, what it may not touch. Four lines.",
  },
  {
    slug: "auth-ten",
    stall: "code",
    title: "Ten lines of auth",
    kind: "repo",
    priceCents: 300,
    summary: "A starter that checks a session and gets out of the way.",
    sample:
      "One function, one redirect, one test. No provider baked in. You bring the session.",
  },
  {
    slug: "crate-cli",
    stall: "code",
    title: "Crate CLI",
    kind: "repo",
    priceCents: 500,
    summary: "A small command that packs a folder and prints what is inside.",
    sample: "crate pack ./skill prints the files, the license line, and the byte count. Nothing is uploaded.",
  },
  {
    slug: "slug-snippet",
    stall: "code",
    title: "Slug snippet",
    kind: "file",
    priceCents: 100,
    summary: "Make a stall slug from a title without surprising punctuation.",
    sample: "Lowercase, hyphens, no trailing dash. Twelve lines, with the three cases that usually break.",
  },
  {
    slug: "price-the-dollar",
    stall: "lessons",
    title: "Price a five-dollar thing",
    kind: "lesson",
    priceCents: 500,
    summary: "Why a $5 good can be honest, and when it should have been three.",
    sample:
      "If the buyer can use it the same day, it can be five. If they must assemble it first, it is three or it is not ready.",
  },
  {
    slug: "one-idea",
    stall: "lessons",
    title: "Teach one idea",
    kind: "lesson",
    priceCents: 300,
    summary: "A shape for a lesson that ends before the learner wanders off.",
    sample: "The idea, a worked example, one exercise, a stop. No module two.",
  },
  {
    slug: "chalk-line",
    stall: "lessons",
    title: "Chalk line",
    kind: "file",
    priceCents: 100,
    summary: "A single sentence a lesson is not allowed to leave.",
    sample: "Write the sentence a learner should be able to say when they stand up.",
  },
  {
    slug: "night-palette",
    stall: "packs",
    title: "Night palette",
    kind: "file",
    priceCents: 300,
    summary: "Six colors for a pixel market. Ink, paper, lamp, signal, crate, moss.",
    sample: "Hex, a job for each color, and the one place you do not use lamp amber: body text.",
  },
  {
    slug: "stamp-icons",
    stall: "packs",
    title: "Stamp icons",
    kind: "file",
    priceCents: 100,
    summary: "Three pixel stamps: one dollar, three, five.",
    sample: "8 by 8, two colors, readable at the size of a thumbnail.",
  },
  {
    slug: "fox-presets",
    stall: "packs",
    title: "Fox presets",
    kind: "file",
    priceCents: 500,
    summary: "Type and spacing presets for a stall card, a receipt, and a sample.",
    sample: "Display is pixel. Body is a plain sans. Prices never take a decimal.",
  },
  {
    slug: "key-check",
    stall: "tools",
    title: "Key check",
    kind: "tool",
    priceCents: 500,
    summary: "A tiny checker that tells you a license key's shape is wrong before you ship it.",
    sample: "Four groups, no ambiguous letters, a checksum. It does not phone home.",
  },
  {
    slug: "cap-card",
    stall: "tools",
    title: "Cap card",
    kind: "file",
    priceCents: 300,
    summary: "A card for the spending cap you hand an agent.",
    sample: "Amount, what it may buy, when it expires, who gets the points. Print it. Do not paste it into a chat.",
  },
  {
    slug: "sparrow-beep",
    stall: "tools",
    title: "Sparrow beep",
    kind: "file",
    priceCents: 100,
    summary: "One short sound for a grab. Not a fanfare.",
    sample: "A single blip, under a fifth of a second, that still reads on a laptop speaker.",
  },
  {
    slug: "bin-prompt",
    stall: "bin",
    title: "Bin prompt",
    kind: "file",
    priceCents: 100,
    summary: "A prompt that asks for a sample, not a promise.",
    sample: "Show me the first paragraph of the work. If you describe it instead, start over.",
  },
  {
    slug: "raccoon-list",
    stall: "bin",
    title: "Raccoon list",
    kind: "file",
    priceCents: 100,
    summary: "A pocket list for a haul of five. Nothing above a dollar.",
    sample: "Five lines, five stalls, five dollars. Leave one blank if the Yard is thin.",
  },
  {
    slug: "dollar-label",
    stall: "bin",
    title: "Dollar label",
    kind: "file",
    priceCents: 100,
    summary: "A label for a good that is only a dollar during the night.",
    sample: "Shelf price, night price, the hour it ends. The label does not say how many are left.",
  },
];

export function stallBySlug(slug: string): Stall | undefined {
  return stalls.find((stall) => stall.slug === slug);
}

export function goodsIn(slug: string): Good[] {
  return goods.filter((good) => good.stall === slug);
}

export function goodBySlug(slug: string): Good | undefined {
  return goods.find((good) => good.slug === slug);
}

export const offerings = [
  {
    kicker: "90%",
    title: "Makers keep 90%",
    body: "Ninety cents of every dollar. The cut does not creep.",
    accent: "#6ea84a",
  },
  {
    kicker: "Open",
    title: "The code is open",
    body: "Read the price rules. A hosted copy publishes its changes.",
    accent: "#7ee0d6",
  },
  {
    kicker: "Agents",
    title: "Agents shop here",
    body: "Same stalls, same stamps. $1, $3, or $5.",
    accent: "#f0a202",
  },
] as const;
