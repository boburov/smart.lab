import { useGarden, SPEEDS } from "../../../features/garden";
import { stageForGrowth, WATER_OPTIMAL, type Routine } from "../../../entities/plant";
import { BrandMark } from "../../../shared/ui/brand-mark";
import { GardenScene } from "./GardenScene";

interface BiologyPageProps {
  onNavigate: (to: string) => void;
}

const STAGE_LABELS: Record<string, string> = {
  "urug'": "Urug'",
  nish: "Nish",
  nihol: "Nihol",
  "g'uncha": "G'uncha",
  gul: "Gullagan",
};

const SPEED_LABELS: Record<number, string> = { 0: "Pauza", 1: "1×", 2: "2×", 10: "10×", 100: "100×" };

const SECTIONS = [
  { id: "plants", label: "O'simliklar", active: true },
  { id: "zoology", label: "Zoologiya", active: false },
  { id: "anatomy", label: "Anatomiya", active: false },
];

function DropIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z" />
    </svg>
  );
}

function LeafIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M5 19c0-8 6-14 14-14 0 8-6 14-14 14z" />
      <path d="M9 15c2-2 4-3 6-4" stroke="#fff" strokeWidth="1.2" fill="none" />
    </svg>
  );
}

/** Horizontal gauge 0–1, optionally showing an optimal band. */
function Bar({
  label,
  value,
  color,
  band,
}: {
  label: string;
  value: number;
  color: string;
  band?: readonly [number, number];
}) {
  return (
    <div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-slate-500">{label}</span>
        <span className="font-medium text-slate-700">{Math.round(value * 100)}%</span>
      </div>
      <div className="relative mt-1 h-2.5 overflow-hidden rounded-full bg-slate-100">
        {band && (
          <div
            className="absolute inset-y-0 bg-emerald-200/60"
            style={{ left: `${band[0] * 100}%`, width: `${(band[1] - band[0]) * 100}%` }}
          />
        )}
        <div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{ width: `${Math.min(1, Math.max(0, value)) * 100}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}

/** +/- stepper for a routine value. */
function Stepper({
  label,
  hint,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  hint: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-2">
      <div className="min-w-0">
        <div className="text-sm font-medium text-slate-700">{label}</div>
        <div className="text-[11px] text-slate-400">{hint}</div>
      </div>
      <div className="flex shrink-0 items-center gap-1">
        <button
          onClick={() => onChange(Math.max(min, value - 1))}
          className="grid h-7 w-7 place-items-center rounded-lg border border-[var(--color-lab-border)] text-slate-600 transition hover:bg-slate-50"
        >
          −
        </button>
        <span className="w-7 text-center text-sm font-semibold text-slate-800">{value}</span>
        <button
          onClick={() => onChange(Math.min(max, value + 1))}
          className="grid h-7 w-7 place-items-center rounded-lg border border-[var(--color-lab-border)] text-slate-600 transition hover:bg-slate-50"
        >
          +
        </button>
      </div>
    </div>
  );
}

/** The plant-growing laboratory: a 2D garden plus speed, tools and a routine. */
export function BiologyPage({ onNavigate }: BiologyPageProps) {
  const garden = useGarden();
  const { plant } = garden;
  const stage = stageForGrowth(plant.growth);
  const setRoutine = (patch: Partial<Routine>) =>
    garden.setRoutine({ ...garden.routine, ...patch });

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-[var(--color-lab-bg)]">
      {/* Top bar */}
      <div className="flex h-14 shrink-0 items-center gap-3 border-b border-[var(--color-lab-border)] bg-white/80 px-4 backdrop-blur">
        <button
          onClick={() => onNavigate("/lab")}
          className="flex items-center gap-1.5 rounded-lg px-2 py-1 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
        >
          ← Orqaga
        </button>
        <span className="h-5 w-px bg-[var(--color-lab-border)]" />
        <BrandMark className="h-7 w-7" />
        <span className="text-sm font-semibold text-slate-900">Biologiya laboratoriyasi</span>
        <div className="ml-auto hidden items-center gap-1.5 sm:flex">
          {SECTIONS.map((s) => (
            <span
              key={s.id}
              className={`rounded-full px-2.5 py-1 text-xs ${
                s.active
                  ? "bg-blue-50 font-medium text-blue-700 ring-1 ring-blue-200"
                  : "bg-slate-100 text-slate-400"
              }`}
            >
              {s.label}
              {!s.active && " · tez kunda"}
            </span>
          ))}
        </div>
      </div>

      <div className="flex min-h-0 flex-1 gap-4 p-4">
        {/* Scene */}
        <div className="relative flex-1 overflow-hidden rounded-2xl border border-[var(--color-lab-border)] bg-white shadow-sm">
          <GardenScene
            plant={plant}
            timeOfDay={garden.timeOfDay}
            season={garden.season}
            isDay={garden.isDay}
            raining={garden.raining}
          />

          {/* Day / season readout */}
          <div className="pointer-events-none absolute left-4 top-4 flex flex-col gap-1.5">
            <span className="w-fit rounded-lg bg-white/85 px-2.5 py-1 text-xs font-medium text-slate-700 shadow-sm backdrop-blur">
              {garden.season.charAt(0).toUpperCase() + garden.season.slice(1)} ·{" "}
              {Math.floor(plant.day) + 1}-kun
            </span>
            {garden.raining && (
              <span className="w-fit rounded-lg bg-blue-50/90 px-2.5 py-1 text-xs font-medium text-blue-700 shadow-sm backdrop-blur">
                {garden.season === "qish" ? "Qor yog'moqda" : "Yomg'ir yog'moqda"}
              </span>
            )}
          </div>

          {/* Death overlay */}
          {!plant.alive && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-900/30 backdrop-blur-sm">
              <div className="rounded-2xl bg-white px-6 py-5 text-center shadow-xl">
                <p className="text-base font-semibold text-slate-900">O'simlik nobud bo'ldi</p>
                <p className="mt-1 text-sm text-slate-500">
                  Parvarish muvozanatini saqlang — yangidan urinib ko'ring.
                </p>
                <button
                  onClick={garden.reset}
                  className="mt-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:from-blue-700 hover:to-blue-800"
                >
                  Yangi urug' ekish
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Control panel */}
        <aside className="flex w-80 shrink-0 flex-col gap-5 overflow-y-auto rounded-2xl border border-[var(--color-lab-border)] bg-white p-4 shadow-sm">
          {/* Status */}
          <div>
            <div className="flex items-baseline justify-between">
              <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700 ring-1 ring-blue-200">
                {STAGE_LABELS[stage] ?? stage}
              </span>
              <span className="text-2xl font-semibold text-slate-900">
                {Math.round(plant.growth * 100)}%
              </span>
            </div>
            <div className="mt-3 space-y-2.5">
              <Bar label="Sog'liq" value={plant.health} color="#22a55a" />
              <Bar label="Namlik" value={plant.water} color="#2f7fd4" band={WATER_OPTIMAL} />
              <Bar label="Oziq" value={plant.nutrients} color="#d99a2b" />
            </div>
          </div>

          {/* Speed */}
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Vaqt tezligi
            </h3>
            <div className="mt-2 grid grid-cols-5 gap-1">
              {SPEEDS.map((s) => (
                <button
                  key={s}
                  onClick={() => garden.setSpeed(s)}
                  className={`rounded-lg px-1 py-1.5 text-xs font-medium transition ${
                    garden.speed === s
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {SPEED_LABELS[s]}
                </button>
              ))}
            </div>
            <p className="mt-1.5 text-[11px] text-slate-400">10× ≈ 1 kun / 1 soniya</p>
          </div>

          {/* Tools */}
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Asboblar
            </h3>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <button
                onClick={garden.water}
                disabled={!plant.alive}
                className="flex items-center justify-center gap-1.5 rounded-xl border border-blue-200 bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700 transition enabled:hover:bg-blue-100 disabled:opacity-50"
              >
                <DropIcon /> Sug'orish
              </button>
              <button
                onClick={garden.feed}
                disabled={!plant.alive}
                className="flex items-center justify-center gap-1.5 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm font-medium text-amber-700 transition enabled:hover:bg-amber-100 disabled:opacity-50"
              >
                <LeafIcon /> Oziqlantirish
              </button>
            </div>
            <button
              onClick={garden.reset}
              className="mt-2 w-full rounded-xl border border-[var(--color-lab-border)] bg-white px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
            >
              Yangi urug' ekish
            </button>
          </div>

          {/* Routine */}
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Parvarish jadvali
            </h3>
            <div className="mt-2 space-y-3">
              <Stepper
                label="Sug'orish"
                hint="kuniga necha marta"
                value={garden.routine.waterPerDay}
                min={0}
                max={12}
                onChange={(v) => setRoutine({ waterPerDay: v })}
              />
              <Stepper
                label="Oziqlantirish"
                hint="kuniga necha marta"
                value={garden.routine.feedPerDay}
                min={0}
                max={6}
                onChange={(v) => setRoutine({ feedPerDay: v })}
              />
            </div>
            <p className="mt-2 text-[11px] leading-relaxed text-slate-400">
              Me'yorida ~3 marta sug'oring. Haddan ortiq suv ildizni chiritadi, kam suv
              qovjiratadi. Namlik o'lchagichdagi yashil oraliqni saqlang.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
