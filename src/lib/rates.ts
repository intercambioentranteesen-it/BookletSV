"use client";

import { useEffect, useState } from "react";

export interface Rates {
  /** Fecha de la última actualización de la fuente (ISO), si la hay. */
  updated: string | null;
  /** Unidades de cada moneda por 1 USD. */
  rates: Record<string, number>;
}
export type RatesState = { status: "idle" | "loading" | "error" } | { status: "ready"; data: Rates };

let cache: Rates | null = null;

/** Pide las tasas una sola vez (cuando se abre la calculadora) y las recuerda mientras la página siga abierta. */
export function useRates(enabled: boolean): RatesState {
  const [state, setState] = useState<RatesState>(cache ? { status: "ready", data: cache } : { status: "idle" });

  useEffect(() => {
    if (!enabled || cache) return;
    let cancelled = false;
    setState({ status: "loading" });
    fetch("/api/rates")
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error("HTTP"))))
      .then((j: { updated?: string | null; rates?: Record<string, number> }) => {
        if (!j.rates) throw new Error("sin tasas");
        cache = { updated: j.updated ? new Date(j.updated).toISOString() : null, rates: j.rates };
        if (!cancelled) setState({ status: "ready", data: cache });
      })
      .catch(() => {
        if (!cancelled) setState({ status: "error" });
      });
    return () => {
      cancelled = true;
    };
  }, [enabled]);

  return state;
}

const BY_REGION: Record<string, string> = {
  CO: "COP", MX: "MXN", BR: "BRL", PE: "PEN", AR: "ARS", CL: "CLP", GB: "GBP", CA: "CAD", IN: "INR", EG: "EGP",
  DE: "EUR", FR: "EUR", IT: "EUR", ES: "EUR", PT: "EUR", NL: "EUR", BE: "EUR", AT: "EUR", IE: "EUR", FI: "EUR", GR: "EUR",
};

/** Moneda que le correspondería al visitante según el idioma y la región de su navegador (solo entre las disponibles). */
export function guessCurrency(allowed: string[]): string {
  try {
    const region = new Intl.Locale(navigator.language).maximize().region ?? navigator.language.split("-")[1];
    const code = region ? BY_REGION[region.toUpperCase()] : undefined;
    if (code && allowed.includes(code)) return code;
  } catch {
    /* sin información: se queda en dólares */
  }
  return "USD";
}

/** Monedas sin centavos en la práctica. */
const NO_DECIMALS = new Set(["COP", "CLP", "ARS", "INR", "EGP"]);

export function formatMoney(value: number, currency: string, locale: string): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    currencyDisplay: "code",
    maximumFractionDigits: NO_DECIMALS.has(currency) ? 0 : 2,
    minimumFractionDigits: NO_DECIMALS.has(currency) ? 0 : 2,
    // agrupa siempre los miles (8.000 y no 8000), para que todas las cifras se vean parejas
    useGrouping: "always" as unknown as boolean,
  }).format(value);
}
