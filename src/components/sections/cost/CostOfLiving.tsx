"use client";

import { useRef, useState } from "react";
import { ChevronRight } from "lucide-react";
import { UI } from "@/data/ui";
import { COST_ICONS } from "@/lib/icons";
import { useLang } from "@/lib/i18n";
import type { CostItem, CostContent } from "@/types/content";
import { TransportModal } from "./TransportModal";

const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

export function CostOfLiving({ content }: { content: CostContent }) {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const opener = useRef<HTMLButtonElement>(null);
  const first = content.items.find((i) => i.opensTransport) ?? content.items[0];

  const price = (it: CostItem) => (it.opensTransport ? `${t(UI.from)} ${usd.format(it.min)}` : `${usd.format(it.min)} – ${usd.format(it.max)}`);

  return (
    <section id="cost" aria-labelledby="cost-title" className="bg-mist py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <h2 id="cost-title" className="text-4xl font-black leading-tight md:text-6xl">
            {t(content.title)}
          </h2>
          <p className="mt-4 max-w-md text-xl leading-relaxed text-graphite">{t(content.intro)}</p>

          <p className="mt-10 text-7xl font-black leading-none text-brand tabular-nums md:text-8xl">{usd.format(first.min)}</p>
          <p className="mt-2 text-lg font-bold">{t(content.bigStatCaption)}</p>
          <p className="mt-6 max-w-sm text-sm text-graphite">{t(content.disclaimer)}</p>
        </div>

        <ul role="list" className="divide-y divide-line border-y-2 border-ink">
          {content.items.map((it) => {
            const Icon = COST_ICONS[it.icon];
            const body = (
              <>
                <Icon aria-hidden="true" className="h-6 w-6 shrink-0 text-brand-deep" />
                <span className="min-w-0 flex-1 text-left">
                  <span className="block text-lg font-black leading-tight">{t(it.label)}</span>
                  {it.detail && <span className="block text-graphite">{t(it.detail)}</span>}
                  {it.opensTransport && <span className="mt-1 block font-bold text-brand-deep underline underline-offset-4">{t(UI.seeRoutes)}</span>}
                </span>
                <span className="shrink-0 text-right text-xl font-black tabular-nums">{price(it)}</span>
                {it.opensTransport && <ChevronRight aria-hidden="true" className="h-5 w-5 shrink-0" />}
              </>
            );
            return (
              <li key={it.id}>
                {it.opensTransport ? (
                  <button
                    ref={opener}
                    type="button"
                    aria-haspopup="dialog"
                    onClick={() => setOpen(true)}
                    className="flex min-h-20 w-full items-center gap-4 px-1 py-5 transition-colors duration-150 hover:bg-white"
                  >
                    {body}
                  </button>
                ) : (
                  <div className="flex min-h-20 items-center gap-4 px-1 py-5">{body}</div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
      <TransportModal open={open} onClose={() => setOpen(false)} content={content.transport} />
    </section>
  );
}
