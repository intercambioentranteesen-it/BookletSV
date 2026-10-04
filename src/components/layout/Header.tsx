"use client";

import { UI } from "@/data/ui";
import { cn } from "@/lib/cn";
import { useLang } from "@/lib/i18n";
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

export function Header() {
  const { t, lang, setLang } = useLang();
  const links = [
    { href: "#country", label: UI.nav.explore },
    { href: "#cost", label: UI.nav.cost },
    { href: "#journey", label: UI.nav.journey },
    { href: "#goals", label: UI.nav.goals },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-6">
        {/* FASE 2: reemplazar por el logo oficial cuando el comité lo apruebe */}
        <a href="#top" className="leading-tight">
          <span className="block text-lg font-black tracking-tight">
            {UI.brand.name} {t(UI.brand.suffix)}
          </span>
          <span className="block text-sm text-graphite">{UI.brand.sub}</span>
        </a>

        <div className="flex items-center gap-2 sm:gap-6">
          <nav aria-label={t(UI.nav.label)} className="hidden items-center gap-6 md:flex">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="font-bold text-ink underline-offset-4 hover:underline">
                {t(l.label)}
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
                  "min-h-11 min-w-11 px-3 text-sm font-black transition-colors duration-150",
                  lang === o.id ? "bg-ink text-white" : "text-ink hover:bg-mist",
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
