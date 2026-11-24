import { Canvas, dice, type Art, type Dice, type Tone } from "./art";
import type { Banner } from "./booth";

/**
 * Banner backdrops for a booth (catalog design, 8.2). Each one is an original
 * pixel pattern drawn from its own name, so it is the same on every render.
 * The booth's accent colors it.
 */

export const BANNER_WIDTH = 96;
export const BANNER_HEIGHT = 24;

type Backdrop = (canvas: Canvas, d: Dice) => void;

const skyline: Backdrop = (canvas, d) => {
  for (let star = 0; star < 30; star += 1) canvas.set(d.int(0, 95), d.int(0, 9), d.chance(0.8) ? "dim" : "soft");
  let x = 0;
  while (x < BANNER_WIDTH) {
    const width = d.int(4, 9);
    const height = d.int(5, 17);
    const top = BANNER_HEIGHT - height;
    canvas.rect(x, top, width, height, "dim");
    canvas.rect(x, top, width, 1, "soft");
    if (d.chance(0.3)) canvas.rect(x + Math.floor(width / 2), top - 2, 1, 2, "soft");
    for (let wy = top + 2; wy < BANNER_HEIGHT - 1; wy += 2) {
      for (let wx = x + 1; wx < x + width - 1; wx += 2) {
        if (d.chance(0.3)) canvas.set(wx, wy, d.pick<Tone>(["accent", "accent", "accent", "light", "soft"]));
      }
    }
    x += width + (d.chance(0.4) ? 1 : 0);
  }
};

const stars: Backdrop = (canvas, d) => {
  for (let star = 0; star < 90; star += 1) {
    canvas.set(d.int(0, 95), d.int(0, 23), d.pick<Tone>(["dim", "dim", "dim", "soft", "soft", "light"]));
  }
  for (let big = 0; big < 7; big += 1) {
    const x = d.int(3, 92);
    const y = d.int(3, 20);
    canvas.rect(x - 1, y, 3, 1, "soft");
    canvas.rect(x, y - 1, 1, 3, "soft");
    canvas.set(x, y, big < 3 ? "accent" : "light");
  }
  const tail = d.int(20, 70);
  for (let step = 0; step < 9; step += 1) canvas.set(tail + step * 2, 4 + step, step > 6 ? "accent" : "soft");
};

const rain: Backdrop = (canvas, d) => {
  for (let drop = 0; drop < 80; drop += 1) {
    const x = d.int(0, 97);
    const y = d.int(-1, 22);
    const length = d.int(2, 3);
    const tone: Tone = drop < 10 ? "accent" : d.pick<Tone>(["dim", "dim", "soft"]);
    for (let step = 0; step < length; step += 1) canvas.set(x - step, y + step, tone);
  }
  for (let splash = 0; splash < 14; splash += 1) {
    const x = d.int(1, 93);
    canvas.set(x, 23, "soft");
    canvas.set(x + 2, 23, "soft");
    canvas.set(x + 1, 22, "light");
  }
};

const grid: Backdrop = (canvas, d) => {
  const rows = [9, 12, 16, 21];
  for (let star = 0; star < 24; star += 1) canvas.set(d.int(0, 95), d.int(0, 7), d.chance(0.75) ? "dim" : "soft");
  for (let x = 4; x < BANNER_WIDTH; x += 8) canvas.rect(x, rows[0], 1, BANNER_HEIGHT - rows[0], "dim");
  for (const y of rows) canvas.rect(0, y, BANNER_WIDTH, 1, y === rows[0] ? "soft" : "dim");
  for (let tile = 0; tile < 16; tile += 1) {
    const column = d.int(0, 11);
    const row = d.int(0, 2);
    const top = rows[row] + 1;
    const height = (rows[row + 1] ?? BANNER_HEIGHT) - top;
    canvas.rect(5 + column * 8, top, 7, height, tile < 4 ? "accent" : "soft");
  }
};

const waves: Backdrop = (canvas, d) => {
  const bands: Array<[number, number, number, Tone]> = [
    [7, 2.6, 7, "accent"],
    [12, 2.1, 5, "soft"],
    [17, 1.6, 9, "light"],
  ];
  const phases = bands.map(() => d.roll() * 6.28);
  for (let x = 0; x < BANNER_WIDTH; x += 1) {
    let lowest = 0;
    bands.forEach(([base, swing, period, tone], index) => {
      const y = base + Math.round(swing * Math.sin(x / period + phases[index]));
      canvas.set(x, y, tone);
      lowest = Math.max(lowest, y);
    });
    for (let y = lowest + 2; y < BANNER_HEIGHT; y += 1) {
      if ((x + y) % 2 === 0 && (y - lowest) % 2 === 0) canvas.set(x, y, "dim");
    }
  }
};

const circuit: Backdrop = (canvas, d) => {
  for (let trace = 0; trace < 9; trace += 1) {
    const tone: Tone = trace < 2 ? "accent" : "soft";
    let x = trace % 3 === 0 ? d.int(8, 40) : 0;
    let y = 2 + trace * 2 + d.int(0, 3);
    canvas.rect(x, y - 1, 2, 2, "light");
    while (x < BANNER_WIDTH) {
      const run = d.int(6, 18);
      canvas.rect(x, y, run, 1, tone);
      x += run;
      if (x > 44 && d.chance(0.28)) {
        canvas.rect(x, y - 1, 2, 2, "light");
        break;
      }
      const jog = d.pick([-4, -3, -2, 2, 3, 4]);
      const next = Math.max(1, Math.min(BANNER_HEIGHT - 2, y + jog));
      canvas.rect(x, Math.min(y, next), 1, Math.abs(next - y) + 1, tone);
      y = next;
    }
  }
};

const BACKDROPS: Record<Banner, Backdrop> = { skyline, stars, rain, grid, waves, circuit };

export function bannerArt(banner: Banner): Art {
  const canvas = new Canvas(BANNER_WIDTH, BANNER_HEIGHT);
  BACKDROPS[banner](canvas, dice(`banner:${banner}`));
  if (banner !== "waves") canvas.dither();
  return canvas.toArt();
}
