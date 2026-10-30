/**
 * Contratos de contenido.
 * Todo texto visible es `L` ({ en, es }). En la Fase 2 el CMS debe devolver estas mismas formas.
 * Los componentes visuales nunca importan data mock: la reciben por props.
 */
export type Lang = "en" | "es";
export interface L {
  en: string;
  es: string;
}

export type ZoneId = "coast" | "west" | "center" | "north" | "east";
export type ZoneAccent = "terra" | "copper" | "charcoal" | "rust" | "clay";
export type ShapeKind = "triangle" | "circle" | "rect" | "quarter";

export interface Zone {
  id: ZoneId;
  name: L;
  blurb: L;
  accent: ZoneAccent;
  shape: ShapeKind;
}

export interface Stat {
  value: number;
  unit: L;
  label: L;
}

export interface Stop {
  id: string;
  name: L;
  what: L;
  tip?: L;
  /** Aviso destacado (p. ej. sitios de memoria). */
  notice?: L;
  image?: string;
  credit?: string;
}

export interface Experience {
  id: string;
  zone: ZoneId;
  title: L;
  hook: L;
  intro: L;
  tags: L[];
  stops: Stop[];
  stat?: Stat;
  image?: string;
  /** Crédito de la foto, tal como debe mostrarse (obligatorio con CC BY). */
  credit?: string;
}

export type CostIconKey = "bus" | "utensils" | "soup" | "phone" | "ship" | "ticket";
/** Cómo entra un renglón en "Arma tu semana". */
export interface CostPlan {
  qty: number;
  maxQty: number;
  unit: L;
  /** Si se indican, reemplazan el rango del renglón en el cálculo (p. ej. bus urbano). */
  priceMin?: number;
  priceMax?: number;
}

export interface CostItem {
  id: string;
  label: L;
  detail?: L;
  icon: CostIconKey;
  min: number;
  max: number;
  /** Muestra "Desde $min" y abre el modal de transporte. */
  opensTransport?: boolean;
  plan?: CostPlan;
}

export interface TransportTier {
  id: string;
  label: L;
  detail?: L;
  min: number;
  max: number;
  /** Sin tope: el precio sube con la distancia. */
  openEnded?: boolean;
  accent: ZoneAccent;
}

export interface CurrencyOption {
  code: string;
  name: L;
}

export interface CostContent {
  title: L;
  intro: L;
  bigStatCaption: L;
  disclaimer: L;
  items: CostItem[];
  planner?: {
    title: L;
    intro: L;
    totalLabel: L;
    perWeek: L;
    note: L;
    /** Texto del botón que abre la calculadora y su frase de apoyo. */
    button: L;
    buttonHint: L;
    currencyLabel: L;
    approx: L;
    updatedOn: L;
    ratesBy: L;
    unavailable: L;
    loading: L;
    copy: L;
    copied: L;
    /** Monedas disponibles (el dólar es la base). Se editan aquí o en el CMS. */
    currencies: CurrencyOption[];
  };
  transport: {
    title: L;
    intro: L;
    scaleMax: number;
    tiers: TransportTier[];
    examplesTitle: L;
    examples: { label: L; value: L }[];
    note: L;
  };
}

export type JourneyIconKey = "plane" | "home" | "buddy" | "briefcase" | "lead" | "outing" | "award" | "meal";
export interface JourneyStep {
  id: string;
  icon: JourneyIconKey;
  shape: ShapeKind;
  accent: ZoneAccent;
  title: L;
  text: L;
  /** true = no se muestra hasta que ICX confirme que ESEN lo ofrece. */
  hidden?: boolean;
}
export interface JourneyContent {
  title: L;
  intro: L;
  varies: L;
  steps: JourneyStep[];
}

export interface GoalItem {
  id: string;
  number: number;
  name: L;
  /** Meta oficial de la ONU, parafraseada. */
  official: L;
  /** Cómo se ve en El Salvador (texto editable por el comité). */
  inPractice: L;
  /** Ícono oficial por idioma (public/ods/...). Si falta, se muestra un recuadro provisional con el color del ODS. */
  image?: Partial<Record<Lang, string>>;
  /** Color oficial del ODS (solo para el recuadro provisional). */
  color: string;
  /** true = no se muestra hasta confirmar con el comité y tener el ícono oficial. */
  hidden?: boolean;
}

export interface GoalsContent {
  title: L;
  intro: L;
  disclaimer: L;
  items: GoalItem[];
}

export type FactIconKey = "flag" | "money" | "language" | "clock" | "plug" | "sun";
export interface QuickFact {
  id: string;
  icon: FactIconKey;
  label: L;
  value: L;
}
export interface QuickFactsContent {
  title: L;
  items: QuickFact[];
}

export interface Dish {
  id: string;
  name: L;
  kind: L;
  text: L;
  tip?: L;
  accent: ZoneAccent;
  shape: ShapeKind;
  image?: string;
  credit?: string;
}
export interface Festival {
  id: string;
  /** Mes (texto corto) y, si la fecha es exacta, el día. */
  month: L;
  day?: string;
  title: L;
  where?: L;
  text: L;
  /** Detalle extra: se muestra al abrir "Más detalles" (el resumen de `text` siempre está a la vista). */
  details?: L;
  /** Aviso importante (seguridad, cuidados): siempre visible, nunca dentro del desplegable. */
  notice?: L;
}
export interface FlavorsContent {
  title: L;
  intro: L;
  dishesTitle: L;
  dishes: Dish[];
  festivalsTitle: L;
  festivalsIntro: L;
  festivals: Festival[];
}

export interface HeroContent {
  organization: L;
  subOrganization: L;
  line1: L;
  line2: L;
  subtitle: L;
  cta: L;
  image?: string;
}

export interface ClosingContent {
  title: L;
  text: L;
  channels: { label: L; href: string }[];
}

export interface MottoContent {
  title: L;
  /** Frase que le da sentido al lema para quien visita. */
  body: L;
  note: L;
}

export interface PhotoCredit {
  id: string;
  label: L;
  credit: string;
}

export interface SiteContent {
  hero: HeroContent;
  quickFacts: QuickFactsContent;
  explore: { title: L; intro: L; zones: Zone[]; experiences: Experience[]; /** Ubicación de cada experiencia en el mapa. */ geo?: Record<string, { lat: number; lon: number }> };
  flavors: FlavorsContent;
  cost: CostContent;
  journey: JourneyContent;
  goals: GoalsContent;
  closing: ClosingContent;
  /** Lema del comité. */
  motto: MottoContent;
  /** Quiénes somos: organigrama del comité. */
  team: TeamContent;
  /** Se arma solo con las fotos que tienen `credit`. */
  credits: PhotoCredit[];
}

/* ── Quiénes somos (organigrama) ── */
/** Universidad de la persona (así viene en la tabla de roles del comité). */
export type SchoolId = "ESEN" | "UCA" | "UGB" | "UNIVO";

export interface TeamPerson {
  id: string;
  name: string;
  role: L;
  /** Ruta de la foto (ej. /fotos/equipo/ana.jpg). Sin foto se muestran las iniciales. */
  photo?: string;
  /** Debe ser true para que la persona se publique (permiso por escrito). Si es false, no aparece en el sitio. */
  consent: boolean;
  /** Enlace opcional (red social profesional). */
  link?: string;
  /** Universidad, si se conoce. */
  school?: SchoolId;
}
export interface TeamArea {
  id: string;
  name: L;
  blurb?: L;
  accent: ZoneAccent;
  /** Puede faltar: si la persona no tiene permiso, el servidor no la envía. */
  lead?: TeamPerson;
  members: TeamPerson[];
}
export interface TeamContent {
  title: L;
  intro: L;
  /** Si es true se muestra la etiqueta de "datos de ejemplo". Quitar cuando haya datos reales. */
  sample?: boolean;
  labels: { sample: L; hint: L; lcp: L; lcvp: L; team: L; pick: L; empty: L; preview: L };
  lcp?: TeamPerson;
  areas: TeamArea[];
  /** Solo en vista previa (TEAM_SHOW_ALL=1): cuántas personas se muestran sin permiso confirmado. */
  pendingConsent?: number;
}
