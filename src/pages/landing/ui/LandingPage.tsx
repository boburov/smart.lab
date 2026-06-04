import { Navbar } from "../../../widgets/navbar";
import { directions } from "../../../entities/direction";
import { Icon, type IconName } from "../../../shared/ui/icon";

interface LandingPageProps {
  route: string;
  onNavigate: (to: string) => void;
}

const FEATURES: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "database",
    title: "Haqiqiy ma'lumotlar",
    text: "Molekulalar PubChem'ning real 3D konformerlaridan olingan.",
  },
  {
    icon: "pointer",
    title: "Interaktiv",
    text: "Aylantiring, kattalashtiring va har bir atom hamda bog'ni ko'ring.",
  },
  {
    icon: "layers",
    title: "Yo'nalishlar bo'yicha",
    text: "Kimyo, fizika va elektronika — barchasi bitta laboratoriyada.",
  },
];

/** Marketing landing page — the main menu / entry point. */
export function LandingPage({ route, onNavigate }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-[var(--color-lab-bg)]">
      <Navbar route={route} onNavigate={onNavigate} />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-gradient-to-br from-blue-200/50 to-indigo-200/30 blur-3xl" />
        <div className="pointer-events-none absolute -left-24 top-40 h-72 w-72 rounded-full bg-gradient-to-br from-sky-100/60 to-blue-100/40 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-16 sm:pt-24">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
            Interaktiv 3D ta'lim laboratoriyasi
          </span>

          <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-6xl">
            Fanni 3D fazoda{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              o'rganing va his qiling
            </span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-slate-600">
            SmartLab — kimyo, fizika va elektronikani interaktiv 3D
            simulyatsiyalar orqali o'rganadigan virtual laboratoriya. Molekulalarni
            aylantiring, bog'larni ko'ring, tajriba qiling.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate("/lab")}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 text-base font-semibold text-white shadow-sm shadow-blue-600/20 transition hover:from-blue-700 hover:to-blue-800"
            >
              3D Laboratoriyaga kirish
              <Icon name="arrow-right" className="h-5 w-5" />
            </button>
            <button
              onClick={() => onNavigate("/lab/chemistry")}
              className="rounded-xl border border-blue-200 bg-white px-6 py-3 text-base font-semibold text-blue-700 transition hover:border-blue-300 hover:bg-blue-50"
            >
              Kimyo bo'limini ko'rish
            </button>
          </div>

          {/* Feature row */}
          <div className="mt-16 grid gap-4 sm:grid-cols-3">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-[var(--color-lab-border)] bg-white p-5 shadow-sm"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Icon name={f.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-3 font-semibold text-slate-900">{f.title}</h3>
                <p className="mt-1 text-sm text-slate-600">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Directions preview */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Yo'nalishlar
            </h2>
            <p className="mt-1 text-slate-600">
              Laboratoriyadagi mavjud va kelgusi bo'limlar.
            </p>
          </div>
          <button
            onClick={() => onNavigate("/lab")}
            className="hidden text-sm font-medium text-blue-700 hover:text-blue-800 sm:block"
          >
            Barchasini ko'rish
          </button>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {directions.map((d) => {
            const live = d.status === "active";
            return (
              <button
                key={d.id}
                onClick={() => onNavigate(live ? d.route : "/lab")}
                className="group relative overflow-hidden rounded-2xl border border-[var(--color-lab-border)] bg-white p-6 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Icon name={d.icon} className="h-6 w-6" />
                  </span>
                  {live ? (
                    <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700 ring-1 ring-blue-200">
                      Mavjud
                    </span>
                  ) : (
                    <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-500 ring-1 ring-slate-200">
                      Tez kunda
                    </span>
                  )}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">
                  {d.name}{" "}
                  <span className="text-sm font-normal text-slate-400">{d.nameEn}</span>
                </h3>
                <p className="mt-1 text-sm text-slate-600">{d.tagline}</p>
              </button>
            );
          })}
        </div>
      </section>

      <footer className="border-t border-[var(--color-lab-border)] bg-white">
        <div className="mx-auto max-w-6xl px-6 py-8 text-sm text-slate-500">
          SmartLab — interaktiv 3D ta'lim laboratoriyasi.
        </div>
      </footer>
    </div>
  );
}
