import { BrandMark, Wordmark } from "../../../shared/ui/brand-mark";

interface NavbarProps {
  route: string;
  onNavigate: (to: string) => void;
}

const LINKS = [
  { to: "/", label: "Bosh sahifa" },
  { to: "/lab", label: "3D Laboratoriya" },
];

/** Top navigation shared by the landing and laboratory pages. */
export function Navbar({ route, onNavigate }: NavbarProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-[var(--color-lab-border)] bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-6">
        <button
          onClick={() => onNavigate("/")}
          className="flex items-center gap-2"
          aria-label="SmartLab bosh sahifa"
        >
          <BrandMark className="h-9 w-9" />
          <Wordmark className="text-xl" />
        </button>

        <nav className="ml-auto flex items-center gap-1">
          {LINKS.map((link) => {
            const active =
              link.to === "/" ? route === "/" : route.startsWith(link.to);
            return (
              <button
                key={link.to}
                onClick={() => onNavigate(link.to)}
                className={`hidden rounded-lg px-3 py-2 text-sm font-medium transition sm:block ${
                  active
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                {link.label}
              </button>
            );
          })}
          <button
            onClick={() => onNavigate("/lab")}
            className="ml-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-blue-600/20 transition hover:from-blue-700 hover:to-blue-800"
          >
            Laboratoriyani ochish
          </button>
        </nav>
      </div>
    </header>
  );
}
