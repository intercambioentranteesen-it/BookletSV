"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "framer-motion";
import { LangProvider } from "@/lib/i18n";

/** Idioma + `prefers-reduced-motion` respetado en toda la app (se mantiene la opacidad, se quita el movimiento). */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <LangProvider>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LangProvider>
  );
}
