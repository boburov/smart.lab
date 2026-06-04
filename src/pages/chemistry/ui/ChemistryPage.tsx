import { useState } from "react";
import { molecules, moleculesByCid, moleculesByName } from "../../../entities/molecule";
import { MoleculeSidebar } from "../../../widgets/molecule-sidebar";
import { MoleculeViewer } from "../../../widgets/molecule-viewer";
import { MoleculeInfoPanel } from "../../../widgets/molecule-info";
import { BrandMark } from "../../../shared/ui/brand-mark";
import { Icon } from "../../../shared/ui/icon";

// Open on a recognizable molecule if present, else the first in the dataset.
const DEFAULT_CID = (moleculesByName["caffeine"] ?? molecules[0]!).cid;

interface ChemistryPageProps {
  onNavigate: (to: string) => void;
}

/** The live chemistry section: sidebar list + 3D viewer + info panel. */
export function ChemistryPage({ onNavigate }: ChemistryPageProps) {
  const [selectedCid, setSelectedCid] = useState<number>(DEFAULT_CID);
  const [search, setSearch] = useState("");

  const selected = moleculesByCid[selectedCid] ?? molecules[0]!;

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-[var(--color-lab-bg)] text-slate-800">
      {/* Slim top bar with a way back to the laboratory directions. */}
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
            Kimyo <span className="font-normal text-slate-400">/ Chemistry</span>
          </span>
        </button>
      </div>

      <div className="flex min-h-0 flex-1">
        <MoleculeSidebar
          molecules={molecules}
          selectedCid={selected.cid}
          onSelect={setSelectedCid}
          search={search}
          onSearch={setSearch}
        />

        <main className="relative min-w-0 flex-1">
          <MoleculeViewer molecule={selected} />
        </main>

        <MoleculeInfoPanel molecule={selected} />
      </div>
    </div>
  );
}
