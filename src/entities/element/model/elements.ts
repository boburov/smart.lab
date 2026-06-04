import type { Element } from "./types";

/**
 * Periodic-table reference data for elements that appear in the compound
 * catalog (plus a few common neighbors). Colors follow the standard Jmol/CPK
 * scheme; radii are in Ångströms (covalent: Cordero et al. 2008; van der Waals:
 * Bondi/Alvarez). Indexed by atomic number for O(1) lookup during rendering.
 */
export const elements: Record<number, Element> = {
  1:  { number: 1,  symbol: "H",  name: "Hydrogen",   color: "#FFFFFF", covalentRadius: 0.31, vanDerWaalsRadius: 1.20 },
  2:  { number: 2,  symbol: "He", name: "Helium",     color: "#D9FFFF", covalentRadius: 0.28, vanDerWaalsRadius: 1.40 },
  3:  { number: 3,  symbol: "Li", name: "Lithium",    color: "#CC80FF", covalentRadius: 1.28, vanDerWaalsRadius: 1.82 },
  4:  { number: 4,  symbol: "Be", name: "Beryllium",  color: "#C2FF00", covalentRadius: 0.96, vanDerWaalsRadius: 1.53 },
  5:  { number: 5,  symbol: "B",  name: "Boron",      color: "#FFB5B5", covalentRadius: 0.84, vanDerWaalsRadius: 1.92 },
  6:  { number: 6,  symbol: "C",  name: "Carbon",     color: "#909090", covalentRadius: 0.76, vanDerWaalsRadius: 1.70 },
  7:  { number: 7,  symbol: "N",  name: "Nitrogen",   color: "#3050F8", covalentRadius: 0.71, vanDerWaalsRadius: 1.55 },
  8:  { number: 8,  symbol: "O",  name: "Oxygen",     color: "#FF0D0D", covalentRadius: 0.66, vanDerWaalsRadius: 1.52 },
  9:  { number: 9,  symbol: "F",  name: "Fluorine",   color: "#90E050", covalentRadius: 0.57, vanDerWaalsRadius: 1.47 },
  10: { number: 10, symbol: "Ne", name: "Neon",       color: "#B3E3F5", covalentRadius: 0.58, vanDerWaalsRadius: 1.54 },
  11: { number: 11, symbol: "Na", name: "Sodium",     color: "#AB5CF2", covalentRadius: 1.66, vanDerWaalsRadius: 2.27 },
  12: { number: 12, symbol: "Mg", name: "Magnesium",  color: "#8AFF00", covalentRadius: 1.41, vanDerWaalsRadius: 1.73 },
  13: { number: 13, symbol: "Al", name: "Aluminium",  color: "#BFA6A6", covalentRadius: 1.21, vanDerWaalsRadius: 1.84 },
  14: { number: 14, symbol: "Si", name: "Silicon",    color: "#F0C8A0", covalentRadius: 1.11, vanDerWaalsRadius: 2.10 },
  15: { number: 15, symbol: "P",  name: "Phosphorus", color: "#FF8000", covalentRadius: 1.07, vanDerWaalsRadius: 1.80 },
  16: { number: 16, symbol: "S",  name: "Sulfur",     color: "#FFFF30", covalentRadius: 1.05, vanDerWaalsRadius: 1.80 },
  17: { number: 17, symbol: "Cl", name: "Chlorine",   color: "#1FF01F", covalentRadius: 1.02, vanDerWaalsRadius: 1.75 },
  18: { number: 18, symbol: "Ar", name: "Argon",      color: "#80D1E3", covalentRadius: 1.06, vanDerWaalsRadius: 1.88 },
  19: { number: 19, symbol: "K",  name: "Potassium",  color: "#8F40D4", covalentRadius: 2.03, vanDerWaalsRadius: 2.75 },
  20: { number: 20, symbol: "Ca", name: "Calcium",    color: "#3DFF00", covalentRadius: 1.76, vanDerWaalsRadius: 2.31 },
  25: { number: 25, symbol: "Mn", name: "Manganese",  color: "#9C7AC7", covalentRadius: 1.39, vanDerWaalsRadius: 2.05 },
  26: { number: 26, symbol: "Fe", name: "Iron",       color: "#E06633", covalentRadius: 1.32, vanDerWaalsRadius: 2.04 },
  27: { number: 27, symbol: "Co", name: "Cobalt",     color: "#F090A0", covalentRadius: 1.26, vanDerWaalsRadius: 2.00 },
  29: { number: 29, symbol: "Cu", name: "Copper",     color: "#C88033", covalentRadius: 1.32, vanDerWaalsRadius: 1.96 },
  30: { number: 30, symbol: "Zn", name: "Zinc",       color: "#7D80B0", covalentRadius: 1.22, vanDerWaalsRadius: 2.01 },
  35: { number: 35, symbol: "Br", name: "Bromine",    color: "#A62929", covalentRadius: 1.20, vanDerWaalsRadius: 1.85 },
  53: { number: 53, symbol: "I",  name: "Iodine",     color: "#940094", covalentRadius: 1.39, vanDerWaalsRadius: 1.98 },
};

/** Fallback used when an unknown element is encountered. */
export const unknownElement: Element = {
  number: 0,
  symbol: "?",
  name: "Unknown",
  color: "#FF1493",
  covalentRadius: 0.7,
  vanDerWaalsRadius: 1.6,
};

/** Look up an element by atomic number, with a safe fallback. */
export function getElement(atomicNumber: number): Element {
  return elements[atomicNumber] ?? unknownElement;
}
