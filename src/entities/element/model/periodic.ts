/**
 * Full periodic-table layout data for all 118 elements: grid position (group ×
 * period), category and room-temperature state. The lanthanides/actinides sit
 * in two extra rows (period 8/9) under the main block.
 *
 * Render colours come from `categoryColor`; the true CPK atom colour still lives
 * in `elements` (model/elements.ts) for the elements that have one.
 */

export type ElementCategory =
  | "alkali"
  | "alkaline"
  | "transition"
  | "post-transition"
  | "metalloid"
  | "nonmetal"
  | "halogen"
  | "noble"
  | "lanthanide"
  | "actinide";

export type ElementState = "gaz" | "suyuq" | "qattiq";

export interface PeriodicElement {
  number: number;
  symbol: string;
  name: string;
  /** Column 1–18. */
  group: number;
  /** Row 1–7 for the main block, 8/9 for lanthanides/actinides. */
  period: number;
  category: ElementCategory;
  state: ElementState;
}

/** Soft category colours that fit the white/blue palette. */
export const categoryColor: Record<ElementCategory, string> = {
  alkali: "#f4cdbb",
  alkaline: "#f6e3bd",
  transition: "#cfe0f3",
  "post-transition": "#dbe3ec",
  metalloid: "#cfe8d9",
  nonmetal: "#c2ecd6",
  halogen: "#bfe2f2",
  noble: "#e3d7f4",
  lanthanide: "#f1d4ea",
  actinide: "#f2d3d9",
};

/** Uzbek labels for each category (for the legend). */
export const categoryLabel: Record<ElementCategory, string> = {
  alkali: "Ishqoriy metallar",
  alkaline: "Ishqoriy-yer metallari",
  transition: "O'tuvchi metallar",
  "post-transition": "Boshqa metallar",
  metalloid: "Metalloidlar",
  nonmetal: "Nometallar",
  halogen: "Galogenlar",
  noble: "Inert gazlar",
  lanthanide: "Lantanoidlar",
  actinide: "Aktinoidlar",
};

const GASES = new Set(["H", "He", "N", "O", "F", "Ne", "Cl", "Ar", "Kr", "Xe", "Rn"]);
const LIQUIDS = new Set(["Br", "Hg"]);

function stateOf(symbol: string): ElementState {
  if (GASES.has(symbol)) return "gaz";
  if (LIQUIDS.has(symbol)) return "suyuq";
  return "qattiq";
}

// [number, symbol, name, group, period, category] — f-block rows use period 8/9.
const RAW: [number, string, string, number, number, ElementCategory][] = [
  [1, "H", "Hydrogen", 1, 1, "nonmetal"],
  [2, "He", "Helium", 18, 1, "noble"],
  [3, "Li", "Lithium", 1, 2, "alkali"],
  [4, "Be", "Beryllium", 2, 2, "alkaline"],
  [5, "B", "Boron", 13, 2, "metalloid"],
  [6, "C", "Carbon", 14, 2, "nonmetal"],
  [7, "N", "Nitrogen", 15, 2, "nonmetal"],
  [8, "O", "Oxygen", 16, 2, "nonmetal"],
  [9, "F", "Fluorine", 17, 2, "halogen"],
  [10, "Ne", "Neon", 18, 2, "noble"],
  [11, "Na", "Sodium", 1, 3, "alkali"],
  [12, "Mg", "Magnesium", 2, 3, "alkaline"],
  [13, "Al", "Aluminium", 13, 3, "post-transition"],
  [14, "Si", "Silicon", 14, 3, "metalloid"],
  [15, "P", "Phosphorus", 15, 3, "nonmetal"],
  [16, "S", "Sulfur", 16, 3, "nonmetal"],
  [17, "Cl", "Chlorine", 17, 3, "halogen"],
  [18, "Ar", "Argon", 18, 3, "noble"],
  [19, "K", "Potassium", 1, 4, "alkali"],
  [20, "Ca", "Calcium", 2, 4, "alkaline"],
  [21, "Sc", "Scandium", 3, 4, "transition"],
  [22, "Ti", "Titanium", 4, 4, "transition"],
  [23, "V", "Vanadium", 5, 4, "transition"],
  [24, "Cr", "Chromium", 6, 4, "transition"],
  [25, "Mn", "Manganese", 7, 4, "transition"],
  [26, "Fe", "Iron", 8, 4, "transition"],
  [27, "Co", "Cobalt", 9, 4, "transition"],
  [28, "Ni", "Nickel", 10, 4, "transition"],
  [29, "Cu", "Copper", 11, 4, "transition"],
  [30, "Zn", "Zinc", 12, 4, "transition"],
  [31, "Ga", "Gallium", 13, 4, "post-transition"],
  [32, "Ge", "Germanium", 14, 4, "metalloid"],
  [33, "As", "Arsenic", 15, 4, "metalloid"],
  [34, "Se", "Selenium", 16, 4, "nonmetal"],
  [35, "Br", "Bromine", 17, 4, "halogen"],
  [36, "Kr", "Krypton", 18, 4, "noble"],
  [37, "Rb", "Rubidium", 1, 5, "alkali"],
  [38, "Sr", "Strontium", 2, 5, "alkaline"],
  [39, "Y", "Yttrium", 3, 5, "transition"],
  [40, "Zr", "Zirconium", 4, 5, "transition"],
  [41, "Nb", "Niobium", 5, 5, "transition"],
  [42, "Mo", "Molybdenum", 6, 5, "transition"],
  [43, "Tc", "Technetium", 7, 5, "transition"],
  [44, "Ru", "Ruthenium", 8, 5, "transition"],
  [45, "Rh", "Rhodium", 9, 5, "transition"],
  [46, "Pd", "Palladium", 10, 5, "transition"],
  [47, "Ag", "Silver", 11, 5, "transition"],
  [48, "Cd", "Cadmium", 12, 5, "transition"],
  [49, "In", "Indium", 13, 5, "post-transition"],
  [50, "Sn", "Tin", 14, 5, "post-transition"],
  [51, "Sb", "Antimony", 15, 5, "metalloid"],
  [52, "Te", "Tellurium", 16, 5, "metalloid"],
  [53, "I", "Iodine", 17, 5, "halogen"],
  [54, "Xe", "Xenon", 18, 5, "noble"],
  [55, "Cs", "Cesium", 1, 6, "alkali"],
  [56, "Ba", "Barium", 2, 6, "alkaline"],
  [72, "Hf", "Hafnium", 4, 6, "transition"],
  [73, "Ta", "Tantalum", 5, 6, "transition"],
  [74, "W", "Tungsten", 6, 6, "transition"],
  [75, "Re", "Rhenium", 7, 6, "transition"],
  [76, "Os", "Osmium", 8, 6, "transition"],
  [77, "Ir", "Iridium", 9, 6, "transition"],
  [78, "Pt", "Platinum", 10, 6, "transition"],
  [79, "Au", "Gold", 11, 6, "transition"],
  [80, "Hg", "Mercury", 12, 6, "transition"],
  [81, "Tl", "Thallium", 13, 6, "post-transition"],
  [82, "Pb", "Lead", 14, 6, "post-transition"],
  [83, "Bi", "Bismuth", 15, 6, "post-transition"],
  [84, "Po", "Polonium", 16, 6, "metalloid"],
  [85, "At", "Astatine", 17, 6, "halogen"],
  [86, "Rn", "Radon", 18, 6, "noble"],
  [87, "Fr", "Francium", 1, 7, "alkali"],
  [88, "Ra", "Radium", 2, 7, "alkaline"],
  [104, "Rf", "Rutherfordium", 4, 7, "transition"],
  [105, "Db", "Dubnium", 5, 7, "transition"],
  [106, "Sg", "Seaborgium", 6, 7, "transition"],
  [107, "Bh", "Bohrium", 7, 7, "transition"],
  [108, "Hs", "Hassium", 8, 7, "transition"],
  [109, "Mt", "Meitnerium", 9, 7, "transition"],
  [110, "Ds", "Darmstadtium", 10, 7, "transition"],
  [111, "Rg", "Roentgenium", 11, 7, "transition"],
  [112, "Cn", "Copernicium", 12, 7, "transition"],
  [113, "Nh", "Nihonium", 13, 7, "post-transition"],
  [114, "Fl", "Flerovium", 14, 7, "post-transition"],
  [115, "Mc", "Moscovium", 15, 7, "post-transition"],
  [116, "Lv", "Livermorium", 16, 7, "post-transition"],
  [117, "Ts", "Tennessine", 17, 7, "halogen"],
  [118, "Og", "Oganesson", 18, 7, "noble"],
  // Lanthanides (period row 8, groups 3–17)
  [57, "La", "Lanthanum", 3, 8, "lanthanide"],
  [58, "Ce", "Cerium", 4, 8, "lanthanide"],
  [59, "Pr", "Praseodymium", 5, 8, "lanthanide"],
  [60, "Nd", "Neodymium", 6, 8, "lanthanide"],
  [61, "Pm", "Promethium", 7, 8, "lanthanide"],
  [62, "Sm", "Samarium", 8, 8, "lanthanide"],
  [63, "Eu", "Europium", 9, 8, "lanthanide"],
  [64, "Gd", "Gadolinium", 10, 8, "lanthanide"],
  [65, "Tb", "Terbium", 11, 8, "lanthanide"],
  [66, "Dy", "Dysprosium", 12, 8, "lanthanide"],
  [67, "Ho", "Holmium", 13, 8, "lanthanide"],
  [68, "Er", "Erbium", 14, 8, "lanthanide"],
  [69, "Tm", "Thulium", 15, 8, "lanthanide"],
  [70, "Yb", "Ytterbium", 16, 8, "lanthanide"],
  [71, "Lu", "Lutetium", 17, 8, "lanthanide"],
  // Actinides (period row 9, groups 3–17)
  [89, "Ac", "Actinium", 3, 9, "actinide"],
  [90, "Th", "Thorium", 4, 9, "actinide"],
  [91, "Pa", "Protactinium", 5, 9, "actinide"],
  [92, "U", "Uranium", 6, 9, "actinide"],
  [93, "Np", "Neptunium", 7, 9, "actinide"],
  [94, "Pu", "Plutonium", 8, 9, "actinide"],
  [95, "Am", "Americium", 9, 9, "actinide"],
  [96, "Cm", "Curium", 10, 9, "actinide"],
  [97, "Bk", "Berkelium", 11, 9, "actinide"],
  [98, "Cf", "Californium", 12, 9, "actinide"],
  [99, "Es", "Einsteinium", 13, 9, "actinide"],
  [100, "Fm", "Fermium", 14, 9, "actinide"],
  [101, "Md", "Mendelevium", 15, 9, "actinide"],
  [102, "No", "Nobelium", 16, 9, "actinide"],
  [103, "Lr", "Lawrencium", 17, 9, "actinide"],
];

export const periodicElements: PeriodicElement[] = RAW.map(
  ([number, symbol, name, group, period, category]) => ({
    number,
    symbol,
    name,
    group,
    period,
    category,
    state: stateOf(symbol),
  }),
);
