import type { CostContent, L } from "@/types/content";

const l = (en: string, es: string): L => ({ en, es });

export const costMock: CostContent = {
  title: l("What things cost", "Cuánto cuestan las cosas"),
  intro: l(
    "El Salvador uses the US dollar, so there is no currency exchange if you arrive with dollars. These are everyday prices.",
    "El Salvador usa el dólar estadounidense, así que no hay cambio de moneda si llegas con dólares. Estos son precios del día a día.",
  ),
  bigStatCaption: l("A city bus ride", "Un viaje en bus urbano"),
  disclaimer: l(
    "Approximate prices. They change by place and season.",
    "Precios aproximados. Cambian según el lugar y la temporada.",
  ),
  items: [
    {
      id: "transport",
      label: l("Public transport", "Transporte público"),
      detail: l("Depends on the route", "Depende de la ruta"),
      icon: "bus",
      min: 0.25,
      max: 5.55,
      opensTransport: true,
    },
    { id: "food", label: l("Typical food", "Comida típica"), detail: l("Pupusas", "Pupusas"), icon: "utensils", min: 1.5, max: 2.5 },
    {
      id: "lunch",
      label: l("Lunch at a comedor", "Almuerzo en un comedor"),
      detail: l("a sit-down daily plate", "plato del día"),
      icon: "soup",
      min: 4,
      max: 8,
    },
    {
      id: "phone",
      label: l("Mobile data", "Datos móviles"),
      detail: l("prepaid SIM, short packs to 30-day plans", "SIM prepago, de paquetes cortos a planes de 30 días"),
      icon: "phone",
      min: 1,
      max: 13,
    },
    {
      id: "boat",
      label: l("Boat ride on a lake", "Paseo en lancha en un lago"),
      detail: l("per person, by route", "por persona, según el recorrido"),
      icon: "ship",
      min: 3,
      max: 10,
    },
    {
      id: "entry",
      label: l("Park and site entry", "Entrada a parques y sitios"),
      detail: l("museums, waterfalls, ruins", "museos, cascadas, ruinas"),
      icon: "ticket",
      min: 1,
      max: 5,
    },
  ],
  transport: {
    title: l("Getting around", "Cómo moverte"),
    intro: l(
      "Fares depend on distance. A short ride in the city costs a quarter; crossing the country can cost several dollars.",
      "Las tarifas dependen de la distancia. Un viaje corto en la ciudad cuesta un cuarto de dólar; cruzar el país puede costar varios dólares.",
    ),
    scaleMax: 6,
    tiers: [
      { id: "urban", label: l("City bus", "Bus urbano"), detail: l("Within a city", "Dentro de la ciudad"), min: 0.25, max: 0.35, accent: "mint" },
      {
        id: "inter",
        label: l("Nearby towns", "Pueblos cercanos"),
        detail: l("Short intercity routes", "Rutas interurbanas cortas"),
        min: 0.5,
        max: 1,
        accent: "blue",
      },
      {
        id: "dept",
        label: l("Between departments", "Entre departamentos"),
        detail: l("For example, Morazán or San Miguel to San Salvador", "Por ejemplo, de Morazán o San Miguel a San Salvador"),
        min: 1,
        max: 5.55,
        accent: "tangerine",
      },
      {
        id: "taxi",
        label: l("Taxi or Uber", "Taxi o Uber"),
        detail: l("Depends on distance and area", "Depende de la distancia y la zona"),
        min: 1.5,
        max: 6,
        openEnded: true,
        accent: "coral",
      },
    ],
    examplesTitle: l("Fares people have reported", "Tarifas reportadas"),
    examples: [
      { label: l("San Ignacio to Río Chiquito (for El Pital)", "San Ignacio a Río Chiquito (para El Pital)"), value: l("$1.35", "$1.35") },
      { label: l("San Salvador to Usulután, route 302", "San Salvador a Usulután, ruta 302"), value: l("about $1.54", "unos $1.54") },
    ],
    note: l(
      "Locals call 25¢ “una cora”, so two coras is 50¢.",
      "Aquí a 25 centavos le dicen “una cora”, así que dos coras son 50 centavos.",
    ),
  },
};
