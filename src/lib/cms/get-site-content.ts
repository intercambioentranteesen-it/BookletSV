import { costMock } from "@/data/mock/cost-of-living";
import { experiencesMock, zonesMock } from "@/data/mock/explore";
import { flavorsMock } from "@/data/mock/flavors";
import { goalsMock } from "@/data/mock/goals";
import { quickFactsMock } from "@/data/mock/quick-facts";
import { closingMock, heroMock, journeyMock } from "@/data/mock/site";
import type { L, SiteContent } from "@/types/content";

const l = (en: string, es: string): L => ({ en, es });

/**
 * ÚNICO punto que cambia en la Fase 2: reemplazar los mocks por el fetch al CMS.
 * Los componentes reciben este objeto por props y no conocen el origen de los datos.
 */
export async function getSiteContent(): Promise<SiteContent> {
  return {
    hero: heroMock,
    quickFacts: quickFactsMock,
    explore: {
      title: l("Explore El Salvador", "Explora El Salvador"),
      intro: l(
        "Pick a zone, then open a card to see its stops.",
        "Elige una zona y abre una tarjeta para ver sus paradas.",
      ),
      zones: zonesMock,
      experiences: experiencesMock,
    },
    flavors: flavorsMock,
    cost: costMock,
    journey: journeyMock,
    goals: goalsMock,
    closing: closingMock,
  };
}
