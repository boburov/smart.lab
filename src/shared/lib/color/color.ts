/**
 * Tiny hex-colour helpers for blending poured substances into one liquid
 * colour. Mixing happens in plain sRGB space — not physically accurate, but it
 * reads naturally for a teaching simulation (red + white -> pink, etc.).
 */

interface Rgb {
  r: number;
  g: number;
  b: number;
}

/** Parse "#RRGGBB" (or "#RGB") into 0–255 channels; falls back to mid-grey. */
export function hexToRgb(hex: string): Rgb {
  let h = hex.replace("#", "").trim();
  if (h.length === 3) {
    h = h
      .split("")
      .map((c) => c + c)
      .join("");
  }
  const int = parseInt(h, 16);
  if (h.length !== 6 || Number.isNaN(int)) return { r: 136, g: 136, b: 136 };
  return { r: (int >> 16) & 255, g: (int >> 8) & 255, b: int & 255 };
}

/** Format 0–255 channels back into a "#RRGGBB" string. */
export function rgbToHex({ r, g, b }: Rgb): string {
  const clamp = (n: number) => Math.max(0, Math.min(255, Math.round(n)));
  const hex = (n: number) => clamp(n).toString(16).padStart(2, "0");
  return `#${hex(r)}${hex(g)}${hex(b)}`;
}

/**
 * Weighted average of several colours. Each entry contributes proportionally to
 * its weight (e.g. the poured amount), so a large splash of one reagent
 * dominates the resulting hue.
 */
export function blendColors(
  parts: { color: string; weight: number }[],
): string {
  const total = parts.reduce((sum, p) => sum + Math.max(0, p.weight), 0);
  if (total <= 0) return "#dfe9f2";
  const acc = parts.reduce(
    (a, p) => {
      const w = Math.max(0, p.weight);
      const { r, g, b } = hexToRgb(p.color);
      return { r: a.r + r * w, g: a.g + g * w, b: a.b + b * w };
    },
    { r: 0, g: 0, b: 0 },
  );
  return rgbToHex({ r: acc.r / total, g: acc.g / total, b: acc.b / total });
}
