"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from "react";
import { ACCENT } from "@/lib/accent";
import { cn } from "@/lib/cn";
import type { ShapeKind, ZoneAccent } from "@/types/content";
import { ShapeGlyph } from "./Shapes";

interface PhotoProps {
  src?: string;
  alt: string;
  accent: ZoneAccent;
  shape: ShapeKind;
  className?: string;
}

/**
 * Foto real si hay `src`; si no (o si el archivo no existe o falla al cargar),
 * un bloque plano del color de la zona con su forma. Nunca se ve un ícono de imagen rota.
 */
export function Photo({ src, alt, accent, shape, className }: PhotoProps) {
  const [failed, setFailed] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  // Si el error ocurrió antes de que React activara los eventos, se detecta aquí
  useEffect(() => {
    const el = ref.current;
    if (el && el.complete && el.naturalWidth === 0) setFailed(true);
  }, [src]);

  if (src && !failed) {
    return (
      <img
        ref={ref}
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
        className={cn("h-full w-full object-cover", className)}
      />
    );
  }
  return (
    <div aria-hidden="true" className={cn("relative h-full w-full overflow-hidden", ACCENT[accent].bg, className)}>
      <ShapeGlyph kind={shape} className={cn("absolute -bottom-[18%] -right-[8%] h-[85%] w-[85%]", ACCENT[accent].shape)} />
    </div>
  );
} 