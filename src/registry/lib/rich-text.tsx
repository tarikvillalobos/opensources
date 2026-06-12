import React from "react";

/**
 * Rich text helper: `*word*` renders in the accent color, `\n` becomes a line
 * break. Used by motions whose `meta.rich` is true.
 */
export function rich(text: unknown, accent: string) {
  return String(text ?? "")
    .split("\n")
    .map((line, li) => (
      <React.Fragment key={li}>
        {li > 0 && <br />}
        {line.split(/(\*[^*]+\*)/g).map((part, pi) =>
          part.length > 2 && part.startsWith("*") && part.endsWith("*") ? (
            <span key={pi} style={{ color: accent }}>
              {part.slice(1, -1)}
            </span>
          ) : (
            <React.Fragment key={pi}>{part}</React.Fragment>
          ),
        )}
      </React.Fragment>
    ));
}
