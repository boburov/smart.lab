/**
 * chem-sim-data — chemical compound data from PubChem, prepared for a 3D
 * molecule simulator.
 *
 * Quick start:
 *   import { molecules, moleculesByName, getElement, atomColor } from "chem-sim-data";
 *   const water = moleculesByName["water"];
 *   water.atoms.forEach(a => renderSphere(a.x, a.y, a.z, atomColor(a)));
 */

// Types
export type { Atom, Bond, Molecule } from "./entities/molecule";
export type { Element } from "./entities/element";

// Molecule dataset (generated from PubChem) + render/geometry helpers
export {
  molecules,
  moleculesByCid,
  moleculesByName,
  atomColor,
  atomRadius,
  bondLength,
  boundingBox,
  boundingRadius,
  listCategories,
  moleculesInCategory,
} from "./entities/molecule";

// Periodic-table reference data
export { elements, unknownElement, getElement } from "./entities/element";
