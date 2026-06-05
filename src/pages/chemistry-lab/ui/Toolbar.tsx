import type { Substance } from "../../../entities/substance";
import { formatFormula } from "../../../entities/molecule";

interface ToolbarProps {
  poured: Substance[];
  onUndo: () => void;
  onClear: () => void;
  heating: boolean;
  temperature: number;
  onToggleHeat: () => void;
}

/** A small flame glyph, brightening with temperature. */
function FlameIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <path
        d="M12 2c1 3-2 4-2 7a2 2 0 0 0 4 0c2 1.5 3 3.5 3 6a5 5 0 0 1-10 0c0-4 5-5 5-13z"
        opacity={active ? 1 : 0.85}
      />
    </svg>
  );
}

/**
 * Bottom toolbar: on the left a live readout of what has been poured into the
 * vessel (each chip in the substance's own colour); on the right the tools that
 * act on the vessel — burner (qizdirish), orqaga (undo) and tozalash (empty).
 */
export function Toolbar({
  poured,
  onUndo,
  onClear,
  heating,
  temperature,
  onToggleHeat,
}: ToolbarProps) {
  const empty = poured.length === 0;

  return (
    <div className="pointer-events-auto absolute inset-x-0 bottom-5 z-10 mx-auto flex w-full max-w-3xl items-center gap-3 px-5">
      <div className="flex min-w-0 flex-1 items-center gap-2 overflow-x-auto rounded-2xl border border-[var(--color-lab-border)] bg-white/95 px-3 py-2.5 shadow-lg shadow-blue-900/5 backdrop-blur">
        <span className="shrink-0 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
          Idishda
        </span>
        {empty ? (
          <span className="text-sm text-slate-400">bo'sh — sandiqdan modda quying</span>
        ) : (
          poured.map((s, i) => (
            <span
              key={`${s.id}-${i}`}
              className="flex shrink-0 items-center gap-1.5 rounded-lg border border-[var(--color-lab-border)] bg-blue-50/40 px-2 py-1 text-xs text-slate-600"
            >
              <span
                className="h-3 w-3 rounded-full ring-1 ring-black/10"
                style={{ backgroundColor: s.color }}
              />
              {formatFormula(s.formula)}
            </span>
          ))
        )}
      </div>

      <button
        onClick={onToggleHeat}
        className={`flex shrink-0 items-center gap-1.5 rounded-xl border px-4 py-2.5 text-sm font-medium shadow-sm transition ${
          heating
            ? "border-orange-300 bg-orange-50 text-orange-700 hover:bg-orange-100"
            : "border-[var(--color-lab-border)] bg-white text-slate-600 hover:border-orange-300 hover:text-orange-700"
        }`}
        title="Idish ostidagi qizdirgich"
      >
        <FlameIcon active={heating} />
        {heating ? `Qizdirilmoqda ${Math.round(temperature * 100)}°` : "Qizdirish"}
      </button>
      <button
        onClick={onUndo}
        disabled={empty}
        className="shrink-0 rounded-xl border border-[var(--color-lab-border)] bg-white px-4 py-2.5 text-sm font-medium text-slate-600 shadow-sm transition enabled:hover:border-blue-300 enabled:hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Orqaga
      </button>
      <button
        onClick={onClear}
        disabled={empty}
        className="shrink-0 rounded-xl border border-rose-200 bg-rose-50 px-4 py-2.5 text-sm font-medium text-rose-600 shadow-sm transition enabled:hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Tozalash
      </button>
    </div>
  );
}
