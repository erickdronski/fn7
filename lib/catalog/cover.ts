import { Canvas, dice, type Art, type Dice, type Tone } from "./art";
import { categoryOfType, type Category, type GoodType } from "./types";

/**
 * Generated covers. A listing without uploaded art gets an original abstract
 * pixel pattern, drawn from its slug and type. Each category has its own
 * motif, so a shelf reads at a glance, and the slug decides the details.
 */

export const COVER_WIDTH = 32;
export const COVER_HEIGHT = 20;

type Motif = (canvas: Canvas, d: Dice) => void;

function warmTone(d: Dice): Tone {
  const roll = d.roll();
  return roll < 0.45 ? "accent" : roll < 0.85 ? "soft" : "light";
}

/** Agents: a mirrored sigil between four corner marks. */
const sigil: Motif = (canvas, d) => {
  const left = 7;
  const top = 1;
  for (let row = 0; row < 9; row += 1) {
    for (let column = 0; column < 5; column += 1) {
      const centre = column === 4;
      const on = (centre && row === 4) || d.chance(centre ? 0.7 : 0.48);
      const tone = warmTone(d);
      if (!on) continue;
      canvas.rect(left + column * 2, top + row * 2, 2, 2, tone);
      canvas.rect(left + (8 - column) * 2, top + row * 2, 2, 2, tone);
    }
  }
  for (const [x, y, dx, dy] of [
    [1, 1, 1, 1],
    [30, 1, -1, 1],
    [1, 18, 1, -1],
    [30, 18, -1, -1],
  ]) {
    for (let step = 0; step < 3; step += 1) {
      canvas.set(x + dx * step, y, "soft");
      canvas.set(x, y + dy * step, "soft");
    }
  }
};

/** Code: indented lines of different lengths. */
const lines: Motif = (canvas, d) => {
  let indent = 0;
  for (let row = 0; row < 8; row += 1) {
    const y = 2 + row * 2;
    canvas.set(2, y, "soft");
    if (row > 0) indent = Math.max(0, Math.min(8, indent + d.pick([-2, 0, 0, 2, 2])));
    if (row > 0 && d.chance(0.14)) continue;
    let x = 5 + indent;
    const segments = d.int(1, 3);
    for (let segment = 0; segment < segments; segment += 1) {
      const length = d.int(2, 7);
      if (x + length > 30) break;
      canvas.rect(x, y, length, 1, segment === 0 ? d.pick<Tone>(["accent", "accent", "light"]) : "soft");
      x += length + 1;
    }
  }
};

/** Learn: steps that climb, with a marker on one of them. The slug sets how many, how wide and how steep. */
const steps: Motif = (canvas, d) => {
  const count = d.int(5, 8);
  const width = count === 5 ? 4 : count === 8 ? 2 : 3;
  const span = count * (width + 1) - 1;
  const left = Math.floor((COVER_WIDTH - span) / 2);
  const floor = 17;
  const here = d.int(1, count - 2);
  canvas.rect(left - 2, floor, span + 4, 1, "soft");
  let height = d.int(1, 3);
  for (let column = 0; column < count; column += 1) {
    if (column > 0) height = Math.min(14, height + d.pick([0, 1, 1, 2, 2, 3]));
    const x = left + column * (width + 1);
    canvas.rect(x, floor - height, width, height, column === here ? "accent" : "soft");
    canvas.rect(x, floor - height, width, 1, column === here ? "light" : "accent");
    if (column === here) canvas.rect(x + Math.floor((width - 1) / 2), floor - height - 2, 1, 1, "light");
  }
};

/** Templates: a page divided into blocks. */
const blocks: Motif = (canvas, d) => {
  const leaves: Array<[number, number, number, number]> = [];
  const split = (x: number, y: number, width: number, height: number, depth: number) => {
    const wide = width >= 9;
    const tall = height >= 7;
    if (depth === 0 || (!wide && !tall)) {
      leaves.push([x, y, width, height]);
      return;
    }
    const acrossFirst = wide && (!tall || width > height * 1.3 || d.chance(0.5));
    if (acrossFirst) {
      const cut = d.int(4, width - 5);
      split(x, y, cut, height, depth - 1);
      split(x + cut + 1, y, width - cut - 1, height, depth - 1);
    } else {
      const cut = d.int(3, height - 4);
      split(x, y, width, cut, depth - 1);
      split(x, y + cut + 1, width, height - cut - 1, depth - 1);
    }
  };
  split(3, 2, 26, 16, 3);
  const filled = d.int(0, leaves.length - 1);
  leaves.forEach(([x, y, width, height], index) => {
    if (index === filled) {
      canvas.rect(x, y, width, height, "accent");
      return;
    }
    if (d.chance(0.3)) {
      canvas.rect(x, y, width, height, "soft");
      return;
    }
    canvas.frame(x, y, width, height, "soft");
    if (width >= 6 && height >= 5) {
      canvas.rect(x + 2, y + 2, Math.min(width - 4, d.int(2, 6)), 1, "light");
      if (height >= 7) canvas.rect(x + 2, y + 4, Math.min(width - 4, d.int(2, 8)), 1, "soft");
    }
  });
};

/** Media: a waveform with a playhead. */
const wave: Motif = (canvas, d) => {
  const first = d.roll() * 6.28;
  const second = d.roll() * 6.28;
  const fast = 0.5 + d.roll() * 0.5;
  const playhead = d.int(3, 6);
  for (let bar = 0; bar < 10; bar += 1) {
    const swing = 0.6 * Math.sin(bar * fast + first) + 0.4 * Math.sin(bar * 1.9 + second);
    const reach = Math.max(1, Math.min(8, Math.round(4.5 + 3.5 * swing)));
    const tone: Tone = bar < playhead ? "accent" : bar === playhead ? "light" : "soft";
    canvas.rect(2 + bar * 3, 10 - reach, 2, reach * 2, tone);
  }
};

/** Software: a chip with pins, and a pattern etched inside. */
const chip: Motif = (canvas, d) => {
  canvas.frame(9, 3, 14, 14, "accent");
  for (let pin = 0; pin < 6; pin += 1) {
    const offset = 10 + pin * 2;
    if (!d.chance(0.15)) canvas.rect(offset, 1, 1, 2, "soft");
    if (!d.chance(0.15)) canvas.rect(offset, 17, 1, 2, "soft");
    if (!d.chance(0.15)) canvas.rect(6, offset - 6, 3, 1, "soft");
    if (!d.chance(0.15)) canvas.rect(23, offset - 6, 3, 1, "soft");
  }
  for (let row = 0; row < 5; row += 1) {
    for (let column = 0; column < 5; column += 1) {
      const centre = row === 2 && column === 2;
      if (!centre && !d.chance(0.5)) continue;
      canvas.rect(11 + column * 2, 5 + row * 2, 2, 2, centre ? "light" : d.pick<Tone>(["accent", "soft", "soft"]));
    }
  }
};

const TILE_SHAPES = ["111111111", "111101111", "010111010", "101000101", "000010000", "100010001", "100110111", "000111000", "110110000"];

/** Assets: a sheet of small tiles. */
const tiles: Motif = (canvas, d) => {
  for (let row = 0; row < 4; row += 1) {
    for (let column = 0; column < 7; column += 1) {
      const shape = d.pick(TILE_SHAPES);
      const tone = warmTone(d);
      for (let cell = 0; cell < 9; cell += 1) {
        if (shape[cell] === "1") canvas.set(3 + column * 4 + (cell % 3), 3 + row * 4 + Math.floor(cell / 3), tone);
      }
    }
  }
};

/** Data: a table. The slug sets its columns, their widths, how many rows it has, and which row is picked out. */
const matrix: Motif = (canvas, d) => {
  const widths: number[] = [];
  let used = 0;
  for (;;) {
    const width = d.int(1, 4);
    if (used + width > 26) break;
    widths.push(width);
    used += width + 1;
  }
  const left = Math.floor((COVER_WIDTH - (used - 1)) / 2);
  const rows = d.int(4, 6);
  const pitch = rows === 4 ? 3 : 2;
  const picked = d.int(0, rows - 1);
  let x = left;
  widths.forEach((width, column) => {
    canvas.rect(x, 3, width, 1, "light");
    for (let row = 0; row < rows; row += 1) {
      const y = 6 + row * pitch;
      if (column === 0) canvas.rect(x, y, width, 1, row === picked ? "accent" : "soft");
      else if (d.chance(0.8)) canvas.rect(x, y, d.int(1, width), 1, row === picked || d.chance(0.12) ? "accent" : "soft");
    }
    x += width + 1;
  });
  canvas.rect(left, 4, used - 1, 1, "dim");
};

const MOTIFS: Record<Category, Motif> = {
  Agents: sigil,
  Code: lines,
  Learn: steps,
  Templates: blocks,
  Media: wave,
  Software: chip,
  Assets: tiles,
  Data: matrix,
};

export function coverArt(slug: string, type: GoodType): Art {
  const canvas = new Canvas(COVER_WIDTH, COVER_HEIGHT);
  MOTIFS[categoryOfType(type)](canvas, dice(`${slug}:${type}`));
  canvas.dither();
  return canvas.toArt();
}
