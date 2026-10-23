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
 * Siempre hay un bloque del color de la zona debajo. La foto, si existe, aparece encima con un fundido suave
 * (y un leve asentamiento) cuando termina de cargar, así nunca hay un hueco en blanco ni un salto.
 * Si el archivo no existe o falla, se queda solo el bloque de color: nunca se ve un ícono de imagen rota.
 */
export function Photo({ src, alt, accent, shape, className }: PhotoProps) {
  const [state, setState] = useState<"loading" | "loaded" | "failed">("loading");
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setState("loading");
  }, [src]);

  // Si la imagen ya estaba lista (o falló) antes de que React activara los eventos, se detecta aquí
  useEffect(() => {
    const el = ref.current;
    if (el?.complete) setState(el.naturalWidth > 0 ? "loaded" : "failed");
  }, [src]);

  return (
    <div className={cn("relative h-full w-full overflow-hidden", ACCENT[accent].bg, className)}>
      <div aria-hidden="true" className="absolute inset-0">
        <ShapeGlyph kind={shape} className={cn("absolute -bottom-[18%] -right-[8%] h-[85%] w-[85%]", ACCENT[accent].shape)} />
      </div>
      {src && state !== "failed" && (
        <img
          ref={ref}
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setState("loaded")}
          onError={() => setState("failed")}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-700 ease-out-strong motion-reduce:transition-none",
            state === "loaded" ? "scale-100 opacity-100" : "scale-[1.03] opacity-0 motion-reduce:scale-100",
          )}
        />
      )}
    </div>
  );
}
