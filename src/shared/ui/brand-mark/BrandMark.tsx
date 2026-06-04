/** SmartLab atom logo — blue orbits on a light surface. */
export function BrandMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="brandmark-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3b82f6" />
          <stop offset="1" stopColor="#1d4ed8" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="8" fill="#eff5ff" />
      <g stroke="url(#brandmark-grad)" strokeWidth="1.6" fill="none">
        <ellipse cx="16" cy="16" rx="11" ry="4.5" />
        <ellipse cx="16" cy="16" rx="11" ry="4.5" transform="rotate(60 16 16)" />
        <ellipse cx="16" cy="16" rx="11" ry="4.5" transform="rotate(120 16 16)" />
      </g>
      <circle cx="16" cy="16" r="3" fill="url(#brandmark-grad)" />
    </svg>
  );
}

/** Wordmark: "SmartLab" with a blue accent on "Lab". */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-semibold tracking-tight text-slate-900 ${className}`}>
      Smart<span className="text-blue-600">Lab</span>
    </span>
  );
}
