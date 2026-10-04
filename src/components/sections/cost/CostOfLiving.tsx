"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Minus, Plus } from "lucide-react";
import { CountUp } from "@/components/ui/CountUp";
import { UI } from "@/data/ui";
import { COST_ICONS } from "@/lib/icons";
import { useLang } from "@/lib/i18n";
import { fadeUp, stagger } from "@/lib/motion";
import type { CostContent, CostItem } from "@/types/content";
import { TransportModal } from "./TransportModal";

const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

/** Rango por unidad que usa el planificador (puede diferir del rango general del renglón). */
const unitRange = (it: CostItem) => ({ min: it.plan?.priceMin ?? it.min, max: it.plan?.priceMax ?? it.max });

function Planner({ content }: { content: NonNullable<CostContent["planner"]> & { items: CostItem[] } }) {
  const { t } = useLang();
  const planItems = useMemo(() => content.items.filter((i) => i.plan), [content.items]);
  const [qty, setQty] = useState<Record<string, number>>(() => Object.fromEntries(planItems.map((i) => [i.id, i.plan!.qty])));

  const rows = planItems.map((it) => {
    const r = unitRange(it);
    const q = qty[it.id] ?? 0;
    return { it, r, q, min: r.min * q, max: r.max * q };
  });
  const total = rows.reduce((acc, row) => ({ min: acc.min + row.min, max: acc.max + row.max }), { min: 0, max: 0 });

  const step = (it: CostItem, d: number) =>
    setQty((cur) => ({ ...cur, [it.id]: Math.min(it.plan!.maxQty, Math.max(0, (cur[it.id] ?? 0) + d)) }));

  const stepBtn =
    "grid h-11 w-11 place-items-center transition-colors duration-150 hover:bg-ink hover:text-parchment disabled:opacity-35 disabled:hover:bg-transparent disabled:hover:text-ink";

  return (
    <div className="mx-auto mt-20 grid max-w-6xl gap-10 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
      <div>
        <h3 className="text-3xl font-extrabold leading-tight md:text-5xl">{t(content.title)}</h3>
        <p className="mt-4 max-w-md text-xl leading-relaxed text-graphite">{t(content.intro)}</p>
        <p className="mt-6 max-w-sm text-sm text-graphite">{t(content.note)}</p>
      </div>

      <div>
        <ul role="list" className="divide-y divide-line border-t-2 border-ink">
          {rows.map(({ it, r, q, min, max }) => (
            <li key={it.id} className="flex flex-wrap items-center gap-x-5 gap-y-3 py-4">
              <div className="min-w-[9rem] flex-1">
                <p className="font-extrabold leading-tight">{t(it.plan!.unit)}</p>
                <p className="text-sm text-graphite">
                  {usd.format(r.min)} – {usd.format(r.max)} {t(UI.each)}
                </p>
              </div>
              <div className="inline-flex items-center rounded-control border-2 border-ink">
                <button type="button" className={`${stepBtn} rounded-l-[10px]`} aria-label={`${t(UI.fewer)}: ${t(it.plan!.unit)}`} disabled={q <= 0} onClick={() => step(it, -1)}>
                  <Minus aria-hidden="true" className="h-4 w-4" />
                </button>
                <span className="grid h-11 w-12 place-items-center border-x-2 border-ink font-extrabold tabular-nums" aria-label={`${q} ${t(it.plan!.unit)}`}>
                  {q}
                </span>
                <button type="button" className={`${stepBtn} rounded-r-[10px]`} aria-label={`${t(UI.more)}: ${t(it.plan!.unit)}`} disabled={q >= it.plan!.maxQty} onClick={() => step(it, 1)}>
                  <Plus aria-hidden="true" className="h-4 w-4" />
                </button>
              </div>
              <p className="w-36 text-right font-bold tabular-nums text-graphite">
                {usd.format(min)} – {usd.format(max)}
              </p>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-t-2 border-ink pt-5">
          <p className="text-lg font-extrabold">{t(content.totalLabel)}</p>
          <p aria-live="polite" className="text-3xl font-extrabold tabular-nums sm:text-4xl">
            <motion.span key={`${total.min}-${total.max}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.18 }}>
              {usd.format(total.min)} – {usd.format(total.max)}
            </motion.span>
            <span className="ml-2 text-base font-normal text-graphite">{t(content.perWeek)}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export function CostOfLiving({ content }: { content: CostContent }) {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const first = content.items.find((i) => i.opensTransport) ?? content.items[0];
  const bus = first.plan?.priceMin ?? first.min;

  const price = (it: CostItem) => (it.opensTransport ? `${t(UI.from)} ${usd.format(it.min)}` : `${usd.format(it.min)} – ${usd.format(it.max)}`);

  return (
    <section id="cost" aria-labelledby="cost-title" className="py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <h2 id="cost-title" className="text-4xl font-extrabold leading-tight md:text-6xl">
            {t(content.title)}
          </h2>
          <p className="mt-4 max-w-md text-xl leading-relaxed text-graphite">{t(content.intro)}</p>

          <p className="mt-10 text-7xl font-extrabold leading-none text-terra md:text-8xl">
            <CountUp to={bus} decimals={2} prefix="$" duration={1.2} />
          </p>
          <p className="mt-2 text-lg font-bold">{t(content.bigStatCaption)}</p>
          <p className="mt-6 max-w-sm text-sm text-graphite">{t(content.disclaimer)}</p>
        </div>

        <motion.ul
          role="list"
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="divide-y divide-line border-y-2 border-ink"
        >
          {content.items.map((it) => {
            const Icon = COST_ICONS[it.icon];
            const body = (
              <>
                <Icon aria-hidden="true" className="h-6 w-6 shrink-0 text-terra-deep" />
                <span className="min-w-0 flex-1 text-left">
                  <span className="block text-lg font-extrabold leading-tight">{t(it.label)}</span>
                  {it.detail && <span className="block text-graphite">{t(it.detail)}</span>}
                  {it.opensTransport && <span className="mt-1 block font-semibold text-terra-deep underline underline-offset-4">{t(UI.seeRoutes)}</span>}
                </span>
                <span className="shrink-0 text-right text-xl font-extrabold tabular-nums">{price(it)}</span>
                {it.opensTransport && <ChevronRight aria-hidden="true" className="h-5 w-5 shrink-0" />}
              </>
            );
            return (
              <motion.li key={it.id} variants={fadeUp(14, 0.45)}>
                {it.opensTransport ? (
                  <button
                    type="button"
                    aria-haspopup="dialog"
                    onClick={() => setOpen(true)}
                    className="flex min-h-20 w-full items-center gap-4 px-1 py-5 transition-colors duration-150 hover:bg-sand"
                  >
                    {body}
                  </button>
                ) : (
                  <div className="flex min-h-20 items-center gap-4 px-1 py-5">{body}</div>
                )}
              </motion.li>
            );
          })}
        </motion.ul>
      </div>

      {content.planner && <Planner content={{ ...content.planner, items: content.items }} />}
      <TransportModal open={open} onClose={() => setOpen(false)} content={content.transport} />
    </section>
  );
}
