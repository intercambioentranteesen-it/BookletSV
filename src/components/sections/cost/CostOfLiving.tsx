"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calculator, ChevronRight } from "lucide-react";
import { CountUp } from "@/components/ui/CountUp";
import { UI } from "@/data/ui";
import { COST_ICONS } from "@/lib/icons";
import { useLang } from "@/lib/i18n";
import { fadeUp, stagger } from "@/lib/motion";
import { guessCurrency, useRates } from "@/lib/rates";
import type { CostContent, CostItem } from "@/types/content";
import { CalculatorArt } from "./CalculatorArt";
import { CalculatorModal } from "./CalculatorModal";
import { TransportModal } from "./TransportModal";

const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

export function CostOfLiving({ content }: { content: CostContent }) {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const [calcOpen, setCalcOpen] = useState(false);
  const [ctaHover, setCtaHover] = useState(false);
  const planItems = content.items.filter((i) => i.plan);
  const [qty, setQty] = useState<Record<string, number>>(() => Object.fromEntries(planItems.map((i) => [i.id, i.plan!.qty])));
  const [currency, setCurrencyState] = useState("USD");
  const rates = useRates(calcOpen);
  const demo = planItems.reduce(
    (a, it) => ({ min: a.min + (it.plan!.priceMin ?? it.min) * it.plan!.qty, max: a.max + (it.plan!.priceMax ?? it.max) * it.plan!.qty }),
    { min: 0, max: 0 },
  );
  const demoDisplay = `${demo.min.toFixed(2)}–${demo.max.toFixed(2)}`;

  // La moneda que se eligió la vez pasada; si no hay, la que corresponde al idioma y la región del visitante
  useEffect(() => {
    const allowed = content.planner?.currencies.map((c) => c.code) ?? ["USD"];
    let saved: string | null = null;
    try {
      saved = window.localStorage.getItem("aiesec-currency");
    } catch {
      /* sin almacenamiento */
    }
    setCurrencyState(saved && allowed.includes(saved) ? saved : guessCurrency(allowed));
  }, [content.planner]);
  const setCurrency = (code: string) => {
    setCurrencyState(code);
    try {
      window.localStorage.setItem("aiesec-currency", code);
    } catch {
      /* ignorar */
    }
  };
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

      {content.planner && (
        <div className="mx-auto mt-20 max-w-6xl px-6">
          <div className="group relative overflow-hidden rounded-card bg-ink text-parchment">
            <div className="grid items-center gap-10 p-8 md:p-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6">
              <div>
                <h3 className="text-3xl font-extrabold leading-tight md:text-5xl">{t(content.planner.title)}</h3>
                <p className="mt-4 max-w-md text-xl leading-relaxed text-parchment/85">{t(content.planner.intro)}</p>
                <button
                  type="button"
                  aria-haspopup="dialog"
                  onClick={() => setCalcOpen(true)}
                  onMouseEnter={() => setCtaHover(true)}
                  onMouseLeave={() => setCtaHover(false)}
                  onFocus={() => setCtaHover(true)}
                  onBlur={() => setCtaHover(false)}
                  className="mt-8 inline-flex min-h-14 items-center gap-3 rounded-control bg-copper px-7 text-lg font-bold text-ink transition-[transform,background-color] duration-150 ease-out-strong hover:bg-parchment active:scale-[0.97]"
                >
                  <Calculator aria-hidden="true" className="h-6 w-6" />
                  {t(content.planner.button)}
                </button>
                <p className="mt-3 text-sm text-parchment/75">{t(content.planner.buttonHint)}</p>
              </div>
              <CalculatorArt display={demoDisplay} codes={content.planner.currencies.map((c) => c.code).filter((c) => c !== "USD")} active={ctaHover} />
            </div>
          </div>
        </div>
      )}
      {content.planner && (
        <CalculatorModal
          open={calcOpen}
          onClose={() => setCalcOpen(false)}
          planner={content.planner}
          items={content.items}
          qty={qty}
          setQty={setQty}
          currency={currency}
          setCurrency={setCurrency}
          rates={rates}
        />
      )}
      <TransportModal open={open} onClose={() => setOpen(false)} content={content.transport} />
    </section>
  );
}
