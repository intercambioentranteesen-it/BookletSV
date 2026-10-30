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
    team: l("About us", "Nosotros"),
    label: l("Main", "Principal"),
    openMenu: l("Open menu", "Abrir menú"),
    closeMenu: l("Close menu", "Cerrar menú"),
  },
  langLabel: l("Language", "Idioma"),
  close: l("Close", "Cerrar"),
  zoomPhoto: l("Enlarge photo", "Ampliar foto"),
  photoCount: l("Photo {n} of {total}", "Foto {n} de {total}"),
  photoCredit: l("Photo", "Foto"),
  viewDetails: l("See details", "Ver detalles"),
  department: l("Department", "Departamento"),
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
  photoCredits: l("Photo credits", "Créditos de fotografía"),
  each: l("each", "c/u"),
  fewer: l("Fewer", "Menos"),
  more: l("More", "Más"),
  factsLabel: l("Quick facts about El Salvador", "Datos rápidos de El Salvador"),
  dishesAlt: l("Dish", "Platillo"),
  inPractice: l("In El Salvador", "En El Salvador"),
  resume: {
    text: l("Pick up where you left off:", "Continúa donde te quedaste:"),
    go: l("Go", "Ir"),
  },
  moreDetails: l("More details", "Más detalles"),
  lessDetails: l("Fewer details", "Menos detalles"),
  mapGuide: {
    help: l("How to use the map", "Cómo usar el mapa"),
    gotIt: l("Got it", "Entendido"),
    steps: [
      {
        title: l("Pick a zone", "Elige una zona"),
        text: l(
          "Each shape and color is a region of the country. Use the zone buttons under the map, or tap a pin.",
          "Cada forma y color es una región del país. Usa los botones de zona debajo del mapa o toca un pin.",
        ),
      },
      {
        title: l("Tap a pin", "Toca un pin"),
        text: l(
          "A preview opens with a photo and a short summary. On a computer, hover a pin to see its name.",
          "Se abre una vista previa con foto y resumen. En computadora, pasa el cursor sobre un pin para ver su nombre.",
        ),
      },
      {
        title: l("See the details", "Mira los detalles"),
        text: l(
          "Press “See details” to open the full experience: its stops, tips and photos.",
          "Pulsa «Ver detalles» para abrir la experiencia completa: paradas, consejos y fotos.",
        ),
      },
    ],
  },
  logoAlt: l("Alchemist ESEN, El Salvador", "Alchemist ESEN, El Salvador"),
};

export function fmtN(s: string, n: number): string {
  return s.replace("{n}", String(n));
}
