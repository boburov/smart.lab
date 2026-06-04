import Navbar from "./Navbar";
import { directions } from "../data/directions";

interface LabDirectionsProps {
  route: string;
  onNavigate: (to: string) => void;
}

/**
 * The 3D Laboratory landing — shows the three directions
 * (Kimyo / Fizika / Elektronika), each with its sections (bo'limlar).
 */
export default function LabDirections({ route, onNavigate }: LabDirectionsProps) {
  return (
    <div className="min-h-screen bg-[var(--color-lab-bg)]">
      <Navbar route={route} onNavigate={onNavigate} />

      <section className="mx-auto max-w-6xl px-5 py-12">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
            3D Laboratoriya
          </span>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Yo'nalishni tanlang
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-slate-600">
            Har bir yo'nalish o'z bo'limlariga ega. Hozircha kimyo bo'limi to'liq
            ishlaydi; fizika va elektronika tez kunda qo'shiladi.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {directions.map((d) => {
            const live = d.status === "active";
            return (
              <div
                key={d.id}
                className={`flex flex-col rounded-2xl border bg-white p-6 shadow-sm transition ${
                  live
                    ? "border-emerald-200 hover:-translate-y-0.5 hover:shadow-md"
                    : "border-[var(--color-lab-border)]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-xl text-2xl ${
                      live ? "bg-emerald-50" : "bg-slate-100"
                    }`}
                  >
                    {d.icon}
                  </span>
                  {live ? (
                    <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700 ring-1 ring-emerald-200">
                      Mavjud
                    </span>
                  ) : (
                    <span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-600 ring-1 ring-amber-200">
                      Tez kunda
                    </span>
                  )}
                </div>

                <h2 className="mt-4 text-xl font-bold text-slate-900">
                  {d.name}
                  <span className="ml-2 text-sm font-normal text-slate-400">
                    {d.nameEn}
                  </span>
                </h2>
                <p className="mt-1 text-sm text-slate-600">{d.tagline}</p>

                <div className="mt-5">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Bo'limlar ({d.sections.length})
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {d.sections.map((s) => (
                      <span
                        key={s}
                        className={`rounded-md px-2 py-1 text-xs ${
                          live
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => live && onNavigate(d.route)}
                  disabled={!live}
                  className={`mt-6 w-full rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                    live
                      ? "bg-emerald-600 text-white hover:bg-emerald-700"
                      : "cursor-not-allowed bg-slate-100 text-slate-400"
                  }`}
                >
                  {live ? "Bo'limga kirish →" : "Tez kunda"}
                </button>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
