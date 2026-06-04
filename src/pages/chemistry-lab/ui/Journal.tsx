import { useEffect, useRef } from "react";
import { formatFormula } from "../../../entities/molecule";
import type { HistoryEntry } from "../../../features/lab-bench";

interface JournalProps {
  history: HistoryEntry[];
}

/**
 * A move-list style journal (like a chess analysis panel) docked on the left:
 * every pour is one row, annotated with the reaction it triggered and the
 * product the mixture forms. Auto-scrolls to the latest step.
 */
export function Journal({ history }: JournalProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [history.length]);

  return (
    <div className="pointer-events-auto absolute left-4 top-[4.5rem] z-10 flex max-h-[calc(100vh-9rem)] w-64 flex-col overflow-hidden rounded-2xl border border-[var(--color-lab-border)] bg-white/95 shadow-xl shadow-blue-900/10 backdrop-blur">
      <div className="flex items-center justify-between border-b border-[var(--color-lab-border)] bg-gradient-to-r from-blue-50 to-white px-4 py-2.5">
        <span className="text-sm font-semibold text-slate-800">Jurnal</span>
        <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[11px] font-medium text-blue-700 ring-1 ring-blue-200">
          {history.length}
        </span>
      </div>

      <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto p-2">
        {history.length === 0 ? (
          <p className="px-2 py-6 text-center text-xs text-slate-400">
            Hali harakat yo'q — sandiqdan modda quying.
          </p>
        ) : (
          <ul className="space-y-0.5">
            {history.map((e) => (
              <li key={e.index} className="rounded-lg px-2 py-1.5 text-xs odd:bg-slate-50/70">
                <div className="flex items-center gap-2">
                  <span className="w-5 shrink-0 text-right font-medium text-slate-400">
                    {e.index}.
                  </span>
                  <span
                    className="h-3 w-3 shrink-0 rounded-full ring-1 ring-black/10"
                    style={{ backgroundColor: e.color }}
                  />
                  <span className="font-medium text-slate-700">{formatFormula(e.formula)}</span>
                  <span className="truncate text-slate-400">{e.name}</span>
                </div>
                {(e.reaction || e.product) && (
                  <div className="mt-1 flex flex-wrap items-center gap-1 pl-7">
                    {e.reaction && (
                      <span className="rounded bg-orange-50 px-1.5 py-0.5 text-[10px] font-medium text-orange-600 ring-1 ring-orange-200">
                        {e.reaction}
                      </span>
                    )}
                    {e.product && (
                      <span className="rounded bg-blue-50 px-1.5 py-0.5 text-[10px] font-medium text-blue-700 ring-1 ring-blue-200">
                        → {e.product}
                      </span>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
