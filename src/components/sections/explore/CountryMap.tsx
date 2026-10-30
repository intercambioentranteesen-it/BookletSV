"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { ShapeGlyph } from "@/components/brand/Shapes";
import { ZoomPhoto } from "@/components/brand/ZoomPhoto";
import { Lightbox } from "@/components/ui/Lightbox";
import { UI } from "@/data/ui";
import { ACCENT } from "@/lib/accent";
import { cn } from "@/lib/cn";
import { useLang } from "@/lib/i18n";
import { EASE_OUT } from "@/lib/motion";
import type { Experience, L, Zone, ZoneAccent, ZoneId } from "@/types/content";
import { CITIES, COUNTRY_PATH, DEPARTMENTS, LAKES, MAP, NEIGHBORS, UNITS_PER_KM, VOLCANOES, project, spread } from "./map-data";

const l = (en: string, es: string): L => ({ en, es });

// Rótulos de contexto (decorativos): qué hay alrededor del país
const CONTEXT: { id: string; text: L; x: number; y: number }[] = [
  { id: "gt", text: l("Guatemala", "Guatemala"), x: 140, y: 125 },
  { id: "hn", text: l("Honduras", "Honduras"), x: 740, y: 95 },
  { id: "pac", text: l("Pacific Ocean", "Océano Pacífico"), x: 470, y: 530 },
];

const PIN_COLOR: Record<ZoneAccent, string> = { terra: "#C3522C", copper: "#D98850", charcoal: "#2C2C2C", rust: "#8A3A1D", clay: "#C9735A" };
const SEA = "#E3DDD0";

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: { pathLength: 1, opacity: 1, transition: { duration: 1.4, delay: 0.3, ease: EASE_OUT } },
};
const fade = (delay: number) => ({
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.7, delay, ease: EASE_OUT } },
});
const drop = {
  hidden: { opacity: 0, scale: 0.2 },
  visible: (delay: number) => ({ opacity: 1, scale: 1, transition: { duration: 0.45, delay, ease: EASE_OUT } }),
};
// Espacio extra arriba para que el pin más al norte (El Pital) quepa completo
const TOP = 78;
const H = MAP.h + TOP;
const px = (v: number) => `${(v / MAP.w) * 100}%`;
const py = (v: number) => `${((v + TOP) / H) * 100}%`;
const pinStyle = { transformOrigin: "50% 100%" } as const;

interface CountryMapProps {
  zones: Zone[];
  experiences: Experience[];
  geo: Record<string, { lat: number; lon: number }>;
  activeZone: ZoneId;
  /** Se llama al tocar un pin por primera vez (para cambiar la zona activa). */
  onZone: (id: string) => void;
  /** Abre la ventana completa de la experiencia. */
  onPick: (id: string) => void;
}

/**
 * Mapa de El Salvador con las experiencias como pines (con la forma y el color de su zona). Los pines de la zona elegida
 * resaltan; al tocar uno se abre su ventana. Los vecinos, lagos, volcanes y ciudades son solo contexto. Debajo siguen las
 * pestañas y las tarjetas, que son la lista accesible.
 */
export function CountryMap({ zones, experiences, geo, activeZone, onZone, onPick }: CountryMapProps) {
  const { t } = useLang();
  const reduce = useReducedMotion();
  const [hover, setHover] = useState<string | null>(null);
  const [hoverDept, setHoverDept] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [zoom, setZoom] = useState(false);
  const pinRefs = useRef(new Map<string, HTMLButtonElement>());
  const goRef = useRef<HTMLButtonElement>(null);
  const zoneById = useMemo(() => new Map(zones.map((z) => [z.id, z])), [zones]);
  const expById = useMemo(() => new Map(experiences.map((e) => [e.id, e])), [experiences]);

  const points = useMemo(() => {
    const raw = experiences.filter((e) => geo[e.id]).map((e) => ({ id: e.id, ...project(geo[e.id].lon, geo[e.id].lat) }));
    return spread(raw, 84);
  }, [experiences, geo]);
  const hovered = points.find((p) => p.id === hover);

  useEffect(() => {
    if (!preview) return;
    goRef.current?.focus({ preventScroll: true });
    if (window.matchMedia("(max-width: 639px)").matches) goRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !zoom) {
        e.stopPropagation();
        const id = preview;
        setPreview(null);
        pinRefs.current.get(id)?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [preview, zoom]);
  const previewExp = preview ? expById.get(preview) : undefined;
  const previewZone = previewExp ? zoneById.get(previewExp.zone) : undefined;
  const previewPt = points.find((p) => p.id === preview);
  const volcanoes = VOLCANOES.map(([lon, lat]) => project(lon, lat));
  const cities = CITIES.map((c) => ({ ...c, ...project(c.lon, c.lat) }));

  return (
    <div className="mx-auto w-full max-w-4xl overflow-hidden rounded-card border-2 border-line shadow-[6px_6px_0_0_rgba(44,44,44,0.08)]" style={{ backgroundColor: SEA }}>
      <motion.div
        initial={reduce ? "visible" : "hidden"}
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        className="relative w-full [container-type:inline-size]"
        style={{ aspectRatio: `${MAP.w} / ${H}` }}
        onClick={(e) => {
          if (!(e.target as HTMLElement).closest("[data-keep]")) setPreview(null);
        }}
      >
        <svg viewBox={`0 0 ${MAP.w} ${H}`} aria-hidden="true" className="absolute inset-0 h-full w-full">
          <defs>
            <pattern id="map-hatch" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="9" stroke="#EDE7DA" strokeWidth="3" />
            </pattern>
          </defs>

          <g transform={`translate(0 ${TOP})`}>
          {/* vecinos */}
          <motion.g variants={fade(0)} fill="#D5CDBC" stroke="#BDB5A3" strokeWidth="1.5" strokeLinejoin="round">
            <path d={NEIGHBORS.GTM} />
            <path d={NEIGHBORS.HND} />
            <path d={NEIGHBORS.NIC} />
          </motion.g>

          {/* el país: sombra de papel, relleno con trama, división política, lagos y volcanes */}
          <motion.g variants={fade(0.5)}>
            <path d={COUNTRY_PATH} transform="translate(6 8)" fill="#2C2C2C" opacity="0.14" />
            <path d={COUNTRY_PATH} fill="#F8F6F2" />
            <path d={COUNTRY_PATH} fill="url(#map-hatch)" pointerEvents="none" />
            {DEPARTMENTS.map((dep) => (
              <path
                key={dep.id}
                d={dep.d}
                fill={hoverDept === dep.id ? "rgba(195,82,44,0.16)" : "rgba(0,0,0,0)"}
                stroke="#B9B2A2"
                strokeWidth="1.4"
                strokeLinejoin="round"
                pointerEvents="all"
                className="transition-[fill] duration-200"
                onPointerEnter={() => setHoverDept(dep.id)}
                onPointerLeave={() => setHoverDept(null)}
              />
            ))}
            {LAKES.map((lk, i) => {
              const c = project(lk.lon, lk.lat);
              return <ellipse key={i} cx={c.x} cy={c.y} rx={lk.rx} ry={lk.ry} transform={`rotate(${lk.rot} ${c.x} ${c.y})`} fill={SEA} stroke="#B9B2A2" strokeWidth="1.5" pointerEvents="none" />;
            })}
            {volcanoes.map((v, i) => (
              <path key={i} d={`M${v.x - 10} ${v.y + 7} L${v.x - 3.5} ${v.y - 8} L${v.x} ${v.y - 5} L${v.x + 3.5} ${v.y - 8} L${v.x + 10} ${v.y + 7} Z`} fill="#D9D2C3" stroke="#8E8878" strokeWidth="1.4" strokeLinejoin="round" pointerEvents="none" />
            ))}
          </motion.g>
          <motion.path d={COUNTRY_PATH} variants={draw} fill="none" stroke="#2C2C2C" strokeWidth={2.6} strokeLinejoin="round" />
          </g>
        </svg>

        {/* Rótulos de contexto y ciudades (decorativos) */}
        {CONTEXT.map((c) => (
          <span key={c.id} aria-hidden="true" className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-[clamp(10px,1.9cqw,17px)] italic text-maplabel" style={{ left: px(c.x), top: py(c.y) }}>
            {t(c.text)}
          </span>
        ))}
        {/* Nombres de los departamentos (la división política); resaltan al pasar el cursor */}
        {DEPARTMENTS.map((dep) => (
          <span
            key={dep.id}
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute hidden -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-[clamp(8px,1.2cqw,12px)] font-bold uppercase tracking-[0.1em] transition-colors duration-200 md:block",
              hoverDept === dep.id ? "font-extrabold text-ink" : "text-maplabel",
            )}
            style={{ left: px(dep.cx), top: py(dep.cy) }}
          >
            {dep.name}
          </span>
        ))}
        {cities.map((c) => (
          <span
            key={c.name}
            aria-hidden="true"
            className={cn("pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-ink", c.capital ? "h-[clamp(9px,1.5cqw,14px)] w-[clamp(9px,1.5cqw,14px)] bg-parchment" : "h-[clamp(6px,1cqw,9px)] w-[clamp(6px,1cqw,9px)] bg-ink")}
            style={{ left: px(c.x), top: py(c.y) }}
          />
        ))}

        {/* Rosa de los vientos y escala (la escala sale de la proyección real) */}
        <div aria-hidden="true" className="pointer-events-none absolute left-[2.5%] top-[4%] flex flex-col items-center gap-0.5 text-[clamp(9px,1.5cqw,13px)] font-extrabold text-ink">
          <span>N</span>
          <span className="block h-[clamp(14px,3cqw,26px)] w-[clamp(7px,1.3cqw,12px)] bg-ink [clip-path:polygon(50%_0,100%_100%,50%_72%,0_100%)]" />
        </div>
        <div aria-hidden="true" className="pointer-events-none absolute bottom-[4%] left-[3%] text-[clamp(9px,1.5cqw,13px)] font-semibold text-ink">
          <span className="block border-x-2 border-b-2 border-ink" style={{ width: `${((50 * UNITS_PER_KM) / MAP.w) * 100 * (100 / 100)}cqw`, height: 7 }} />
          <span className="mt-0.5 block">50 km</span>
        </div>

        {/* Pines de las experiencias */}
        {points.map((pt, i) => {
          const exp = expById.get(pt.id);
          const zone = exp ? zoneById.get(exp.zone) : undefined;
          if (!exp || !zone) return null;
          const active = exp.zone === activeZone;
          return (
            <div
              key={pt.id}
              className={cn("absolute origin-bottom -translate-x-1/2 -translate-y-full transition-[opacity,transform] duration-300", active ? "opacity-100" : "scale-90 opacity-80 hover:scale-100 hover:opacity-100 focus-within:scale-100 focus-within:opacity-100")}
              style={{ left: px(pt.x), top: py(pt.y), zIndex: hover === pt.id || preview === pt.id ? 30 : active ? 20 : 10 }}
            >
              <motion.button
                type="button"
                variants={drop}
                custom={1 + i * 0.07}
                aria-haspopup="dialog"
                aria-label={`${t(exp.title)}, ${t(zone.name)}`}
                ref={(el) => {
                  if (el) pinRefs.current.set(pt.id, el);
                  else pinRefs.current.delete(pt.id);
                }}
                data-keep
                aria-expanded={preview === pt.id}
                onClick={() => {
                  if (preview === pt.id) onPick(pt.id);
                  else {
                    setPreview(pt.id);
                    onZone(pt.id);
                  }
                }}
                onMouseEnter={() => setHover(pt.id)}
                onMouseLeave={() => setHover(null)}
                onFocus={() => setHover(pt.id)}
                onBlur={() => setHover(null)}
                whileHover={reduce ? undefined : { scale: 1.14 }}
                whileTap={reduce ? undefined : { scale: 0.94 }}
                style={pinStyle}
                className="relative block h-[40px] w-[34px] before:absolute before:-inset-2 before:content-[''] sm:h-[52px] sm:w-[44px]"
              >
                {/* anillo que se expande una vez al elegir la zona */}
                {active && !reduce && (
                  <span aria-hidden="true" className="absolute left-1/2 top-[37.5%] block h-[65%] w-[82%] -translate-x-1/2 -translate-y-1/2">
                    <span key={activeZone} className="map-ping block h-full w-full rounded-full border-2" style={{ borderColor: PIN_COLOR[zone.accent] }} />
                  </span>
                )}
                <svg viewBox="0 0 44 56" aria-hidden="true" className="absolute inset-0 h-full w-full drop-shadow-[0_3px_3px_rgba(44,44,44,0.35)]">
                  <path d="M22 54 C22 54 4 34 4 21 A18 18 0 1 1 40 21 C40 34 22 54 22 54 Z" fill={PIN_COLOR[zone.accent]} stroke="#fff" strokeWidth="3" strokeLinejoin="round" />
                  <circle cx="22" cy="21" r="11.5" fill="#fff" />
                </svg>
                <ShapeGlyph kind={zone.shape} centered className={cn("absolute left-1/2 top-[37.5%] h-[34%] w-[34%] -translate-x-1/2 -translate-y-1/2", ACCENT[zone.accent].text)} />
              </motion.button>
            </div>
          );
        })}

        <AnimatePresence>
          {hovered && !previewExp && expById.get(hovered.id) && (
            <div key={hovered.id} className="pointer-events-none absolute z-40 -translate-x-1/2 -translate-y-full" style={{ left: px(hovered.x), top: `calc(${py(hovered.y)} - 62px)` }}>
              <motion.div
                role="tooltip"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="whitespace-nowrap rounded-control bg-ink px-3 py-2 text-center text-caption leading-tight text-parchment shadow-lg"
              >
                <span className="block font-extrabold">{t(expById.get(hovered.id)!.title)}</span>
                <span className="block text-parchment/80">{t(zoneById.get(expById.get(hovered.id)!.zone)!.name)}</span>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Vista previa de la experiencia: foto ampliable, resumen y el botón que abre la ventana completa.
          En celular va debajo del mapa (cabe completa); en pantallas grandes flota sobre él. */}
        <AnimatePresence>
          {previewExp && previewZone && previewPt && (
            <motion.div
              key={previewExp.id}
              data-keep
              role="group"
              aria-label={t(previewExp.title)}
              initial={{ opacity: 0, transform: "translateY(14px)" }}
              animate={{ opacity: 1, transform: "translateY(0px)", transition: { duration: 0.28, ease: EASE_OUT } }}
              exit={{ opacity: 0, transition: { duration: 0.12 } }}
              className={cn("z-50 mx-3 my-3 overflow-hidden rounded-card border-2 border-ink bg-parchment shadow-xl sm:absolute sm:bottom-[4.25rem] sm:mx-0 sm:my-0 sm:w-[18.5rem]", previewPt.x < MAP.w / 2 ? "sm:right-3" : "sm:left-3")}
            >
              <div className="aspect-[16/8]">
                <ZoomPhoto src={previewExp.image} alt={t(previewExp.title)} accent={previewZone.accent} shape={previewZone.shape} onOpen={() => setZoom(true)} />
              </div>
              <div className="p-4">
                <p className="flex items-center gap-2 text-caption font-bold text-graphite">
                  <ShapeGlyph kind={previewZone.shape} className={cn("h-4 w-4", ACCENT[previewZone.accent].text)} />
                  {t(previewZone.name)}
                </p>
                <h3 className="mt-1 text-2xl font-extrabold leading-tight">{t(previewExp.title)}</h3>
                <p className="mt-1 line-clamp-2 text-graphite">{t(previewExp.hook)}</p>
                <div className="mt-3 flex items-center gap-2">
                  <button
                    ref={goRef}
                    type="button"
                    aria-haspopup="dialog"
                    onClick={() => onPick(previewExp.id)}
                    className="inline-flex min-h-11 flex-1 items-center justify-center rounded-control bg-terra px-4 font-bold text-white transition-[transform,background-color] duration-150 ease-out-strong hover:bg-ink active:scale-[0.97]"
                  >
                    {t(UI.viewDetails)}
                  </button>
                  <button
                    type="button"
                    aria-label={t(UI.close)}
                    onClick={() => {
                      const id = previewExp.id;
                      setPreview(null);
                      pinRefs.current.get(id)?.focus();
                    }}
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-control border-2 border-ink transition-[transform,background-color,color] duration-150 ease-out-strong hover:bg-ink hover:text-parchment active:scale-90"
                  >
                    <X aria-hidden="true" className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      {/* Leyenda: qué forma y color es cada zona */}
      <ul aria-hidden="true" className="flex flex-wrap items-center gap-x-5 gap-y-1 border-t-2 border-line bg-parchment px-4 py-3 text-caption font-semibold">
        {zones.map((z) => (
          <li key={z.id} className={cn("flex items-center gap-2", z.id === activeZone ? "font-extrabold text-ink underline decoration-2 underline-offset-4" : "text-graphite")}>
            <ShapeGlyph kind={z.shape} className={cn("h-4 w-4", ACCENT[z.accent].text)} />
            {t(z.name)}
          </li>
        ))}
      </ul>
      <Lightbox
        items={previewExp?.image ? [{ src: previewExp.image, alt: t(previewExp.title), caption: t(previewExp.title), credit: previewExp.credit }] : []}
        index={zoom && previewExp?.image ? 0 : null}
        onIndex={() => {}}
        onClose={() => setZoom(false)}
      />
    </div>
  );
}
