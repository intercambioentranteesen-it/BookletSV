"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { RotateCcw } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { EASE_OUT } from "@/lib/motion";
import type { MottoContent } from "@/types/content";
import { BRANCHES, CRACKS, HATCH, LEAVES, PEBBLES, PLATES, ROCK_OUTLINE, SPARKS, SPECKLES, STEMS } from "./motto-art";

/**
 * "Convirtiendo rocas en oro", literal: un peñasco volcánico negro se resquebraja, el oro entra por las
 * grietas (como un kintsugi), una ola dorada convierte toda la piedra y de ella brota el árbol de Alchemist.
 * Colores planos, sin degradados. Con "reducir movimiento" se muestra directamente el resultado final.
 */

const PALETTE = {
  black: { base: "#1A1A1A", hatch: "#0A0A0A", crack: "#0B0B0B", edge: "#0A0A0A" },
  gold: { base: "#B8901F", hatch: "#7A5A10", crack: "#7A5A10", edge: "#7A5A10" },
} as const;
type Pal = keyof typeof PALETTE;

// Línea de tiempo (segundos)
const T = { cracks: 0.55, wave: 1.5, trunk: 2.4, sparks: 3.7 };
const TREE_SHIFT = 0.3; // los retrasos de ramas y hojas vienen pensados para empezar un poco antes

const LEAF = "M0 0 C7 -11 7 -26 0 -36 C-7 -26 -7 -11 0 0 Z";
const SPARKLE = "M0 -15 Q2 -2 15 0 Q2 2 0 15 Q-2 2 -15 0 Q-2 -2 0 -15 Z";
const boxStyle = { transformBox: "fill-box", transformOrigin: "center" } as const;
const baseStyle = { transformBox: "fill-box", transformOrigin: "50% 100%" } as const;

const rockIn = {
  hidden: { opacity: 0, transform: "translateY(14px)" },
  visible: { opacity: 1, transform: "translateY(0px)", transition: { duration: 0.6, ease: EASE_OUT } },
};
const wave = {
  hidden: { r: 0 },
  visible: { r: 235, transition: { duration: 1.1, delay: T.wave, ease: EASE_OUT } },
};
const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (delay: number) => ({ pathLength: 1, opacity: 1, transition: { duration: 0.55, delay, ease: EASE_OUT } }),
};
const pop = {
  hidden: { opacity: 0, scale: 0 },
  visible: (delay: number) => ({ opacity: 1, scale: 1, transition: { duration: 0.4, delay, ease: EASE_OUT } }),
};
const spark = {
  hidden: { opacity: 0, scale: 0 },
  visible: (d: number) => ({ opacity: [0, 1, 0.85], scale: [0, 1.25, 1], transition: { duration: 0.7, delay: T.sparks + d, ease: EASE_OUT } }),
};

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

export function Motto({ motto }: { motto: MottoContent }) {
  const { t } = useLang();
  const reduce = useReducedMotion();
  const [run, setRun] = useState(0);
  const tree = (d: number) => Math.max(0, d - TREE_SHIFT);

  return (
    <section aria-labelledby="motto-title" className="overflow-hidden bg-ink text-parchment">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 pb-8 pt-16 md:pb-10 md:pt-24 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <h2 id="motto-title" className="text-4xl font-extrabold leading-[1.1] md:text-6xl">
            {t(motto.title)}
          </h2>
          <p className="mt-5 max-w-md text-xl leading-relaxed text-parchment/90">{t(motto.body)}</p>
          <p className="mt-4 text-sm text-parchment/75">{t(motto.note)}</p>
          {!reduce && (
            <button
              type="button"
              onClick={() => setRun((n) => n + 1)}
              className="mt-5 inline-flex min-h-11 items-center gap-2 font-semibold text-gold underline underline-offset-4 transition-colors duration-150 hover:text-gold-light"
            >
              <RotateCcw aria-hidden="true" className="h-4 w-4" />
              {t(motto.replay)}
            </button>
          )}
        </div>

        <motion.svg
          key={run}
          aria-hidden="true"
          viewBox="0 0 560 440"
          className="mx-auto h-auto w-full max-w-xl"
          initial={reduce ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.45 }}
        >
          <defs>
            <clipPath id="motto-rock">
              <path d={ROCK_OUTLINE} />
            </clipPath>
            {/* La ola dorada: un círculo que crece desde el centro de la roca */}
            <clipPath id="motto-wave">
              <motion.circle cx={282} cy={300} variants={wave} />
            </clipPath>
          </defs>

          {/* El país: un volcán y la tierra */}
          <path d="M20 408 L212 158 L244 176 L276 154 L308 176 L340 158 L540 408 Z" fill="#353535" />
          <ellipse cx="280" cy="404" rx="262" ry="30" fill="#242424" />
          <ellipse cx="282" cy="396" rx="130" ry="8" fill="#1B1B1B" />

          {/* La roca volcánica */}
          <motion.g variants={rockIn}>
            <RockLayer pal="black" />
          </motion.g>

          {/* El oro entra por las grietas (kintsugi) */}
          <g clipPath="url(#motto-rock)">
            {CRACKS.map((d, i) => (
              <motion.path
                key={i}
                d={d}
                custom={T.cracks + i * 0.12}
                variants={draw}
                fill="none"
                stroke="#F2D675"
                strokeWidth={3.6}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
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
            <motion.path key={i} d={d} custom={T.trunk} variants={draw} fill="none" stroke="#D4AF37" strokeWidth={11} strokeLinecap="round" />
          ))}
          {BRANCHES.map((b, i) => (
            <motion.path key={i} d={b.d} custom={tree(b.delay)} variants={draw} fill="none" stroke="#D4AF37" strokeWidth={3.6} strokeLinecap="round" />
          ))}
          {LEAVES.map(([x, y, rot, s, c, d], i) => (
            <g key={i} transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
              <motion.path d={LEAF} fill={c} custom={tree(d)} variants={pop} style={baseStyle} />
            </g>
          ))}

          {/* Destellos */}
          {SPARKS.map((s, i) => (
            <g key={i} transform={`translate(${s.x} ${s.y})`}>
              <motion.path d={SPARKLE} fill="#F2D675" custom={s.d} variants={spark} style={boxStyle} />
            </g>
          ))}
        </motion.svg>
      </div>
    </section>
  );
}
