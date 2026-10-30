"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { UI } from "@/data/ui";
import { useLang } from "@/lib/i18n";
import { EASE_OUT } from "@/lib/motion";
import { NAV_LINKS } from "./Header";

const KEY = "aiesec-last-section";
const MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000; // el lugar guardado caduca a los 7 días
const SHOW_AFTER_MS = 1200; // se espera a que el navegador termine de restaurar el scroll por su cuenta
const HIDE_AFTER_MS = 12000;

interface Saved {
  id: string;
  at: number;
}

function read(): Saved | null {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const v = JSON.parse(raw) as Saved;
    return typeof v?.id === "string" && typeof v?.at === "number" ? v : null;
  } catch {
    return null;
  }
}
function write(id: string | null) {
  try {
    if (id) window.localStorage.setItem(KEY, JSON.stringify({ id, at: Date.now() } satisfies Saved));
    else window.localStorage.removeItem(KEY);
  } catch {
    /* almacenamiento no disponible: simplemente no se recuerda el lugar */
  }
}

/**
 * Recuerda la última sección que se estaba leyendo. Si el visitante vuelve a la página (otro día, otra pestaña) y está arriba,
 * aparece un aviso discreto con un botón para continuar ahí. Nunca salta solo: quien llega con un enlace compartido
 * (o con una experiencia abierta, #exp-…) no se desorienta. Si el navegador ya restauró el scroll, no aparece.
 */
export function ResumePlace() {
  const { t } = useLang();
  const reduce = useReducedMotion();
  const [target, setTarget] = useState<string | null>(null);
  const initial = useRef<Saved | null>(null);

  // 1) Seguimiento: guarda la sección actual al cambiar (y borra el lugar si se vuelve a la portada)
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    initial.current = read(); // lo guardado de la visita anterior, antes de empezar a sobrescribirlo
    const ids = ["top", ...NAV_LINKS.map((l) => l.id)];
    const els = ids.map((id) => document.getElementById(id)).filter((e): e is HTMLElement => !!e);
    let started = false;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          // Hasta que el visitante decide (o pasa el tiempo del aviso) no se pisa lo guardado de la visita anterior
          if (!started) continue;
          write(e.target.id === "top" ? null : e.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    els.forEach((el) => io.observe(el));
    const start = window.setTimeout(() => (started = true), SHOW_AFTER_MS + 300);
    return () => {
      window.clearTimeout(start);
      io.disconnect();
    };
  }, []);

  // 2) Al llegar: si hay un lugar guardado reciente y el visitante sigue arriba, se ofrece continuar
  useEffect(() => {
    const timer = window.setTimeout(() => {
      const saved = initial.current;
      if (!saved || Date.now() - saved.at > MAX_AGE_MS) return;
      if (window.location.hash && window.location.hash !== "#top") return; // llegó a un lugar concreto (p. ej. #exp-…)
      if (window.scrollY > 240) return; // el navegador ya lo dejó en otro lugar (recarga o "atrás")
      if (!document.getElementById(saved.id)) return;
      setTarget(saved.id);
    }, SHOW_AFTER_MS);
    return () => window.clearTimeout(timer);
  }, []);

  // 3) El aviso se va solo
  useEffect(() => {
    if (!target) return;
    const timer = window.setTimeout(() => setTarget(null), HIDE_AFTER_MS);
    return () => window.clearTimeout(timer);
  }, [target]);

  const link = NAV_LINKS.find((l) => l.id === target);

  const go = () => {
    if (!target) return;
    const el = document.getElementById(target);
    setTarget(null);
    if (!el) return;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    // Para quien navega con teclado o lector de pantalla: el foco también llega a la sección
    el.setAttribute("tabindex", "-1");
    el.focus({ preventScroll: true });
  };

  return (
    <AnimatePresence>
      {link && (
        <motion.div
          key="resume"
          role="status"
          initial={reduce ? false : { opacity: 0, transform: "translateY(16px)" }}
          animate={{ opacity: 1, transform: "translateY(0px)", transition: { duration: 0.3, ease: EASE_OUT } }}
          exit={{ opacity: 0, transition: { duration: reduce ? 0 : 0.15 } }}
          className="fixed inset-x-4 bottom-4 z-30 mx-auto flex max-w-md items-center gap-3 rounded-card border-2 border-ink bg-parchment p-3 pl-4 shadow-xl"
        >
          <p className="min-w-0 flex-1 leading-snug">
            {t(UI.resume.text)} <span className="font-extrabold">{t(link.label)}</span>
          </p>
          <button
            type="button"
            onClick={go}
            className="inline-flex min-h-11 shrink-0 items-center rounded-control bg-terra px-5 font-bold text-white transition-[transform,background-color] duration-150 ease-out-strong hover:bg-ink active:scale-[0.97]"
          >
            {t(UI.resume.go)}
          </button>
          <button
            type="button"
            aria-label={t(UI.close)}
            onClick={() => setTarget(null)}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-control border-2 border-ink transition-[transform,background-color,color] duration-150 ease-out-strong hover:bg-ink hover:text-parchment active:scale-90"
          >
            <X aria-hidden="true" className="h-5 w-5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
