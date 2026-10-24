import type { TeamContent } from "@/types/content";
import { OAK_LCP, OAK_LEAVES, OAK_VIEWBOX } from "./oak-logo";

export const VB = OAK_VIEWBOX;

export interface OakLeaf {
  d: string;
  cx: number;
  cy: number;
  /** Área (índice) a la que pertenece esta hoja. */
  band: number;
  /** Segundo en que aparece al crecer el árbol (de abajo hacia arriba). */
  delay: number;
}
export interface OakLayout {
  leaves: OakLeaf[];
  /** Contorno (casco convexo) de la copa de cada área: es la zona que responde al clic aunque se toque entre hojas. */
  hulls: string[];
  labels: { areaId: string; x: number; y: number; delay: number }[];
  lcp: { x: number; y: number };
}

type P = [number, number];
const cross = (o: P, a: P, b: P) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
function hull(points: P[]): P[] {
  const pts = [...points].sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  if (pts.length < 3) return pts;
  const lower: P[] = [];
  for (const p of pts) {
    while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], p) <= 0) lower.pop();
    lower.push(p);
  }
  const upper: P[] = [];
  for (const p of [...pts].reverse()) {
    while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], p) <= 0) upper.pop();
    upper.push(p);
  }
  return [...lower.slice(0, -1), ...upper.slice(0, -1)];
}

/**
 * Reparte las hojas del logo en tantas franjas verticales como áreas (de izquierda a derecha) y ubica el rótulo
 * de cada área en el borde superior de su franja. Así el roble es el del logo, y cada área es una parte de su copa.
 */
export function layoutOak(team: TeamContent): OakLayout {
  const N = Math.max(1, team.areas.length);
  const xs = OAK_LEAVES.map((l) => l[1]);
  const ys = OAK_LEAVES.map((l) => l[2]);
  const x0 = Math.min(...xs);
  const x1 = Math.max(...xs);
  const yMin = Math.min(...ys);
  const yMax = Math.max(...ys);
  const bw = (x1 - x0) / N;

  const leaves: OakLeaf[] = OAK_LEAVES.map(([d, cx, cy]) => ({
    d,
    cx,
    cy,
    band: Math.min(N - 1, Math.floor((cx - x0) / bw)),
    delay: Math.round((0.6 + ((yMax - cy) / (yMax - yMin)) * 1.1 + Math.abs(cx - 512) * 0.0006) * 100) / 100,
  }));

  const labels = team.areas.map((area, b) => {
    const mine = OAK_LEAVES.filter((l) => Math.min(N - 1, Math.floor((l[1] - x0) / bw)) === b);
    const top = Math.min(...mine.map((l) => l[2] - l[3] / 2));
    // las áreas vecinas se escalonan un poco para que sus rótulos no se toquen en pantallas chicas
    return { areaId: area.id, x: Math.round(x0 + bw * (b + 0.5)), y: Math.round(top + 29 + (b % 2 === 1 ? 18 : 0)), delay: 2.0 + b * 0.08 };
  });

  const hulls = team.areas.map((_, b) => {
    const mine = leaves.filter((l) => l.band === b).map((l): P => [l.cx, l.cy]);
    return `M${hull(mine).map(([x, y]) => `${Math.round(x)} ${Math.round(y)}`).join(" L")} Z`;
  });

  return { leaves, hulls, labels, lcp: OAK_LCP };
}
