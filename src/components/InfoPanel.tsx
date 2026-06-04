import { useMemo } from "react";
import type { Molecule } from "../types/molecule";
import { getElement } from "../data/elements";
import { formatFormula, labelizeCategory } from "../lib/format";

function Stat({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-slate-800 bg-slate-900/40 px-3 py-2">
      <div className="text-[11px] uppercase tracking-wider text-slate-500">{label}</div>
      <div className="mt-0.5 text-sm font-medium text-slate-100">{value}</div>
    </div>
  );
}

export default function InfoPanel({ molecule }: { molecule: Molecule }) {
  // Unique elements present, in order of atomic number, for a small legend.
  const elements = useMemo(() => {
    const nums = [...new Set(molecule.atoms.map((a) => a.element))].sort((a, b) => a - b);
    return nums.map((n) => getElement(n));
  }, [molecule]);

  return (
    <aside className="flex h-full w-80 shrink-0 flex-col overflow-y-auto border-l border-slate-800 bg-[var(--color-lab-panel)] p-5">
      <div className="flex items-center gap-2">
        <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-xs font-medium text-emerald-300 ring-1 ring-emerald-500/30">
          {labelizeCategory(molecule.category)}
        </span>
        <span
          className={`rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ${
            molecule.dimensions === "3d"
              ? "bg-sky-500/15 text-sky-300 ring-sky-500/30"
              : "bg-amber-500/15 text-amber-300 ring-amber-500/30"
          }`}
        >
          {molecule.dimensions.toUpperCase()}
        </span>
      </div>

      <h1 className="mt-3 text-2xl font-semibold tracking-tight text-slate-50">
        {molecule.name}
      </h1>
      <p className="text-2xl font-light text-emerald-300">{formatFormula(molecule.formula)}</p>
      {molecule.iupacName && molecule.iupacName !== molecule.name.toLowerCase() && (
        <p className="mt-1 text-sm italic text-slate-400">{molecule.iupacName}</p>
      )}

      <div className="mt-5 grid grid-cols-2 gap-2">
        <Stat label="Mol. weight" value={`${molecule.molecularWeight} g/mol`} />
        <Stat label="PubChem CID" value={molecule.cid} />
        <Stat label="Atoms" value={molecule.atoms.length} />
        <Stat label="Bonds" value={molecule.bonds.length} />
      </div>

      <div className="mt-5">
        <h2 className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
          Elements
        </h2>
        <ul className="mt-2 flex flex-wrap gap-2">
          {elements.map((el) => (
            <li
              key={el.number}
              className="flex items-center gap-1.5 rounded-md border border-slate-800 bg-slate-900/40 px-2 py-1 text-xs text-slate-300"
            >
              <span
                className="h-3 w-3 rounded-full ring-1 ring-black/40"
                style={{ backgroundColor: el.color }}
              />
              {el.symbol}
              <span className="text-slate-500">{el.name}</span>
            </li>
          ))}
        </ul>
      </div>

      <a
        href={`https://pubchem.ncbi.nlm.nih.gov/compound/${molecule.cid}`}
        target="_blank"
        rel="noreferrer"
        className="mt-auto inline-flex items-center justify-center gap-1.5 rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-200 transition hover:border-emerald-600 hover:text-emerald-300"
      >
        View on PubChem ↗
      </a>
    </aside>
  );
}
