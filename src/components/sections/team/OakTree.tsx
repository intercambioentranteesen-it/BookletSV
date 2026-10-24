"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";
import { useLang } from "@/lib/i18n";
import { EASE_OUT } from "@/lib/motion";
import type { TeamContent } from "@/types/content";
import { VB, type OakLayout } from "./layout";
import { OAK_CROWN_BASE, OAK_CROWN_STRIPES, OAK_PATTERNS, OAK_WOOD } from "./oak-logo";

const TERRA = "#C3522C";
const TERRA_ON = "#A4431F";
const COPPER = "#D98850";

// El tronco y las ramas se revelan de abajo hacia arriba (como crecer)
const reveal = {
  hidden: { y: VB.y + VB.h, height: 0 },
  visible: { y: VB.y, height: VB.h, transition: { duration: 1.5, delay: 0.15, ease: EASE_OUT } },
};
const pop = {
  hidden: { opacity: 0, scale: 0.2 },
  visible: (delay: number) => ({ opacity: 1, scale: 1, transition: { duration: 0.45, delay, ease: EASE_OUT } }),
};
const pill = {
  hidden: { opacity: 0, scale: 0.6 },
  visible: (delay: number) => ({ opacity: 1, scale: 1, transition: { duration: 0.4, delay, ease: EASE_OUT } }),
};
const px = (v: number) => `${((v - VB.x) / VB.w) * 100}%`;
const py = (v: number) => `${((v - VB.y) / VB.h) * 100}%`;
const leafStyle = { transformBox: "fill-box", transformOrigin: "50% 100%" } as const;

interface OakTreeProps {
  team: TeamContent;
  layout: OakLayout;
  /** "lcp", el id de un área, o null. */
  selected: string | null;
  onSelect: (id: string) => void;
}

/**
 * El árbol del logo de Alchemist ESEN, tal cual (sus hojas, sus ramas y su corona), como organigrama: el tronco es la presidencia
 * y la copa se reparte en una parte por área. Al elegir un área se resalta su parte de la copa y las demás se apagan.
 * El dibujo es decorativo (aria-hidden); los botones de los rótulos son los controles reales.
 */
export function OakTree({ team, layout, selected, onSelect }: OakTreeProps) {
  const { t } = useLang();
  const reduce = useReducedMotion();
  const [hover, setHover] = useState<string | null>(null);

  const active = hover ?? (selected && selected !== "lcp" ? selected : null);
  const activeBand = active ? team.areas.findIndex((a) => a.id === active) : -1;

  return (
    <motion.div
      initial={reduce ? "visible" : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="relative mx-auto [container-type:inline-size]"
      // Nunca más alto que la pantalla (menos la barra superior): el árbol completo se ve de un vistazo
      style={{ aspectRatio: `${VB.w} / ${VB.h}`, width: `min(100%, 36rem, calc((100svh - 9rem) * ${VB.w} / ${VB.h}))` }}
    >
      <svg viewBox={`${VB.x} ${VB.y} ${VB.w} ${VB.h}`} aria-hidden="true" className="absolute inset-0 h-full w-full">
        <defs dangerouslySetInnerHTML={{ __html: OAK_PATTERNS }} />
        <clipPath id="oak-reveal">
          <motion.rect x={VB.x} width={VB.w} variants={reveal} />
        </clipPath>

        <g className={cn(!reduce && "oak-sway")} style={{ transformOrigin: "512px 640px" }}>
          {/* Manos, troncos y ramas: una sola pieza en el logo */}
          <g clipPath="url(#oak-reveal)">
            <path d={OAK_WOOD} fill={COPPER} />
          </g>

          {/* La copa: una parte por área */}
          {team.areas.map((area, b) => {
            const on = activeBand === b;
            const dim = activeBand >= 0 && !on;
            return (
              <g
                key={area.id}
                className={cn("cursor-pointer transition-opacity duration-300", on && !reduce && "oak-breathe")}
                style={{ opacity: dim ? 0.2 : 1 }}
                onClick={() => onSelect(area.id)}
                onPointerEnter={() => setHover(area.id)}
                onPointerLeave={() => setHover(null)}
              >
                {/* zona de clic: el contorno de la copa de esta área */}
                <path d={layout.hulls[b]} fill="rgba(0,0,0,0)" stroke="rgba(0,0,0,0)" strokeWidth={36} strokeLinejoin="round" pointerEvents="all" />
                {layout.leaves
                  .filter((lf) => lf.band === b)
                  .map((lf, i) => (
                    <motion.path key={i} d={lf.d} variants={pop} custom={lf.delay} fill={on ? TERRA_ON : TERRA} style={leafStyle} className="transition-[fill] duration-300" />
                  ))}
              </g>
            );
          })}

          {/* La corona de tres hojas rayadas */}
          <motion.g variants={pop} custom={2.3} style={leafStyle}>
            {OAK_CROWN_BASE.map((d, i) => (
              <path key={i} d={d} fill={TERRA} />
            ))}
            {OAK_CROWN_STRIPES.map((c, i) => (
              <path key={i} d={c.d} fill={`url(#${c.pattern})`} />
            ))}
          </motion.g>
        </g>
      </svg>

      {/* Rótulos: la presidencia en el tronco y un botón por área */}
      <div className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: px(layout.lcp.x), top: py(layout.lcp.y) }}>
        <motion.button
          type="button"
          variants={pill}
          custom={1.4}
          aria-pressed={selected === "lcp"}
          aria-controls="team-panel"
          onClick={() => onSelect("lcp")}
          className={cn(
            "min-h-11 min-w-11 rounded-full border-2 px-4 text-[clamp(12px,2.3cqw,17px)] font-extrabold shadow-md transition-[transform,background-color,color] duration-150 ease-out-strong hover:-translate-y-0.5 active:scale-95",
            selected === "lcp" ? "border-ink bg-ink text-parchment" : "border-ink bg-parchment text-ink hover:bg-white",
          )}
        >
          {team.lcp ? t(team.lcp.role) : "LCP"}
        </motion.button>
      </div>

      {layout.labels.map((lb) => {
        const area = team.areas.find((a) => a.id === lb.areaId);
        if (!area) return null;
        const on = selected === lb.areaId;
        return (
          <div key={lb.areaId} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: px(lb.x), top: py(lb.y) }}>
            <motion.button
              type="button"
              variants={pill}
              custom={lb.delay}
              aria-pressed={on}
              aria-controls="team-panel"
              onClick={() => onSelect(lb.areaId)}
              onMouseEnter={() => setHover(lb.areaId)}
              onMouseLeave={() => setHover(null)}
              onFocus={() => setHover(lb.areaId)}
              onBlur={() => setHover(null)}
              whileTap={reduce ? undefined : { scale: 0.94 }}
              className={cn(
                "min-h-11 min-w-10 rounded-full border-2 px-2 text-[clamp(12px,2.3cqw,17px)] sm:min-w-12 sm:px-3.5 font-extrabold shadow-md transition-[transform,background-color,color] duration-150 ease-out-strong hover:-translate-y-0.5",
                on ? "border-ink bg-ink text-parchment" : "border-ink bg-parchment text-ink hover:bg-white",
              )}
            >
              {t(area.name)}
            </motion.button>
          </div>
        );
      })}
    </motion.div>
  );
}
