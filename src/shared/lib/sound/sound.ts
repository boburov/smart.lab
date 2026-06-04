/**
 * Lab sound effects. Most are generated on the fly with a tiny Web Audio
 * synthesizer (no asset files); the gas pour uses a real recorded clip. The
 * AudioContext is created lazily on the first call (inside a user gesture, so
 * autoplay rules are met).
 */
import gasSoundUrl from "./gas_sound.mp3";
import explosionUrl from "./big_explosion.mp3";

export type SoundName =
  | "boom"
  | "fire"
  | "smoke"
  | "fizz"
  | "chime"
  | "pour_liquid"
  | "pour_solid"
  | "pour_gas"
  | "neutral";

let ctx: AudioContext | null = null;

function audio(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

function noiseBuffer(ac: AudioContext, seconds: number): AudioBuffer {
  const len = Math.max(1, Math.floor(ac.sampleRate * seconds));
  const buffer = ac.createBuffer(1, len, ac.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
  return buffer;
}

interface ToneOpts {
  freq: number;
  type?: OscillatorType;
  dur?: number;
  peak?: number;
  sweepTo?: number;
  at?: number;
}

function tone(ac: AudioContext, o: ToneOpts): void {
  const t0 = ac.currentTime + (o.at ?? 0);
  const dur = o.dur ?? 0.3;
  const osc = ac.createOscillator();
  osc.type = o.type ?? "sine";
  osc.frequency.setValueAtTime(o.freq, t0);
  if (o.sweepTo) osc.frequency.exponentialRampToValueAtTime(Math.max(1, o.sweepTo), t0 + dur);
  const gain = ac.createGain();
  gain.gain.setValueAtTime(0.0001, t0);
  gain.gain.exponentialRampToValueAtTime(o.peak ?? 0.2, t0 + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  osc.connect(gain).connect(ac.destination);
  osc.start(t0);
  osc.stop(t0 + dur + 0.03);
}

interface NoiseOpts {
  dur?: number;
  filter?: BiquadFilterType;
  freq?: number;
  q?: number;
  peak?: number;
  sweepTo?: number;
  at?: number;
}

function noise(ac: AudioContext, o: NoiseOpts): void {
  const t0 = ac.currentTime + (o.at ?? 0);
  const dur = o.dur ?? 0.3;
  const src = ac.createBufferSource();
  src.buffer = noiseBuffer(ac, dur);
  const filter = ac.createBiquadFilter();
  filter.type = o.filter ?? "lowpass";
  filter.frequency.setValueAtTime(o.freq ?? 1000, t0);
  if (o.sweepTo) filter.frequency.exponentialRampToValueAtTime(Math.max(1, o.sweepTo), t0 + dur);
  filter.Q.value = o.q ?? 1;
  const gain = ac.createGain();
  gain.gain.setValueAtTime(0.0001, t0);
  gain.gain.exponentialRampToValueAtTime(o.peak ?? 0.2, t0 + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  src.connect(filter).connect(gain).connect(ac.destination);
  src.start(t0);
  src.stop(t0 + dur + 0.03);
}

/**
 * Water being poured: a soft gurgling flow plus a scatter of bubble "blips"
 * (short sines that quickly rise in pitch) at varied times.
 */
function waterPour(ac: AudioContext): void {
  noise(ac, { dur: 0.6, filter: "bandpass", freq: 680, q: 1.4, peak: 0.11, sweepTo: 460 });
  for (let i = 0; i < 7; i++) {
    const at = 0.02 + Math.random() * 0.5;
    const f = 360 + Math.random() * 460;
    tone(ac, { freq: f, type: "sine", dur: 0.05 + Math.random() * 0.04, peak: 0.07, sweepTo: f * 1.7, at });
  }
}

/** Stones/solids tumbling in: several short percussive clacks at varied pitches. */
function stonesDrop(ac: AudioContext): void {
  for (let i = 0; i < 6; i++) {
    const at = i * 0.075 + Math.random() * 0.045;
    const f = 85 + Math.random() * 130;
    tone(ac, { freq: f, type: "triangle", dur: 0.11, peak: 0.24, sweepTo: f * 0.5, at });
    noise(ac, { dur: 0.06, filter: "lowpass", freq: 520 + Math.random() * 420, peak: 0.16, at });
  }
}

/**
 * Play a recorded audio file (a fresh element each call, so plays can overlap).
 * `skipSec` drops that many seconds from the start — playback begins after it
 * and runs to the end of the clip.
 */
function playFile(url: string, volume = 0.7, skipSec = 0): void {
  if (typeof Audio === "undefined") return;
  try {
    const el = new Audio(url);
    el.volume = volume;
    const start = () => {
      if (skipSec > 0 && Math.abs(el.currentTime - skipSec) > 0.05) {
        try {
          el.currentTime = skipSec;
        } catch {
          /* seeking not ready */
        }
      }
      void el.play().catch(() => {});
    };
    if (skipSec <= 0 || el.readyState >= 1) start();
    else el.addEventListener("loadedmetadata", start, { once: true });
  } catch {
    /* ignore playback errors */
  }
}

/** Play one of the named sound effects. No-op if audio is unavailable. */
export function playSound(name: SoundName): void {
  // Gas pour and explosion clips skip their slow intro and play the rest.
  if (name === "pour_gas") {
    playFile(gasSoundUrl, 0.7, 0.4);
    return;
  }
  if (name === "boom") {
    playFile(explosionUrl, 0.8, 1.0);
    return;
  }
  const ac = audio();
  if (!ac) return;
  switch (name) {
    case "fire":
      noise(ac, { dur: 0.55, filter: "bandpass", freq: 760, q: 0.7, peak: 0.2, sweepTo: 420 });
      break;
    case "smoke":
      noise(ac, { dur: 0.6, filter: "lowpass", freq: 480, peak: 0.13, sweepTo: 1300 });
      break;
    case "fizz":
      noise(ac, { dur: 0.55, filter: "highpass", freq: 2000, q: 0.6, peak: 0.16 });
      break;
    case "chime":
      tone(ac, { freq: 660, dur: 0.3, peak: 0.16 });
      tone(ac, { freq: 990, dur: 0.4, peak: 0.1, at: 0.04 });
      break;
    case "pour_liquid":
      waterPour(ac);
      break;
    case "pour_solid":
      stonesDrop(ac);
      break;
    case "neutral":
      tone(ac, { freq: 520, dur: 0.12, peak: 0.1 });
      break;
  }
}
