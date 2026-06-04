import { Navbar } from "../../../widgets/navbar";
import {
  arduinoProducts,
  type ArduinoCategory,
  type ArduinoProduct,
} from "../../../entities/arduino-product";
import { ArduinoGlyph } from "./ArduinoGlyph";

interface ElectronicsPageProps {
  route: string;
  onNavigate: (to: string) => void;
}

/** Display order and accent colour for each product group. */
const CATEGORIES: { id: ArduinoCategory; accent: string }[] = [
  { id: "Platalar", accent: "#2563eb" },
  { id: "Sensorlar", accent: "#0d9488" },
  { id: "Modullar", accent: "#6366f1" },
  { id: "Komponentlar", accent: "#64748b" },
];

function ProductCard({
  product,
  accent,
}: {
  product: ArduinoProduct;
  accent: string;
}) {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-[var(--color-lab-border)] bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div
        className="flex h-28 items-center justify-center border-b border-[var(--color-lab-border)] px-6 py-4"
        style={{ backgroundColor: `${accent}0f` }}
      >
        <ArduinoGlyph accent={accent} className="h-full w-auto" />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-semibold text-slate-900">{product.name}</h3>
        </div>
        <span
          className="mt-1.5 inline-flex w-fit rounded-md px-2 py-0.5 text-[11px] font-medium"
          style={{ backgroundColor: `${accent}14`, color: accent }}
        >
          {product.spec}
        </span>
        <p className="mt-2 text-xs leading-relaxed text-slate-500">
          {product.description}
        </p>
      </div>
    </div>
  );
}

/**
 * Electronics section — a static Arduino product gallery for the prototype.
 * Products are grouped (Platalar / Sensorlar / Modullar / Komponentlar), each
 * group with its own accent colour.
 */
export function ElectronicsPage({ route, onNavigate }: ElectronicsPageProps) {
  return (
    <div className="min-h-screen bg-[var(--color-lab-bg)]">
      <Navbar route={route} onNavigate={onNavigate} />

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
            Elektronika
          </span>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Arduino mahsulotlari
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-slate-600">
            Platalar, sensorlar, modullar va komponentlar to'plami. Loyihalaringiz
            uchun kerakli qismlarni tanlang.
          </p>
        </div>

        <div className="mt-10 space-y-10">
          {CATEGORIES.map(({ id, accent }) => {
            const items = arduinoProducts.filter((p) => p.category === id);
            if (items.length === 0) return null;
            return (
              <div key={id}>
                <div className="flex items-center gap-3">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: accent }}
                  />
                  <h2 className="text-lg font-semibold text-slate-900">{id}</h2>
                  <span className="text-sm text-slate-400">({items.length})</span>
                </div>
                <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {items.map((p) => (
                    <ProductCard key={p.id} product={p} accent={accent} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
