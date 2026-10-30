"use client";

import type { ReactNode } from "react";
import { TriangleAlert } from "lucide-react";
import { UI } from "@/data/ui";
import { cn } from "@/lib/cn";
import { useLang } from "@/lib/i18n";

/**
 * Aviso "Para tener en cuenta": un solo diseño para todo el sitio (fechas, paradas de una experiencia, etc.).
 * Va siempre visible (nunca dentro de un desplegable) porque suele ser información de seguridad o de cuidado.
 */
export function Notice({ children, className }: { children: ReactNode; className?: string }) {
  const { t } = useLang();
  return (
    <div role="note" className={cn("flex gap-3 border-l-4 border-ink bg-sand p-3 text-caption leading-relaxed", className)}>
      <TriangleAlert aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-terra-deep" />
      <p>
        <span className="font-extrabold">{t(UI.goodToKnow)}. </span>
        {children}
      </p>
    </div>
  );
}
