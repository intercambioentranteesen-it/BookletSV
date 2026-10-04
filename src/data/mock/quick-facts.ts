import type { L, QuickFactsContent } from "@/types/content";

const l = (en: string, es: string): L => ({ en, es });

export const quickFactsMock: QuickFactsContent = {
  title: l("Quick facts about El Salvador", "Datos rápidos de El Salvador"),
  items: [
    { id: "money", icon: "money", label: l("Currency", "Moneda"), value: l("US dollar (USD)", "Dólar estadounidense (USD)") },
    { id: "language", icon: "language", label: l("Language", "Idioma"), value: l("Spanish", "Español") },
    { id: "time", icon: "clock", label: l("Time zone", "Zona horaria"), value: l("UTC−6, no daylight saving", "UTC−6, sin cambio de hora") },
    // Verificar con el comité: voltaje y temporadas vienen de conocimiento general, no de una fuente citada.
    { id: "power", icon: "plug", label: l("Power", "Electricidad"), value: l("120 V, plug types A and B", "120 V, enchufes tipo A y B") },
    { id: "seasons", icon: "sun", label: l("Seasons", "Temporadas"), value: l("Dry: Nov–Apr. Rainy: May–Oct", "Seca: nov–abr. Lluviosa: may–oct") },
  ],
};
