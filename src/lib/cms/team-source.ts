import type { TeamArea, TeamContent, TeamPerson } from "@/types/content";

/**
 * De dónde salen las personas del equipo, y cómo se filtran por permiso. SOLO CORRE EN EL SERVIDOR.
 *
 * Por qué así: todo lo que un componente de React recibe por props viaja dentro de la página y se puede leer con "ver código
 * fuente", aunque no se dibuje. Por eso los nombres reales no están en el código, y la gente sin permiso se descarta AQUÍ,
 * antes de armar el contenido: lo que no sale del servidor, no se puede filtrar.
 *
 * Fuentes, en orden:
 *   1. TEAM_DATA        variable de entorno con el JSON en una línea (Vercel → Settings → Environment Variables).
 *   2. data/private/team.json   archivo local (ignorado por git), para trabajar en tu computadora.
 *   3. El equipo de ejemplo de data/mock/team.ts (nombres inventados).
 *
 * TEAM_SHOW_ALL=1 (solo en tu .env.local) muestra a todos para probar el diseño, y avisa que faltan permisos.
 * En Vercel no se define, y entonces se publica únicamente a quien tenga `consent: true`.
 */
export interface TeamPeople {
  lcp?: TeamPerson;
  areas: Record<string, { lead?: TeamPerson; members?: TeamPerson[] }>;
}

const isStr = (v: unknown): v is string => typeof v === "string" && v.length > 0;
const isL = (v: unknown): boolean => !!v && typeof v === "object" && isStr((v as { en?: unknown }).en) && isStr((v as { es?: unknown }).es);
const SCHOOLS = new Set(["ESEN", "UCA", "UGB", "UNIVO"]);

function validPerson(v: unknown): v is TeamPerson {
  if (!v || typeof v !== "object") return false;
  const p = v as Record<string, unknown>;
  return isStr(p.id) && isStr(p.name) && isL(p.role) && typeof p.consent === "boolean" && (p.school === undefined || SCHOOLS.has(String(p.school)));
}

/** Revisa la forma del JSON para que un dato mal escrito no tumbe el sitio: si algo está mal, se usa el ejemplo y se avisa en la consola. */
export function parsePeople(raw: unknown): TeamPeople | null {
  if (!raw || typeof raw !== "object") return null;
  const r = raw as { lcp?: unknown; areas?: unknown };
  if (!r.areas || typeof r.areas !== "object") return null;
  const out: TeamPeople = { areas: {} };
  if (r.lcp !== undefined) {
    if (!validPerson(r.lcp)) return null;
    out.lcp = r.lcp;
  }
  for (const [id, a] of Object.entries(r.areas as Record<string, { lead?: unknown; members?: unknown }>)) {
    if (a.lead !== undefined && !validPerson(a.lead)) return null;
    if (a.members !== undefined && !(Array.isArray(a.members) && a.members.every(validPerson))) return null;
    out.areas[id] = { lead: a.lead as TeamPerson | undefined, members: a.members as TeamPerson[] | undefined };
  }
  return out;
}

/** Algunos editores de Windows (el Bloc de notas, PowerShell) guardan el JSON con una marca invisible al inicio (BOM) que rompe la lectura. */
const stripBom = (text: string) => text.replace(/^\uFEFF/, "");

export async function loadTeamPeople(): Promise<TeamPeople | null> {
  let raw: unknown = null;
  let source = "ninguna";
  try {
    if (process.env.TEAM_DATA) {
      source = `variable TEAM_DATA (${process.env.TEAM_DATA.length} caracteres)`;
      raw = JSON.parse(stripBom(process.env.TEAM_DATA));
    } else if (typeof window === "undefined") {
      // Archivo local, solo para desarrollo. En Vercel no existe (no está en git) y se usa TEAM_DATA.
      const [fs, path] = await Promise.all([import("fs"), import("path")]);
      const file = path.join(process.cwd(), "data", "private", "team.json");
      if (fs.existsSync(file)) {
        source = "archivo data/private/team.json";
        raw = JSON.parse(stripBom(fs.readFileSync(file, "utf8")));
      }
    }
  } catch (e) {
    console.error(`[team] No se pudo leer los datos del equipo (fuente: ${source}):`, e instanceof Error ? e.message : e);
    return null;
  }
  if (raw === null) {
    // Sin nombres ni datos: solo dice qué pasó, para poder diagnosticar en el registro de la compilación
    const env = process.env.TEAM_DATA === undefined ? "no existe" : "está vacía";
    console.log(`[team] Sin datos privados (TEAM_DATA ${env} y no hay archivo local): se usa el equipo de ejemplo.`);
    return null;
  }
  const people = parsePeople(raw);
  if (!people) console.error(`[team] Los datos del equipo no tienen el formato esperado (fuente: ${source}); se usa el equipo de ejemplo.`);
  else console.log(`[team] Fuente: ${source}.`);
  return people;
}

/**
 * Arma el equipo que SÍ puede viajar al navegador: pone a las personas reales en las áreas del código y descarta a quien
 * no tenga permiso (salvo en vista previa). Lo descartado no se incluye en ninguna parte del resultado.
 */
export function applyTeam(base: TeamContent, people: TeamPeople | null, showAll: boolean): TeamContent {
  if (!people) return base;
  let pending = 0;
  const keep = (p?: TeamPerson): TeamPerson | undefined => {
    if (!p) return undefined;
    if (p.consent) return p;
    if (showAll) {
      pending++;
      return p;
    }
    return undefined;
  };
  const areas: TeamArea[] = base.areas.map((a) => {
    const src = people.areas[a.id];
    return {
      ...a,
      lead: keep(src?.lead),
      members: (src?.members ?? []).map(keep).filter((m): m is TeamPerson => !!m),
    };
  });
  return { ...base, sample: false, lcp: keep(people.lcp), areas, pendingConsent: showAll ? pending : undefined };
}

export async function buildTeam(base: TeamContent): Promise<TeamContent> {
  const showAll = process.env.TEAM_SHOW_ALL === "1";
  const people = await loadTeamPeople();
  const team = applyTeam(base, people, showAll);
  if (people) {
    const published = [team.lcp, ...team.areas.flatMap((a) => [a.lead, ...a.members])].filter(Boolean).length;
    console.log(`[team] Personas que se publican: ${published}${showAll ? " (vista previa: todas)" : " (solo con permiso)"}.`);
  }
  return team;
}
