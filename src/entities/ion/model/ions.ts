import { parseFormula } from "../../../shared/lib/formula";
import type { Ion, IonGroup } from "./types";

/**
 * Catalog of common ions, grouped like a chemistry reference (monatomic,
 * polyatomic, transition-metal, special/organic). Composition is parsed from
 * the base formula so an ion poured into the vessel contributes its atoms.
 */

/** Uzbek labels for each group. */
export const ionGroupLabel: Record<IonGroup, string> = {
  monatomic: "Oddiy ionlar",
  polyatomic: "Murakkab ionlar",
  transition: "O'tuvchi metall ionlari",
  special: "Maxsus va organik",
};

/** Group display order. */
export const ionGroups: IonGroup[] = ["monatomic", "polyatomic", "transition", "special"];

/** A colour by group and charge sign (warm cations, cool anions). */
function ionColor(group: IonGroup, charge: string): string {
  const cation = charge.endsWith("+");
  switch (group) {
    case "monatomic":
      return cation ? "#6e4b2f" : "#2c6a78";
    case "polyatomic":
      return "#3a6b43";
    case "transition":
      return "#8a5326";
    case "special":
      return cation ? "#3f6a78" : "#5a3f6b";
  }
}

// [base formula, charge, name, group]
const RAW: [string, string, string, IonGroup][] = [
  // Basic monatomic
  ["H", "+", "Hydrogen", "monatomic"],
  ["Li", "+", "Lithium", "monatomic"],
  ["Na", "+", "Sodium", "monatomic"],
  ["K", "+", "Potassium", "monatomic"],
  ["Ag", "+", "Silver", "monatomic"],
  ["Mg", "2+", "Magnesium", "monatomic"],
  ["Ca", "2+", "Calcium", "monatomic"],
  ["Ba", "2+", "Barium", "monatomic"],
  ["Zn", "2+", "Zinc", "monatomic"],
  ["Al", "3+", "Aluminium", "monatomic"],
  ["F", "-", "Fluoride", "monatomic"],
  ["Cl", "-", "Chloride", "monatomic"],
  ["Br", "-", "Bromide", "monatomic"],
  ["I", "-", "Iodide", "monatomic"],
  ["O", "2-", "Oxide", "monatomic"],
  ["S", "2-", "Sulfide", "monatomic"],
  ["N", "3-", "Nitride", "monatomic"],
  ["P", "3-", "Phosphide", "monatomic"],
  // Core polyatomic
  ["CO3", "2-", "Carbonate", "polyatomic"],
  ["C2O4", "2-", "Oxalate", "polyatomic"],
  ["NO3", "-", "Nitrate", "polyatomic"],
  ["NO2", "-", "Nitrite", "polyatomic"],
  ["SO4", "2-", "Sulfate", "polyatomic"],
  ["SO3", "2-", "Sulfite", "polyatomic"],
  ["PO4", "3-", "Phosphate", "polyatomic"],
  ["ClO3", "-", "Chlorate", "polyatomic"],
  ["ClO", "-", "Hypochlorite", "polyatomic"],
  ["ClO4", "-", "Perchlorate", "polyatomic"],
  // Transition metals
  ["Cu", "+", "Copper(I)", "transition"],
  ["Cu", "2+", "Copper(II)", "transition"],
  ["Fe", "2+", "Iron(II)", "transition"],
  ["Fe", "3+", "Iron(III)", "transition"],
  ["Pb", "2+", "Lead(II)", "transition"],
  ["MnO4", "-", "Permanganate", "transition"],
  ["CrO4", "2-", "Chromate", "transition"],
  ["Cr2O7", "2-", "Dichromate", "transition"],
  // Special & organic
  ["NH4", "+", "Ammonium", "special"],
  ["OH", "-", "Hydroxide", "special"],
  ["HCO3", "-", "Bicarbonate", "special"],
  ["HSO4", "-", "Bisulfate", "special"],
  ["H2PO4", "-", "Dihydrogen phosphate", "special"],
  ["CH3COO", "-", "Acetate", "special"],
  ["CN", "-", "Cyanide", "special"],
];

export const ions: Ion[] = RAW.map(([formula, charge, name, group]) => ({
  id: `${formula}_${charge}`,
  formula,
  charge,
  name,
  group,
  color: ionColor(group, charge),
  composition: parseFormula(formula),
}));
