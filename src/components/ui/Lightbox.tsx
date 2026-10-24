"use client";

/* eslint-disable @next/next/no-img-element */
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { UI } from "@/data/ui";
import { useLang } from "@/lib/i18n";
import { EASE_OUT } from "@/lib/motion";

export interface LightboxItem {
  src: string;
  alt: string;
  caption?: string;
  credit?: string;
}

interface LightboxProps {
  items: LightboxItem[];
  /** Posición de la foto abierta, o null si está cerrado. */
  index: number | null;
  onIndex: (i: number) => void;
  onClose: () => void;
}

const BTN =
  "grid h-12 w-12 place-items-center rounded-full bg-parchment/15 text-parchment transition-[transform,background-color,color] duration-150 ease-out-strong hover:bg-parchment hover:text-ink active:scale-90";

/**
 * Visor de fotos a pantalla completa: la foto se ve grande, con su pie y su crédito. Se cierra con ESC o tocando fuera,
 * se navega con las flechas del teclado o deslizando, y devuelve el foco a quien lo abrió. Va por encima de cualquier ventana.
 */
export function Lightbox({ items, index, onIndex, onClose }: LightboxProps) {
  const { t } = useLang();
  const [mounted, setMounted] = useState(false);
  const open = index !== null && !!items[index];
  const closeBtn = useRef<HTMLButtonElement>(null);
  const prevBtn = useRef<HTMLButtonElement>(null);
  const nextBtn = useRef<HTMLButtonElement>(null);
  const state = useRef({ index, count: items.length, onIndex, onClose });
  state.current = { index, count: items.length, onIndex, onClose };
  const touchX = useRef<number | null>(null);

  useEffect(() => setMounted(true), []);

  const go = useCallback((d: number) => {
    const { index: i, count, onIndex: set } = state.current;
    if (i === null || count < 2) return;
    set((i + d + count) % count);
  }, []);

  useEffect(() => {
    if (!open) return;
    const opener = document.activeElement as HTMLElement | null;
    const html = document.documentElement;
    const prevOverflow = html.style.overflow;
    html.style.overflow = "hidden";
    closeBtn.current?.focus();

    // Fase de captura: así el visor manda sobre la ventana que tenga debajo (por ejemplo, ESC solo cierra el visor)
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        state.current.onClose();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        e.preventDefault();
        e.stopPropagation();
        go(e.key === "ArrowLeft" ? -1 : 1);
      } else if (e.key === "Tab") {
        e.stopPropagation();
        const ring = [closeBtn.current, prevBtn.current, nextBtn.current].filter((b): b is HTMLButtonElement => !!b);
        const at = ring.indexOf(document.activeElement as HTMLButtonElement);
        e.preventDefault();
        ring[(at + (e.shiftKey ? -1 : 1) + ring.length) % ring.length]?.focus();
      }
    };
    document.addEventListener("keydown", onKey, true);
    return () => {
      document.removeEventListener("keydown", onKey, true);
      html.style.overflow = prevOverflow;
      opener?.focus?.();
    };
  }, [open, go]);

  if (!mounted) return null;
  const item = open ? items[index!] : null;
  const many = items.length > 1;

  return createPortal(
    <AnimatePresence>
      {open && item && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={item.alt}
          className="fixed inset-0 z-[70] flex flex-col bg-ink text-parchment"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.2 } }}
          exit={{ opacity: 0, transition: { duration: 0.15 } }}
          onClick={() => state.current.onClose()}
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            touchX.current = null;
            if (Math.abs(dx) > 60) go(dx > 0 ? -1 : 1);
          }}
        >
          <div className="flex items-center justify-between gap-4 p-4 sm:p-6">
            <p className="text-sm font-semibold text-parchment/80" aria-live="polite">
              {many ? t(UI.photoCount).replace("{n}", String(index! + 1)).replace("{total}", String(items.length)) : ""}
            </p>
            <button ref={closeBtn} type="button" aria-label={t(UI.close)} className={BTN} onClick={(e) => { e.stopPropagation(); state.current.onClose(); }}>
              <X aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-2 sm:px-20">
            <AnimatePresence mode="wait">
              <motion.img
                key={item.src}
                src={item.src}
                alt={item.alt}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1, transition: { duration: 0.3, ease: EASE_OUT } }}
                exit={{ opacity: 0, transition: { duration: 0.1 } }}
                onClick={(e) => e.stopPropagation()}
                draggable={false}
                className="h-full w-full select-none rounded-control object-contain"
              />
            </AnimatePresence>
            {many && (
              <>
                <button ref={prevBtn} type="button" aria-label={t(UI.prev)} className={`${BTN} absolute left-2 top-1/2 -translate-y-1/2 sm:left-5`} onClick={(e) => { e.stopPropagation(); go(-1); }}>
                  <ChevronLeft aria-hidden="true" className="h-6 w-6" />
                </button>
                <button ref={nextBtn} type="button" aria-label={t(UI.next)} className={`${BTN} absolute right-2 top-1/2 -translate-y-1/2 sm:right-5`} onClick={(e) => { e.stopPropagation(); go(1); }}>
                  <ChevronRight aria-hidden="true" className="h-6 w-6" />
                </button>
              </>
            )}
          </div>

          <div className="p-4 text-center sm:p-6" onClick={(e) => e.stopPropagation()}>
            {item.caption && <p className="text-lg font-extrabold">{item.caption}</p>}
            {item.credit && (
              <p className="mt-1 text-sm text-parchment/75">
                {t(UI.photoCredit)}: {item.credit}
              </p>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
