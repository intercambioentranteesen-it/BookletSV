"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { WavingFlag } from "@/components/brand/WavingFlag";
import { ShapeGlyph } from "@/components/brand/Shapes";
import { UI } from "@/data/ui";
import { useLang } from "@/lib/i18n";
import type { ClosingContent, PhotoCredit } from "@/types/content";

export function Closing({ content, credits = [] }: { content: ClosingContent; credits?: PhotoCredit[] }) {
  const { t } = useLang();
  // Tamaño de la bandera según la pantalla (solo aquí crece: es el momento de más emoción)
  const [flagW, setFlagW] = useState(300);
  useEffect(() => {
    const set = () => setFlagW(window.innerWidth >= 1024 ? 440 : window.innerWidth >= 640 ? 380 : 280);
    set();
    window.addEventListener("resize", set);
    return () => window.removeEventListener("resize", set);
  }, []);

  return (
    <footer id="closing" className="bg-ink text-parchment">
      <div className="mx-auto max-w-6xl px-6 pb-20 pt-4 md:pb-28 md:pt-6">
        {/* Línea que separa el lema (arriba, mismo fondo) de la despedida */}
        <div aria-hidden="true" className="mb-12 h-px bg-parchment/25 md:mb-16" />
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_auto] lg:gap-16">
          <div>
            <h2 className="max-w-3xl text-4xl font-extrabold leading-[1.1] md:text-6xl">{t(content.title)}</h2>
            <p className="mt-6 max-w-xl text-xl leading-relaxed text-parchment/90">{t(content.text)}</p>

            {content.channels.length > 0 && (
              <ul role="list" className="mt-8 flex flex-wrap gap-3">
                {content.channels.map((c) => (
                  <li key={c.href}>
                    <a
                      href={c.href}
                      className="inline-flex min-h-12 items-center rounded-control border-2 border-parchment px-5 font-bold transition-colors duration-150 hover:bg-parchment hover:text-ink"
                    >
                      {t(c.label)}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {/* La bandera (con su escudo dentro, como en el archivo oficial) ondea sola; nunca el escudo suelto */}
          <div className="mx-auto pl-4 lg:mx-0 lg:pr-4">
            <WavingFlag width={flagW} mast />
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-end justify-between gap-8 border-t-2 border-parchment/30 pt-8">
          <div className="flex flex-wrap items-end gap-x-6 gap-y-5">
            {/* Logo completo (trae su propio fondo pergamino) */}
            <img src="/brand/alchemist-logo.svg" alt={t(UI.logoAlt)} width={128} height={128} className="h-32 w-32 rounded-card" />
            <div>
              <div aria-hidden="true" className="flex gap-3">
                <ShapeGlyph kind="triangle" className="h-7 w-7 text-terra" />
                <ShapeGlyph kind="rect" className="h-7 w-7 text-copper" />
                <ShapeGlyph kind="circle" className="h-7 w-7 text-clay" />
                <ShapeGlyph kind="quarter" className="h-7 w-7 text-parchment" />
              </div>
              <p className="mt-3 font-extrabold">
                {UI.brand.name} {t(UI.brand.suffix)}
              </p>
              <p className="text-parchment/90">{UI.brand.sub}</p>
            </div>
          </div>
          <a
            href="#top"
            className="inline-flex min-h-12 items-center gap-2 rounded-control border-2 border-parchment px-5 font-bold transition-colors duration-150 hover:bg-parchment hover:text-ink"
          >
            {t(UI.backToTop)}
            <ArrowUp aria-hidden="true" className="h-5 w-5" />
          </a>
        </div>
        <p className="mt-8 max-w-xl text-sm text-parchment/80">{t(UI.confirm)}</p>

        {credits.length > 0 && (
          <details className="mt-6 text-sm text-parchment/85">
            <summary className="inline-flex min-h-11 cursor-pointer items-center font-semibold underline underline-offset-4">{t(UI.photoCredits)}</summary>
            <ul role="list" className="mt-3 grid gap-x-8 gap-y-1 sm:grid-cols-2">
              {credits.map((c) => (
                <li key={c.id}>
                  <span className="font-semibold">{t(c.label)}:</span> {c.credit}
                </li>
              ))}
            </ul>
          </details>
        )}
      </div>
    </footer>
  );
}
