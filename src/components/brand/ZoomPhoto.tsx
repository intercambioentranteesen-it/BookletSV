"use client";

import { useState } from "react";
import { Maximize2 } from "lucide-react";
import { UI } from "@/data/ui";
import { cn } from "@/lib/cn";
import { useLang } from "@/lib/i18n";
import type { ShapeKind, ZoneAccent } from "@/types/content";
import { Photo } from "./Photo";

interface ZoomPhotoProps {
  src?: string;
  alt: string;
  accent: ZoneAccent;
  shape: ShapeKind;
  /** Se llama al tocar la foto (para abrir el visor). */
  onOpen: () => void;
  className?: string;
}

/**
 * Una foto que se puede ampliar: al tocarla se abre el visor. El botón solo existe cuando la foto real cargó
 * (si falta, queda el bloque de color y no hay nada que ampliar). Muestra una lupa al pasar el cursor, y siempre en pantallas táctiles.
 */
export function ZoomPhoto({ src, alt, accent, shape, onOpen, className }: ZoomPhotoProps) {
  const { t } = useLang();
  const [state, setState] = useState<"loading" | "loaded" | "failed">("loading");
  return (
    <div className={cn("group/zoom relative h-full w-full", className)}>
      <Photo src={src} alt={alt} accent={accent} shape={shape} onState={setState} />
      {src && state === "loaded" && (
        <button
          type="button"
          onClick={onOpen}
          aria-label={`${t(UI.zoomPhoto)}: ${alt}`}
          className="absolute inset-0 cursor-zoom-in focus-visible:outline-offset-[-4px]"
        >
          <span
            aria-hidden="true"
            className="absolute bottom-2 right-2 grid h-9 w-9 place-items-center rounded-full bg-ink/80 text-parchment opacity-100 transition-opacity duration-200 sm:opacity-0 sm:group-hover/zoom:opacity-100 sm:group-focus-within/zoom:opacity-100"
          >
            <Maximize2 className="h-4 w-4" />
          </span>
        </button>
      )}
    </div>
  );
}
