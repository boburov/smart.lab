import { useState } from "react";
import { molecules, moleculesByCid, moleculesByName } from "./data/molecules";
import Sidebar from "./components/Sidebar";
import MoleculeViewer from "./components/MoleculeViewer";
import InfoPanel from "./components/InfoPanel";

// Open on a recognizable molecule if present, else the first in the dataset.
const DEFAULT_CID = (moleculesByName["caffeine"] ?? molecules[0]!).cid;

export default function App() {
  const [selectedCid, setSelectedCid] = useState<number>(DEFAULT_CID);
  const [search, setSearch] = useState("");

  const selected = moleculesByCid[selectedCid] ?? molecules[0]!;

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[var(--color-lab-bg)] text-slate-100">
      <Sidebar
        molecules={molecules}
        selectedCid={selected.cid}
        onSelect={setSelectedCid}
        search={search}
        onSearch={setSearch}
      />

      <main className="relative min-w-0 flex-1">
        <MoleculeViewer molecule={selected} />
      </main>

      <InfoPanel molecule={selected} />
    </div>
  );
}
