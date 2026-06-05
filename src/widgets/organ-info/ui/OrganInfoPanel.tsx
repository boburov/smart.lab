import { useMemo, useState } from "react";
import { LAYERS } from "../../../entities/anatomy";
import type { AnatomyLayer, AnatomyPart, AnatomySystem } from "../../../entities/anatomy";

interface OrganInfoPanelProps {
  parts: AnatomyPart[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
}

const SYSTEM_UZ: Record<AnatomySystem, string> = {
  integumentary: "Teri tizimi",
  muscular: "Muskul tizimi",
  skeletal: "Skelet tizimi",
  nervous: "Asab tizimi",
  respiratory: "Nafas tizimi",
  cardiovascular: "Yurak-qon tomir tizimi",
  digestive: "Hazm tizimi",
  urinary: "Siydik tizimi",
  endocrine: "Endokrin tizimi",
  lymphatic: "Limfa tizimi",
};

const LAYER_UZ: Record<AnatomyLayer, string> = {
  skin: "Teri",
  muscle: "Muskullar",
  skeleton: "Skelet",
  organs: "Ichki a'zolar",
  vessels: "Tomirlar",
};

/** O'ng panel: tanlangan a'zo tafsiloti va barcha qismlarning ro'yxati. */
export function OrganInfoPanel({ parts, selectedId, onSelect }: OrganInfoPanelProps) {
  const [query, setQuery] = useState("");
  const selected = parts.find((p) => p.id === selectedId) ?? null;

  const groups = useMemo(() => {
    const q = query.trim().toLowerCase();
    const matched = q
      ? parts.filter(
          (p) =>
            p.uzName.toLowerCase().includes(q) || p.enName.toLowerCase().includes(q),
        )
      : parts;
    return LAYERS.map((l) => ({
      layer: l,
      items: matched.filter((p) => p.layer === l.id),
    })).filter((g) => g.items.length > 0);
  }, [parts, query]);

  return (
    <aside className="flex h-full w-80 shrink-0 flex-col border-l border-[var(--color-lab-border)] bg-[var(--color-lab-panel)]">
      {/* Tanlangan a'zo */}
      <div className="border-b border-[var(--color-lab-border)] p-5">
        {selected ? (
          <div>
            <div className="flex items-center gap-2">
              <span
                className="h-4 w-4 rounded-full ring-1 ring-slate-300"
                style={{ backgroundColor: selected.color }}
              />
              <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700 ring-1 ring-blue-200">
                {LAYER_UZ[selected.layer]}
              </span>
            </div>
            <h2 className="mt-3 text-xl font-semibold text-slate-900">{selected.uzName}</h2>
            <p className="text-sm text-slate-400">{selected.enName}</p>
            <p className="mt-1 text-xs font-medium text-slate-500">
              {SYSTEM_UZ[selected.system]}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              {selected.uzDescription}
            </p>
          </div>
        ) : (
          <div className="text-sm text-slate-500">
            <p className="font-medium text-slate-700">A'zo tanlanmagan</p>
            <p className="mt-1">
              3D modeldagi a'zoni bosing yoki quyidagi ro'yxatdan tanlang. Har bir a'zoni
              alohida ko'rib chiqishingiz mumkin.
            </p>
          </div>
        )}
      </div>

      {/* Qidiruv + ro'yxat */}
      <div className="border-b border-[var(--color-lab-border)] p-3">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="A'zo qidirish..."
          className="w-full rounded-lg border border-[var(--color-lab-border)] bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-blue-400"
        />
      </div>

      <div className="flex flex-col gap-3 overflow-y-auto p-3">
        {groups.map((g) => (
          <div key={g.layer.id}>
            <div className="px-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              {g.layer.uzName} ({g.items.length})
            </div>
            <div className="mt-1 flex flex-col">
              {g.items.map((p) => {
                const active = p.id === selectedId;
                return (
                  <button
                    key={p.id}
                    onClick={() => onSelect(p.id)}
                    className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-left text-sm transition ${
                      active
                        ? "bg-blue-50 font-medium text-blue-700 ring-1 ring-blue-200"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    <span
                      className="h-2.5 w-2.5 shrink-0 rounded-full"
                      style={{ backgroundColor: p.color }}
                    />
                    <span className="truncate">{p.uzName}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
