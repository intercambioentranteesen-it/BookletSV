"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ShapeGlyph } from "@/components/brand/Shapes";
import { cn } from "@/lib/cn";
import type { ShapeKind } from "@/types/content";

const KEYS: { shape?: ShapeKind; color: string; eq?: boolean }[] = [
  { shape: "triangle", color: "text-terra" },
  { shape: "circle", color: "text-copper" },
  { shape: "rect", color: "text-ink" },
  { shape: "quarter", color: "text-rust" },
  { shape: "circle", color: "text-clay" },
  { shape: "triangle", color: "text-copper" },
  { shape: "rect", color: "text-terra" },
  { shape: "quarter", color: "text-ink" },
  { shape: "triangle", color: "text-clay" },
  { shape: "circle", color: "text-rust" },
  { shape: "rect", color: "text-copper" },
  { color: "", eq: true },
];

const COIN_TONES = ["bg-copper text-ink", "bg-clay text-ink", "bg-terra text-white", "bg-parchment text-ink"];
const COIN_POS = ["left-[2%] top-[8%]", "right-[0%] top-[22%]", "left-[0%] bottom-[10%]", "right-[6%] bottom-[2%]"];

/**
 * Ilustración de la calculadora: un aparato con teclas de las formas de la marca y monedas que flotan alrededor
 * con los códigos de moneda disponibles. Decorativa. `display` es el texto de la pantalla (el total en dólares por defecto).
 */
export function CalculatorArt({ display, codes, active }: { display: string; codes: string[]; active: boolean }) {
  const reduce = useReducedMotion();
  return (
    <div aria-hidden="true" className="relative mx-auto h-[19rem] w-full max-w-sm">
      {/* La calculadora (se endereza cuando el botón está activo) */}
      <div className={cn("absolute left-1/2 top-1/2 w-[13rem] -translate-x-1/2 -translate-y-1/2 transition-transform duration-500 ease-out-strong", active ? "rotate-0" : "-rotate-[5deg]")}>
        <div className="rounded-[1.6rem] border-2 border-parchment bg-parchment p-3 shadow-[8px_8px_0_0_rgba(0,0,0,0.25)]">
          <div className="rounded-xl bg-ink px-3 py-3 text-right">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-parchment/60">USD</p>
            <p className="text-xl font-extrabold tabular-nums leading-tight text-copper">{display}</p>
          </div>
          <div className="mt-3 grid grid-cols-4 gap-2">
            {KEYS.map((k, i) => (
              <span
                key={i}
                className={cn(
                  "grid aspect-square place-items-center rounded-lg transition-transform duration-300 ease-out-strong",
                  k.eq ? "col-span-1 bg-terra text-lg font-extrabold text-white" : "bg-sand",
                  active && "[&:nth-child(3n)]:-translate-y-0.5",
                )}
              >
                {k.eq ? "=" : <ShapeGlyph kind={k.shape!} className={cn("h-4 w-4", k.color)} />}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Monedas flotando */}
      {codes.slice(0, 4).map((code, i) => (
        <motion.span
          key={code}
          className={cn("absolute grid h-[4.25rem] w-[4.25rem] place-items-center rounded-full text-sm font-extrabold shadow-[4px_4px_0_0_rgba(0,0,0,0.25)] ring-2 ring-ink/30", COIN_TONES[i % COIN_TONES.length], COIN_POS[i])}
          animate={reduce ? undefined : { y: [0, -9, 0] }}
          transition={{ duration: 3.2 + i * 0.6, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
        >
          {code}
        </motion.span>
      ))}
    </div>
  );
}
