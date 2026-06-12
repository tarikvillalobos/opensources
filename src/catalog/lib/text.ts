// Text parsing helpers shared by motions, so each engine doesn't re-roll the
// same split/trim/filter logic.

/** Split into lines on "\n". Pass `drop` to discard empty lines. */
export const lines = (v: unknown, drop = false): string[] => {
  const out = String(v ?? "").split("\n");
  return drop ? out.filter(Boolean) : out;
};

/** Comma-separated list -> trimmed, non-empty tokens. */
export const csv = (v: unknown): string[] =>
  String(v ?? "").split(",").map((s) => s.trim()).filter(Boolean);

/** Whitespace-separated words, non-empty. */
export const words = (v: unknown): string[] =>
  String(v ?? "").split(/\s+/).filter(Boolean);
