import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { PhysicalState, Substance } from "../../../entities/substance";
import {
  findProduct,
  classifyReaction,
  effectForStatus,
  LAB_STATUSES,
} from "../../../entities/reaction";
import type { LabStatus, ReactionEffect } from "../../../entities/reaction";
import { moleculeNameUz } from "../../../entities/molecule";
import type { Molecule } from "../../../entities/molecule";
import { classifyLabStatus } from "../../../shared/api";
import { blendColors } from "../../../shared/lib/color";
import { addComposition, type Composition } from "../../../shared/lib/formula";

/** Pours before the vessel reads as "full" (just for the fill animation). */
const CAPACITY = 6;

/**
 * Representative liquid colours for a few recognised products, so a correct
 * reaction looks right (water reads clear-blue, not the pink you'd get from
 * literally averaging white hydrogen with red oxygen).
 */
const PRODUCT_COLORS: Record<string, string> = {
  Water: "#cfeefb",
  "Hydrogen Peroxide": "#e9f6ff",
  "Sodium Hydroxide": "#eef3f6",
  "Sodium Chloride": "#f1f5fb",
  "Sulfuric Acid": "#f6f1d6",
  Ammonia: "#eef7f0",
  Ozone: "#dbeeff",
  Oxygen: "#e6f2fb",
  Hydrogen: "#eef4fb",
  Nitrogen: "#eef1f6",
  "Carbon Dioxide": "#eef2f5",
};

/** One logged step in the lab journal (like a chess move list). */
export interface HistoryEntry {
  /** Step number (1-based). */
  index: number;
  /** Substance added at this step. */
  name: string;
  formula: string;
  color: string;
  /** Reaction headline that fired here, if any (e.g. "Portlash!"). */
  reaction: string | null;
  /** Product (Uzbek name) the mixture forms after this step, if any. */
  product: string | null;
}

export interface BenchState {
  /** Substances poured in, in order (last is most recent). */
  poured: Substance[];
  /** Step-by-step journal of pours, reactions and products. */
  history: HistoryEntry[];
  /** Combined element multiset of everything in the vessel. */
  composition: Composition;
  /** Current liquid colour (product colour when recognised, else a blend). */
  liquidColor: string;
  /** Target fill level 0–1 for the liquid animation. */
  fill: number;
  /** The molecule the mixture adds up to exactly, or null. */
  product: Molecule | null;
  /** Increments on every pour — the scene watches it to start the animation. */
  pourSeq: number;
  /** Colour of the most recently poured substance (drives the pour stream). */
  pourColor: string;
  /** Physical state of the most recently poured substance (gas/liquid/solid). */
  pourState: PhysicalState;
  /** Increments when a new reaction fires — drives the reaction effect. */
  reactionSeq: number;
  /** The reaction that just fired (explosion, flash, …), or null. */
  reactionEffect: ReactionEffect | null;
  /** Whether the burner under the vessel is on. */
  heating: boolean;
  /** Liquid temperature 0 (cool) … 1 (boiling). */
  temperature: number;
  /** True once more than the vessel can hold has been poured (it overflows). */
  overfilled: boolean;
  /** Pour one unit of a substance into the vessel. */
  add: (substance: Substance) => void;
  /** Turn the burner on/off. */
  toggleHeat: () => void;
  /** Remove the most recently poured substance. */
  undo: () => void;
  /** Empty the vessel. */
  clear: () => void;
}

/** Symbols of the elemental substances poured in (compounds don't count). */
function elementSymbols(list: Substance[]): Set<string> {
  return new Set(list.filter((s) => s.kind === "element").map((s) => s.formula));
}

/** A short Uzbek description of the vessel's contents, sent to Gemini. */
function describeSituation(list: Substance[], added: Substance): string {
  const counts = new Map<string, { name: string; n: number; state: string }>();
  for (const s of list) {
    const entry = counts.get(s.id) ?? { name: s.name, n: 0, state: s.state };
    entry.n += 1;
    counts.set(s.id, entry);
  }
  const items = [...counts.values()].map((e) => `${e.n}x ${e.name} (${e.state})`).join(", ");
  return `Idishda: ${items || "bo'sh"}. Hozir qo'shildi: ${added.name} (${added.state}).`;
}

/** Holds the live state of the laboratory vessel and the mixing/reaction logic. */
export function useBench(): BenchState {
  const [poured, setPoured] = useState<Substance[]>([]);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [pour, setPour] = useState<{ seq: number; color: string; state: PhysicalState }>({
    seq: 0,
    color: "#dfe9f2",
    state: "suyuq",
  });
  const [reaction, setReaction] = useState<{ seq: number; effect: ReactionEffect | null }>({
    seq: 0,
    effect: null,
  });
  const [heating, setHeating] = useState(false);
  const [temperature, setTemperature] = useState(0);
  // Guards so only the latest async resolution wins and reactions don't repeat.
  const reqRef = useRef(0);
  const lastStatusRef = useRef<LabStatus | null>(null);
  const heatingRef = useRef(false);

  const toggleHeat = useCallback(() => {
    setHeating((on) => {
      heatingRef.current = !on;
      return !on;
    });
  }, []);

  // Temperature eases toward boiling while the burner is on, and cools when off.
  useEffect(() => {
    const id = window.setInterval(() => {
      setTemperature((t) => {
        const target = heatingRef.current ? 1 : 0;
        const next = t + (target - t) * 0.05;
        return Math.abs(next - target) < 0.004 ? target : next;
      });
    }, 80);
    return () => window.clearInterval(id);
  }, []);

  const add = useCallback(
    (substance: Substance) => {
      const next = [...poured, substance];
      setPoured(next);
      setPour((prev) => ({ seq: prev.seq + 1, color: substance.color, state: substance.state }));

      // Resolve the resulting status: ask Gemini, fall back to the local rules.
      const reqId = ++reqRef.current;
      const localStatus = classifyReaction(elementSymbols(next));
      const situation = describeSituation(next, substance);

      // Log this step into the journal (reaction/product from the local rules).
      const comp: Composition = {};
      for (const s of next) addComposition(comp, s.composition);
      const stepProduct = findProduct(comp);
      const beforeStatus = classifyReaction(elementSymbols(poured));
      const newReaction =
        localStatus && localStatus !== beforeStatus && localStatus !== "neytral"
          ? effectForStatus(localStatus).title
          : null;
      setHistory((h) => [
        ...h,
        {
          index: next.length,
          name: substance.name,
          formula: substance.formula,
          color: substance.color,
          reaction: newReaction,
          product: stepProduct ? moleculeNameUz(stepProduct) : null,
        },
      ]);
      void (async () => {
        const remote = (await classifyLabStatus(situation, LAB_STATUSES)) as LabStatus | null;
        if (reqRef.current !== reqId) return; // a newer pour superseded this one
        const status = remote ?? localStatus;
        if (status && status !== "neytral" && status !== lastStatusRef.current) {
          lastStatusRef.current = status;
          setReaction((r) => ({ seq: r.seq + 1, effect: effectForStatus(status) }));
        }
      })();
    },
    [poured],
  );
  const undo = useCallback(() => {
    setPoured((prev) => prev.slice(0, -1));
    setHistory((h) => h.slice(0, -1));
  }, []);
  const clear = useCallback(() => {
    setPoured([]);
    setHistory([]);
    // Reset the pour seq to 0 so any in-progress entry animation is removed.
    setPour((prev) => ({ ...prev, seq: 0 }));
    lastStatusRef.current = null;
  }, []);

  const composition = useMemo(() => {
    const comp: Composition = {};
    for (const s of poured) addComposition(comp, s.composition);
    return comp;
  }, [poured]);

  const product = useMemo(() => findProduct(composition), [composition]);

  const liquidColor = useMemo(() => {
    if (poured.length === 0) return "#dfe9f2";
    if (product && PRODUCT_COLORS[product.name]) return PRODUCT_COLORS[product.name]!;
    return blendColors(poured.map((s) => ({ color: s.color, weight: 1 })));
  }, [poured, product]);

  const fill = Math.min(poured.length / CAPACITY, 1);
  const overfilled = poured.length > CAPACITY;

  return {
    poured,
    history,
    composition,
    liquidColor,
    fill,
    product,
    pourSeq: pour.seq,
    pourColor: pour.color,
    pourState: pour.state,
    reactionSeq: reaction.seq,
    reactionEffect: reaction.effect,
    heating,
    temperature,
    overfilled,
    add,
    toggleHeat,
    undo,
    clear,
  };
}
