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
import { CRACKS, HATCH, PEBBLES, PLATES, ROCK_OUTLINE, SPARKS, SPECKLES } from "./motto-art";
import { OAK_CROWN_BASE, OAK_CROWN_STRIPES, OAK_LEAVES, OAK_PATTERNS, OAK_WOOD } from "./team/oak-logo";

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
  trunk: [2.7, 3.8] as const, // el tronco y las ramas del logo se revelan de abajo hacia arriba
  sparks: 4.2,
  hold: 7.2, // empieza el retroceso
  waveOut: [7.9, 8.8] as const,
  crackOut: [8.6, 9.2] as const,
};

/**
 * El roble es el del logo del comité (mismas hojas, tronco y ramas), en oro. Se coloca sobre la roca: el punto
 * (512, 624) del logo (donde nace el tronco, justo antes de las manos) queda en (292, 216) de esta escena.
 */
const OAK = { s: 0.34, x: 292 - 512 * 0.34, y: 216 - 624 * 0.34 };
const OAK_TONES = ["#FFE48A", "#F4CC4C", "#E2AA2C", "#C98E1A"]; // de luz (arriba-izquierda) a sombra (abajo-derecha)
const OAK_WOOD_COLOR = "#C98E1A";
const OAK_WOOD_SHADE = "#8E5E0C";
// Los patrones del logo se renombran para no chocar con los del árbol del organigrama (los ids son globales en la página)
const OAK_PATTERNS_GOLD = OAK_PATTERNS.replace(/_10_lpp_30_/g, "_motto_lpp_").replace(/#f4f3f0/g, "#FFF0B0");
const stripeFill = (pattern: string) => `url(#${pattern.replace("_10_lpp_30_", "_motto_lpp_")})`;

// Cada hoja: su color según dónde está en la copa y el momento en que brota (de abajo hacia arriba, como crece el árbol)
const TREE_LEAVES = OAK_LEAVES.map(([d, cx, cy]) => {
  const light = (((cx - 512) / 290) * 0.45 + ((cy - 300) / 170) * 0.75 + 1) / 2 + (((cx * 7 + cy * 13) % 10) / 10 - 0.5) * 0.14;
  return { d, fill: OAK_TONES[Math.max(0, Math.min(3, Math.floor(light * 4)))], delay: 3.1 + 0.9 * ((483 - cy) / 345) };
});
const LEAF_MIN = Math.min(...TREE_LEAVES.map((l) => l.delay));
const LEAF_MAX = Math.max(...TREE_LEAVES.map((l) => l.delay));
const CROWN_AT = 4.3;

const PALETTE = {
  black: { base: "#1A1A1A", hatch: "#0A0A0A", crack: "#0B0B0B", edge: "#0A0A0A" },
  gold: { base: "#A8730F", hatch: "#7A4F0B", crack: "#7A4F0B", edge: "#7A4F0B" },
} as const;
type Pal = keyof typeof PALETTE;

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

function OakLeaf({ t, leaf }: { t: MotionValue<number>; leaf: (typeof TREE_LEAVES)[number] }) {
  const u = (leaf.delay - LEAF_MIN) / (LEAF_MAX - LEAF_MIN || 1); // 0 = primera en nacer, 1 = última
  const a = leaf.delay + 0.1;
  const out = T.hold + (1 - u) * 0.4; // se recogen en orden inverso al que nacieron
  const scale = useWindow(t, a, a + 0.4, out, out + 0.35);
  return <motion.path d={leaf.d} fill={leaf.fill} style={{ scale, ...baseStyle }} />;
}

/** La corona de tres hojas rayadas del logo. */
function OakCrown({ t }: { t: MotionValue<number> }) {
  const scale = useWindow(t, CROWN_AT, CROWN_AT + 0.5, T.hold - 0.1, T.hold + 0.3);
  return (
    <motion.g style={{ scale, ...baseStyle }}>
      {OAK_CROWN_BASE.map((d, i) => (
        <path key={i} d={d} fill={OAK_WOOD_COLOR} />
      ))}
      {OAK_CROWN_STRIPES.map((c, i) => (
        <path key={i} d={c.d} fill={stripeFill(c.pattern)} />
      ))}
    </motion.g>
  );
}

/** Tronco y ramas del logo (una sola pieza): se revelan de abajo hacia arriba con un recorte que sube. Las manos del logo no se dibujan. */
function OakWood({ t }: { t: MotionValue<number> }) {
  const p = useWindow(t, T.trunk[0], T.trunk[1], T.hold + 0.7, T.hold + 1.1);
  // Solo se anima `height` (un atributo): el rectángulo está volteado, así que crece desde abajo (y = 640) hacia arriba
  const height = useTransform(p, (v) => 380 * v + 2);
  return (
    <>
      <defs>
        {/* Recorte fijo: deja el tronco y las ramas, y quita las manos del logo (que quedan por debajo de y = 588) */}
        <clipPath id="motto-oak-cut">
          <path d="M150 0 H874 V588 H578 V624 H440 V588 H150 Z" />
        </clipPath>
        <clipPath id="motto-oak-reveal">
          <motion.rect transform="translate(0 640) scale(1 -1)" x={150} y={0} width={724} height={height} />
        </clipPath>
      </defs>
      <g clipPath="url(#motto-oak-cut)">
        <g clipPath="url(#motto-oak-reveal)">
          <path transform="translate(3 3.5)" d={OAK_WOOD} fill={OAK_WOOD_SHADE} stroke={OAK_WOOD_SHADE} strokeWidth={7} strokeLinejoin="round" />
          <path d={OAK_WOOD} fill={OAK_WOOD_COLOR} stroke={OAK_WOOD_COLOR} strokeWidth={7} strokeLinejoin="round" />
        </g>
      </g>
    </>
  );
}

function Spark({ t, x, y, d }: { t: MotionValue<number>; x: number; y: number; d: number }) {
  const a = T.sparks + d;
  const scale = useTransform(t, [0, a, a + 0.35, a + 0.7, T.hold, T.hold + 0.4, CYCLE], [0, 0, 1.25, 1, 1, 0, 0], { ease: OUT });
  return (
    <g transform={`translate(${x} ${y})`}>
      <motion.path d={SPARKLE} fill="#FFE28A" style={{ scale, ...boxStyle }} />
    </g>
  );
}

function Scene({ t }: { t: MotionValue<number> }) {
  const radius = useTransform(t, [0, T.wave[0], T.wave[1], T.waveOut[0], T.waveOut[1], CYCLE], [0, 0, 235, 235, 0, 0], { ease: OUT });
  return (
    <>
      <defs dangerouslySetInnerHTML={{ __html: OAK_PATTERNS_GOLD }} />
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
          <Stroke key={i} t={t} d={d} width={3.6} color="#FFE28A" a={T.cracks + i * 0.12} b={T.cracks + i * 0.12 + T.crackIn} c={T.crackOut[0]} e={T.crackOut[1]} />
        ))}
      </g>

      {/* La ola dorada convierte la piedra */}
      <g clipPath="url(#motto-wave)">
        <RockLayer pal="gold" />
        <g clipPath="url(#motto-rock)">
          {CRACKS.map((d, i) => (
            <path key={i} d={d} fill="none" stroke="#FFE28A" strokeWidth={3.6} strokeLinecap="round" strokeLinejoin="round" />
          ))}
        </g>
      </g>

      {/* El roble del logo de Alchemist, de oro: tronco y ramas, sus hojas (de abajo hacia arriba) y la corona */}
      <g transform={`translate(${OAK.x} ${OAK.y}) scale(${OAK.s})`}>
        <OakWood t={t} />
        {TREE_LEAVES.map((l, i) => (
          <OakLeaf key={i} t={t} leaf={l} />
        ))}
        <OakCrown t={t} />
      </g>

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
          <p className="mt-4 text-caption text-parchment/75">{tr(motto.note)}</p>
        </div>

        <svg ref={svgRef} aria-hidden="true" viewBox="0 0 560 440" className="mx-auto h-auto w-full max-w-xl">
          <Scene t={clock} />
        </svg>
      </div>
    </section>
  );
}
