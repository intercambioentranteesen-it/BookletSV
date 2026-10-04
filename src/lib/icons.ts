import {
  Briefcase,
  Bus,
  House,
  PlaneLanding,
  Ship,
  Smartphone,
  Soup,
  Ticket,
  UsersRound,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import type { CostIconKey, JourneyIconKey } from "@/types/content";

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
};
