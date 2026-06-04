/**
 * Downloads 3D molecular structures from PubChem (PUG REST) and generates
 * a TypeScript data module for the 3D simulator.
 *
 *   1. For each CID in the catalog, fetch the 3D conformer record (cached on
 *      disk in data/raw/ so re-runs don't re-hit the network).
 *   2. Fetch name / formula / weight for all CIDs in one batched request.
 *   3. Parse each record into { atoms, bonds }, re-center on the centroid.
 *   4. Emit src/entities/molecule/model/molecules.ts with the full typed dataset.
 *
 * Usage: node scripts/build-data.mjs   (or: npm run data:build)
 */
import { CATALOG } from "./catalog.mjs";
import { mkdir, readFile, writeFile, access } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const RAW_DIR = join(ROOT, "data", "raw");
const OUT_FILE = join(ROOT, "src", "entities", "molecule", "model", "molecules.ts");

const PUG = "https://pubchem.ncbi.nlm.nih.gov/rest/pug";
const ELEMENT_SYMBOLS = {
  1: "H", 2: "He", 3: "Li", 4: "Be", 5: "B", 6: "C", 7: "N", 8: "O", 9: "F",
  10: "Ne", 11: "Na", 12: "Mg", 13: "Al", 14: "Si", 15: "P", 16: "S", 17: "Cl",
  18: "Ar", 19: "K", 20: "Ca", 25: "Mn", 26: "Fe", 27: "Co", 29: "Cu", 30: "Zn",
  35: "Br", 53: "I",
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function exists(path) {
  try { await access(path); return true; } catch { return false; }
}

/**
 * Fetch a URL via curl (the sandbox blocks Node's built-in fetch/undici but
 * allows curl), with a couple of retries and basic backoff — PubChem throttles
 * hard and returns 503 when overloaded. The HTTP status is appended by curl's
 * `-w` flag on its own final line and split off here.
 */
async function fetchText(url, attempt = 0) {
  try {
    const { stdout } = await execFileAsync(
      "curl",
      ["-s", "-m", "30", "-A", "chem-sim-data/0.1", "-w", "\n%{http_code}", url],
      { maxBuffer: 64 * 1024 * 1024 },
    );
    const nl = stdout.lastIndexOf("\n");
    const status = Number(stdout.slice(nl + 1).trim());
    const body = stdout.slice(0, nl);
    if (status === 503 || status === 429) throw new Error(`HTTP ${status}`);
    if (status < 200 || status >= 300) return { ok: false, status, body };
    return { ok: true, status, body };
  } catch (err) {
    if (attempt < 3) {
      await sleep(1000 * (attempt + 1));
      return fetchText(url, attempt + 1);
    }
    return { ok: false, status: 0, body: String(err) };
  }
}

/** Download the 3D record JSON for one CID, using the on-disk cache. */
async function getRawRecord(cid) {
  const cachePath = join(RAW_DIR, `${cid}.json`);
  if (await exists(cachePath)) {
    return JSON.parse(await readFile(cachePath, "utf8"));
  }
  // Prefer the computed 3D conformer; fall back to 2D if none exists.
  let res = await fetchText(`${PUG}/compound/cid/${cid}/record/JSON?record_type=3d`);
  let dimensions = "3d";
  if (!res.ok) {
    res = await fetchText(`${PUG}/compound/cid/${cid}/record/JSON?record_type=2d`);
    dimensions = "2d";
  }
  if (!res.ok) {
    console.warn(`  ! CID ${cid}: record fetch failed (HTTP ${res.status})`);
    return null;
  }
  const json = JSON.parse(res.body);
  json.__dimensions = dimensions;
  await writeFile(cachePath, JSON.stringify(json));
  await sleep(250); // stay under PubChem's ~5 req/s limit
  return json;
}

/** Fetch name / formula / weight / IUPAC name for every CID in one call. */
async function getProperties(cids) {
  const list = cids.join(",");
  const url = `${PUG}/compound/cid/${list}/property/Title,MolecularFormula,MolecularWeight,IUPACName/JSON`;
  const res = await fetchText(url);
  const map = new Map();
  if (!res.ok) {
    console.warn(`  ! Property fetch failed (HTTP ${res.status})`);
    return map;
  }
  const props = JSON.parse(res.body)?.PropertyTable?.Properties ?? [];
  for (const p of props) map.set(p.CID, p);
  return map;
}

/** Parse a PUG_Compounds record into centered atoms + bonds. */
function parseRecord(json, dimensions) {
  const compound = json?.PC_Compounds?.[0];
  if (!compound) return null;

  const aids = compound.atoms?.aid ?? [];
  const elements = compound.atoms?.element ?? [];
  const aidToIndex = new Map(aids.map((aid, i) => [aid, i]));

  const conf = compound.coords?.[0]?.conformers?.[0] ?? {};
  const coordAids = compound.coords?.[0]?.aid ?? aids;
  const xs = conf.x ?? [];
  const ys = conf.y ?? [];
  const zs = conf.z ?? []; // 2D records omit z -> default 0

  // aid -> {x,y,z}
  const pos = new Map();
  coordAids.forEach((aid, i) => {
    pos.set(aid, { x: xs[i] ?? 0, y: ys[i] ?? 0, z: zs[i] ?? 0 });
  });

  const atoms = aids.map((aid, i) => {
    const p = pos.get(aid) ?? { x: 0, y: 0, z: 0 };
    const element = elements[i] ?? 0;
    return { element, symbol: ELEMENT_SYMBOLS[element] ?? "?", x: p.x, y: p.y, z: p.z };
  });

  // Re-center on the geometric centroid.
  if (atoms.length) {
    const c = atoms.reduce((a, at) => ({ x: a.x + at.x, y: a.y + at.y, z: a.z + at.z }), { x: 0, y: 0, z: 0 });
    c.x /= atoms.length; c.y /= atoms.length; c.z /= atoms.length;
    for (const at of atoms) {
      at.x = round(at.x - c.x);
      at.y = round(at.y - c.y);
      at.z = round(at.z - c.z);
    }
  }

  const a1 = compound.bonds?.aid1 ?? [];
  const a2 = compound.bonds?.aid2 ?? [];
  const ord = compound.bonds?.order ?? [];
  const bonds = a1.map((s, i) => ({
    a: aidToIndex.get(s) ?? 0,
    b: aidToIndex.get(a2[i]) ?? 0,
    order: ord[i] ?? 1,
  }));

  return { atoms, bonds, dimensions };
}

const round = (n) => Math.round(n * 10000) / 10000;

/** Sanity-check a parsed molecule; returns an array of human-readable issues. */
function validate(mol) {
  const issues = [];
  const n = mol.atoms.length;
  if (n === 0) issues.push("no atoms");
  for (const [i, b] of mol.bonds.entries()) {
    if (b.a < 0 || b.a >= n || b.b < 0 || b.b >= n) issues.push(`bond ${i} references out-of-range atom`);
    if (b.a === b.b) issues.push(`bond ${i} connects an atom to itself`);
    // PubChem bond orders: 1-4 covalent, 5 dative, 6 complex, 7 ionic. Anything
    // outside 1-7 is genuinely unexpected.
    if (b.order < 1 || b.order > 7) issues.push(`bond ${i} has unexpected order ${b.order}`);
  }
  if (mol.dimensions === "3d") {
    // Small molecules (CO2, ozone, formaldehyde...) are inherently planar, so a
    // z = 0 plane is fine. Only flag larger structures that are suspiciously flat.
    const flat = mol.atoms.every((a) => a.z === 0);
    if (n >= 5 && flat) issues.push("marked 3D but all z = 0 (likely flat)");
  }
  if (mol.atoms.some((a) => a.symbol === "?")) issues.push("contains an unmapped element");
  return issues;
}

function tsLiteral(mol) {
  const atoms = mol.atoms
    .map((a) => `      { element: ${a.element}, symbol: ${JSON.stringify(a.symbol)}, x: ${a.x}, y: ${a.y}, z: ${a.z} },`)
    .join("\n");
  const bonds = mol.bonds
    .map((b) => `      { a: ${b.a}, b: ${b.b}, order: ${b.order} },`)
    .join("\n");
  return `  {
    cid: ${mol.cid},
    name: ${JSON.stringify(mol.name)},
    iupacName: ${JSON.stringify(mol.iupacName)},
    formula: ${JSON.stringify(mol.formula)},
    molecularWeight: ${mol.molecularWeight},
    category: ${JSON.stringify(mol.category)},
    dimensions: ${JSON.stringify(mol.dimensions)},
    atoms: [
${atoms}
    ],
    bonds: [
${bonds}
    ],
  },`;
}

async function main() {
  await mkdir(RAW_DIR, { recursive: true });
  await mkdir(dirname(OUT_FILE), { recursive: true });

  console.log(`Fetching ${CATALOG.length} compounds from PubChem...`);
  const props = await getProperties(CATALOG.map((c) => c.cid));

  const molecules = [];
  for (const entry of CATALOG) {
    const raw = await getRawRecord(entry.cid);
    if (!raw) continue;
    const parsed = parseRecord(raw, raw.__dimensions ?? "3d");
    if (!parsed || !parsed.atoms.length) {
      console.warn(`  ! CID ${entry.cid}: no atoms parsed, skipping`);
      continue;
    }
    const p = props.get(entry.cid) ?? {};
    const mol = {
      cid: entry.cid,
      name: p.Title ?? `CID ${entry.cid}`,
      iupacName: p.IUPACName ?? "",
      formula: p.MolecularFormula ?? "",
      molecularWeight: Number(p.MolecularWeight ?? 0),
      category: entry.category,
      ...parsed,
    };
    molecules.push(mol);
    const flag = parsed.dimensions === "2d" ? " (2D only)" : "";
    const issues = validate(mol);
    const warn = issues.length ? `  ⚠ ${issues.join("; ")}` : "";
    console.log(`  ✓ ${mol.name.padEnd(22)} ${mol.formula.padEnd(12)} ${String(mol.atoms.length).padStart(3)} atoms${flag}${warn}`);
  }

  // Summary statistics.
  const total = molecules.length;
  const only2d = molecules.filter((m) => m.dimensions === "2d").length;
  const atomCount = molecules.reduce((s, m) => s + m.atoms.length, 0);
  const bondCount = molecules.reduce((s, m) => s + m.bonds.length, 0);
  const byCat = {};
  for (const m of molecules) byCat[m.category] = (byCat[m.category] ?? 0) + 1;
  console.log(`\nParsed ${total} molecules (${only2d} are 2D-only), ${atomCount} atoms, ${bondCount} bonds total.`);
  console.log("By category: " + Object.entries(byCat).map(([k, v]) => `${k}=${v}`).join(", "));

  const header = `// AUTO-GENERATED by scripts/build-data.mjs — do not edit by hand.
// Source: PubChem (https://pubchem.ncbi.nlm.nih.gov), PUG REST API.
// Re-generate with: npm run data:build
// ${molecules.length} molecules, generated from the catalog in scripts/catalog.mjs.

import type { Molecule } from "./types";

export const molecules: Molecule[] = [
`;
  const body = molecules.map(tsLiteral).join("\n");
  const footer = `
];

/** Lookup by PubChem CID. */
export const moleculesByCid: Record<number, Molecule> = Object.fromEntries(
  molecules.map((m) => [m.cid, m]),
);

/** Lookup by lower-cased display name, e.g. "water". */
export const moleculesByName: Record<string, Molecule> = Object.fromEntries(
  molecules.map((m) => [m.name.toLowerCase(), m]),
);
`;

  await writeFile(OUT_FILE, header + body + footer);
  console.log(`\nWrote ${molecules.length} molecules to ${OUT_FILE.replace(ROOT + "/", "")}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
