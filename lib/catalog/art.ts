/**
 * The small pixel canvas behind generated covers and banner backdrops.
 * Everything here is a pure function of its input: the same text always
 * draws the same picture, on the server and in every browser.
 */

export type Tone = "dim" | "soft" | "accent" | "light";

const TONES: Tone[] = ["dim", "soft", "accent", "light"];

export type Art = {
  width: number;
  height: number;
  /** One SVG path per tone, each a run of one-cell-high rectangles. */
  layers: Array<{ tone: Tone; d: string }>;
};

/** FNV-1a, 32 bits. */
export function hashText(text: string): number {
  let hash = 0x811c9dc5;
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }
  return hash >>> 0;
}

/** A small seeded generator (mulberry32). Returns numbers in [0, 1). */
export function seeded(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let next = state;
    next = Math.imul(next ^ (next >>> 15), next | 1);
    next ^= next + Math.imul(next ^ (next >>> 7), next | 61);
    return ((next ^ (next >>> 14)) >>> 0) / 4294967296;
  };
}

export type Dice = {
  /** A number in [0, 1). */
  roll(): number;
  /** A whole number from `min` to `max`, both included. */
  int(min: number, max: number): number;
  chance(odds: number): boolean;
  pick<T>(items: readonly T[]): T;
};

export function dice(seedText: string): Dice {
  const roll = seeded(hashText(seedText));
  return {
    roll,
    int: (min, max) => min + Math.floor(roll() * (max - min + 1)),
    chance: (odds) => roll() < odds,
    pick: (items) => items[Math.floor(roll() * items.length)],
  };
}

export class Canvas {
  readonly width: number;
  readonly height: number;
  private readonly cells: Uint8Array;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.cells = new Uint8Array(width * height);
  }

  /** Paints one cell. Anything outside the canvas is ignored. */
  set(x: number, y: number, tone: Tone): void {
    if (x < 0 || y < 0 || x >= this.width || y >= this.height) return;
    this.cells[y * this.width + x] = TONES.indexOf(tone) + 1;
  }

  rect(x: number, y: number, width: number, height: number, tone: Tone): void {
    for (let row = y; row < y + height; row += 1) {
      for (let column = x; column < x + width; column += 1) this.set(column, row, tone);
    }
  }

  /** The outline of a rectangle, one cell thick. */
  frame(x: number, y: number, width: number, height: number, tone: Tone): void {
    this.rect(x, y, width, 1, tone);
    this.rect(x, y + height - 1, width, 1, tone);
    this.rect(x, y, 1, height, tone);
    this.rect(x + width - 1, y, 1, height, tone);
  }

  isEmpty(x: number, y: number): boolean {
    return this.cells[y * this.width + x] === 0;
  }

  /** Faint, evenly spaced cells in whatever is still empty: an ordered dither. */
  dither(tone: Tone = "dim"): void {
    for (let y = 0; y < this.height; y += 1) {
      for (let x = 0; x < this.width; x += 1) {
        const on = (x % 4 === 1 && y % 4 === 1) || (x % 4 === 3 && y % 4 === 3);
        if (on && this.isEmpty(x, y)) this.set(x, y, tone);
      }
    }
  }

  toArt(): Art {
    const layers = TONES.map((tone, index) => {
      let d = "";
      for (let y = 0; y < this.height; y += 1) {
        let x = 0;
        while (x < this.width) {
          if (this.cells[y * this.width + x] !== index + 1) {
            x += 1;
            continue;
          }
          let run = 1;
          while (x + run < this.width && this.cells[y * this.width + x + run] === index + 1) run += 1;
          d += `M${x} ${y}h${run}v1h-${run}z`;
          x += run;
        }
      }
      return { tone, d };
    });
    return { width: this.width, height: this.height, layers: layers.filter((layer) => layer.d !== "") };
  }
}
