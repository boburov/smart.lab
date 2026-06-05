import { useState } from "react";
import { AnatomyViewer } from "../../../widgets/anatomy-viewer";
import { AnatomyLayersPanel } from "../../../widgets/anatomy-layers";
import { OrganInfoPanel } from "../../../widgets/organ-info";
import {
  ANATOMY_PARTS,
  REGIONS,
  defaultLayerState,
  presetLayerState,
} from "../../../entities/anatomy";
import type {
  AnatomyLayer,
  AnatomyPart,
  LayerPreset,
  Region,
} from "../../../entities/anatomy";
import { BrandMark } from "../../../shared/ui/brand-mark";
import { Icon } from "../../../shared/ui/icon";

interface AnatomyPageProps {
  onNavigate: (to: string) => void;
}

/** Qism markazini (tube uchun yo'l o'rtasini) hisoblaydi. */
function partCenter(part: AnatomyPart): [number, number, number] {
  const pts = part.path && part.path.length ? part.path : [part.position];
  let x = 0;
  let y = 0;
  let z = 0;
  for (const p of pts) {
    x += p[0] ?? 0;
    y += p[1] ?? 0;
    z += p[2] ?? 0;
  }
  const n = pts.length || 1;
  return [x / n, y / n, z / n];
}

/**
 * Anatomiya bo'limi — qatlamli inson tanasi 3D tadqiqotchisi.
 * Teri → muskul → skelet → ichki a'zolar → tomirlar qatlamlarini boshqaring,
 * a'zoni bosib alohida ko'ring va istalgan qismga yaqinlashing.
 */
export function AnatomyPage({ onNavigate }: AnatomyPageProps) {
  const [layerState, setLayerState] = useState(defaultLayerState());
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [region, setRegion] = useState<Region>(REGIONS[0]!);

  const handleSelect = (id: string | null) => {
    setSelectedId(id);
    if (id) {
      const part = ANATOMY_PARTS.find((p) => p.id === id);
      if (part)
        setRegion({ id: "focus", uzName: part.uzName, target: partCenter(part), distance: 0.5 });
    }
  };

  const toggleLayer = (layer: AnatomyLayer) =>
    setLayerState((s) => ({ ...s, [layer]: { ...s[layer], visible: !s[layer].visible } }));
  const setOpacity = (layer: AnatomyLayer, value: number) =>
    setLayerState((s) => ({ ...s, [layer]: { ...s[layer], opacity: value } }));
  const applyPreset = (preset: LayerPreset) => setLayerState(presetLayerState(preset));

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-[var(--color-lab-bg)] text-slate-800">
      {/* Tepa panel */}
      <div className="flex h-12 shrink-0 items-center gap-3 border-b border-[var(--color-lab-border)] bg-white px-4">
        <button
          onClick={() => onNavigate("/lab")}
          className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
        >
          <Icon name="arrow-left" className="h-4 w-4" />
          Laboratoriya
        </button>
        <span className="h-5 w-px bg-[var(--color-lab-border)]" />
        <button onClick={() => onNavigate("/")} className="flex items-center gap-2">
          <BrandMark className="h-6 w-6" />
          <span className="text-sm font-semibold text-slate-900">
            Biologiya <span className="font-normal text-slate-400">/ Anatomiya</span>
          </span>
        </button>

        <button
          onClick={() => onNavigate("/lab/biology/garden")}
          className="ml-3 rounded-lg border border-emerald-200 bg-emerald-50 px-2.5 py-1.5 text-xs font-medium text-emerald-700 transition hover:bg-emerald-100"
        >
          O'simliklar bog'i
        </button>

        <div className="ml-auto flex items-center gap-1.5">
          {REGIONS.map((r) => (
            <button
              key={r.id}
              onClick={() => setRegion(r)}
              className={`rounded-lg px-2.5 py-1.5 text-xs font-medium ring-1 transition ${
                region.id === r.id
                  ? "bg-blue-600 text-white ring-blue-600"
                  : "bg-white text-slate-600 ring-slate-200 hover:bg-slate-50"
              }`}
            >
              {r.uzName}
            </button>
          ))}
        </div>
      </div>

      {/* Ish maydoni */}
      <div className="flex min-h-0 flex-1">
        <AnatomyLayersPanel
          layerState={layerState}
          onToggle={toggleLayer}
          onOpacity={setOpacity}
          onPreset={applyPreset}
        />
        <main className="relative min-w-0 flex-1">
          <AnatomyViewer
            parts={ANATOMY_PARTS}
            layerState={layerState}
            selectedId={selectedId}
            onSelect={handleSelect}
            region={region}
          />
        </main>
        <OrganInfoPanel parts={ANATOMY_PARTS} selectedId={selectedId} onSelect={handleSelect} />
      </div>
    </div>
  );
}
