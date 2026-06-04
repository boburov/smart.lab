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
export type { Atom, Bond, Molecule, Element } from "./types/molecule";

// Molecule dataset (generated from PubChem)
export { molecules, moleculesByCid, moleculesByName } from "./data/molecules";

// Periodic-table reference data
export { elements, unknownElement, getElement } from "./data/elements";

// Render/geometry helpers
export {
  atomColor,
  atomRadius,
  bondLength,
  boundingBox,
  boundingRadius,
  listCategories,
  moleculesInCategory,
} from "./data/helpers";
