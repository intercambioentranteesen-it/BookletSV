"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import type { L, Lang } from "@/types/content";

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (v: L) => string;
}

const Ctx = createContext<LangCtx | null>(null);
const KEY = "aiesec-lang";
const SWAP_OUT_MS = 110; // lo que tarda el contenido en desvanecerse antes de cambiar el texto

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

  const langRef = useRef(lang);
  langRef.current = lang;
  const timers = useRef<number[]>([]);

  /**
   * Cambia el idioma con un fundido corto: el contenido se desvanece (la barra superior queda quieta),
   * se cambia el texto y vuelve a aparecer. Con "reducir movimiento" el cambio es directo.
   */
  const setLang = useCallback((next: Lang) => {
    if (next === langRef.current) return;
    const apply = () => {
      setLangState(next);
      try {
        window.localStorage.setItem(KEY, next);
      } catch {
        /* ignorar */
      }
    };
    const root = document.documentElement;
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      delete root.dataset.langSwap;
      apply();
      return;
    }
    root.dataset.langSwap = "out";
    timers.current.push(
      window.setTimeout(() => {
        apply();
        timers.current.push(window.setTimeout(() => delete root.dataset.langSwap, 40));
      }, SWAP_OUT_MS),
    );
  }, []);

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach((id) => window.clearTimeout(id));
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
