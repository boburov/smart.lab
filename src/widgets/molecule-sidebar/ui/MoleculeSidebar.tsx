import { useMemo } from "react";
import type { Molecule } from "../../../entities/molecule";
import { formatFormula, labelizeCategory, moleculeNameUz } from "../../../entities/molecule";
import { Icon } from "../../../shared/ui/icon";

interface MoleculeSidebarProps {
  molecules: Molecule[];
  selectedCid: number;
  onSelect: (cid: number) => void;
  search: string;
  onSearch: (value: string) => void;
}

/** Search + category-grouped list of molecules. */
export function MoleculeSidebar({
  molecules,
  selectedCid,
  onSelect,
  search,
  onSearch,
}: MoleculeSidebarProps) {
  const groups = useMemo(() => {
    const q = search.trim().toLowerCase();
    const matches = q
      ? molecules.filter(
          (m) =>
            moleculeNameUz(m).toLowerCase().includes(q) ||
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
          <span className="ml-auto rounded-full bg-blue-50 px-2 py-0.5 text-[11px] font-medium text-blue-700 ring-1 ring-blue-200">
            {molecules.length}
          </span>
        </div>
        <div className="relative mt-3">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <Icon name="search" className="h-4 w-4" />
          </span>
          <input
            type="search"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Nomi yoki formula bo'yicha qidirish"
            className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
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
                      className={`flex w-full items-baseline justify-between gap-2 rounded-lg px-3 py-1.5 text-left text-sm transition ${
                        active
                          ? "bg-blue-50 font-medium text-blue-700 ring-1 ring-blue-200"
                          : "text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      <span className="truncate">{moleculeNameUz(m)}</span>
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
