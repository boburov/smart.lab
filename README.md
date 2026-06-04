# SmartLab

An interactive **3D molecule explorer** built with **React + Tailwind + React
Three Fiber**, on top of **240 chemical compounds** from
[PubChem](https://pubchem.ncbi.nlm.nih.gov). Browse the catalog by category,
search by name or formula, and inspect each molecule as a rotatable
ball-and-stick model with hover labels and an element legend.

## Getting started

```bash
npm install      # install dependencies
npm run dev      # start the dev server (Vite) — http://localhost:5173
```

Other scripts:

```bash
npm run build      # type-check + production build to dist/
npm run preview    # serve the production build
npm run typecheck  # tsc --noEmit
npm run data:build # re-download/regenerate the chemistry dataset (see below)
```

### App layout — Feature-Sliced Design (FSD)

The UI follows **FSD**: dependencies only point downward
(`app → pages → widgets → entities → shared`). Each slice exposes a public API
through its `index.ts`.

```
index.html                         # Vite entry
vite.config.ts                     # React + Tailwind v4 plugins
src/
  main.tsx                         # React root
  app/
    App.tsx                        # hash-route composition (landing/lab/chemistry)
    styles/index.css               # Tailwind v4 + white/blue theme tokens
  pages/
    landing/                       # main menu / hero
    lab/                           # 3D Laboratory: choose a direction
    chemistry/                     # live molecule explorer (3-pane)
    coming-soon/                   # placeholder for physics / electronics
  widgets/
    navbar/                        # shared top navigation
    molecule-sidebar/              # search + category-grouped list
    molecule-viewer/               # React Three Fiber ball-and-stick renderer
    molecule-info/                 # formula, weight, counts, element legend
  entities/
    molecule/{model,lib}           # types, generated dataset, format + geometry
    element/model                  # periodic-table reference (colors + radii)
    direction/model                # the three science directions + sections
  shared/
    ui/{brand-mark,icon}           # logo + line-icon set (no emoji)
    lib/router                     # minimal hash router
  index.ts                         # library barrel (re-exports the dataset)
```

The 3D viewer reads atoms/bonds straight from the dataset below: spheres are
sized by van der Waals radius and colored with CPK colors; bonds are two-tone
cylinders, with double/triple bonds drawn as parallel strands.

---

## The chemistry data

**240 chemical compounds** prepared as ready-to-use **TypeScript**
(4385 atoms / 4308 bonds total; 222 with real 3D conformers, 18 2D-only).

Each molecule carries its atoms (element + 3D coordinates), bonds (with bond
order), and metadata (name, formula, molecular weight). A periodic-table table
provides CPK colors and atomic radii so you can render ball-and-stick models
straight away.

## Catalog (240 molecules, 15 categories)

| Category | # | Examples |
|---|---|---|
| `gases` | 17 | O₂, N₂, CO₂, NH₃, ozone |
| `acids-bases` | 15 | sulfuric, nitric, phosphoric, NaOH, KOH |
| `inorganic-misc` | 9 | water, H₂O₂, NaCl, CaCO₃, KMnO₄ |
| `alkanes` | 14 | methane → octane, cyclohexane, isooctane |
| `unsaturated-aromatic` | 16 | benzene, toluene, styrene, naphthalene |
| `alcohols-ethers` | 18 | methanol, ethanol, glycerol, phenol, THF |
| `aldehydes-ketones` | 18 | formaldehyde, acetone, benzaldehyde, vanillin |
| `carboxylic-esters` | 18 | acetic, citric, lactic, benzoic acid |
| `amines-nitrogen` | 16 | methylamine, aniline, pyridine, imidazole |
| `amino-acids` | 20 | all 20 standard proteinogenic amino acids |
| `carbohydrates` | 17 | glucose, fructose, sucrose, ribose |
| `vitamins` | 16 | vitamin C, B-vitamins, retinol |
| `pharma` | 14 | aspirin, caffeine, ibuprofen, paracetamol |
| `biomolecules-neuro` | 16 | dopamine, serotonin, adenine, melatonin |
| `halogenated-industrial` | 16 | chloroform, DMSO, freon, HCN |

> **2D-only molecules.** 18 compounds (mostly ionic salts like NaCl, NaOH, KMnO₄,
> plus a few simple diatomics) have no computed 3D conformer in PubChem, so their
> coordinates are a flat 2D depiction (`dimensions: "2d"`, z = 0). Ionic
> associations in these appear as bonds with `order: 7`.

## Data source

All structures come from PubChem's [PUG REST API](https://pubchem.ncbi.nlm.nih.gov/docs/pug-rest).
For each compound we fetch its **computed 3D conformer** (`record_type=3d`),
falling back to the 2D depiction only when no 3D conformer exists. Coordinates
are in **Ångströms (Å)** and are re-centered on each molecule's geometric center
so every molecule sits at the origin.

## Layout

```
src/
  index.ts                                  # barrel export — import everything from here
  entities/
    molecule/
      model/types.ts                        # Atom, Bond, Molecule interfaces
      model/molecules.ts                    # AUTO-GENERATED dataset (do not edit by hand)
      lib/geometry.ts                        # geometry/render helpers (bounding box, colors, ...)
      lib/format.tsx                         # formula subscripts + category labels
    element/
      model/types.ts                        # Element interface
      model/elements.ts                      # periodic-table reference (colors + radii)
scripts/
  catalog.mjs           # the list of PubChem CIDs to download (edit this)
  build-data.mjs        # downloader + TypeScript generator
data/raw/               # cached raw PubChem JSON (so re-runs skip the network)
```

## The data model

```ts
interface Molecule {
  cid: number;            // PubChem Compound ID
  name: string;           // e.g. "Caffeine"
  iupacName: string;      // systematic name
  formula: string;        // e.g. "C8H10N4O2"
  molecularWeight: number;// g/mol
  category: string;       // UI grouping, e.g. "pharma"
  dimensions: "2d" | "3d";// whether coords are a real 3D conformer
  atoms: Atom[];
  bonds: Bond[];
}

interface Atom  { element: number; symbol: string; x: number; y: number; z: number }
interface Bond  { a: number; b: number; order: number } // a,b = indices into atoms[]; order 1=single,2=double,3=triple
```

## Usage

```ts
import { moleculesByName, atomColor, atomRadius, boundingRadius } from "./src";

const caffeine = moleculesByName["caffeine"];

// Render atoms as spheres
for (const atom of caffeine.atoms) {
  drawSphere({ x: atom.x, y: atom.y, z: atom.z, color: atomColor(atom), radius: atomRadius(atom) });
}

// Render bonds as cylinders between atoms
for (const bond of caffeine.bonds) {
  const a = caffeine.atoms[bond.a], b = caffeine.atoms[bond.b];
  drawCylinder(a, b, bond.order); // double/triple bonds -> draw 2 / 3 parallel cylinders
}

// Frame the camera so the whole molecule is visible
const fitDistance = boundingRadius(caffeine) * 2.5;
```

The data is renderer-agnostic — the numbers drop straight into Three.js,
React Three Fiber, Babylon.js, or raw WebGL.

## Regenerating / adding molecules

1. Find a compound on PubChem and copy its **CID**.
2. Add a line to `scripts/catalog.mjs`.
3. Run:

   ```bash
   npm run data:build
   ```

This re-downloads only what isn't already cached in `data/raw/` and rewrites
`src/data/molecules.ts`. Type-check the result with `npm run typecheck`.
