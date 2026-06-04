import { useState } from "react";
import {
  elementSubstances,
  compoundSubstances,
  type Substance,
} from "../../../entities/substance";
import { formatFormula } from "../../../entities/molecule";

interface ChestProps {
  onPick: (substance: Substance) => void;
}

function SubstanceButton({
  substance,
  onPick,
}: {
  substance: Substance;
  onPick: (s: Substance) => void;
}) {
  return (
    <button
      onClick={() => onPick(substance)}
      title={`${substance.name} (${substance.formula})`}
      className="group flex items-center gap-2.5 rounded-xl border border-[var(--color-lab-border)] bg-white px-2.5 py-2 text-left transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-sm"
    >
      <span
        className="h-7 w-7 shrink-0 rounded-lg ring-1 ring-black/10"
        style={{ backgroundColor: substance.color }}
      />
      <span className="min-w-0">
        <span className="block truncate text-sm font-medium text-slate-800">
          {substance.name}
        </span>
        <span className="block text-xs text-slate-400">
          {formatFormula(substance.formula)}
        </span>
      </span>
    </button>
  );
}

/**
 * The laboratory chest (sandiq) docked in the corner. Closed it is a compact
 * button; open it reveals the pickable substances, each shown in its own true
 * colour, grouped into elements and ready-made reagents.
 */
export function Chest({ onPick }: ChestProps) {
  const [open, setOpen] = useState(true);

  return (
    <div className="pointer-events-auto absolute bottom-24 right-5 z-20 flex flex-col items-end">
      {open && (
        <div className="mb-3 w-72 overflow-hidden rounded-2xl border border-[var(--color-lab-border)] bg-white/95 shadow-xl shadow-blue-900/10 backdrop-blur">
          <div className="flex items-center justify-between border-b border-[var(--color-lab-border)] bg-gradient-to-r from-blue-50 to-white px-4 py-3">
            <span className="text-sm font-semibold text-slate-800">Sandiq</span>
            <span className="text-xs text-slate-400">moddani tanlang</span>
          </div>

          <div className="max-h-[52vh] overflow-y-auto p-3">
            <h3 className="px-1 pb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Elementlar
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {elementSubstances.map((s) => (
                <SubstanceButton key={s.id} substance={s} onPick={onPick} />
              ))}
            </div>

            <h3 className="px-1 pb-2 pt-4 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Reaktivlar
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {compoundSubstances.map((s) => (
                <SubstanceButton key={s.id} substance={s} onPick={onPick} />
              ))}
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:from-blue-700 hover:to-blue-800"
      >
        <span className="grid h-5 w-5 place-items-center rounded-md bg-white/20 text-[11px]">
          {open ? "−" : "+"}
        </span>
        Sandiq
      </button>
    </div>
  );
}
