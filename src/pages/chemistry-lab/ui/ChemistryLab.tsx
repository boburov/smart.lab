import { useEffect, useState } from "react";
import { useBench } from "../../../features/lab-bench";
import { formatFormula, moleculeNameUz } from "../../../entities/molecule";
import type { ReactionEffect, ReactionKind } from "../../../entities/reaction";
import { playSound } from "../../../shared/lib/sound";
import { BrandMark } from "../../../shared/ui/brand-mark";
import { LabScene } from "./LabScene";
import { Chest } from "./Chest";
import { Toolbar } from "./Toolbar";
import { Journal } from "./Journal";

/** Banner colour scheme per reaction kind. */
const REACTION_STYLES: Record<ReactionKind, string> = {
  explosion: "border-orange-300 bg-orange-50/95 text-orange-700",
  flash: "border-blue-300 bg-blue-50/95 text-blue-700",
  smoke: "border-slate-300 bg-slate-100/95 text-slate-700",
  fizz: "border-cyan-300 bg-cyan-50/95 text-cyan-700",
};

interface ChemistryLabProps {
  onNavigate: (to: string) => void;
}

/** A few starter reactions, shown as hints so the learner knows where to begin. */
const HINTS = ["2 Vodorod + Kislorod = Suv", "Natriy + Xlor = Osh tuzi", "Uglerod + 2 Kislorod = CO₂"];

/**
 * The 3D chemistry laboratory: a glass vessel on a bench, a corner chest of
 * substances (each in its true colour) and a bottom toolbar. Pour elements or
 * reagents into the vessel — colours blend, and when the mixture adds up to a
 * known molecule its name and 3D model appear.
 */
export function ChemistryLab({ onNavigate }: ChemistryLabProps) {
  const bench = useBench();

  // Pour sound, chosen by the substance's physical state.
  useEffect(() => {
    if (bench.pourSeq === 0) return;
    playSound(
      bench.pourState === "qattiq"
        ? "pour_solid"
        : bench.pourState === "gaz"
          ? "pour_gas"
          : "pour_liquid",
    );
  }, [bench.pourSeq]); // eslint-disable-line react-hooks/exhaustive-deps

  // Show the reaction headline + play its sound each time a new reaction fires.
  const [reactionFlash, setReactionFlash] = useState<ReactionEffect | null>(null);
  useEffect(() => {
    if (bench.reactionSeq > 0 && bench.reactionEffect) {
      setReactionFlash(bench.reactionEffect);
      playSound(bench.reactionEffect.sound);
      const id = setTimeout(() => setReactionFlash(null), 2800);
      return () => clearTimeout(id);
    }
  }, [bench.reactionSeq]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[var(--color-lab-bg)]">
      {/* 3D scene fills the whole screen */}
      <div className="absolute inset-0">
        <LabScene
          liquidColor={bench.liquidColor}
          fill={bench.fill}
          pourColor={bench.pourColor}
          pourSeq={bench.pourSeq}
          pourState={bench.pourState}
          reactionSeq={bench.reactionSeq}
          reactionKind={bench.reactionEffect?.kind ?? null}
        />
      </div>

      {/* Reaction headline (transient) */}
      {reactionFlash && (
        <div className="pointer-events-none absolute inset-x-0 top-20 z-30 flex justify-center">
          <div
            className={`flex items-center gap-3 rounded-2xl border px-5 py-3 shadow-lg backdrop-blur ${
              reactionFlash.kind
                ? REACTION_STYLES[reactionFlash.kind]
                : "border-slate-300 bg-white/95 text-slate-700"
            }`}
          >
            <span className="text-base font-bold">{reactionFlash.title}</span>
            <span className="text-sm opacity-90">{reactionFlash.detail}</span>
          </div>
        </div>
      )}

      {/* Slim top bar */}
      <div className="pointer-events-auto absolute inset-x-0 top-0 z-10 flex h-14 items-center gap-3 border-b border-[var(--color-lab-border)] bg-white/80 px-4 backdrop-blur">
        <button
          onClick={() => onNavigate("/lab/chemistry")}
          className="flex items-center gap-1.5 rounded-lg px-2 py-1 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
        >
          ← Orqaga
        </button>
        <span className="h-5 w-px bg-[var(--color-lab-border)]" />
        <BrandMark className="h-7 w-7" />
        <span className="text-sm font-semibold text-slate-900">
          Kimyo laboratoriyasi
        </span>

        <div className="ml-auto hidden items-center gap-2 sm:flex">
          {HINTS.map((h) => (
            <span
              key={h}
              className="rounded-full border border-blue-100 bg-blue-50/60 px-2.5 py-1 text-xs text-blue-700"
            >
              {h}
            </span>
          ))}
        </div>
      </div>

      {/* Product banner */}
      {bench.product && (
        <div className="pointer-events-none absolute inset-x-0 top-36 z-10 flex justify-center">
          <div className="flex items-center gap-3 rounded-2xl border border-blue-200 bg-white/95 px-5 py-3 shadow-lg shadow-blue-900/10 backdrop-blur">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 text-sm font-bold text-white">
              {formatFormula(bench.product.formula)}
            </span>
            <span>
              <span className="block text-sm font-semibold text-slate-900">
                {moleculeNameUz(bench.product)} hosil bo'ldi
              </span>
              <span className="block text-xs text-slate-500">
                {bench.product.molecularWeight} g/mol
              </span>
            </span>
          </div>
        </div>
      )}

      <Journal history={bench.history} />
      <Chest onPick={bench.add} />
      <Toolbar poured={bench.poured} onUndo={bench.undo} onClear={bench.clear} />
    </div>
  );
}
