import type { CSSProperties } from "react";
import type { ShapeKind } from "@/types/content";

/**
 * Corrimiento óptico: el centro de masa de cada forma no coincide con el centro de su caja
 * (el triángulo "pesa" abajo, el cuarto de círculo abajo-izquierda). Valores en % del tamaño del glifo.
 */
const OPTICAL: Record<ShapeKind, { x: number; y: number }> = {
  triangle: { x: 0, y: -14 },
  circle: { x: 0, y: 0 },
  rect: { x: 0, y: 0 },
  quarter: { x: 6, y: -6 },
};

/**
 * Dónde cabe un ícono dentro de cada forma: el centro del círculo inscrito más grande y su diámetro útil
 * (en % del lado del recuadro). Así el ícono queda en el centro visual y no se sale de la figura.
 */
const BADGE: Record<ShapeKind, { x: number; y: number; size: number }> = {
  triangle: { x: 50, y: 66, size: 0.38 },
  circle: { x: 50, y: 50, size: 0.52 },
  rect: { x: 50, y: 50, size: 0.4 },
  quarter: { x: 43.5, y: 56.5, size: 0.46 },
};

/** Estilo para ubicar un ícono (posición absoluta + `-translate-x-1/2 -translate-y-1/2`) dentro de la forma. */
export function badgeIconStyle(kind: ShapeKind): CSSProperties {
  const b = BADGE[kind];
  return { left: `${b.x}%`, top: `${b.y}%`, width: `${b.size * 100}%`, height: `${b.size * 100}%` };
}

/** Formas de la marca (triángulo, círculo, rectángulo, cuarto de círculo). Rellenan con currentColor. */
export function ShapeGlyph({ kind, className, centered = false }: { kind: ShapeKind; className?: string; centered?: boolean }) {
  const o = OPTICAL[kind];
  // `translate` (propiedad individual) no pisa las clases -translate-* de Tailwind que algunos usos ya tienen
  const style: CSSProperties | undefined = centered && (o.x || o.y) ? { translate: `${o.x}% ${o.y}%` } : undefined;
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className={className} style={style} fill="currentColor">
      {kind === "triangle" && <polygon points="50,8 94,92 6,92" />}
      {kind === "circle" && <circle cx="50" cy="50" r="44" />}
      {kind === "rect" && <rect x="22" y="8" width="56" height="84" />}
      {kind === "quarter" && <path d="M8 92 V8 A84 84 0 0 1 92 92 Z" />}
    </svg>
  );
}
