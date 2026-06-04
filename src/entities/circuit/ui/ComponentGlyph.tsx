import type { ComponentKind } from "../model/types";
import type { LedState } from "../lib/simulate";

const LEAD = "#64748b";
const STROKE = "#475569";
const FILL = "#ffffff";
const OFF = "#e2e8f0";
const BLUE = "#2563eb";

interface ComponentGlyphProps {
  kind: ComponentKind;
  color?: string;
  value?: string;
  voltage?: number;
  on?: boolean;
  label?: string;
  ledState?: LedState;
  /** Lampa/zummer yonayotgan bo'lsa. */
  lit?: boolean;
}

/**
 * Komponentning markazga joylashtirilgan SVG tasviri (terminallarsiz, o'zaro
 * ta'sirsiz). Board va palette buni umumiy ishlatadi.
 */
export function ComponentGlyph({
  kind,
  color = "#ef4444",
  value = "",
  voltage = 9,
  on = false,
  label = "IC",
  ledState = "off",
  lit = false,
}: ComponentGlyphProps) {
  const lead = (x1: number, x2: number) => (
    <line x1={x1} y1={0} x2={x2} y2={0} stroke={LEAD} strokeWidth={2.5} strokeLinecap="round" />
  );

  switch (kind) {
    case "battery":
      return (
        <g>
          {lead(-42, -9)}
          {lead(9, 42)}
          <line x1={-9} y1={-9} x2={-9} y2={9} stroke={STROKE} strokeWidth={6} strokeLinecap="round" />
          <line x1={9} y1={-16} x2={9} y2={16} stroke={STROKE} strokeWidth={2.5} strokeLinecap="round" />
          <text x={-22} y={-12} fontSize={13} fill={STROKE} fontWeight={700}>−</text>
          <text x={16} y={-11} fontSize={13} fill={STROKE} fontWeight={700}>+</text>
          <text x={0} y={26} textAnchor="middle" fontSize={12} fill={STROKE} fontWeight={600}>
            {voltage}V
          </text>
        </g>
      );

    case "resistor":
      return (
        <g>
          {lead(-42, -28)}
          {lead(28, 42)}
          <rect x={-28} y={-10} width={56} height={20} rx={3} fill={FILL} stroke={STROKE} strokeWidth={2} />
          <rect x={-15} y={-10} width={4} height={20} fill="#f59e0b" />
          <rect x={-5} y={-10} width={4} height={20} fill="#ef4444" />
          <rect x={5} y={-10} width={4} height={20} fill="#a16207" />
          <text x={0} y={-15} textAnchor="middle" fontSize={11} fill={STROKE} fontWeight={600}>
            {value}
          </text>
        </g>
      );

    case "led": {
      const glowing = ledState === "on";
      return (
        <g>
          {lead(-32, -15)}
          {lead(15, 32)}
          {glowing && <circle cx={0} cy={0} r={22} fill={color} opacity={0.28} />}
          <circle
            cx={0}
            cy={0}
            r={14}
            fill={glowing ? color : OFF}
            stroke={ledState === "reverse" ? "#ef4444" : STROKE}
            strokeWidth={2}
            strokeDasharray={ledState === "reverse" ? "3 3" : undefined}
          />
          {glowing && (
            <>
              <line x1={10} y1={-18} x2={16} y2={-24} stroke={color} strokeWidth={2} strokeLinecap="round" />
              <line x1={2} y1={-20} x2={5} y2={-27} stroke={color} strokeWidth={2} strokeLinecap="round" />
            </>
          )}
        </g>
      );
    }

    case "switch":
      return (
        <g>
          {lead(-36, -18)}
          {lead(18, 36)}
          <circle cx={-18} cy={0} r={3.5} fill={STROKE} />
          <circle cx={18} cy={0} r={3.5} fill={STROKE} />
          <line
            x1={-18}
            y1={0}
            x2={on ? 18 : 12}
            y2={on ? 0 : -16}
            stroke={BLUE}
            strokeWidth={3}
            strokeLinecap="round"
          />
        </g>
      );

    case "button":
      return (
        <g>
          {lead(-28, -16)}
          {lead(16, 28)}
          <rect x={-16} y={-16} width={32} height={32} rx={6} fill={FILL} stroke={STROKE} strokeWidth={2} />
          <circle cx={0} cy={0} r={10} fill={on ? BLUE : OFF} stroke={STROKE} strokeWidth={1.5} />
        </g>
      );

    case "lamp":
      return (
        <g>
          {lead(-28, -16)}
          {lead(16, 28)}
          {lit && <circle cx={0} cy={0} r={22} fill="#fde047" opacity={0.55} />}
          <circle cx={0} cy={0} r={15} fill={lit ? "#fde047" : OFF} stroke={STROKE} strokeWidth={2} />
          <line x1={-10} y1={-10} x2={10} y2={10} stroke={STROKE} strokeWidth={1.5} />
          <line x1={10} y1={-10} x2={-10} y2={10} stroke={STROKE} strokeWidth={1.5} />
        </g>
      );

    case "buzzer":
      return (
        <g>
          {lead(-28, -16)}
          {lead(16, 28)}
          <circle cx={0} cy={0} r={15} fill={lit ? BLUE : OFF} stroke={STROKE} strokeWidth={2} />
          <path
            d="M -7 -6 H -1 L 6 -11 V 11 L -1 6 H -7 Z"
            fill={lit ? "#ffffff" : STROKE}
          />
          {lit && (
            <path d="M 9 -7 A 9 9 0 0 1 9 7" fill="none" stroke="#ffffff" strokeWidth={1.5} />
          )}
        </g>
      );

    case "chip": {
      const ys = [-36, -12, 12, 36];
      return (
        <g>
          {ys.map((y) => (
            <rect key={`l${y}`} x={-42} y={y - 2} width={12} height={4} rx={1} fill="#94a3b8" />
          ))}
          {ys.map((y) => (
            <rect key={`r${y}`} x={30} y={y - 2} width={12} height={4} rx={1} fill="#94a3b8" />
          ))}
          <rect x={-30} y={-44} width={60} height={88} rx={5} fill="#1e293b" stroke="#0f172a" strokeWidth={2} />
          <path d="M -8 -44 A 8 8 0 0 0 8 -44" fill="#0f172a" />
          <circle cx={-20} cy={-32} r={3} fill="#64748b" />
          <text x={0} y={5} textAnchor="middle" fontSize={12} fill="#e2e8f0" fontWeight={700}>
            {label || "IC"}
          </text>
        </g>
      );
    }

    default:
      return null;
  }
}
