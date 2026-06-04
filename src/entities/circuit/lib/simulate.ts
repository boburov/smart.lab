import type { Circuit } from "../model/types";
import { CATALOG } from "../model/catalog";

/** LED holati: o'chiq, yonuvchi yoki teskari ulangan. */
export type LedState = "off" | "on" | "reverse";

export interface SimResult {
  /** Zanjir yopiqmi (batareyadan to'liq halqa bormi). */
  isClosed: boolean;
  /** Qisqa tutashuv (yopiq zanjirda hech qanday qarshilik yo'q). */
  isShort: boolean;
  /** Tok o'tayotgan komponentlar id'lari. */
  energizedComponents: Set<string>;
  /** Tok o'tayotgan netlar (sim ranglash uchun). */
  energizedNets: Set<string>;
  /** Har bir LED holati. */
  ledStates: Map<string, LedState>;
  /** Terminal -> net (xohlasa ranglash uchun). */
  netOf: Map<string, string>;
}

class UnionFind {
  private parent = new Map<string, string>();
  find(x: string): string {
    const p = this.parent.get(x);
    if (p === undefined) {
      this.parent.set(x, x);
      return x;
    }
    if (p !== x) {
      const r = this.find(p);
      this.parent.set(x, r);
      return r;
    }
    return x;
  }
  union(a: string, b: string): void {
    const ra = this.find(a);
    const rb = this.find(b);
    if (ra !== rb) this.parent.set(ra, rb);
  }
}

const termKey = (componentId: string, terminalId: string) => `${componentId}:${terminalId}`;

interface SimEdge {
  id: string;
  u: string;
  v: string;
  compId: string;
  kind: string;
}

/**
 * Sxemani topologik ravishda yechadi.
 *
 * Yondashuv: simlar bir net'ga birlashtiriladi (union-find). Tok o'tkazuvchi
 * komponentlar (rezistor, LED, lampa, zummer, yopiq kalit) va batareya netlar
 * orasidagi qirralarga aylanadi. Batareya qirrasi "ko'prik" bo'lmasa — zanjir
 * yopiq. Batareya bilan bitta sikldagi (2-edge-connected) qirralardan tok o'tadi.
 */
export function simulateCircuit(circuit: Circuit): SimResult {
  const { components, wires } = circuit;
  const uf = new UnionFind();

  for (const c of components)
    for (const t of CATALOG[c.kind].terminals) uf.find(termKey(c.id, t.id));
  for (const w of wires)
    uf.union(
      termKey(w.from.componentId, w.from.terminalId),
      termKey(w.to.componentId, w.to.terminalId),
    );

  const netOf = new Map<string, string>();
  for (const c of components)
    for (const t of CATALOG[c.kind].terminals) {
      const k = termKey(c.id, t.id);
      netOf.set(k, uf.find(k));
    }

  const empty: SimResult = {
    isClosed: false,
    isShort: false,
    energizedComponents: new Set(),
    energizedNets: new Set(),
    ledStates: new Map(),
    netOf,
  };

  const battery = components.find((c) => c.kind === "battery");
  if (!battery) return empty;
  const plusNet = netOf.get(termKey(battery.id, "+"));
  const minusNet = netOf.get(termKey(battery.id, "-"));
  if (!plusNet || !minusNet) return empty;

  // Tok o'tkazuvchi qirralar (batareya + boshqalar).
  const edges: SimEdge[] = [
    { id: "__battery", u: minusNet, v: plusNet, compId: battery.id, kind: "battery" },
  ];
  for (const c of components) {
    if (c.id === battery.id) continue;
    const conduct =
      c.kind === "resistor" ||
      c.kind === "led" ||
      c.kind === "lamp" ||
      c.kind === "buzzer"
        ? true
        : c.kind === "switch" || c.kind === "button"
          ? c.on
          : false;
    if (!conduct) continue;
    const terms = CATALOG[c.kind].terminals;
    if (terms.length < 2) continue;
    const u = netOf.get(termKey(c.id, terms[0]!.id))!;
    const v = netOf.get(termKey(c.id, terms[1]!.id))!;
    if (u === v) continue; // o'zaro tutashgan — qirra emas
    edges.push({ id: c.id, u, v, compId: c.id, kind: c.kind });
  }

  // Ko'p qirrali graf qo'shnilik ro'yxati.
  const adj = new Map<string, { to: string; eid: string }[]>();
  const nodes = new Set<string>();
  for (const e of edges) {
    nodes.add(e.u);
    nodes.add(e.v);
    (adj.get(e.u) ?? adj.set(e.u, []).get(e.u)!).push({ to: e.v, eid: e.id });
    (adj.get(e.v) ?? adj.set(e.v, []).get(e.v)!).push({ to: e.u, eid: e.id });
  }

  // Tarjan ko'prik (bridge) algoritmi — qirra id'si bo'yicha qaytishni rad etadi.
  const disc = new Map<string, number>();
  const low = new Map<string, number>();
  const bridges = new Set<string>();
  let timer = 0;
  const dfs = (u: string, parentEid: string | null): void => {
    disc.set(u, timer);
    low.set(u, timer);
    timer++;
    for (const { to, eid } of adj.get(u) ?? []) {
      if (eid === parentEid) continue;
      if (!disc.has(to)) {
        dfs(to, eid);
        low.set(u, Math.min(low.get(u)!, low.get(to)!));
        if (low.get(to)! > disc.get(u)!) bridges.add(eid);
      } else {
        low.set(u, Math.min(low.get(u)!, disc.get(to)!));
      }
    }
  };
  for (const n of nodes) if (!disc.has(n)) dfs(n, null);

  const isClosed = !bridges.has("__battery");
  if (!isClosed) return { ...empty, isClosed: false };

  // Ko'prik bo'lmagan qirralar bo'yicha 2-edge-connected komponentlar.
  const uf2 = new UnionFind();
  for (const n of nodes) uf2.find(n);
  for (const e of edges) if (!bridges.has(e.id)) uf2.union(e.u, e.v);
  const batteryRoot = uf2.find(plusNet);

  const energizedComponents = new Set<string>();
  const energizedNets = new Set<string>();
  let hasLimiter = false;
  // Tok o'tuvchi qirralardan iborat (batareyasiz) qo'shnilik — LED qutbi uchun.
  const liveAdj = new Map<string, string[]>();
  for (const e of edges) {
    if (bridges.has(e.id)) continue;
    if (uf2.find(e.u) !== batteryRoot) continue;
    energizedNets.add(e.u);
    energizedNets.add(e.v);
    if (e.kind === "battery") continue;
    energizedComponents.add(e.compId);
    if (
      e.kind === "resistor" ||
      e.kind === "led" ||
      e.kind === "lamp" ||
      e.kind === "buzzer"
    )
      hasLimiter = true;
    (liveAdj.get(e.u) ?? liveAdj.set(e.u, []).get(e.u)!).push(e.v);
    (liveAdj.get(e.v) ?? liveAdj.set(e.v, []).get(e.v)!).push(e.u);
  }

  // plusNet'dan masofa (BFS) — LED qutbini aniqlash uchun.
  const dist = new Map<string, number>([[plusNet, 0]]);
  const queue = [plusNet];
  while (queue.length) {
    const x = queue.shift()!;
    for (const y of liveAdj.get(x) ?? [])
      if (!dist.has(y)) {
        dist.set(y, dist.get(x)! + 1);
        queue.push(y);
      }
  }

  const ledStates = new Map<string, LedState>();
  for (const c of components) {
    if (c.kind !== "led") continue;
    if (!energizedComponents.has(c.id)) {
      ledStates.set(c.id, "off");
      continue;
    }
    const da = dist.get(netOf.get(termKey(c.id, "anode"))!);
    const dc = dist.get(netOf.get(termKey(c.id, "cathode"))!);
    if (da === undefined || dc === undefined) {
      ledStates.set(c.id, "on");
    } else {
      // Anod + ga yaqinroq bo'lsa — to'g'ri ulangan (yonadi).
      ledStates.set(c.id, da <= dc ? "on" : "reverse");
    }
  }

  return {
    isClosed,
    isShort: !hasLimiter,
    energizedComponents,
    energizedNets,
    ledStates,
    netOf,
  };
}
