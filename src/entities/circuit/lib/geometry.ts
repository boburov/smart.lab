import type { PlacedComponent, Rotation } from "../model/types";
import { CATALOG } from "../model/catalog";

/** (dx, dy) siljishni berilgan burchakka aylantiradi (90° qadamlar). */
export function rotateOffset(dx: number, dy: number, r: Rotation): [number, number] {
  switch (r) {
    case 90:
      return [-dy, dx];
    case 180:
      return [-dx, -dy];
    case 270:
      return [dy, -dx];
    default:
      return [dx, dy];
  }
}

/** Komponent terminalining taxtadagi (dunyo) koordinatasi. */
export function terminalPos(
  c: PlacedComponent,
  terminalId: string,
): { x: number; y: number } {
  const t = CATALOG[c.kind].terminals.find((t) => t.id === terminalId);
  if (!t) return { x: c.x, y: c.y };
  const [ox, oy] = rotateOffset(t.dx, t.dy, c.rotation);
  return { x: c.x + ox, y: c.y + oy };
}
