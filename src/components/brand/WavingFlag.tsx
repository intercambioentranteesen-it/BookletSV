"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";
import { useLang } from "@/lib/i18n";
import type { L } from "@/types/content";

const ALT: L = { en: "Flag of El Salvador", es: "Bandera de El Salvador" };
const SRC = "/brand/bandera-sv-hd.png";
const RATIO = 542 / 960; // proporción de la bandera (la oficial es 189:335)
const CYCLES = 1.2; // ondas a lo largo de la bandera
const PERIOD = 3.8; // segundos por ciclo: lento y suave
const STILL_T = 1.1; // fotograma fijo para "reducir movimiento"

interface WavingFlagProps {
  /** Ancho de la bandera en px (el alto sale de la proporción oficial). */
  width: number;
  /** Con mástil dorado y asta a la izquierda. */
  mast?: boolean;
  /** true si ya hay un texto al lado que dice lo mismo. */
  decorative?: boolean;
  /** Altura de la onda, como fracción del ancho. */
  amplitude?: number;
  /** Intensidad de los pliegues (0 = plana del todo). */
  shade?: number;
  className?: string;
}

/**
 * Bandera de El Salvador que ondea, dibujada en un canvas con tu archivo oficial
 * (escudo, colores y proporciones intactos): la imagen se corta en tiras finas y cada una sube y baja
 * con una onda. Solo se mueve mientras se ve en pantalla y la pestaña está activa; con
 * "reducir movimiento" se muestra un solo fotograma. Si el archivo no carga, no se muestra nada.
 */
export function WavingFlag({ width, mast = false, decorative = false, amplitude = 0.045, shade = 0.06, className }: WavingFlagProps) {
  const { t } = useLang();
  const reduce = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [failed, setFailed] = useState(false);

  const amp = width * amplitude;
  const flagH = width * RATIO;
  const pad = Math.ceil(amp * 1.4);
  const height = Math.round(flagH + pad * 2);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return; // sin canvas (por ejemplo en pruebas): no hay nada que dibujar

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);

    let img: HTMLImageElement | null = null;
    let raf = 0;
    let running = false;
    let visible = true;
    let last = 0;
    const t0 = performance.now();

    const draw = (time: number) => {
      if (!img) return;
      const W = canvas.width;
      const fh = Math.round(flagH * dpr);
      const top = Math.round(pad * dpr);
      const A = amp * dpr;
      const step = 2; // px de dispositivo por tira
      const phase = (time * 2 * Math.PI) / PERIOD;
      ctx.clearRect(0, 0, W, canvas.height);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      for (let x = 0; x < W; x += step) {
        const u = x / W;
        const e = Math.pow(u, 0.9); // 0 junto al asta, crece hacia la punta
        const ang = 2 * Math.PI * CYCLES * u - phase;
        const y = Math.round(top + A * e * Math.sin(ang)); // enteros: bordes nítidos, sin puntos en las franjas
        ctx.drawImage(img, u * img.naturalWidth, 0, (step / W) * img.naturalWidth + 0.6, img.naturalHeight, x, y, step + 0.6, fh);
        if (shade > 0) {
          const s = Math.cos(ang) * e * shade;
          ctx.fillStyle = s > 0 ? `rgba(255,255,255,${s})` : `rgba(0,0,0,${-s})`;
          ctx.fillRect(x, y, step + 0.6, fh);
        }
      }
    };

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (now - last < 33) return; // ~30 fotogramas por segundo bastan y gastan menos
      last = now;
      draw((now - t0) / 1000);
    };
    const start = () => {
      if (running || !visible || document.hidden || reduce || !img) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const image = new Image();
    image.onload = () => {
      img = image;
      draw(reduce ? STILL_T : 0);
      start();
    };
    image.onerror = () => setFailed(true);
    image.src = SRC;

    const io =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
            if (visible) start();
            else stop();
          }, { threshold: 0.05 })
        : null;
    io?.observe(canvas);
    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      io?.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [width, height, flagH, pad, amp, shade, reduce]);

  if (failed) return null;

  return (
    <div className={cn("relative inline-block", className)} style={{ width, height: mast ? height + width * 0.4 : height }}>
      {mast && (
        <>
          <span aria-hidden="true" className="absolute -left-3 bottom-0 top-1 w-[7px] rounded-full bg-parchment" />
          <span aria-hidden="true" className="absolute -left-[14px] top-0 h-3 w-3 rounded-full bg-gold" />
        </>
      )}
      <canvas
        ref={canvasRef}
        style={{ width, height, display: "block" }}
        {...(decorative ? { "aria-hidden": true } : { role: "img", "aria-label": t(ALT) })}
      />
    </div>
  );
}
