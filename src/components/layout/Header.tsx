"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { UI } from "@/data/ui";
import { cn } from "@/lib/cn";
import { useLang } from "@/lib/i18n";
import { EASE_OUT } from "@/lib/motion";
import type { Lang } from "@/types/content";

export function SkipLink() {
  const { t } = useLang();
  return (
    <a
      href="#main"
      className="sr-only z-[60] rounded-control bg-ink px-4 py-3 font-bold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
    >
      {t(UI.skip)}
    </a>
  );
}

const LANGS: ReadonlyArray<{ id: Lang; label: string; name: string }> = [
  { id: "en", label: "EN", name: "English" },
  { id: "es", label: "ES", name: "Español" },
];

/** Secciones del menú (también las usa el aviso "Continúa donde te quedaste"). */
export const NAV_LINKS = [
  { id: "country", label: UI.nav.explore },
  { id: "flavors", label: UI.nav.flavors },
  { id: "cost", label: UI.nav.cost },
  { id: "journey", label: UI.nav.journey },
  { id: "goals", label: UI.nav.goals },
  { id: "team", label: UI.nav.team },
];

export function Header() {
  const { t, lang, setLang } = useLang();
  const reduce = useReducedMotion();
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);

  // El menú móvil se cierra con Escape (devolviendo el foco al botón), al tocar fuera y al pasar a pantalla grande
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        menuBtnRef.current?.focus();
      }
    };
    const onPointer = (e: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    const mq = window.matchMedia("(min-width: 1024px)");
    const onMq = () => mq.matches && setMenuOpen(false);
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    mq.addEventListener("change", onMq);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
      mq.removeEventListener("change", onMq);
    };
  }, [menuOpen]);

  // Resalta la sección que se está leyendo
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const els = NAV_LINKS.map((l) => document.getElementById(l.id)).filter((e): e is HTMLElement => !!e);
    if (els.length === 0) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <header ref={headerRef} className="sticky top-0 z-40 border-b border-line bg-parchment">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-2 px-4 sm:gap-4 sm:px-6">
        <a href="#top" className="flex items-center gap-2 leading-tight sm:gap-3">
          <img src="/brand/alchemist-mark.svg" alt="" width={36} height={44} className="h-11 w-auto" />
          <span>
            <span className="block text-base font-extrabold tracking-tight sm:text-lg">
              {UI.brand.name} {t(UI.brand.suffix)}
            </span>
            <span className="block text-sm text-graphite">{UI.brand.sub}</span>
          </span>
        </a>

        <div className="flex items-center gap-2 sm:gap-6">
          <nav aria-label={t(UI.nav.label)} className="hidden items-center gap-5 lg:flex">
            {NAV_LINKS.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                aria-current={active === l.id ? "location" : undefined}
                className="relative py-1 font-semibold text-ink"
              >
                {t(l.label)}
                {active === l.id && (
                  <motion.span
                    layoutId="nav-underline"
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-0.5 h-[3px] rounded-full bg-terra"
                    transition={{ duration: 0.3, ease: EASE_OUT }}
                  />
                )}
              </a>
            ))}
          </nav>
          <div role="group" aria-label={t(UI.langLabel)} className="flex overflow-hidden rounded-control border-2 border-ink">
            {LANGS.map((o) => (
              <button
                key={o.id}
                type="button"
                lang={o.id}
                aria-pressed={lang === o.id}
                aria-label={o.name}
                onClick={() => setLang(o.id)}
                className={cn(
                  "min-h-11 min-w-10 px-2 text-sm font-bold transition-colors duration-150 sm:min-w-11 sm:px-3",
                  lang === o.id ? "bg-ink text-parchment" : "text-ink hover:bg-sand",
                )}
              >
                {o.label}
              </button>
            ))}
          </div>
          {/* Menú de secciones para celular y tablet (en pantalla grande están los enlaces de arriba) */}
          <button
            ref={menuBtnRef}
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={t(menuOpen ? UI.nav.closeMenu : UI.nav.openMenu)}
            onClick={() => setMenuOpen((v) => !v)}
            className={cn(
              "grid h-11 w-11 place-items-center rounded-control border-2 border-ink transition-[transform,background-color,color] duration-150 ease-out-strong active:scale-95 lg:hidden",
              menuOpen ? "bg-ink text-parchment" : "text-ink hover:bg-sand",
            )}
          >
            {menuOpen ? <X aria-hidden="true" className="h-5 w-5" /> : <Menu aria-hidden="true" className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {menuOpen && (
          <motion.div
            id="mobile-nav"
            key="mobile-nav"
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduce ? { opacity: 0, transition: { duration: 0 } } : { height: 0, opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.22, ease: EASE_OUT }}
            className="absolute inset-x-0 top-full overflow-hidden border-b border-line bg-parchment shadow-lg lg:hidden"
          >
            <nav aria-label={t(UI.nav.label)} className="mx-auto max-w-6xl px-4 py-3 sm:px-6">
              <ul role="list" className="grid gap-1">
                {NAV_LINKS.map((l) => (
                  <li key={l.id}>
                    <a
                      href={`#${l.id}`}
                      onClick={() => setMenuOpen(false)}
                      aria-current={active === l.id ? "location" : undefined}
                      className={cn(
                        "flex min-h-12 items-center rounded-control border-l-4 px-4 text-lg transition-colors duration-150",
                        active === l.id ? "border-terra bg-sand font-extrabold" : "border-transparent font-semibold hover:bg-sand",
                      )}
                    >
                      {t(l.label)}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
