/**
 * Lightweight vector illustration of an electronics board (PCB, pin headers and
 * a chip), tinted by an accent colour. No images or emoji — it just gives each
 * product card a recognisable "board" look per the design rules.
 */
export function ArduinoGlyph({
  accent,
  className = "h-full w-full",
}: {
  accent: string;
  className?: string;
}) {
  const pins = Array.from({ length: 13 });
  return (
    <svg viewBox="0 0 120 72" className={className} role="img" aria-hidden="true">
      {/* PCB body */}
      <rect
        x="8"
        y="12"
        width="104"
        height="48"
        rx="6"
        fill={accent}
        fillOpacity="0.12"
        stroke={accent}
        strokeOpacity="0.45"
      />
      {/* Pin headers */}
      {pins.map((_, i) => (
        <rect
          key={`t${i}`}
          x={16 + i * 7}
          y={8}
          width={3}
          height={8}
          rx={1}
          fill={accent}
          fillOpacity="0.55"
        />
      ))}
      {pins.map((_, i) => (
        <rect
          key={`b${i}`}
          x={16 + i * 7}
          y={56}
          width={3}
          height={8}
          rx={1}
          fill={accent}
          fillOpacity="0.55"
        />
      ))}
      {/* Main chip */}
      <rect x="49" y="28" width="26" height="18" rx="2" fill={accent} fillOpacity="0.85" />
      <rect x="55" y="33" width="14" height="2" rx="1" fill="#ffffff" fillOpacity="0.5" />
      <rect x="55" y="38" width="9" height="2" rx="1" fill="#ffffff" fillOpacity="0.5" />
      {/* Small components */}
      <circle cx="24" cy="26" r="4" fill={accent} fillOpacity="0.4" />
      <circle cx="98" cy="46" r="4" fill={accent} fillOpacity="0.4" />
      <rect x="86" y="22" width="14" height="6" rx="1.5" fill={accent} fillOpacity="0.5" />
    </svg>
  );
}
