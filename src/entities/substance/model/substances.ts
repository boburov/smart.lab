import { getElement } from "../../element";
import { parseFormula } from "../../../shared/lib/formula";
import type { PhysicalState, Substance } from "./types";

/**
 * The catalog of pickable laboratory substances (the chest contents).
 *
 * Two groups:
 *  1. Elementlar — single elements rendered in their true CPK/Jmol colour, so
 *     a learner can build molecules atom-by-atom (2 Vodorod + 1 Kislorod -> suv).
 *  2. Reaktivlar — common ready-made reagents shown in a representative
 *     real-world colour (mis sulfat — ko'k, kaliy permanganat — binafsha …).
 *
 * Each element carries the Uzbek name; the render colour always comes from the
 * shared periodic-table data so colours stay consistent across the app.
 */

/** Uzbek element names, keyed by atomic number, for the elements offered here. */
const ELEMENT_NAMES_UZ: Record<number, string> = {
  1: "Vodorod",
  6: "Uglerod",
  7: "Azot",
  8: "Kislorod",
  11: "Natriy",
  12: "Magniy",
  16: "Oltingugurt",
  17: "Xlor",
  19: "Kaliy",
  20: "Kalsiy",
  25: "Marganets",
  26: "Temir",
  29: "Mis",
  30: "Rux",
};

/** Room-temperature state for the offered elements (chest grouping only). */
const ELEMENT_STATE_UZ: Record<number, PhysicalState> = {
  1: "gaz",
  6: "qattiq",
  7: "gaz",
  8: "gaz",
  11: "qattiq",
  12: "qattiq",
  16: "qattiq",
  17: "gaz",
  19: "qattiq",
  20: "qattiq",
  25: "qattiq",
  26: "qattiq",
  29: "qattiq",
  30: "qattiq",
};

/** Atomic numbers offered in the chest, in display order. */
const ELEMENT_NUMBERS = [1, 8, 7, 6, 11, 17, 16, 19, 20, 12, 25, 26, 29, 30];

function elementSubstance(atomicNumber: number): Substance {
  const el = getElement(atomicNumber);
  return {
    id: `el-${el.symbol}`,
    kind: "element",
    name: ELEMENT_NAMES_UZ[atomicNumber] ?? el.name,
    formula: el.symbol,
    color: el.color,
    composition: { [el.symbol]: 1 },
    state: ELEMENT_STATE_UZ[atomicNumber] ?? "qattiq",
  };
}

/** Hand-authored compound, formula parsed into its element multiset. */
function compound(
  id: string,
  name: string,
  formula: string,
  color: string,
  state: PhysicalState,
): Substance {
  return {
    id: `cmp-${id}`,
    kind: "compound",
    name,
    formula,
    color,
    composition: parseFormula(formula),
    state,
  };
}

export const elementSubstances: Substance[] = ELEMENT_NUMBERS.map(elementSubstance);

export const compoundSubstances: Substance[] = [
  compound("h2o", "Suv", "H2O", "#cfeefb", "suyuq"),
  compound("nacl", "Osh tuzi", "NaCl", "#eef2f8", "qattiq"),
  compound("cuso4", "Mis(II) sulfat", "CuSO4", "#1f6fd0", "suyuq"),
  compound("kmno4", "Kaliy permanganat", "KMnO4", "#6d1b7b", "suyuq"),
  compound("fecl3", "Temir(III) xlorid", "FeCl3", "#a85a23", "suyuq"),
  compound("c2h6o", "Etanol", "C2H6O", "#eaf6ff", "suyuq"),
  compound("c2h4o2", "Sirka kislotasi", "C2H4O2", "#f2f6e8", "suyuq"),
  compound("h2o2", "Vodorod periks.", "H2O2", "#e9f6ff", "suyuq"),
  compound("nh3", "Ammiak eritmasi", "NH3", "#eef7f0", "suyuq"),
  compound("h2so4", "Sulfat kislota", "H2SO4", "#f6f1d6", "suyuq"),
];

/** Everything the chest offers, elements first. */
export const substances: Substance[] = [
  ...elementSubstances,
  ...compoundSubstances,
];

export const substancesById: Record<string, Substance> = Object.fromEntries(
  substances.map((s) => [s.id, s]),
);
