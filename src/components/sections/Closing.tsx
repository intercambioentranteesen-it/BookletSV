"use client";

import { ArrowUp } from "lucide-react";
import { ShapeGlyph } from "@/components/brand/Shapes";
import { UI } from "@/data/ui";
import { useLang } from "@/lib/i18n";
import type { ClosingContent } from "@/types/content";

export function Closing({ content }: { content: ClosingContent }) {
  const { t } = useLang();
  return (
    <footer id="closing" className="bg-brand-deep text-white">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <h2 className="max-w-3xl text-5xl font-black leading-[1.05] md:text-7xl">{t(content.title)}</h2>
        <p className="mt-6 max-w-xl text-xl leading-relaxed text-white/90">{t(content.text)}</p>

        {content.channels.length > 0 && (
          <ul role="list" className="mt-8 flex flex-wrap gap-3">
            {content.channels.map((c) => (
              <li key={c.href}>
                <a
                  href={c.href}
                  className="inline-flex min-h-12 items-center rounded-control border-2 border-white px-5 font-bold transition-colors duration-150 hover:bg-white hover:text-brand-deep"
                >
                  {t(c.label)}
                </a>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-16 flex flex-wrap items-end justify-between gap-8 border-t-2 border-white/40 pt-8">
          <div>
            <div aria-hidden="true" className="flex gap-3">
              <ShapeGlyph kind="triangle" className="h-9 w-9 text-mint" />
              <ShapeGlyph kind="rect" className="h-9 w-9 text-sun" />
              <ShapeGlyph kind="circle" className="h-9 w-9 text-tangerine" />
              <ShapeGlyph kind="quarter" className="h-9 w-9 text-coral" />
            </div>
            <p className="mt-4 font-black">
              {UI.brand.name} {t(UI.brand.suffix)}
            </p>
            <p className="text-white/90">{UI.brand.sub}</p>
            <p className="mt-4 max-w-md text-sm text-white/85">{t(UI.confirm)}</p>
          </div>
          <a
            href="#top"
            className="inline-flex min-h-12 items-center gap-2 rounded-control border-2 border-white px-5 font-bold transition-colors duration-150 hover:bg-white hover:text-brand-deep"
          >
            {t(UI.backToTop)}
            <ArrowUp aria-hidden="true" className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
