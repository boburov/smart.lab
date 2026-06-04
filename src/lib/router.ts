import { useEffect, useState } from "react";

/**
 * Minimal hash-based router so SmartLab can have multiple pages
 * (landing → laboratory → explorer) without pulling in a routing library.
 *
 * Routes are plain strings like "/", "/lab", "/lab/chemistry".
 */
function readRoute(): string {
  const hash = window.location.hash.replace(/^#/, "");
  return hash.length > 0 ? hash : "/";
}

export function useHashRoute(): [string, (to: string) => void] {
  const [route, setRoute] = useState<string>(() => readRoute());

  useEffect(() => {
    const onChange = () => {
      setRoute(readRoute());
      // Each navigation should start at the top of the new page.
      window.scrollTo({ top: 0 });
    };
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  const navigate = (to: string) => {
    if (readRoute() === to) return;
    window.location.hash = to;
  };

  return [route, navigate];
}
