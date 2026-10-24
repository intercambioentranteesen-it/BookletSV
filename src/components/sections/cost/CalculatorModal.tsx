"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useReducedMotion } from "framer-motion";
import { ArrowLeftRight, Check, Copy, Minus, Plus, X } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { UI } from "@/data/ui";
import { COST_ICONS } from "@/lib/icons";
import { useLang } from "@/lib/i18n";
import { EASE_OUT } from "@/lib/motion";
import { formatMoney, type RatesState } from "@/lib/rates";
import type { CostContent, CostItem } from "@/types/content";

type Planner = NonNullable<CostContent["planner"]>;

interface CalculatorModalProps {
  open: boolean;
  onClose: () => void;
  planner: Planner;
  items: CostItem[];
  qty: Record<string, number>;
  setQty: (updater: (cur: Record<string, number>) => Record<string, number>) => void;
  currency: string;
  setCurrency: (code: string) => void;
  rates: RatesState;
}

/** Rango de precio por unidad que usa la calculadora (puede diferir del rango general del renglón). */
const unitRange = (it: CostItem) => ({ min: it.plan?.priceMin ?? it.min, max: it.plan?.priceMax ?? it.max });

/** Número que se desliza hasta su nuevo valor (con "reducir movimiento", cambia de golpe). */
function useAnimatedNumber(target: number): number {
  const reduce = useReducedMotion();
  const [value, setValue] = useState(target);
  const current = useRef(target);
  useEffect(() => {
    if (reduce) {
      current.current = target;
      setValue(target);
      return;
    }
    const controls = animate(current.current, target, {
      duration: 0.5,
      ease: EASE_OUT,
      onUpdate: (v) => {
        current.current = v;
        setValue(v);
      },
    });
    return () => controls.stop();
  }, [target, reduce]);
  return value;
}

export function CalculatorModal({ open, onClose, planner, items, qty, setQty, currency, setCurrency, rates }: CalculatorModalProps) {
  const { t, lang } = useLang();
  const locale = lang === "es" ? "es" : "en";
  const planItems = items.filter((i) => i.plan);
  const [copied, setCopied] = useState(false);

  const rate = currency === "USD" ? 1 : rates.status === "ready" ? rates.data.rates[currency] : undefined;
  const converted = currency !== "USD" && typeof rate === "number";
  const showCurrency = converted ? currency : "USD";
  const factor = converted ? rate : 1;
  const money = (usd: number) => formatMoney(usd * factor, showCurrency, locale);

  const rows = planItems.map((it) => {
    const r = unitRange(it);
    const q = qty[it.id] ?? 0;
    return { it, r, q, min: r.min * q, max: r.max * q };
  });
  const total = rows.reduce((a, row) => ({ min: a.min + row.min, max: a.max + row.max }), { min: 0, max: 0 });
  const shownMin = useAnimatedNumber(total.min * factor);
  const shownMax = useAnimatedNumber(total.max * factor);

  const step = (it: CostItem, d: number) =>
    setQty((cur) => ({ ...cur, [it.id]: Math.min(it.plan!.maxQty, Math.max(0, (cur[it.id] ?? 0) + d)) }));
  const stepBtn =
    "grid h-11 w-11 place-items-center transition-[transform,background-color,color] duration-150 ease-out-strong hover:bg-ink hover:text-parchment active:scale-90 disabled:opacity-35 disabled:hover:bg-transparent disabled:hover:text-ink disabled:active:scale-100";

  const updated =
    rates.status === "ready" && rates.data.updated
      ? new Intl.DateTimeFormat(locale, { day: "numeric", month: "long", year: "numeric" }).format(new Date(rates.data.updated))
      : null;
  const currentName = planner.currencies.find((c) => c.code === currency);
  const finalText = `${money(total.min)} – ${money(total.max)} ${t(planner.perWeek)}`;

  const copySummary = async () => {
    const lines = rows.filter((r) => r.q > 0).map((r) => `• ${r.q} ${t(r.it.plan!.unit)}`);
    const text = `${t(planner.title)}: ${finalText}\n${lines.join("\n")}\n(${t(planner.approx)})`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* el navegador no permitió copiar */
    }
  };

  return (
    <Modal open={open} onClose={onClose} labelledBy="calc-title">
      <article>
        {/* Cabecera */}
        <header className="relative overflow-hidden bg-ink p-6 text-parchment sm:p-8">
          <span aria-hidden="true" className="pointer-events-none absolute -right-8 -top-10 h-36 w-36 rounded-full bg-copper/20" />
          <span aria-hidden="true" className="pointer-events-none absolute right-24 top-14 h-14 w-14 rounded-full border-2 border-parchment/20" />
          <div className="relative flex items-start justify-between gap-4">
            <h2 id="calc-title" className="text-4xl font-extrabold leading-tight sm:text-5xl">
              {t(planner.title)}
            </h2>
            <button
              type="button"
              data-autofocus
              onClick={onClose}
              aria-label={t(UI.close)}
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-parchment/15 text-parchment transition-[transform,background-color,color] duration-150 ease-out-strong hover:bg-parchment hover:text-ink active:scale-90"
            >
              <X aria-hidden="true" className="h-5 w-5" />
            </button>
          </div>
          <p className="relative mt-3 max-w-2xl text-lg leading-relaxed text-parchment/85">{t(planner.intro)}</p>
        </header>

        <div className="p-6 sm:p-8">
          {/* Moneda */}
          <fieldset>
            <legend className="font-extrabold">{t(planner.currencyLabel)}</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {planner.currencies.map((c) => (
                <label key={c.code} className="cursor-pointer">
                  <input type="radio" name="calc-currency" value={c.code} checked={currency === c.code} onChange={() => setCurrency(c.code)} className="peer sr-only" />
                  <span
                    title={t(c.name)}
                    className="inline-flex min-h-11 items-center rounded-full border-2 border-ink bg-white px-4 font-extrabold tabular-nums transition-[transform,background-color,color] duration-150 ease-out-strong hover:bg-sand active:scale-95 peer-checked:bg-ink peer-checked:text-parchment peer-focus-visible:outline peer-focus-visible:outline-[3px] peer-focus-visible:outline-offset-2 peer-focus-visible:outline-terra-deep"
                  >
                    {c.code}
                  </span>
                </label>
              ))}
            </div>
            {currentName && <p className="mt-2 text-graphite">{t(currentName.name)}</p>}
          </fieldset>

          {/* Cantidades */}
          <ul role="list" className="mt-6 divide-y divide-line border-t-2 border-ink">
            {rows.map(({ it, r, q, min, max }) => {
              const Icon = COST_ICONS[it.icon];
              const share = total.max > 0 ? (max / total.max) * 100 : 0;
              return (
                <li key={it.id} className="py-4">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-sand">
                      <Icon aria-hidden="true" className="h-6 w-6 text-terra-deep" />
                    </span>
                    <div className="min-w-[8rem] flex-1">
                      <p className="font-extrabold leading-tight">{t(it.plan!.unit)}</p>
                      <p className="text-sm text-graphite">
                        {formatMoney(r.min, "USD", "en")} – {formatMoney(r.max, "USD", "en")} {t(UI.each)}
                      </p>
                    </div>
                    <div className="inline-flex items-center rounded-full border-2 border-ink">
                      <button type="button" className={`${stepBtn} rounded-l-full`} aria-label={`${t(UI.fewer)}: ${t(it.plan!.unit)}`} disabled={q <= 0} onClick={() => step(it, -1)}>
                        <Minus aria-hidden="true" className="h-4 w-4" />
                      </button>
                      <span className="grid h-11 w-12 place-items-center border-x-2 border-ink font-extrabold tabular-nums" aria-label={`${q} ${t(it.plan!.unit)}`}>
                        {q}
                      </span>
                      <button type="button" className={`${stepBtn} rounded-r-full`} aria-label={`${t(UI.more)}: ${t(it.plan!.unit)}`} disabled={q >= it.plan!.maxQty} onClick={() => step(it, 1)}>
                        <Plus aria-hidden="true" className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="w-full text-right font-bold tabular-nums text-graphite sm:w-52">
                      {money(min)} – {money(max)}
                    </p>
                  </div>
                  {/* cuánto pesa este renglón en el total */}
                  <div aria-hidden="true" className="mt-3 h-1.5 overflow-hidden rounded-full bg-sand">
                    <div className="h-full rounded-full bg-terra transition-[width] duration-500 ease-out-strong" style={{ width: `${share}%` }} />
                  </div>
                </li>
              );
            })}
          </ul>

          {/* Total */}
          <div className="mt-6 rounded-card bg-ink p-6 text-parchment sm:p-8">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-copper">{t(planner.totalLabel)}</p>
            <p aria-hidden="true" className="mt-2 text-3xl font-extrabold tabular-nums leading-tight sm:text-5xl">
              {formatMoney(shownMin, showCurrency, locale)} – {formatMoney(shownMax, showCurrency, locale)}
            </p>
            <p className="sr-only" aria-live="polite">
              {finalText}
            </p>
            <div className="mt-2 flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
              <p className="text-parchment/85">
                {t(planner.perWeek)}
                {converted && (
                  <span className="tabular-nums">
                    {" "}
                    · ≈ {formatMoney(total.min, "USD", "en")} – {formatMoney(total.max, "USD", "en")}
                  </span>
                )}
              </p>
              <button
                type="button"
                onClick={copySummary}
                className="inline-flex min-h-11 items-center gap-2 rounded-control border-2 border-parchment/60 px-4 font-bold transition-[transform,background-color,color] duration-150 ease-out-strong hover:bg-parchment hover:text-ink active:scale-95"
              >
                {copied ? <Check aria-hidden="true" className="h-4 w-4" /> : <Copy aria-hidden="true" className="h-4 w-4" />}
                {t(copied ? planner.copied : planner.copy)}
              </button>
            </div>
          </div>

          {/* Aviso de tasas */}
          <div className="mt-5 space-y-2 text-sm text-graphite">
            {currency !== "USD" && rates.status === "loading" && <p>{t(planner.loading)}</p>}
            {currency !== "USD" && (rates.status === "error" || (rates.status === "ready" && !converted)) && <p className="font-semibold text-terra-deep">{t(planner.unavailable)}</p>}
            {converted && (
              <p className="inline-flex flex-wrap items-center gap-2 rounded-full bg-sand px-3 py-1.5 font-semibold text-ink">
                <ArrowLeftRight aria-hidden="true" className="h-4 w-4 text-terra-deep" />
                <span className="tabular-nums">
                  1 USD = {new Intl.NumberFormat(locale, { maximumFractionDigits: rate! >= 100 ? 0 : 2, useGrouping: "always" as unknown as boolean }).format(rate!)} {currency}
                </span>
                {updated && (
                  <span className="font-normal text-graphite">
                    · {t(planner.updatedOn)}: {updated}
                  </span>
                )}
              </p>
            )}
            <p>{t(planner.approx)}</p>
            {currency !== "USD" && (
              <p>
                {t(planner.ratesBy)}{" "}
                <a href="https://www.exchangerate-api.com" target="_blank" rel="noopener noreferrer" className="font-semibold underline underline-offset-4">
                  Exchange Rate API
                </a>
              </p>
            )}
            <p>{t(planner.note)}</p>
          </div>
        </div>
      </article>
    </Modal>
  );
}
