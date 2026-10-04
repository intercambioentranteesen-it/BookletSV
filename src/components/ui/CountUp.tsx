"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useMotionValue, useReducedMotion } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";

const fmt = (n: number) => n.toLocaleString("en-US");

/** Cuenta de 0 al valor cuando entra en pantalla. Con reduced-motion muestra el valor final. */
export function CountUp({ to, duration = 1.1 }: { to: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const mv = useMotionValue(0);
  const [text, setText] = useState(fmt(to));

  useEffect(() => {
    if (!inView || reduce) {
      setText(fmt(to));
      return;
    }
    setText("0");
    const controls = animate(mv, to, { duration, ease: EASE_OUT });
    const off = mv.on("change", (v) => setText(fmt(Math.round(v))));
    return () => {
      controls.stop();
      off();
    };
  }, [inView, reduce, to, duration, mv]);

  return (
    <span ref={ref} className="tabular-nums">
      {text}
    </span>
  );
}
