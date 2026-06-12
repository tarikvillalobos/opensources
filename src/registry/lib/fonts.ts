/** Font stacks selectable in the editor. */
export const FONTS: Record<string, string> = {
  geist: "'Geist', system-ui, sans-serif",
  grotesk: "'Space Grotesk', sans-serif",
  condensed: "'Bebas Neue', sans-serif",
  serif: "'Instrument Serif', Georgia, serif",
  mono: "'Geist Mono', monospace",
};

/** [key, i18n labelKey under `fonts` namespace] */
export const FONT_OPTS: [string, string][] = [
  ["geist", "geometric"],
  ["grotesk", "grotesk"],
  ["condensed", "condensed"],
  ["serif", "serif"],
  ["mono", "mono"],
];

/** Text color palette in the editor. */
export const TEXT_COLORS = [
  "#ffffff", "#0a0a0a", "#c8ff2d", "#ff5c35",
  "#5b8cff", "#19c37d", "#ff4d8d", "#ffd23f",
];

/** Background color palette in the editor. */
export const BG_COLORS = [
  "#0a0a0a", "#111317", "#ffffff", "#f3f3f5",
  "#c8ff2d", "#191535", "#06281f", "#2a0f12",
];
