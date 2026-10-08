import type { L, MottoContent } from "@/types/content";

const l = (en: string, es: string): L => ({ en, es });

/** Lema de Alchemist (AIESEC en ESEN). Editable aquí, o desde el CMS en la Fase 2. */
export const mottoMock: MottoContent = {
  title: l("Turning rocks into gold", "Convirtiendo rocas en oro"),
  body: l(
    "In a land of volcanoes, every challenge is a rock that can turn into gold.",
    "En un país de volcanes, cada reto es una roca que puede volverse oro.",
  ),
  note: l("The motto of Alchemist, AIESEC in ESEN", "El lema de Alchemist, AIESEC en ESEN"),
};
