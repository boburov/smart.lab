import { useState } from "react";
import {
  periodicElements,
  categoryColor,
  categoryLabel,
  type ElementCategory,
  type PeriodicElement,
} from "../../../entities/element";
import { ions, ionGroups, ionGroupLabel, type Ion } from "../../../entities/ion";
import { formatFormula } from "../../../entities/molecule";

interface PeriodicTableProps {
  onPick: (element: PeriodicElement) => void;
  onPickIon: (ion: Ion) => void;
  onClose: () => void;
}

const STATE_LABEL: Record<string, string> = { gaz: "Gaz", suyuq: "Suyuq", qattiq: "Qattiq" };
const LEGEND = Object.keys(categoryLabel) as ElementCategory[];

type Tab = "table" | "ions";

/**
 * Reference modal with two tabs: the full Mendeleev periodic table and a
 * grouped catalog of common ions. Clicking any element or ion pours it into the
 * vessel.
 */
export function PeriodicTable({ onPick, onPickIon, onClose }: PeriodicTableProps) {
  const [tab, setTab] = useState<Tab>("table");
  const [hover, setHover] = useState<PeriodicElement | null>(null);

  return (
    <div
      className="absolute inset-0 z-40 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="flex max-h-full w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-[var(--color-lab-border)] bg-gradient-to-r from-blue-50 to-white px-5 py-3">
          <div className="flex rounded-lg bg-slate-100 p-0.5">
            {(["table", "ions"] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`rounded-md px-3 py-1 text-sm font-medium transition ${
                  tab === t ? "bg-white text-blue-700 shadow-sm" : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {t === "table" ? "Davriy jadval" : "Ionlar"}
              </button>
            ))}
          </div>

          {tab === "table" && hover ? (
            <span className="hidden text-sm text-slate-600 md:inline">
              <span className="font-semibold text-slate-900">{hover.symbol}</span> · {hover.name} ·{" "}
              №{hover.number} · {STATE_LABEL[hover.state]} · {categoryLabel[hover.category]}
            </span>
          ) : (
            <span className="hidden text-sm text-slate-400 md:inline">
              Bosing — idishga qo'shiladi
            </span>
          )}

          <button
            onClick={onClose}
            className="ml-auto grid h-8 w-8 place-items-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
            aria-label="Yopish"
          >
            ✕
          </button>
        </div>

        {tab === "table" ? (
          <>
            {/* Periodic grid */}
            <div className="overflow-auto p-4">
              <div className="grid gap-1" style={{ gridTemplateColumns: "repeat(18, minmax(32px, 1fr))" }}>
                {periodicElements.map((el) => {
                  const row = el.period <= 7 ? el.period : el.period + 1;
                  return (
                    <button
                      key={el.number}
                      onClick={() => onPick(el)}
                      onMouseEnter={() => setHover(el)}
                      onMouseLeave={() => setHover(null)}
                      style={{ gridColumn: el.group, gridRow: row, backgroundColor: categoryColor[el.category] }}
                      className="flex aspect-square flex-col items-center justify-center rounded-md p-0.5 leading-none text-slate-800 transition hover:z-10 hover:scale-110 hover:ring-2 hover:ring-blue-500"
                    >
                      <span className="text-[8px] text-slate-500">{el.number}</span>
                      <span className="text-xs font-bold">{el.symbol}</span>
                    </button>
                  );
                })}
                <div
                  style={{ gridColumn: 3, gridRow: 6 }}
                  className="grid aspect-square place-items-center rounded-md border border-dashed border-pink-200 text-[8px] text-pink-400"
                >
                  57–71
                </div>
                <div
                  style={{ gridColumn: 3, gridRow: 7 }}
                  className="grid aspect-square place-items-center rounded-md border border-dashed border-rose-200 text-[8px] text-rose-400"
                >
                  89–103
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-x-3 gap-y-1.5 border-t border-[var(--color-lab-border)] px-5 py-3">
              {LEGEND.map((cat) => (
                <span key={cat} className="flex items-center gap-1.5 text-[11px] text-slate-500">
                  <span
                    className="h-3 w-3 rounded ring-1 ring-black/5"
                    style={{ backgroundColor: categoryColor[cat] }}
                  />
                  {categoryLabel[cat]}
                </span>
              ))}
            </div>
          </>
        ) : (
          /* Ions */
          <div className="space-y-5 overflow-auto p-5">
            {ionGroups.map((group) => (
              <div key={group}>
                <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  {ionGroupLabel[group]}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {ions
                    .filter((ion) => ion.group === group)
                    .map((ion) => (
                      <button
                        key={ion.id}
                        onClick={() => onPickIon(ion)}
                        style={{ backgroundColor: ion.color }}
                        className="w-20 rounded-lg px-2 py-2 text-left text-white shadow-sm transition hover:-translate-y-0.5 hover:ring-2 hover:ring-blue-400"
                      >
                        <span className="text-sm font-bold">
                          {formatFormula(ion.formula)}
                          <sup className="ml-0.5 text-[9px]">{ion.charge}</sup>
                        </span>
                        <span className="mt-0.5 block truncate text-[10px] opacity-80">{ion.name}</span>
                      </button>
                    ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
