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
    <aside className="flex h-full w-72 shrink-0 flex-col border-r border-[var(--color-lab-border)] bg-[var(--color-lab-panel)]">
      <div className="border-b border-[var(--color-lab-border)] p-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold uppercase tracking-wider text-slate-500">
            Molekulalar
          </span>
          <span className="ml-auto rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700 ring-1 ring-emerald-200">
            {molecules.length}
          </span>
        </div>
        <input
          type="search"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Nomi yoki formula bo'yicha qidirish…"
          className="mt-3 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
        />
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        {total === 0 && (
          <p className="px-3 py-6 text-center text-sm text-slate-500">
            “{search}” bo'yicha molekula topilmadi.
          </p>
        )}
        {groups.map(([category, list]) => (
          <div key={category} className="mb-3">
            <h3 className="px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              {labelizeCategory(category)}{" "}
              <span className="text-slate-300">({list.length})</span>
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
                          ? "bg-emerald-50 font-medium text-emerald-700 ring-1 ring-emerald-200"
                          : "text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      <span className="truncate">{m.name}</span>
                      <span className="shrink-0 text-xs text-slate-400">
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
