"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
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

const LINKS = [
  { id: "country", label: UI.nav.explore },
  { id: "flavors", label: UI.nav.flavors },
  { id: "cost", label: UI.nav.cost },
  { id: "journey", label: UI.nav.journey },
  { id: "goals", label: UI.nav.goals },
];

export function Header() {
  const { t, lang, setLang } = useLang();
  const [active, setActive] = useState("");

  // Resalta la sección que se está leyendo
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const els = LINKS.map((l) => document.getElementById(l.id)).filter((e): e is HTMLElement => !!e);
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
    <header className="sticky top-0 z-40 border-b border-line bg-parchment">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-6">
        <a href="#top" className="flex items-center gap-3 leading-tight">
          <img src="/brand/alchemist-mark.svg" alt="" width={36} height={44} className="h-11 w-auto" />
          <span>
            <span className="block text-lg font-extrabold tracking-tight">
              {UI.brand.name} {t(UI.brand.suffix)}
            </span>
            <span className="block text-sm text-graphite">{UI.brand.sub}</span>
          </span>
        </a>

        <div className="flex items-center gap-2 sm:gap-6">
          <nav aria-label={t(UI.nav.label)} className="hidden items-center gap-5 lg:flex">
            {LINKS.map((l) => (
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
                  "min-h-11 min-w-11 px-3 text-sm font-bold transition-colors duration-150",
                  lang === o.id ? "bg-ink text-parchment" : "text-ink hover:bg-sand",
                )}
              >
                {o.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
