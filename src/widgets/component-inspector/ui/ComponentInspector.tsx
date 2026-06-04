import { CATALOG } from "../../../entities/circuit";
import type { PlacedComponent, SimResult } from "../../../entities/circuit";
import { Icon } from "../../../shared/ui/icon";

interface ComponentInspectorProps {
  component: PlacedComponent | null;
  sim: SimResult;
  onUpdate: (id: string, patch: Partial<PlacedComponent>) => void;
  onDelete: (id: string) => void;
  onRotate: (id: string) => void;
}

const LED_COLORS = [
  { v: "#ef4444", name: "Qizil" },
  { v: "#22c55e", name: "Yashil" },
  { v: "#3b82f6", name: "Ko'k" },
  { v: "#f59e0b", name: "Sariq" },
  { v: "#f1f5f9", name: "Oq" },
];
const RESISTOR_PRESETS = ["220Ω", "330Ω", "1kΩ", "10kΩ"];
const VOLTAGES = [1.5, 3, 5, 9, 12];

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
        {label}
      </div>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}

/** O'ng panel: zanjir holati va tanlangan komponent sozlamalari. */
export function ComponentInspector({
  component,
  sim,
  onUpdate,
  onDelete,
  onRotate,
}: ComponentInspectorProps) {
  const litLeds = [...sim.ledStates.values()].filter((s) => s === "on").length;
  const reverseLeds = [...sim.ledStates.values()].filter((s) => s === "reverse").length;

  return (
    <aside className="flex h-full w-72 shrink-0 flex-col gap-4 overflow-y-auto border-l border-[var(--color-lab-border)] bg-[var(--color-lab-panel)] p-5">
      {/* Zanjir holati */}
      <div>
        <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
          Zanjir holati
        </div>
        <div
          className={`mt-2 flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium ring-1 ${
            sim.isShort
              ? "bg-red-50 text-red-700 ring-red-200"
              : sim.isClosed
                ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
                : "bg-slate-100 text-slate-500 ring-slate-200"
          }`}
        >
          <span
            className={`h-2 w-2 rounded-full ${
              sim.isShort ? "bg-red-500" : sim.isClosed ? "bg-emerald-500" : "bg-slate-400"
            }`}
          />
          {sim.isShort ? "Qisqa tutashuv!" : sim.isClosed ? "Zanjir yopiq" : "Zanjir ochiq"}
        </div>
        {(litLeds > 0 || reverseLeds > 0) && (
          <p className="mt-2 text-xs text-slate-500">
            {litLeds > 0 && <span>{litLeds} ta LED yonmoqda. </span>}
            {reverseLeds > 0 && (
              <span className="text-red-600">{reverseLeds} ta LED teskari ulangan.</span>
            )}
          </p>
        )}
        {sim.isShort && (
          <p className="mt-1 text-xs text-red-600">
            Manbani bevosita tutashtirmang — rezistor qo'shing.
          </p>
        )}
      </div>

      <div className="h-px bg-[var(--color-lab-border)]" />

      {/* Tanlangan komponent */}
      {!component ? (
        <div className="text-sm text-slate-500">
          <p className="font-medium text-slate-700">Komponent tanlanmagan</p>
          <p className="mt-1">
            Sozlash uchun taxtadagi komponentni bosing. Ulash uchun bir terminalni,
            so'ng ikkinchisini bosing.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-slate-400">Komponent</div>
              <div className="text-lg font-semibold text-slate-900">
                {CATALOG[component.kind].name}
              </div>
            </div>
            <div className="flex gap-1.5">
              <button
                onClick={() => onRotate(component.id)}
                title="Aylantirish"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--color-lab-border)] bg-white text-slate-600 transition hover:border-blue-300 hover:text-blue-700"
              >
                <Icon name="rotate" className="h-4 w-4" />
              </button>
              <button
                onClick={() => onDelete(component.id)}
                title="O'chirish"
                className="flex h-8 items-center rounded-lg border border-red-200 bg-white px-2.5 text-xs font-medium text-red-600 transition hover:bg-red-50"
              >
                O'chirish
              </button>
            </div>
          </div>

          {/* Kalit / tugma */}
          {(component.kind === "switch" || component.kind === "button") && (
            <Field label="Holat">
              <button
                onClick={() => onUpdate(component.id, { on: !component.on })}
                className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium ring-1 transition ${
                  component.on
                    ? "bg-blue-600 text-white ring-blue-600"
                    : "bg-white text-slate-600 ring-slate-200 hover:bg-slate-50"
                }`}
              >
                <span
                  className={`h-2 w-2 rounded-full ${component.on ? "bg-white" : "bg-slate-400"}`}
                />
                {component.on ? "Yopiq (ON)" : "Ochiq (OFF)"}
              </button>
            </Field>
          )}

          {/* Batareya kuchlanishi */}
          {component.kind === "battery" && (
            <Field label="Kuchlanish">
              <div className="flex flex-wrap gap-1.5">
                {VOLTAGES.map((v) => (
                  <button
                    key={v}
                    onClick={() => onUpdate(component.id, { voltage: v })}
                    className={`rounded-lg px-2.5 py-1.5 text-xs font-medium ring-1 transition ${
                      component.voltage === v
                        ? "bg-blue-600 text-white ring-blue-600"
                        : "bg-white text-slate-600 ring-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    {v}V
                  </button>
                ))}
              </div>
            </Field>
          )}

          {/* Rezistor qiymati */}
          {component.kind === "resistor" && (
            <Field label="Qiymat">
              <div className="flex flex-wrap gap-1.5">
                {RESISTOR_PRESETS.map((r) => (
                  <button
                    key={r}
                    onClick={() => onUpdate(component.id, { value: r })}
                    className={`rounded-lg px-2.5 py-1.5 text-xs font-medium ring-1 transition ${
                      component.value === r
                        ? "bg-blue-600 text-white ring-blue-600"
                        : "bg-white text-slate-600 ring-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
              <input
                value={component.value}
                onChange={(e) => onUpdate(component.id, { value: e.target.value })}
                placeholder="masalan 470Ω"
                className="mt-2 w-full rounded-lg border border-[var(--color-lab-border)] bg-white px-2.5 py-1.5 text-sm text-slate-700 outline-none focus:border-blue-400"
              />
            </Field>
          )}

          {/* LED rangi */}
          {component.kind === "led" && (
            <Field label="Rang">
              <div className="flex flex-wrap gap-2">
                {LED_COLORS.map((c) => (
                  <button
                    key={c.v}
                    onClick={() => onUpdate(component.id, { color: c.v })}
                    title={c.name}
                    className={`h-7 w-7 rounded-full ring-2 transition ${
                      component.color === c.v ? "ring-blue-500" : "ring-slate-200 hover:ring-slate-300"
                    }`}
                    style={{ backgroundColor: c.v }}
                  />
                ))}
              </div>
            </Field>
          )}

          {/* Chip nomi */}
          {component.kind === "chip" && (
            <Field label="Belgi">
              <input
                value={component.label}
                onChange={(e) => onUpdate(component.id, { label: e.target.value })}
                placeholder="masalan 555"
                maxLength={6}
                className="w-full rounded-lg border border-[var(--color-lab-border)] bg-white px-2.5 py-1.5 text-sm text-slate-700 outline-none focus:border-blue-400"
              />
            </Field>
          )}

          <Field label="Burchak">
            <div className="text-sm text-slate-600">{component.rotation}°</div>
          </Field>
        </div>
      )}
    </aside>
  );
}
