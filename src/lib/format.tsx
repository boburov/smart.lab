import { Fragment, type ReactNode } from "react";

/**
 * Render a molecular formula with the digit runs as subscripts,
 * e.g. "C8H10N4O2" -> C₈H₁₀N₄O₂.
 */
export function formatFormula(formula: string): ReactNode {
  const parts = formula.match(/[A-Za-z]+|\d+|[^A-Za-z\d]+/g) ?? [formula];
  return parts.map((part, i) =>
    /^\d+$/.test(part) ? (
      <sub key={i}>{part}</sub>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}

/** Turn a kebab-case category id into a human label, e.g. "acids-bases" -> "Acids bases". */
export function labelizeCategory(category: string): string {
  return category
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}
