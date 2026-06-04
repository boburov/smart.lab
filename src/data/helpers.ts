import type { Atom, Bond, Molecule } from "../types/molecule";
import { getElement } from "./elements";

/**
 * Framework-agnostic geometry/render helpers for the molecule data.
 * All distances are in Ångströms. These have no Three.js / WebGL dependency —
 * feed the plain numbers into whatever renderer the simulator uses.
 */

/** CPK/Jmol color (hex string) for an atom, based on its element. */
export function atomColor(atom: Atom): string {
  return getElement(atom.element).color;
}

/** Van der Waals sphere radius (Å) for an atom — a natural ball size. */
export function atomRadius(atom: Atom): number {
  return getElement(atom.element).vanDerWaalsRadius;
}

/** Euclidean distance (Å) between the two atoms a bond connects. */
export function bondLength(mol: Molecule, bond: Bond): number {
  const a = mol.atoms[bond.a];
  const b = mol.atoms[bond.b];
  if (!a || !b) return 0;
  return Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z);
}

/**
 * Axis-aligned bounding box of a molecule, plus its center and size.
 * Molecules are already centered on the origin, so `center` is ~(0,0,0).
 */
export function boundingBox(mol: Molecule): {
  min: [number, number, number];
  max: [number, number, number];
  center: [number, number, number];
  size: [number, number, number];
} {
  if (mol.atoms.length === 0) {
    return { min: [0, 0, 0], max: [0, 0, 0], center: [0, 0, 0], size: [0, 0, 0] };
  }
  const min: [number, number, number] = [Infinity, Infinity, Infinity];
  const max: [number, number, number] = [-Infinity, -Infinity, -Infinity];
  for (const a of mol.atoms) {
    const p: [number, number, number] = [a.x, a.y, a.z];
    for (let i = 0; i < 3; i++) {
      if (p[i]! < min[i]!) min[i] = p[i]!;
      if (p[i]! > max[i]!) max[i] = p[i]!;
    }
  }
  return {
    min,
    max,
    center: [(min[0] + max[0]) / 2, (min[1] + max[1]) / 2, (min[2] + max[2]) / 2],
    size: [max[0] - min[0], max[1] - min[1], max[2] - min[2]],
  };
}

/**
 * Radius of the smallest origin-centered sphere containing every atom (Å).
 * Handy for framing the camera so the whole molecule fits in view.
 */
export function boundingRadius(mol: Molecule): number {
  let r = 0;
  for (const a of mol.atoms) r = Math.max(r, Math.hypot(a.x, a.y, a.z));
  return r;
}

/** Sorted list of unique categories present in a set of molecules. */
export function listCategories(molecules: Molecule[]): string[] {
  return [...new Set(molecules.map((m) => m.category))].sort();
}

/** All molecules belonging to a given category. */
export function moleculesInCategory(molecules: Molecule[], category: string): Molecule[] {
  return molecules.filter((m) => m.category === category);
}
