import { molecules, type Molecule } from "../../molecule";
import {
  compositionKey,
  parseFormula,
  type Composition,
} from "../../../shared/lib/formula";

/**
 * Data-driven reaction matcher. Instead of hand-writing recipes, we index the
 * whole molecule dataset by the canonical key of its formula's element
 * multiset. Whatever the learner pours into the vessel is reduced to the same
 * key, so an exact element match reveals the real product — e.g. pouring
 * 2 Vodorod + 1 Kislorod ({H:2,O:1}) resolves to Water (H2O).
 */
let index: Map<string, Molecule> | null = null;

function getIndex(): Map<string, Molecule> {
  if (index) return index;
  const map = new Map<string, Molecule>();
  for (const mol of molecules) {
    const key = compositionKey(parseFormula(mol.formula));
    // Keep the first match for a given formula (isomers share a key).
    if (key && !map.has(key)) map.set(key, mol);
  }
  index = map;
  return map;
}

/** The molecule a composition adds up to exactly, or null if nothing matches. */
export function findProduct(composition: Composition): Molecule | null {
  if (Object.keys(composition).length === 0) return null;
  return getIndex().get(compositionKey(composition)) ?? null;
}
