/* eslint-disable @next/next/no-img-element */
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
 * Foto real si hay `src`; si no, un bloque plano del color de la zona con su forma.
 * Para cambiar el placeholder por una foto basta con poner la ruta en el contenido.
 */
export function Photo({ src, alt, accent, shape, className }: PhotoProps) {
  if (src) {
    return <img src={src} alt={alt} loading="lazy" decoding="async" className={cn("h-full w-full object-cover", className)} />;
  }
  return (
    <div aria-hidden="true" className={cn("relative h-full w-full overflow-hidden", ACCENT[accent].bg, className)}>
      <ShapeGlyph kind={shape} className="absolute -bottom-[18%] -right-[8%] h-[85%] w-[85%] text-white/35" />
    </div>
  );
}
