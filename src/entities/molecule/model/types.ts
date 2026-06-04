/**
 * Core data types for the 3D molecule simulator.
 *
 * Coordinates are in Ångströms (Å), taken from PubChem's computed 3D
 * conformers and re-centered on the molecule's geometric center so each
 * molecule sits at the origin — convenient for camera framing.
 */

/** A single atom with its 3D position. */
export interface Atom {
  /** Atomic number (e.g. 6 = Carbon). Index into the element table. */
  element: number;
  /** Chemical symbol (e.g. "C", "O", "H"). */
  symbol: string;
  /** Cartesian coordinates in Ångströms, centered on the molecule centroid. */
  x: number;
  y: number;
  z: number;
}

/** A covalent bond between two atoms (referenced by their array index). */
export interface Bond {
  /** Index of the first atom in `Molecule.atoms`. */
  a: number;
  /** Index of the second atom in `Molecule.atoms`. */
  b: number;
  /**
   * PubChem bond order: 1 = single, 2 = double, 3 = triple, 4 = quadruple,
   * 5 = dative, 6 = complex, 7 = ionic. Ionic "bonds" (order 7) appear in salts
   * like NaCl/KOH — a renderer may draw them as dashed lines or omit them.
   */
  order: number;
}

/** A complete molecule ready to render and simulate. */
export interface Molecule {
  /** PubChem Compound ID (CID) — the canonical upstream identifier. */
  cid: number;
  /** Human-friendly display name (PubChem "Title"). */
  name: string;
  /** Systematic IUPAC name. */
  iupacName: string;
  /** Molecular formula, e.g. "C8H10N4O2". */
  formula: string;
  /** Molecular weight in g/mol. */
  molecularWeight: number;
  /** Loose grouping for UI menus (e.g. "inorganic", "hydrocarbon"). */
  category: string;
  /**
   * Whether the coordinates come from a real 3D conformer ("3d") or a flat 2D
   * depiction with z = 0 ("2d", when PubChem has no computed 3D conformer).
   * The simulator can use this to decide whether to lay the molecule out flat.
   */
  dimensions: "2d" | "3d";
  /** All atoms in the molecule. */
  atoms: Atom[];
  /** All bonds between atoms. */
  bonds: Bond[];
}
