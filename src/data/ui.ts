import type { L } from "@/types/content";

const l = (en: string, es: string): L => ({ en, es });

/** Textos de interfaz (no son contenido editable del CMS). */
export const UI = {
  skip: l("Skip to content", "Saltar al contenido"),
  brand: { name: "AIESEC", suffix: l("in ESEN", "en ESEN"), sub: "Incoming Exchange" },
  nav: {
    explore: l("Explore", "Explora"),
    cost: l("Costs", "Costos"),
    journey: l("Your experience", "Tu experiencia"),
    flavors: l("Flavors", "Sabores"),
    goals: l("Goals", "Objetivos"),
    label: l("Main", "Principal"),
  },
  langLabel: l("Language", "Idioma"),
  close: l("Close", "Cerrar"),
  prev: l("Previous", "Anterior"),
  next: l("Next", "Siguiente"),
  stops: l("Stops", "Paradas"),
  stopsCount: l("{n} stops", "{n} paradas"),
  zones: l("Zones", "Zonas"),
  goodToKnow: l("Good to know", "Para tener en cuenta"),
  confirm: l(
    "Details change. Confirm hours, prices and access before you go.",
    "Los detalles cambian. Confirma horarios, precios y acceso antes de ir.",
  ),
  from: l("From", "Desde"),
  seeRoutes: l("See routes and fares", "Ver rutas y tarifas"),
  scaleLabel: l("Fare scale in US dollars", "Escala de tarifas en dólares"),
  moreWithDistance: l("goes up with distance", "sube con la distancia"),
  backToTop: l("Back to top", "Volver arriba"),
  experienceOpen: l("Open experience", "Abrir experiencia"),
  photoSlot: l("Photo", "Foto"),
  sdg: l("SDG", "ODS"),
  fewer: l("Fewer", "Menos"),
  more: l("More", "Más"),
  factsLabel: l("Quick facts about El Salvador", "Datos rápidos de El Salvador"),
  dishesAlt: l("Dish", "Platillo"),
  inPractice: l("In El Salvador", "En El Salvador"),
  logoAlt: l("Alchemist ESEN, El Salvador", "Alchemist ESEN, El Salvador"),
};

export function fmtN(s: string, n: number): string {
  return s.replace("{n}", String(n));
}
