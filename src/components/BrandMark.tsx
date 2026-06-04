/** SmartLab atom logo — green orbits on a light surface. */
export function BrandMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="#ecfdf5" />
      <g stroke="#059669" strokeWidth="1.6" fill="none">
        <ellipse cx="16" cy="16" rx="11" ry="4.5" />
        <ellipse cx="16" cy="16" rx="11" ry="4.5" transform="rotate(60 16 16)" />
        <ellipse cx="16" cy="16" rx="11" ry="4.5" transform="rotate(120 16 16)" />
      </g>
      <circle cx="16" cy="16" r="3" fill="#059669" />
    </svg>
  );
}

/** Wordmark: "SmartLab" with a green accent on "Lab". */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-semibold tracking-tight text-slate-900 ${className}`}>
      Smart<span className="text-emerald-600">Lab</span>
    </span>
  );
}
