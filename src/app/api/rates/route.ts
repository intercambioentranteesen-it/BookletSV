import { NextResponse } from "next/server";

/**
 * Tasas de cambio con el dólar como base, para la calculadora de costos.
 * Fuente: el endpoint abierto de ExchangeRate-API (sin clave, se actualiza una vez al día; exige dar atribución,
 * que la calculadora muestra). Se guarda en caché 24 horas para no pedirlas a cada visita.
 * Revisar sus términos: https://www.exchangerate-api.com/terms
 * Si algún día falla, la calculadora sigue funcionando en dólares.
 */
export const revalidate = 86400;

export async function GET() {
  try {
    const res = await fetch("https://open.er-api.com/v6/latest/USD", { next: { revalidate: 86400 } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = (await res.json()) as { result?: string; time_last_update_utc?: string; rates?: Record<string, number> };
    if (json.result !== "success" || !json.rates) throw new Error("respuesta inesperada");
    return NextResponse.json(
      { updated: json.time_last_update_utc ?? null, rates: json.rates },
      { headers: { "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800" } },
    );
  } catch {
    return NextResponse.json({ error: "rates-unavailable" }, { status: 502 });
  }
}
