import { useEffect, useMemo, useRef, useState } from "react";
import { ComponentPalette } from "../../../widgets/component-palette";
import { CircuitBoard } from "../../../widgets/circuit-board";
import { ComponentInspector } from "../../../widgets/component-inspector";
import { defaultProps, simulateCircuit } from "../../../entities/circuit";
import type {
  ComponentKind,
  PlacedComponent,
  Rotation,
  Wire,
  WireEnd,
} from "../../../entities/circuit";
import { BrandMark } from "../../../shared/ui/brand-mark";
import { Icon } from "../../../shared/ui/icon";

interface ElectronicsLabPageProps {
  onNavigate: (to: string) => void;
}

/**
 * Elektronika bo'limi — 2D sxema-quruvchi laboratoriya. Foydalanuvchi taxtaga
 * komponentlar qo'yadi, terminallarini simlar bilan ulaydi va sxema jonli
 * simulyatsiya qilinadi (yopiq zanjirda LED/lampa yonadi).
 */
export function ElectronicsLabPage({ onNavigate }: ElectronicsLabPageProps) {
  const [components, setComponents] = useState<PlacedComponent[]>([]);
  const [wires, setWires] = useState<Wire[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const counter = useRef(0);
  const nextId = (prefix: string) => `${prefix}${++counter.current}`;

  const sim = useMemo(() => simulateCircuit({ components, wires }), [components, wires]);
  const selected = components.find((c) => c.id === selectedId) ?? null;

  const make = (
    kind: ComponentKind,
    x: number,
    y: number,
    extra: Partial<PlacedComponent> = {},
  ): PlacedComponent => ({
    id: nextId("c"),
    kind,
    x,
    y,
    rotation: 0,
    ...defaultProps(kind),
    ...extra,
  });

  const addComponent = (kind: ComponentKind) => {
    const id = nextId("c");
    setComponents((cs) => {
      const n = cs.length;
      return [
        ...cs,
        {
          id,
          kind,
          x: 360 + (n % 4) * 130,
          y: 170 + Math.floor(n / 4) * 120,
          rotation: 0 as Rotation,
          ...defaultProps(kind),
        },
      ];
    });
    setSelectedId(id);
  };

  const updateComponent = (id: string, patch: Partial<PlacedComponent>) =>
    setComponents((cs) => cs.map((c) => (c.id === id ? { ...c, ...patch } : c)));

  const moveComponent = (id: string, x: number, y: number) =>
    setComponents((cs) => cs.map((c) => (c.id === id ? { ...c, x, y } : c)));

  const rotateComponent = (id: string) =>
    setComponents((cs) =>
      cs.map((c) =>
        c.id === id ? { ...c, rotation: (((c.rotation + 90) % 360) as Rotation) } : c,
      ),
    );

  const toggleComponent = (id: string) =>
    setComponents((cs) => cs.map((c) => (c.id === id ? { ...c, on: !c.on } : c)));

  const deleteComponent = (id: string) => {
    setComponents((cs) => cs.filter((c) => c.id !== id));
    setWires((ws) => ws.filter((w) => w.from.componentId !== id && w.to.componentId !== id));
    setSelectedId((sel) => (sel === id ? null : sel));
  };

  const addWire = (from: WireEnd, to: WireEnd) => {
    const id = nextId("w");
    setWires((ws) => {
      const dup = ws.some(
        (w) =>
          (w.from.componentId === from.componentId &&
            w.from.terminalId === from.terminalId &&
            w.to.componentId === to.componentId &&
            w.to.terminalId === to.terminalId) ||
          (w.from.componentId === to.componentId &&
            w.from.terminalId === to.terminalId &&
            w.to.componentId === from.componentId &&
            w.to.terminalId === from.terminalId),
      );
      return dup ? ws : [...ws, { id, from, to }];
    });
  };

  const clearBoard = () => {
    setComponents([]);
    setWires([]);
    setSelectedId(null);
  };

  const loadExample = () => {
    const bat = make("battery", 380, 560);
    const sw = make("switch", 160, 370, { on: true });
    const res = make("resistor", 380, 180);
    const led = make("led", 620, 370);
    setComponents([bat, sw, res, led]);
    setWires([
      { id: nextId("w"), from: { componentId: bat.id, terminalId: "+" }, to: { componentId: res.id, terminalId: "a" } },
      { id: nextId("w"), from: { componentId: res.id, terminalId: "b" }, to: { componentId: led.id, terminalId: "anode" } },
      { id: nextId("w"), from: { componentId: led.id, terminalId: "cathode" }, to: { componentId: sw.id, terminalId: "a" } },
      { id: nextId("w"), from: { componentId: sw.id, terminalId: "b" }, to: { componentId: bat.id, terminalId: "-" } },
    ]);
    setSelectedId(null);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "Escape") {
        setSelectedId(null);
        return;
      }
      if ((e.key === "Delete" || e.key === "Backspace") && selectedId) {
        e.preventDefault();
        deleteComponent(selectedId);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedId]);

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-[var(--color-lab-bg)] text-slate-800">
      {/* Tepa panel */}
      <div className="flex h-12 shrink-0 items-center gap-3 border-b border-[var(--color-lab-border)] bg-white px-4">
        <button
          onClick={() => onNavigate("/lab")}
          className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
        >
          <Icon name="arrow-left" className="h-4 w-4" />
          Laboratoriya
        </button>
        <span className="h-5 w-px bg-[var(--color-lab-border)]" />
        <button onClick={() => onNavigate("/")} className="flex items-center gap-2">
          <BrandMark className="h-6 w-6" />
          <span className="text-sm font-semibold text-slate-900">
            Elektronika <span className="font-normal text-slate-400">/ Quruvchi</span>
          </span>
        </button>

        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={loadExample}
            className="rounded-lg bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700 ring-1 ring-blue-200 transition hover:bg-blue-100"
          >
            Namuna
          </button>
          <button
            onClick={clearBoard}
            className="rounded-lg px-3 py-1.5 text-sm font-medium text-slate-600 ring-1 ring-slate-200 transition hover:bg-slate-100"
          >
            Tozalash
          </button>
        </div>
      </div>

      {/* Ish maydoni: palette · taxta · inspektor */}
      <div className="flex min-h-0 flex-1">
        <ComponentPalette onAdd={addComponent} />
        <main className="relative min-w-0 flex-1">
          <CircuitBoard
            components={components}
            wires={wires}
            sim={sim}
            selectedId={selectedId}
            onSelect={setSelectedId}
            onMove={moveComponent}
            onAddWire={addWire}
            onToggle={toggleComponent}
          />
        </main>
        <ComponentInspector
          component={selected}
          sim={sim}
          onUpdate={updateComponent}
          onDelete={deleteComponent}
          onRotate={rotateComponent}
        />
      </div>
    </div>
  );
}
