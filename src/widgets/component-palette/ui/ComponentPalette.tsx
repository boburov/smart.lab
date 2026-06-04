import {
  CATALOG,
  ComponentGlyph,
  PALETTE_ORDER,
  defaultProps,
} from "../../../entities/circuit";
import type { ComponentKind } from "../../../entities/circuit";

interface ComponentPaletteProps {
  onAdd: (kind: ComponentKind) => void;
}

/** Taxtaga komponent qo'shish uchun chap panel. */
export function ComponentPalette({ onAdd }: ComponentPaletteProps) {
  return (
    <aside className="flex h-full w-56 shrink-0 flex-col border-r border-[var(--color-lab-border)] bg-[var(--color-lab-panel)]">
      <div className="border-b border-[var(--color-lab-border)] px-4 py-3">
        <h2 className="text-sm font-semibold text-slate-900">Komponentlar</h2>
        <p className="mt-0.5 text-xs text-slate-500">Qo'shish uchun bosing</p>
      </div>
      <div className="grid grid-cols-2 gap-2 overflow-y-auto p-3">
        {PALETTE_ORDER.map((kind) => {
          const def = CATALOG[kind];
          const d = defaultProps(kind);
          return (
            <button
              key={kind}
              onClick={() => onAdd(kind)}
              className="group flex flex-col items-center gap-1.5 rounded-xl border border-[var(--color-lab-border)] bg-white p-2 transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-sm"
            >
              <svg viewBox="-54 -58 108 116" className="h-12 w-full">
                <ComponentGlyph
                  kind={kind}
                  color={d.color}
                  value={d.value}
                  voltage={d.voltage}
                  label={d.label}
                />
              </svg>
              <span className="text-xs font-medium text-slate-700">{def.name}</span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
