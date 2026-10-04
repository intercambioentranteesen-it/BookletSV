"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { L, Lang } from "@/types/content";

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (v: L) => string;
}

const Ctx = createContext<LangCtx | null>(null);
const KEY = "aiesec-lang";

export function LangProvider({ children }: { children: ReactNode }) {
  // El servidor y el primer render usan inglés (idioma base); luego se detecta el del visitante.
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = window.localStorage.getItem(KEY);
    } catch {
      /* almacenamiento no disponible */
    }
    const fromUrl = new URLSearchParams(window.location.search).get("lang");
    const pick = fromUrl ?? stored;
    if (pick === "en" || pick === "es") setLangState(pick);
    else if (navigator.language?.toLowerCase().startsWith("es")) setLangState("es");
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      window.localStorage.setItem(KEY, l);
    } catch {
      /* ignorar */
    }
  }, []);

  const t = useCallback((v: L) => v[lang], [lang]);
  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useLang(): LangCtx {
  const c = useContext(Ctx);
  if (!c) throw new Error("useLang debe usarse dentro de <LangProvider>");
  return c;
}

/** Reemplaza {n} en una cadena traducida. */
export function withN(s: string, n: number): string {
  return s.replace("{n}", String(n));
}
