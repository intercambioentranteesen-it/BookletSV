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
export type ZoneAccent = "blue" | "mint" | "tangerine" | "ocean" | "coral";
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
}

export type CostIconKey = "bus" | "utensils" | "soup" | "phone" | "ship" | "ticket";
export interface CostItem {
  id: string;
  label: L;
  detail?: L;
  icon: CostIconKey;
  min: number;
  max: number;
  /** Muestra "Desde $min" y abre el modal de transporte. */
  opensTransport?: boolean;
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

export type JourneyIconKey = "plane" | "home" | "buddy" | "briefcase";
export interface JourneyStep {
  id: string;
  icon: JourneyIconKey;
  shape: ShapeKind;
  accent: ZoneAccent;
  title: L;
  text: L;
}
export interface JourneyContent {
  title: L;
  intro: L;
  varies: L;
  steps: JourneyStep[];
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

export interface SiteContent {
  hero: HeroContent;
  explore: { title: L; intro: L; zones: Zone[]; experiences: Experience[] };
  cost: CostContent;
  journey: JourneyContent;
  closing: ClosingContent;
}
