import type { GoalsContent, L } from "@/types/content";

const l = (en: string, es: string): L => ({ en, es });

/**
 * ODS con los que trabaja el comité hasta ahora: 4, 13 y 17.
 * Más el 14 (limpieza de playas). Íconos oficiales de la ONU en SVG, sin modificar, en español e inglés
 * (public/ods/es y public/ods/en). Descarga oficial: la página de materiales de comunicación de los ODS de la ONU.
 */
export const goalsMock: GoalsContent = {
  title: l("The goals we work toward", "Los objetivos en los que trabajamos"),
  intro: l(
    "AIESEC projects connect to the UN Sustainable Development Goals. These are the ones we have worked with in El Salvador so far.",
    "Los proyectos de AIESEC se conectan con los Objetivos de Desarrollo Sostenible de la ONU. Estos son los que hemos trabajado hasta ahora en El Salvador.",
  ),
  disclaimer: l(
    "The content of this page has not been approved by the United Nations and does not reflect the views of the United Nations or its officials or Member States.",
    "El contenido de esta página no ha sido aprobado por las Naciones Unidas y no refleja las opiniones de la ONU, de sus funcionarios ni de sus Estados Miembros.",
  ),
  items: [
    {
      id: "sdg-4",
      number: 4,
      name: l("Quality Education", "Educación de calidad"),
      official: l(
        "Ensure inclusive and equitable quality education and promote lifelong learning for everyone.",
        "Garantizar una educación inclusiva, equitativa y de calidad, y promover oportunidades de aprendizaje durante toda la vida para todos.",
      ),
      inPractice: l(
        "Volunteers join teaching and learning projects with local partner organizations.",
        "Los voluntarios se suman a proyectos de enseñanza y aprendizaje con organizaciones aliadas locales.",
      ),
      image: { en: "/ods/en/ods-04.svg", es: "/ods/es/ods-04.svg" },
      color: "#C5192D",
    },
    {
      id: "sdg-13",
      number: 13,
      name: l("Climate Action", "Acción por el clima"),
      official: l(
        "Take urgent action to combat climate change and its impacts.",
        "Adoptar medidas urgentes para combatir el cambio climático y sus efectos.",
      ),
      inPractice: l(
        "Environmental projects, such as reforestation and climate awareness in local communities.",
        "Proyectos ambientales, como reforestación y sensibilización sobre el clima en comunidades locales.",
      ),
      image: { en: "/ods/en/ods-13.svg", es: "/ods/es/ods-13.svg" },
      color: "#3F7E44",
    },
    {
      id: "sdg-14",
      number: 14,
      name: l("Life Below Water", "Vida submarina"),
      official: l(
        "Conserve and sustainably use the oceans, seas and marine resources.",
        "Conservar y utilizar de forma sostenible los océanos, los mares y los recursos marinos.",
      ),
      inPractice: l(
        "Beach clean-ups and turtle releases together with local partners.",
        "Limpieza de playas y liberación de tortugas junto a aliados locales.",
      ),
      image: { en: "/ods/en/ods-14.svg", es: "/ods/es/ods-14.svg" },
      color: "#007DBB",
    },
    {
      id: "sdg-17",
      number: 17,
      name: l("Partnerships for the Goals", "Alianzas para lograr los objetivos"),
      official: l(
        "Strengthen the means of implementation and revitalize the global partnership for sustainable development.",
        "Fortalecer los medios de implementación y revitalizar la alianza mundial para el desarrollo sostenible.",
      ),
      inPractice: l(
        "Every project is built together with a local organization, school or company.",
        "Cada proyecto se construye junto a una organización, escuela o empresa local.",
      ),
      image: { en: "/ods/en/ods-17.svg", es: "/ods/es/ods-17.svg" },
      color: "#19486A",
    },
  ],
};
