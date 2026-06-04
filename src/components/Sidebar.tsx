import { useMemo } from "react";
import type { Molecule } from "../types/molecule";
import { formatFormula, labelizeCategory } from "../lib/format";

interface SidebarProps {
  molecules: Molecule[];
  selectedCid: number;
  onSelect: (cid: number) => void;
  search: string;
  onSearch: (value: string) => void;
}

export default function Sidebar({
  molecules,
  selectedCid,
  onSelect,
  search,
  onSearch,
}: SidebarProps) {
  const groups = useMemo(() => {
    const q = search.trim().toLowerCase();
    const matches = q
      ? molecules.filter(
          (m) =>
            m.name.toLowerCase().includes(q) ||
            m.formula.toLowerCase().includes(q) ||
            m.iupacName.toLowerCase().includes(q),
        )
      : molecules;

    const byCategory = new Map<string, Molecule[]>();
    for (const m of matches) {
      const list = byCategory.get(m.category) ?? [];
      list.push(m);
      byCategory.set(m.category, list);
    }
    return [...byCategory.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  }, [molecules, search]);

  const total = groups.reduce((n, [, list]) => n + list.length, 0);

  return (
    <aside className="flex h-full w-72 shrink-0 flex-col border-r border-slate-800 bg-[var(--color-lab-panel)]">
      <div className="border-b border-slate-800 p-4">
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold tracking-tight text-emerald-400">
            Smart<span className="text-slate-100">Lab</span>
          </span>
          <span className="ml-auto rounded bg-slate-800 px-2 py-0.5 text-[11px] text-slate-400">
            {molecules.length} molecules
          </span>
        </div>
        <input
          type="search"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search name, formula…"
          className="mt-3 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
        />
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        {total === 0 && (
          <p className="px-3 py-6 text-center text-sm text-slate-500">
            No molecules match “{search}”.
          </p>
        )}
        {groups.map(([category, list]) => (
          <div key={category} className="mb-3">
            <h3 className="px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              {labelizeCategory(category)}{" "}
              <span className="text-slate-600">({list.length})</span>
            </h3>
            <ul>
              {list.map((m) => {
                const active = m.cid === selectedCid;
                return (
                  <li key={m.cid}>
                    <button
                      onClick={() => onSelect(m.cid)}
                      className={`flex w-full items-baseline justify-between gap-2 rounded-md px-3 py-1.5 text-left text-sm transition ${
                        active
                          ? "bg-emerald-500/15 text-emerald-200 ring-1 ring-emerald-500/30"
                          : "text-slate-300 hover:bg-slate-800/60"
                      }`}
                    >
                      <span className="truncate">{m.name}</span>
                      <span className="shrink-0 text-xs text-slate-500">
                        {formatFormula(m.formula)}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  );
}
