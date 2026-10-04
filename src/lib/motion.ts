import type { Variants } from "framer-motion";

/** Ease-out fuerte para entradas (equivale a `ease-out-strong` en Tailwind). */
export const EASE_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1];

/** Entrada con fade + desplazamiento. Usa la cadena `transform` completa (acelerada por hardware). */
export const fadeUp = (distance = 24, duration = 0.6): Variants => ({
  hidden: { opacity: 0, transform: `translateY(${distance}px)` },
  visible: { opacity: 1, transform: "translateY(0px)", transition: { duration, ease: EASE_OUT } },
});

export const stagger = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren, delayChildren } },
});
