import type { ShapeKind } from "@/types/content";

/** Formas de la marca (triángulo, círculo, rectángulo, cuarto de círculo). Rellenan con currentColor. */
export function ShapeGlyph({ kind, className }: { kind: ShapeKind; className?: string }) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className={className} fill="currentColor">
      {kind === "triangle" && <polygon points="50,8 94,92 6,92" />}
      {kind === "circle" && <circle cx="50" cy="50" r="44" />}
      {kind === "rect" && <rect x="22" y="8" width="56" height="84" />}
      {kind === "quarter" && <path d="M8 92 V8 A84 84 0 0 1 92 92 Z" />}
    </svg>
  );
}
