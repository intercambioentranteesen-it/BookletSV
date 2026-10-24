import type { L, TeamArea, TeamContent, TeamPerson } from "@/types/content";

const l = (en: string, es: string): L => ({ en, es });

/**
 * EQUIPO DE EJEMPLO (nombres inventados). Es lo que se ve si no hay datos reales configurados.
 *
 * Las personas REALES NO van aquí ni en ningún archivo del repositorio: viven en `data/private/team.json` (solo en tu
 * computadora, ignorado por git) y en la variable de entorno TEAM_DATA de Vercel. Ver `.env.example` y `lib/cms/team-source.ts`.
 * Aquí solo quedan lo que no es privado: los títulos, los textos y la lista de áreas con sus colores.
 */
const person = (id: string, name: string, role: L): TeamPerson => ({ id, name, role, consent: true });
const manager = (id: string, name: string) => person(id, name, l("Manager", "Manager"));
const member = (id: string, name: string) => person(id, name, l("Team Member", "Team Member"));

const areas: TeamArea[] = [
  {
    id: "icx",
    name: l("ICX", "ICX"),
    blurb: l("Incoming Exchange: welcoming people who come to El Salvador.", "Intercambio entrante: recibir a quienes vienen a El Salvador."),
    accent: "terra",
    lead: person("icx-lead", "Ana Ejemplo", l("LCVP ICX", "LCVP ICX")),
    members: [manager("icx-1", "Beto Ejemplo"), manager("icx-2", "Carla Ejemplo"), member("icx-3", "Diego Ejemplo")],
  },
  {
    id: "mxp",
    name: l("MXP", "MXP"),
    accent: "copper",
    lead: person("mxp-lead", "Gina Ejemplo", l("LCVP MXP", "LCVP MXP")),
    members: [manager("mxp-1", "Hugo Ejemplo"), member("mxp-2", "Irma Ejemplo")],
  },
  {
    id: "fnz",
    name: l("FIN", "FNZ"),
    blurb: l("Finance: keeping the numbers clear.", "Finanzas: mantener las cuentas claras."),
    accent: "charcoal",
    lead: person("fnz-lead", "Luis Ejemplo", l("LCVP FNZ", "LCVP FNZ")),
    members: [manager("fnz-1", "Marta Ejemplo")],
  },
  {
    id: "mkt",
    name: l("MKT", "MKT"),
    blurb: l("Marketing: telling our story.", "Marketing: contar nuestra historia."),
    accent: "rust",
    lead: person("mkt-lead", "Pablo Ejemplo", l("LCVP MKT", "LCVP MKT")),
    members: [manager("mkt-1", "Rosa Ejemplo"), member("mkt-2", "Saúl Ejemplo")],
  },
  {
    id: "ogx",
    name: l("OGX", "OGX"),
    blurb: l("Outgoing Exchange: helping people go abroad.", "Intercambio saliente: ayudar a otras personas a viajar."),
    accent: "clay",
    lead: person("ogx-lead", "Willy Ejemplo", l("LCVP OGX", "LCVP OGX")),
    members: [manager("ogx-1", "Ximena Ejemplo"), member("ogx-2", "Yael Ejemplo")],
  },
];

export const teamMock: TeamContent = {
  title: l("Who we are", "Quiénes somos"),
  intro: l("The team that welcomes you.", "El equipo que te recibe."),
  sample: true,
  labels: {
    sample: l("Sample data", "Datos de ejemplo"),
    hint: l("Pick a branch to meet each team.", "Elige una rama para conocer a cada equipo."),
    lcp: l("Local Committee President", "Presidente del comité local"),
    lcvp: l("Vice President", "Vicepresidente de área"),
    team: l("Team", "Equipo"),
    pick: l("Pick a branch: ICX, MXP, FIN, MKT or OGX.", "Elige una rama: ICX, MXP, FNZ, MKT u OGX."),
    empty: l("We will introduce this team soon.", "Pronto te presentaremos a este equipo."),
    preview: l("Preview: {n} people without confirmed permission (not shown on the live site)", "Vista previa: {n} personas sin permiso confirmado (no se muestran en el sitio publicado)"),
  },
  lcp: person("lcp", "Nora Ejemplo", l("LCP", "LCP")),
  areas,
};
