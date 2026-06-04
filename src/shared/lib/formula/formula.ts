/**
 * Framework-agnostic helpers for working with molecular formulas as plain
 * element multisets. Used by the laboratory to track what has been poured into
 * a vessel and to recognise the substance that the mixture adds up to.
 */

/** Element multiset: chemical symbol -> atom count, e.g. water = { H: 2, O: 1 }. */
export type Composition = Record<string, number>;

/**
 * Parse a molecular formula such as "C8H10N4O2", "H3N" or "Ca(OH)2" into an
 * element multiset. Parentheses/brackets with a trailing multiplier are
 * expanded; charge markers and separators are ignored.
 */
export function parseFormula(formula: string): Composition {
  const root: Composition = {};
  const stack: Composition[] = [root];
  let i = 0;

  const readNumber = (): number => {
    let digits = "";
    while (i < formula.length && /\d/.test(formula.charAt(i))) {
      digits += formula.charAt(i);
      i += 1;
    }
    return digits ? parseInt(digits, 10) : 1;
  };

  while (i < formula.length) {
    const ch = formula.charAt(i);

    if (ch === "(" || ch === "[") {
      stack.push({});
      i += 1;
    } else if (ch === ")" || ch === "]") {
      i += 1;
      const mult = readNumber();
      const group = stack.pop();
      const parent = stack[stack.length - 1];
      if (group && parent) {
        for (const [sym, count] of Object.entries(group)) {
          parent[sym] = (parent[sym] ?? 0) + count * mult;
        }
      }
    } else if (/[A-Z]/.test(ch)) {
      let symbol = ch;
      i += 1;
      while (i < formula.length && /[a-z]/.test(formula.charAt(i))) {
        symbol += formula.charAt(i);
        i += 1;
      }
      const mult = readNumber();
      const top = stack[stack.length - 1];
      if (top) top[symbol] = (top[symbol] ?? 0) + mult;
    } else {
      // Skip charges, dots, whitespace and anything else we don't model.
      i += 1;
    }
  }

  return root;
}

/** Merge `add` into `base` (mutating and returning `base`). */
export function addComposition(base: Composition, add: Composition): Composition {
  for (const [sym, count] of Object.entries(add)) {
    base[sym] = (base[sym] ?? 0) + count;
  }
  return base;
}

/** Total number of atoms across every element in a composition. */
export function totalAtoms(comp: Composition): number {
  let n = 0;
  for (const count of Object.values(comp)) n += count;
  return n;
}

/**
 * Stable canonical key for a composition, independent of insertion order, so
 * two equal multisets hash to the same string (e.g. {H:2,O:1} -> "H2O1").
 * Both the molecule index and a live mixture run through this, so any element
 * ordering (Hill notation, alphabetical, …) collapses to one key.
 */
export function compositionKey(comp: Composition): string {
  return Object.keys(comp)
    .filter((sym) => comp[sym]! > 0)
    .sort()
    .map((sym) => `${sym}${comp[sym]}`)
    .join("");
}
