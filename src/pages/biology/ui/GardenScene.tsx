import { blendColors } from "../../../shared/lib/color";
import type { PlantState, Season } from "../../../entities/plant";
import { PlantSvg } from "./PlantSvg";

interface GardenSceneProps {
  plant: PlantState;
  timeOfDay: number;
  season: Season;
  isDay: boolean;
  raining: boolean;
}

const DAWN = 0.22;
const DUSK = 0.8;

function mix(a: string, b: string, t: number): string {
  return blendColors([
    { color: a, weight: 1 - t },
    { color: b, weight: t },
  ]);
}

/** Daylight strength 0–1: 0 at night, 1 at noon, smooth at dawn/dusk. */
function daylight(t: number): number {
  if (t <= DAWN || t >= DUSK) return 0;
  return Math.sin(((t - DAWN) / (DUSK - DAWN)) * Math.PI);
}

/** Sky gradient stops for the time of day (with a warm dawn/dusk glow). */
function skyColors(t: number): { top: string; bottom: string } {
  const light = daylight(t);
  const inDay = t > DAWN && t < DUSK;
  const dusk = inDay ? Math.pow(1 - light, 1.6) * 0.85 : 0;
  let top = mix("#0c1f3c", "#6fb2ec", light);
  let bottom = mix("#16294a", "#d7ecfc", light);
  top = mix(top, "#f0a25e", dusk);
  bottom = mix(bottom, "#ffd9a8", dusk);
  return { top, bottom };
}

/** Position of the sun (day) or moon (night) along an arc. */
function bodyPos(t: number): { x: number; y: number } {
  const inDay = t > DAWN && t < DUSK;
  const phase = inDay
    ? (t - DAWN) / (DUSK - DAWN)
    : t >= DUSK
      ? (t - DUSK) / (1 - DUSK + DAWN)
      : (t + (1 - DUSK)) / (1 - DUSK + DAWN);
  return { x: 30 + phase * 300, y: 175 - Math.sin(phase * Math.PI) * 140 };
}

/** Grass/topsoil colour by season (snow in winter). */
const GRASS: Record<Season, string> = {
  bahor: "#6fbf63",
  yoz: "#57a046",
  kuz: "#bfa24a",
  qish: "#e9eff5",
};

/** Falling raindrops (or snow), animated natively with SMIL. */
function Rain({ snow }: { snow: boolean }) {
  return (
    <g>
      {Array.from({ length: 22 }).map((_, i) => {
        const x = 12 + (i * 16.5) % 340;
        const delay = (i % 7) * 0.09;
        const dur = snow ? 1.8 : 0.7;
        return snow ? (
          <circle key={i} cx={x} cy={0} r={1.8} fill="#ffffff" opacity={0.85}>
            <animateTransform
              attributeName="transform"
              type="translate"
              from={`0 -10`}
              to={`6 200`}
              dur={`${dur}s`}
              begin={`${delay}s`}
              repeatCount="indefinite"
            />
          </circle>
        ) : (
          <line key={i} x1={x} y1={0} x2={x} y2={8} stroke="#9fc3e8" strokeWidth={1.5} opacity={0.6}>
            <animateTransform
              attributeName="transform"
              type="translate"
              from={`0 -12`}
              to={`0 200`}
              dur={`${dur}s`}
              begin={`${delay}s`}
              repeatCount="indefinite"
            />
          </line>
        );
      })}
    </g>
  );
}

/** The 2D garden: sky, sun/moon, ground and the plant, all reacting to time. */
export function GardenScene({ plant, timeOfDay, season, isDay, raining }: GardenSceneProps) {
  const sky = skyColors(timeOfDay);
  const body = bodyPos(timeOfDay);

  return (
    <svg viewBox="0 0 360 260" className="h-full w-full" role="img" aria-label="O'simlik bog'i">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={sky.top} />
          <stop offset="1" stopColor={sky.bottom} />
        </linearGradient>
      </defs>

      <rect x="0" y="0" width="360" height="200" fill="url(#sky)" />

      {/* Sun (day) or moon (night) */}
      {isDay ? (
        <circle cx={body.x} cy={body.y} r="16" fill="#ffd66b">
          <animate attributeName="opacity" values="0.9;1;0.9" dur="3s" repeatCount="indefinite" />
        </circle>
      ) : (
        <circle cx={body.x} cy={body.y} r="13" fill="#e7eefb" />
      )}

      {/* A couple of soft clouds in daytime */}
      {isDay && (
        <g fill="#ffffff" opacity={0.7}>
          <ellipse cx="80" cy="50" rx="34" ry="13" />
          <ellipse cx="105" cy="44" rx="24" ry="11" />
          <ellipse cx="270" cy="70" rx="30" ry="12" />
        </g>
      )}

      {/* Ground */}
      <rect x="0" y="190" width="360" height="70" fill="#6b4a2c" />
      <rect x="0" y="186" width="360" height="10" rx="3" fill={GRASS[season]} />

      {/* The plant, rooted at the soil line */}
      <g transform="translate(180 192)">
        <PlantSvg growth={plant.growth} health={plant.health} alive={plant.alive} />
      </g>

      {raining && <Rain snow={season === "qish"} />}
    </svg>
  );
}
