import {
  Award,
  Banknote,
  Briefcase,
  Bus,
  Clock,
  Compass,
  House,
  Languages,
  Lightbulb,
  PlaneLanding,
  Plug,
  Ship,
  Smartphone,
  Soup,
  Sun,
  Ticket,
  UsersRound,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import type { CostIconKey, FactIconKey, JourneyIconKey } from "@/types/content";

export const COST_ICONS: Record<CostIconKey, LucideIcon> = {
  bus: Bus,
  utensils: UtensilsCrossed,
  soup: Soup,
  phone: Smartphone,
  ship: Ship,
  ticket: Ticket,
};

export const JOURNEY_ICONS: Record<JourneyIconKey, LucideIcon> = {
  plane: PlaneLanding,
  home: House,
  buddy: UsersRound,
  briefcase: Briefcase,
  lead: Lightbulb,
  outing: Compass,
  award: Award,
  meal: UtensilsCrossed,
};

export const FACT_ICONS: Record<FactIconKey, LucideIcon> = {
  money: Banknote,
  language: Languages,
  clock: Clock,
  plug: Plug,
  sun: Sun,
};
