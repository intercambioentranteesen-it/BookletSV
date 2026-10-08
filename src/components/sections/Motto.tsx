"use client";

import { useEffect, useRef } from "react";
import {
  animate,
  cubicBezier,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type AnimationPlaybackControls,
  type MotionValue,
} from "framer-motion";
import { useLang } from "@/lib/i18n";
import type { MottoContent } from "@/types/content";
import { BRANCHES, CRACKS, HATCH, LEAVES, PEBBLES, PLATES, ROCK_OUTLINE, SPARKS, SPECKLES, STEMS } from "./motto-art";

/**
 * "Convirtiendo rocas en oro", en bucle. Un solo reloj (t, en segundos) recorre un ciclo completo y cada pieza
 * se anima en función de él, así todo queda sincronizado y el final coincide con el principio:
 *
 *   roca negra → el oro entra por las grietas → una ola dorada la convierte → brota el árbol → (pausa)
 *   → el árbol se recoge → la ola se retira → las grietas se cierran → vuelve la roca negra → …
 *
 * Colores planos, sin degradados. Corre sola; se detiene fuera de pantalla y, con "reducir movimiento", muestra el resultado final.
 */

const CYCLE = 10.4;
const FINAL_T = 6; // fotograma del resultado final (reduce-motion)
const OUT = cubicBezier(0.23, 1, 0.32, 1);

// Línea de tiempo del ciclo (segundos)
const T = {
  cracks: 0.9, // empiezan a dibujarse
  crackIn: 0.55,
  wave: [1.9, 3.0] as const,
  trunk: [2.8, 3.4] as const,
  sparks: 4.2,
  hold: 7.2, // empieza el retroceso
  waveOut: [7.9, 8.8] as const,
  crackOut: [8.6, 9.2] as const,
};
const LEAF_MIN = Math.min(...LEAVES.map((l) => l[5]));
const LEAF_MAX = Math.max(...LEAVES.map((l) => l[5]));

const PALETTE = {
  black: { base: "#1A1A1A", hatch: "#0A0A0A", crack: "#0B0B0B", edge: "#0A0A0A" },
  gold: { base: "#B8901F", hatch: "#7A5A10", crack: "#7A5A10", edge: "#7A5A10" },
} as const;
type Pal = keyof typeof PALETTE;

const LEAF = "M0 0 C7 -11 7 -26 0 -36 C-7 -26 -7 -11 0 0 Z";
const SPARKLE = "M0 -15 Q2 -2 15 0 Q2 2 0 15 Q-2 2 -15 0 Q-2 -2 0 -15 Z";
const baseStyle = { transformBox: "fill-box", transformOrigin: "50% 100%" } as const;
const boxStyle = { transformBox: "fill-box", transformOrigin: "center" } as const;

/** Valor que sube de 0 a 1 entre `a` y `b`, se mantiene y vuelve a 0 entre `c` y `d`. */
function useWindow(t: MotionValue<number>, a: number, b: number, c: number, d: number, peak = 1) {
  return useTransform(t, [0, a, b, c, d, CYCLE], [0, 0, peak, peak, 0, 0], { ease: OUT });
}

/** El peñasco, con la paleta de roca o la de oro (misma geometría). */
function RockLayer({ pal }: { pal: Pal }) {
  const p = PALETTE[pal];
  return (
    <>
      <path d={ROCK_OUTLINE} fill={p.base} />
      <g clipPath="url(#motto-rock)">
        {PLATES.map((s, i) => (
          <path key={`p${i}`} d={s.d} fill={s[pal]} />
        ))}
        {SPECKLES.map((s, i) => (
          <path key={`s${i}`} d={s.d} fill={s[pal]} />
        ))}
        {HATCH.map((d, i) => (
          <path key={`h${i}`} d={d} fill="none" stroke={p.hatch} strokeWidth={1.8} strokeLinecap="round" opacity={0.85} />
        ))}
        {CRACKS.map((d, i) => (
          <path key={`c${i}`} d={d} fill="none" stroke={p.crack} strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" />
        ))}
      </g>
      <path d={ROCK_OUTLINE} fill="none" stroke={p.edge} strokeWidth={3} strokeLinejoin="round" />
      {PEBBLES.map((s, i) => (
        <path key={`b${i}`} d={s.d} fill={s[pal]} stroke={p.edge} strokeWidth={2} strokeLinejoin="round" />
      ))}
    </>
  );
}

/** Trazo que se dibuja y se borra (grietas, tronco, ramas). */
function Stroke({ t, d, width, color, a, b, c, e }: { t: MotionValue<number>; d: string; width: number; color: string; a: number; b: number; c: number; e: number }) {
  const length = useWindow(t, a, b, c, e);
  const opacity = useTransform(length, (v) => (v > 0.002 ? 1 : 0)); // evita el punto del trazo de longitud 0
  return <motion.path d={d} fill="none" stroke={color} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" style={{ pathLength: length, opacity }} />;
}

function Leaf({ t, leaf }: { t: MotionValue<number>; leaf: (typeof LEAVES)[number] }) {
  const [x, y, rot, s, color, d] = leaf;
  const u = (d - LEAF_MIN) / (LEAF_MAX - LEAF_MIN || 1); // 0 = primera en nacer, 1 = última
  const a = d + 0.1;
  const out = T.hold + (1 - u) * 0.4; // se recogen en orden inverso al que nacieron
  const scale = useWindow(t, a, a + 0.4, out, out + 0.35);
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      <motion.path d={LEAF} fill={color} style={{ scale, ...baseStyle }} />
    </g>
  );
}

function Spark({ t, x, y, d }: { t: MotionValue<number>; x: number; y: number; d: number }) {
  const a = T.sparks + d;
  const scale = useTransform(t, [0, a, a + 0.35, a + 0.7, T.hold, T.hold + 0.4, CYCLE], [0, 0, 1.25, 1, 1, 0, 0], { ease: OUT });
  return (
    <g transform={`translate(${x} ${y})`}>
      <motion.path d={SPARKLE} fill="#F2D675" style={{ scale, ...boxStyle }} />
    </g>
  );
}

function Scene({ t }: { t: MotionValue<number> }) {
  const radius = useTransform(t, [0, T.wave[0], T.wave[1], T.waveOut[0], T.waveOut[1], CYCLE], [0, 0, 235, 235, 0, 0], { ease: OUT });
  return (
    <>
      <defs>
        <clipPath id="motto-rock">
          <path d={ROCK_OUTLINE} />
        </clipPath>
        {/* La ola dorada: un círculo que crece desde el centro de la roca (y se retira al final) */}
        <clipPath id="motto-wave">
          <motion.circle cx={282} cy={300} r={radius} />
        </clipPath>
      </defs>

      {/* El país: un volcán y la tierra */}
      <path d="M20 408 L212 158 L244 176 L276 154 L308 176 L340 158 L540 408 Z" fill="#353535" />
      <ellipse cx="280" cy="404" rx="262" ry="30" fill="#242424" />
      <ellipse cx="282" cy="396" rx="130" ry="8" fill="#1B1B1B" />

      {/* La roca volcánica */}
      <RockLayer pal="black" />

      {/* El oro entra por las grietas (kintsugi) */}
      <g clipPath="url(#motto-rock)">
        {CRACKS.map((d, i) => (
          <Stroke key={i} t={t} d={d} width={3.6} color="#F2D675" a={T.cracks + i * 0.12} b={T.cracks + i * 0.12 + T.crackIn} c={T.crackOut[0]} e={T.crackOut[1]} />
        ))}
      </g>

      {/* La ola dorada convierte la piedra */}
      <g clipPath="url(#motto-wave)">
        <RockLayer pal="gold" />
        <g clipPath="url(#motto-rock)">
          {CRACKS.map((d, i) => (
            <path key={i} d={d} fill="none" stroke="#F2D675" strokeWidth={3.6} strokeLinecap="round" strokeLinejoin="round" />
          ))}
        </g>
      </g>

      {/* El árbol de Alchemist, de oro: tronco, ramas y hojas que nacen sobre cada rama */}
      {STEMS.map((d, i) => (
        <Stroke key={i} t={t} d={d} width={11} color="#D4AF37" a={T.trunk[0]} b={T.trunk[1]} c={T.hold + 0.7} e={T.hold + 1.1} />
      ))}
      {BRANCHES.map((br, i) => (
        <Stroke key={i} t={t} d={br.d} width={3.6} color="#D4AF37" a={br.delay + 0.1} b={br.delay + 0.65} c={T.hold + 0.4} e={T.hold + 0.8} />
      ))}
      {LEAVES.map((l, i) => (
        <Leaf key={i} t={t} leaf={l} />
      ))}

      {/* Destellos */}
      {SPARKS.map((s, i) => (
        <Spark key={i} t={t} x={s.x} y={s.y} d={s.d} />
      ))}
    </>
  );
}

export function Motto({ motto }: { motto: MottoContent }) {
  const { t: tr } = useLang();
  const reduce = useReducedMotion();
  const clock = useMotionValue(0);
  const svgRef = useRef<SVGSVGElement>(null);
  const inView = useInView(svgRef, { amount: 0.35 });
  const controls = useRef<AnimationPlaybackControls | null>(null);

  // Un solo reloj en bucle; con "reducir movimiento" se fija en el resultado final
  useEffect(() => {
    if (reduce) {
      clock.set(FINAL_T);
      return;
    }
    clock.set(0);
    const c = animate(clock, CYCLE, { duration: CYCLE, ease: "linear", repeat: Infinity, repeatType: "loop" });
    controls.current = c;
    c.pause();
    return () => {
      c.stop();
      controls.current = null;
    };
  }, [reduce, clock]);

  // Solo corre mientras se ve en pantalla (fuera de ella se detiene)
  useEffect(() => {
    const c = controls.current;
    if (!c) return;
    if (inView) c.play();
    else c.pause();
  }, [inView, reduce]);

  return (
    <section aria-labelledby="motto-title" className="overflow-hidden bg-ink text-parchment">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 pb-8 pt-16 md:pb-10 md:pt-24 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <h2 id="motto-title" className="text-4xl font-extrabold leading-[1.1] md:text-6xl">
            {tr(motto.title)}
          </h2>
          <p className="mt-5 max-w-md text-xl leading-relaxed text-parchment/90">{tr(motto.body)}</p>
          <p className="mt-4 text-sm text-parchment/75">{tr(motto.note)}</p>
        </div>

        <svg ref={svgRef} aria-hidden="true" viewBox="0 0 560 440" className="mx-auto h-auto w-full max-w-xl">
          <Scene t={clock} />
        </svg>
      </div>
    </section>
  );
}
