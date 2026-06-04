import Navbar from "./Navbar";
import type { LabDirection } from "../data/directions";

interface ComingSoonProps {
  direction: LabDirection;
  route: string;
  onNavigate: (to: string) => void;
}

/** Placeholder page for directions that aren't built yet (physics, electronics). */
export default function ComingSoon({ direction, route, onNavigate }: ComingSoonProps) {
  return (
    <div className="min-h-screen bg-[var(--color-lab-bg)]">
      <Navbar route={route} onNavigate={onNavigate} />

      <section className="mx-auto flex max-w-2xl flex-col items-center px-5 py-24 text-center">
        <span className="flex h-20 w-20 items-center justify-center rounded-2xl bg-emerald-50 text-4xl">
          {direction.icon}
        </span>
        <span className="mt-6 rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-600 ring-1 ring-amber-200">
          Tez kunda
        </span>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900">
          {direction.name} laboratoriyasi
        </h1>
        <p className="mt-3 text-slate-600">{direction.tagline}</p>

        <div className="mt-8 flex flex-wrap justify-center gap-1.5">
          {direction.sections.map((s) => (
            <span
              key={s}
              className="rounded-md bg-white px-2.5 py-1 text-xs text-slate-500 ring-1 ring-[var(--color-lab-border)]"
            >
              {s}
            </span>
          ))}
        </div>

        <button
          onClick={() => onNavigate("/lab")}
          className="mt-10 rounded-xl border border-emerald-200 bg-white px-6 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
        >
          ← Yo'nalishlarga qaytish
        </button>
      </section>
    </div>
  );
}
