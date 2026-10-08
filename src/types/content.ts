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

export interface CostContent {
  title: L;
  intro: L;
  bigStatCaption: L;
  disclaimer: L;
  items: CostItem[];
  planner?: { title: L; intro: L; totalLabel: L; perWeek: L; note: L };
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

export type FactIconKey = "money" | "language" | "clock" | "plug" | "sun";
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
  explore: { title: L; intro: L; zones: Zone[]; experiences: Experience[] };
  flavors: FlavorsContent;
  cost: CostContent;
  journey: JourneyContent;
  goals: GoalsContent;
  closing: ClosingContent;
  /** Lema del comité. */
  motto: MottoContent;
  /** Se arma solo con las fotos que tienen `credit`. */
  credits: PhotoCredit[];
}
