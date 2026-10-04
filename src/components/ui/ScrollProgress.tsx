"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

/** Barra fina que avanza con la lectura: da la sensación de ir pasando páginas de un booklet. */
export function ScrollProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  if (reduce) return null;
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX, transformOrigin: "left center" }}
      className="fixed inset-x-0 top-0 z-[55] h-1 bg-terra"
    />
  );
}
