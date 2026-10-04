"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useMotionValue, useReducedMotion } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";

interface CountUpProps {
  to: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
}

function format(n: number, decimals: number, prefix: string): string {
  return prefix + n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

/** Cuenta de 0 al valor cuando entra en pantalla. Con reduced-motion muestra el valor final. */
export function CountUp({ to, duration = 1.1, decimals = 0, prefix = "" }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const mv = useMotionValue(0);
  const [text, setText] = useState(format(to, decimals, prefix));

  useEffect(() => {
    if (!inView || reduce) {
      setText(format(to, decimals, prefix));
      return;
    }
    setText(format(0, decimals, prefix));
    const controls = animate(mv, to, { duration, ease: EASE_OUT });
    const off = mv.on("change", (v) => setText(format(Number(v.toFixed(decimals)), decimals, prefix)));
    return () => {
      controls.stop();
      off();
    };
  }, [inView, reduce, to, duration, decimals, prefix, mv]);

  return (
    <span ref={ref} className="tabular-nums">
      {text}
    </span>
  );
}
