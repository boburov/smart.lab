/**
 * Curated catalog of molecules to fetch from PubChem.
 *
 * Each entry is a PubChem Compound ID (CID) plus a loose category for UI
 * grouping. To add more molecules: find the compound on pubchem.ncbi.nlm.nih.gov,
 * copy its CID, add a line here, and re-run `npm run data:build`.
 */
export const CATALOG = [
  // --- Inorganic & small molecules / gases ---
  { cid: 962,   category: "inorganic" },   // Water
  { cid: 280,   category: "inorganic" },   // Carbon dioxide
  { cid: 281,   category: "inorganic" },   // Carbon monoxide
  { cid: 977,   category: "inorganic" },   // Oxygen (O2)
  { cid: 947,   category: "inorganic" },   // Nitrogen (N2)
  { cid: 783,   category: "inorganic" },   // Hydrogen (H2)
  { cid: 222,   category: "inorganic" },   // Ammonia
  { cid: 784,   category: "inorganic" },   // Hydrogen peroxide
  { cid: 24823, category: "inorganic" },   // Ozone
  { cid: 313,   category: "inorganic" },   // Hydrogen chloride
  { cid: 1118,  category: "inorganic" },   // Sulfuric acid
  { cid: 944,   category: "inorganic" },   // Nitric acid
  { cid: 1176,  category: "inorganic" },   // Urea

  // --- Hydrocarbons ---
  { cid: 297,   category: "hydrocarbon" }, // Methane
  { cid: 6324,  category: "hydrocarbon" }, // Ethane
  { cid: 6334,  category: "hydrocarbon" }, // Propane
  { cid: 7843,  category: "hydrocarbon" }, // Butane
  { cid: 6325,  category: "hydrocarbon" }, // Ethylene (ethene)
  { cid: 6326,  category: "hydrocarbon" }, // Acetylene (ethyne)
  { cid: 241,   category: "hydrocarbon" }, // Benzene
  { cid: 1140,  category: "hydrocarbon" }, // Toluene

  // --- Alcohols, acids & common organics ---
  { cid: 887,   category: "organic" },     // Methanol
  { cid: 702,   category: "organic" },     // Ethanol
  { cid: 3776,  category: "organic" },     // Isopropanol
  { cid: 712,   category: "organic" },     // Formaldehyde
  { cid: 177,   category: "organic" },     // Acetaldehyde
  { cid: 180,   category: "organic" },     // Acetone
  { cid: 176,   category: "organic" },     // Acetic acid
  { cid: 996,   category: "organic" },     // Phenol
  { cid: 6342,  category: "organic" },     // Diethyl ether

  // --- Biomolecules & pharmaceuticals ---
  { cid: 5793,  category: "biomolecule" }, // D-Glucose
  { cid: 5988,  category: "biomolecule" }, // Sucrose
  { cid: 750,   category: "biomolecule" }, // Glycine
  { cid: 5950,  category: "biomolecule" }, // Alanine
  { cid: 311,   category: "biomolecule" }, // Citric acid
  { cid: 2244,  category: "pharma" },      // Aspirin
  { cid: 2519,  category: "pharma" },      // Caffeine
  { cid: 1983,  category: "pharma" },      // Paracetamol (acetaminophen)
  { cid: 3672,  category: "pharma" },      // Ibuprofen
];
