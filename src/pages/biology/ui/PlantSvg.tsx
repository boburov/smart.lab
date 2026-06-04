import { blendColors } from "../../../shared/lib/color";

interface PlantSvgProps {
  growth: number;
  health: number;
  alive: boolean;
}

/** Two-colour mix weighted by health (green/yellow when well, brown when not). */
function byHealth(well: string, sick: string, health: number): string {
  const h = Math.max(0.001, Math.min(1, health));
  return blendColors([
    { color: well, weight: h },
    { color: sick, weight: 1 - h },
  ]);
}

/** Leaf pairs: [growth threshold, fraction up the stem]. */
const LEAF_PAIRS: [number, number][] = [
  [0.16, 0.4],
  [0.38, 0.62],
  [0.58, 0.82],
];

/**
 * A parametric 2D plant drawn as an SVG `<g>` growing upward from its origin.
 * `growth` drives the stem height, leaves and flower; `health` shifts colours
 * from healthy green/yellow toward wilted brown, and a dead plant droops.
 */
export function PlantSvg({ growth, health, alive }: PlantSvgProps) {
  const stemH = 6 + growth * 130;
  const topX = Math.sin(growth * 2) * 4;
  const leaf = byHealth("#4ca65a", "#8a6a33", health);
  const stem = byHealth("#3f9a52", "#7a5a30", health);
  const petal = byHealth("#f4c430", "#b39a52", health);
  const droop = !alive ? 16 : health < 0.4 ? (0.4 - health) * 38 : 0;
  const flowerR = growth > 0.68 ? Math.min(1, (growth - 0.68) / 0.32) * 20 : 0;

  if (growth < 0.05) {
    return <ellipse cx={0} cy={-3} rx={5} ry={3.5} fill="#8a6a33" transform={`rotate(${droop})`} />;
  }

  return (
    <g transform={`rotate(${droop})`}>
      <path
        d={`M 0 0 Q ${topX * 0.5} ${-stemH * 0.5} ${topX} ${-stemH}`}
        fill="none"
        stroke={stem}
        strokeWidth={Math.max(2, 2 + growth * 4)}
        strokeLinecap="round"
      />

      {LEAF_PAIRS.map(([thr, f], i) => {
        if (growth < thr) return null;
        const size = Math.min(1, (growth - thr) / 0.2);
        const y = -stemH * f;
        const x = topX * f;
        const lw = 8 + size * 26;
        const lh = 4 + size * 12;
        return (
          <g key={i}>
            <ellipse
              cx={x - lw * 0.5}
              cy={y}
              rx={lw * 0.5}
              ry={lh}
              fill={leaf}
              transform={`rotate(-28 ${x} ${y})`}
            />
            <ellipse
              cx={x + lw * 0.5}
              cy={y}
              rx={lw * 0.5}
              ry={lh}
              fill={leaf}
              transform={`rotate(28 ${x} ${y})`}
            />
          </g>
        );
      })}

      {flowerR > 0 && (
        <g transform={`translate(${topX} ${-stemH})`}>
          {Array.from({ length: 12 }).map((_, i) => {
            const a = (i / 12) * Math.PI * 2;
            const px = Math.cos(a) * flowerR;
            const py = Math.sin(a) * flowerR;
            return (
              <ellipse
                key={i}
                cx={px}
                cy={py}
                rx={flowerR * 0.46}
                ry={flowerR * 0.22}
                fill={petal}
                transform={`rotate(${(a * 180) / Math.PI} ${px} ${py})`}
              />
            );
          })}
          <circle cx={0} cy={0} r={flowerR * 0.6} fill={alive ? "#6b4f2a" : "#5a4524"} />
        </g>
      )}
    </g>
  );
}
