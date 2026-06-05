import { LAYERS } from "../../../entities/anatomy";
import type { AnatomyLayer, LayerPreset, LayerState } from "../../../entities/anatomy";

interface AnatomyLayersPanelProps {
  layerState: LayerState;
  onToggle: (layer: AnatomyLayer) => void;
  onOpacity: (layer: AnatomyLayer, value: number) => void;
  onPreset: (preset: LayerPreset) => void;
}

const PRESETS: { id: LayerPreset; label: string }[] = [
  { id: "all", label: "Hammasi" },
  { id: "noskin", label: "Terisiz" },
  { id: "organs", label: "A'zolar" },
  { id: "skeleton", label: "Skelet" },
];

/** Chap panel: qatlamlarni yoqish/o'chirish va shaffofligini boshqarish. */
export function AnatomyLayersPanel({
  layerState,
  onToggle,
  onOpacity,
  onPreset,
}: AnatomyLayersPanelProps) {
  return (
    <aside className="flex h-full w-60 shrink-0 flex-col border-r border-[var(--color-lab-border)] bg-[var(--color-lab-panel)]">
      <div className="border-b border-[var(--color-lab-border)] px-4 py-3">
        <h2 className="text-sm font-semibold text-slate-900">Qatlamlar</h2>
        <p className="mt-0.5 text-xs text-slate-500">Ko'rinish va shaffoflik</p>
      </div>

      <div className="border-b border-[var(--color-lab-border)] p-3">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
          Tezkor ko'rinish
        </div>
        <div className="mt-2 grid grid-cols-2 gap-1.5">
          {PRESETS.map((p) => (
            <button
              key={p.id}
              onClick={() => onPreset(p.id)}
              className="rounded-lg border border-[var(--color-lab-border)] bg-white px-2 py-1.5 text-xs font-medium text-slate-600 transition hover:border-blue-300 hover:text-blue-700"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3 overflow-y-auto p-3">
        {LAYERS.map((layer) => {
          const st = layerState[layer.id];
          return (
            <div
              key={layer.id}
              className="rounded-xl border border-[var(--color-lab-border)] bg-white p-3"
            >
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={st.visible}
                  onChange={() => onToggle(layer.id)}
                  className="h-4 w-4 accent-blue-600"
                />
                <span className="text-sm font-medium text-slate-800">{layer.uzName}</span>
              </label>
              <div className="mt-2 flex items-center gap-2">
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={st.opacity}
                  disabled={!st.visible}
                  onChange={(e) => onOpacity(layer.id, Number(e.target.value))}
                  className="h-1.5 flex-1 accent-blue-600 disabled:opacity-40"
                />
                <span className="w-8 text-right text-xs tabular-nums text-slate-400">
                  {Math.round(st.opacity * 100)}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
