"use client";

/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { cn } from "@/lib/cn";
import { useLang } from "@/lib/i18n";
import type { L } from "@/types/content";

const ALT: L = { en: "Flag of El Salvador", es: "Bandera de El Salvador" };

/** Tamaños (ancho). El alto sale solo de la proporción oficial 335:189 (el archivo es 480 x 271). */
const SIZE = { sm: "w-10", md: "w-14", lg: "w-24 sm:w-36" } as const;
/** Hilo que separa las franjas azules y blancas del fondo. Sin esquinas redondeadas: la bandera no se recorta. */
// El margen compensa el grosor del hilo para que la bandera alinee con el texto de al lado.
const EDGE = { light: "ring-1 ring-ink/25 m-px", dark: "ring-2 ring-parchment m-0.5" } as const;

interface FlagProps {
  size?: keyof typeof SIZE;
  /** "light" sobre fondos claros, "dark" sobre fondos oscuros. */
  edge?: keyof typeof EDGE;
  /** true cuando ya hay un texto al lado que dice lo mismo (evita que el lector de pantalla repita). */
  decorative?: boolean;
  className?: string;
}

/**
 * Bandera de El Salvador. Archivo oficial sin alterar (colores, escudo y proporciones),
 * de frente, sin sombras ni efectos. Si el archivo no existe, no se muestra nada.
 */
export function Flag({ size = "md", edge = "light", decorative = false, className }: FlagProps) {
  const { t } = useLang();
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  return (
    <img
      src="/brand/bandera-sv.png"
      width={480}
      height={271}
      alt={decorative ? "" : t(ALT)}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className={cn("block h-auto shrink-0", SIZE[size], EDGE[edge], className)}
    />
  );
}
