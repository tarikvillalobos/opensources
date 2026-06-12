// presets.js — catalogue of components.
// One card per base motion engine — the canonical example of each model,
// using its own defaults. No recoloured/duplicated repeats.
import { MOTIONS } from "./motions";

const CATALOG = MOTIONS.map((m) => ({
  id: m.id,
  name: m.name,
  cat: m.cat,
  base: m.name,
  motion: m,
  format: m.format,
  speed: 1,
  props: { ...m.defaults, _font: 'geist', _upper: false, _scale: 1 },
}));

const PAGE_SIZES = [10, 50, 100, 1000];

export { CATALOG, PAGE_SIZES };
