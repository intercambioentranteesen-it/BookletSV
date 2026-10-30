"use client";

import { useEffect, useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CircleHelp } from "lucide-react";
import { UI } from "@/data/ui";
import { cn } from "@/lib/cn";
import { useLang } from "@/lib/i18n";
import { EASE_OUT } from "@/lib/motion";

const KEY = "aiesec-map-guide";

/**
 * Guía corta del mapa (3 pasos). Se abre sola la primera vez; "Entendido" la cierra y recuerda la decisión,
 * y el botón "Cómo usar el mapa" siempre queda a la vista para volver a abrirla. No tapa el mapa ni bloquea el scroll.
 */
export function MapGuide() {
  const { t } = useLang();
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const panelId = useId();

  // El estado guardado se lee al montar (en el servidor no existe): así no hay desajuste de hidratación
  useEffect(() => {
    let seen = false;
    try {
      seen = window.localStorage.getItem(KEY) === "1";
    } catch {
      /* almacenamiento no disponible: se muestra la guía */
    }
    if (!seen) setOpen(true);
  }, []);

  const dismiss = () => {
    setOpen(false);
    try {
      window.localStorage.setItem(KEY, "1");
    } catch {
      /* ignorar */
    }
  };

  return (
    <div className="mx-auto mb-4 w-full max-w-4xl">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => (open ? dismiss() : setOpen(true))}
        className={cn(
          "inline-flex min-h-11 items-center gap-2 rounded-control border-2 px-4 font-bold transition-[transform,background-color,color,border-color] duration-150 ease-out-strong active:scale-[0.97]",
          open ? "border-ink bg-ink text-parchment" : "border-line bg-white text-ink hover:border-ink",
        )}
      >
        <CircleHelp aria-hidden="true" className="h-5 w-5" />
        {t(UI.mapGuide.help)}
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            key="guide"
            role="region"
            aria-label={t(UI.mapGuide.help)}
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduce ? { opacity: 0, transition: { duration: 0 } } : { height: 0, opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.28, ease: EASE_OUT }}
            className="overflow-hidden"
          >
            <div className="mt-3 rounded-card border-2 border-line bg-white p-5 sm:p-6">
              <ol role="list" className="grid gap-5 sm:grid-cols-3 sm:gap-6">
                {UI.mapGuide.steps.map((step, i) => (
                  <li key={step.title.en} className="flex gap-3">
                    <span aria-hidden="true" className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-terra font-extrabold text-white">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="text-lg font-extrabold leading-tight">{t(step.title)}</h3>
                      <p className="mt-1 text-caption text-graphite">{t(step.text)}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <button
                type="button"
                onClick={dismiss}
                className="mt-5 inline-flex min-h-11 items-center rounded-control bg-ink px-5 font-bold text-parchment transition-[transform,background-color] duration-150 ease-out-strong hover:bg-terra-deep active:scale-[0.97]"
              >
                {t(UI.mapGuide.gotIt)}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
