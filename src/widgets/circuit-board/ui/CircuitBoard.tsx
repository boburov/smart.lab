import { useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import {
  CATALOG,
  ComponentGlyph,
  terminalPos,
} from "../../../entities/circuit";
import type {
  PlacedComponent,
  SimResult,
  Wire,
  WireEnd,
} from "../../../entities/circuit";

const VW = 1200;
const VH = 760;
const LEAD = "#64748b";
const BLUE = "#2563eb";

const snap = (v: number) => Math.round(v / 10) * 10;

interface CircuitBoardProps {
  components: PlacedComponent[];
  wires: Wire[];
  sim: SimResult;
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  onMove: (id: string, x: number, y: number) => void;
  onAddWire: (from: WireEnd, to: WireEnd) => void;
  onToggle: (id: string) => void;
}

/**
 * 2D sxema taxtasi. Komponentlarni surish (drag), terminallarni bosib sim
 * ulash, kalit/tugmani bosib almashtirish — barchasi shu yerda.
 */
export function CircuitBoard({
  components,
  wires,
  sim,
  selectedId,
  onSelect,
  onMove,
  onAddWire,
  onToggle,
}: CircuitBoardProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const dragRef = useRef<{
    id: string;
    offX: number;
    offY: number;
    startX: number;
    startY: number;
    moved: boolean;
  } | null>(null);
  const [pendingFrom, setPendingFrom] = useState<WireEnd | null>(null);
  const [cursor, setCursor] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const byId = new Map(components.map((c) => [c.id, c]));

  const toSvg = (clientX: number, clientY: number) => {
    const svg = svgRef.current;
    if (!svg) return { x: 0, y: 0 };
    const pt = svg.createSVGPoint();
    pt.x = clientX;
    pt.y = clientY;
    const ctm = svg.getScreenCTM();
    if (!ctm) return { x: 0, y: 0 };
    const p = pt.matrixTransform(ctm.inverse());
    return { x: p.x, y: p.y };
  };

  const handleComponentDown = (e: ReactPointerEvent, comp: PlacedComponent) => {
    e.stopPropagation();
    onSelect(comp.id);
    const p = toSvg(e.clientX, e.clientY);
    dragRef.current = {
      id: comp.id,
      offX: p.x - comp.x,
      offY: p.y - comp.y,
      startX: p.x,
      startY: p.y,
      moved: false,
    };
  };

  const handleMove = (e: ReactPointerEvent) => {
    const p = toSvg(e.clientX, e.clientY);
    const d = dragRef.current;
    if (d) {
      if (!d.moved && (Math.abs(p.x - d.startX) > 3 || Math.abs(p.y - d.startY) > 3))
        d.moved = true;
      if (d.moved) onMove(d.id, snap(p.x - d.offX), snap(p.y - d.offY));
    }
    if (pendingFrom) setCursor(p);
  };

  const handleUp = () => {
    const d = dragRef.current;
    if (d) {
      if (!d.moved) {
        const comp = byId.get(d.id);
        if (comp && (comp.kind === "switch" || comp.kind === "button"))
          onToggle(comp.id);
      }
      dragRef.current = null;
    }
  };

  const handleBgDown = () => {
    if (pendingFrom) setPendingFrom(null);
    else onSelect(null);
  };

  const handleTerminalDown = (
    e: ReactPointerEvent,
    componentId: string,
    terminalId: string,
  ) => {
    e.stopPropagation();
    if (!pendingFrom) {
      setPendingFrom({ componentId, terminalId });
      return;
    }
    if (pendingFrom.componentId === componentId && pendingFrom.terminalId === terminalId) {
      setPendingFrom(null);
      return;
    }
    onAddWire(pendingFrom, { componentId, terminalId });
    setPendingFrom(null);
  };

  const pendingPos = (() => {
    if (!pendingFrom) return null;
    const fc = byId.get(pendingFrom.componentId);
    if (!fc) return null;
    return terminalPos(fc, pendingFrom.terminalId);
  })();

  return (
    <div className="relative h-full w-full overflow-hidden">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${VW} ${VH}`}
        preserveAspectRatio="xMidYMid meet"
        className="h-full w-full touch-none select-none"
        onPointerMove={handleMove}
        onPointerUp={handleUp}
        onPointerLeave={handleUp}
      >
        <defs>
          <pattern id="board-grid" width={20} height={20} patternUnits="userSpaceOnUse">
            <circle cx={1} cy={1} r={1} fill="#cbd5e1" />
          </pattern>
        </defs>
        <rect x={0} y={0} width={VW} height={VH} fill="#f8fafc" onPointerDown={handleBgDown} />
        <rect x={0} y={0} width={VW} height={VH} fill="url(#board-grid)" pointerEvents="none" />

        {/* Simlar */}
        {wires.map((w) => {
          const a = byId.get(w.from.componentId);
          const b = byId.get(w.to.componentId);
          if (!a || !b) return null;
          const p1 = terminalPos(a, w.from.terminalId);
          const p2 = terminalPos(b, w.to.terminalId);
          const net = sim.netOf.get(`${w.from.componentId}:${w.from.terminalId}`);
          const live = net != null && sim.energizedNets.has(net);
          return (
            <g key={w.id}>
              <line
                x1={p1.x}
                y1={p1.y}
                x2={p2.x}
                y2={p2.y}
                stroke={live ? BLUE : LEAD}
                strokeWidth={3}
                strokeLinecap="round"
              />
              {live && (
                <line
                  x1={p1.x}
                  y1={p1.y}
                  x2={p2.x}
                  y2={p2.y}
                  stroke="#ffffff"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeDasharray="3 9"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    from="0"
                    to="-12"
                    dur="0.5s"
                    repeatCount="indefinite"
                  />
                </line>
              )}
            </g>
          );
        })}

        {/* Vaqtinchalik ulash chizig'i */}
        {pendingPos && (
          <line
            x1={pendingPos.x}
            y1={pendingPos.y}
            x2={cursor.x}
            y2={cursor.y}
            stroke={BLUE}
            strokeWidth={2}
            strokeDasharray="5 5"
            strokeLinecap="round"
            pointerEvents="none"
          />
        )}

        {/* Komponentlar */}
        {components.map((c) => {
          const def = CATALOG[c.kind];
          const selected = c.id === selectedId;
          const lit =
            (c.kind === "lamp" || c.kind === "buzzer") &&
            sim.energizedComponents.has(c.id);
          return (
            <g
              key={c.id}
              transform={`translate(${c.x} ${c.y}) rotate(${c.rotation})`}
              onPointerDown={(e) => handleComponentDown(e, c)}
              style={{ cursor: "grab" }}
            >
              {selected && (
                <rect
                  x={-def.width / 2 - 6}
                  y={-def.height / 2 - 6}
                  width={def.width + 12}
                  height={def.height + 12}
                  rx={8}
                  fill="#3b82f6"
                  fillOpacity={0.08}
                  stroke="#3b82f6"
                  strokeOpacity={0.5}
                  strokeWidth={1.5}
                />
              )}
              <ComponentGlyph
                kind={c.kind}
                color={c.color}
                value={c.value}
                voltage={c.voltage}
                on={c.on}
                label={c.label}
                ledState={sim.ledStates.get(c.id)}
                lit={lit}
              />
              {def.terminals.map((t) => {
                const pend =
                  pendingFrom?.componentId === c.id && pendingFrom?.terminalId === t.id;
                return (
                  <g key={t.id}>
                    <circle
                      cx={t.dx}
                      cy={t.dy}
                      r={9}
                      fill="transparent"
                      style={{ cursor: "crosshair" }}
                      onPointerDown={(e) => handleTerminalDown(e, c.id, t.id)}
                    />
                    <circle
                      cx={t.dx}
                      cy={t.dy}
                      r={4}
                      fill={pend ? BLUE : "#ffffff"}
                      stroke={pend ? BLUE : "#94a3b8"}
                      strokeWidth={1.5}
                      pointerEvents="none"
                    />
                  </g>
                );
              })}
            </g>
          );
        })}
      </svg>

      {pendingFrom && (
        <div className="pointer-events-none absolute left-1/2 top-3 -translate-x-1/2 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white shadow-sm">
          Ikkinchi terminalni tanlang · bo'sh joyni bossangiz bekor bo'ladi
        </div>
      )}

      {components.length === 0 && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white/70 px-6 py-5 text-center">
            <p className="text-sm font-medium text-slate-700">Taxta bo'sh</p>
            <p className="mt-1 text-xs text-slate-500">
              Chapdagi paneldan komponent qo'shing yoki “Namuna”ni bosing
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
