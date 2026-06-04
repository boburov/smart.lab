import { useMemo } from "react";
import type { Molecule } from "../../../entities/molecule";
import { formatFormula, labelizeCategory } from "../../../entities/molecule";
import { getElement } from "../../../entities/element";
import { Icon } from "../../../shared/ui/icon";

function Stat({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-[var(--color-lab-border)] bg-blue-50/40 px-3 py-2">
      <div className="text-[11px] uppercase tracking-wider text-slate-500">{label}</div>
      <div className="mt-0.5 text-sm font-medium text-slate-900">{value}</div>
    </div>
  );
}

/** Right-hand panel: formula, weight, atom/bond counts, element legend. */
export function MoleculeInfoPanel({ molecule }: { molecule: Molecule }) {
  // Unique elements present, in order of atomic number, for a small legend.
  const elements = useMemo(() => {
    const nums = [...new Set(molecule.atoms.map((a) => a.element))].sort((a, b) => a - b);
    return nums.map((n) => getElement(n));
  }, [molecule]);

  return (
    <aside className="flex h-full w-80 shrink-0 flex-col overflow-y-auto border-l border-[var(--color-lab-border)] bg-[var(--color-lab-panel)] p-5">
      <div className="flex items-center gap-2">
        <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700 ring-1 ring-blue-200">
          {labelizeCategory(molecule.category)}
        </span>
        <span
          className={`rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ${
            molecule.dimensions === "3d"
              ? "bg-indigo-50 text-indigo-700 ring-indigo-200"
              : "bg-slate-100 text-slate-600 ring-slate-200"
          }`}
        >
          {molecule.dimensions.toUpperCase()}
        </span>
      </div>

      <h1 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900">
        {molecule.name}
      </h1>
      <p className="text-2xl font-light text-blue-600">{formatFormula(molecule.formula)}</p>
      {molecule.iupacName && molecule.iupacName !== molecule.name.toLowerCase() && (
        <p className="mt-1 text-sm italic text-slate-500">{molecule.iupacName}</p>
      )}

      <div className="mt-5 grid grid-cols-2 gap-2">
        <Stat label="Molekulyar massa" value={`${molecule.molecularWeight} g/mol`} />
        <Stat label="PubChem CID" value={molecule.cid} />
        <Stat label="Atomlar" value={molecule.atoms.length} />
        <Stat label="Bog'lar" value={molecule.bonds.length} />
      </div>

      <div className="mt-5">
        <h2 className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
          Elementlar
        </h2>
        <ul className="mt-2 flex flex-wrap gap-2">
          {elements.map((el) => (
            <li
              key={el.number}
              className="flex items-center gap-1.5 rounded-lg border border-[var(--color-lab-border)] bg-blue-50/30 px-2 py-1 text-xs text-slate-600"
            >
              <span
                className="h-3 w-3 rounded-full ring-1 ring-black/10"
                style={{ backgroundColor: el.color }}
              />
              {el.symbol}
              <span className="text-slate-400">{el.name}</span>
            </li>
          ))}
        </ul>
      </div>

      <a
        href={`https://pubchem.ncbi.nlm.nih.gov/compound/${molecule.cid}`}
        target="_blank"
        rel="noreferrer"
        className="mt-auto inline-flex items-center justify-center gap-1.5 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700 transition hover:border-blue-300 hover:bg-blue-100"
      >
        PubChem'da ko'rish
        <Icon name="external" className="h-4 w-4" />
      </a>
    </aside>
  );
}
