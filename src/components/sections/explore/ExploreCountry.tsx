"use client";

import { useCallback, useEffect, useMemo, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ShapeGlyph } from "@/components/brand/Shapes";
import { UI, fmtN } from "@/data/ui";
import { ACCENT } from "@/lib/accent";
import { cn } from "@/lib/cn";
import { useLang } from "@/lib/i18n";
import { EASE_OUT } from "@/lib/motion";
import type { SiteContent, ZoneId } from "@/types/content";
import { ExperienceCard } from "./ExperienceCard";
import { ExperienceModal } from "./ExperienceModal";

const HASH = "#exp-";

const panelVariants = {
  hidden: (dir: number) => ({ opacity: 0, transform: `translateX(${dir * 36}px)` }),
  visible: { opacity: 1, transform: "translateX(0px)", transition: { duration: 0.3, ease: EASE_OUT, staggerChildren: 0.07 } },
  exit: (dir: number) => ({ opacity: 0, transform: `translateX(${dir * -36}px)`, transition: { duration: 0.16 } }),
};

export function ExploreCountry({ content }: { content: SiteContent["explore"] }) {
  const { t } = useLang();
  const { zones, experiences } = content;
  const [zoneId, setZoneId] = useState<ZoneId>(zones[0].id);
  const [dir, setDir] = useState(1);
  const [openId, setOpenId] = useState<string | null>(null);

  const byId = useMemo(() => new Map(experiences.map((e) => [e.id, e])), [experiences]);
  const zoneById = useMemo(() => new Map(zones.map((z) => [z.id, z])), [zones]);
  const zoneIndex = zones.findIndex((z) => z.id === zoneId);
  const zone = zones[zoneIndex];
  const list = experiences.filter((e) => e.zone === zoneId);
  const openExp = openId ? (byId.get(openId) ?? null) : null;
  const openZone = openExp ? (zoneById.get(openExp.zone) ?? null) : null;

  const selectZone = (id: ZoneId) => {
    const next = zones.findIndex((z) => z.id === id);
    setDir(next >= zoneIndex ? 1 : -1);
    setZoneId(id);
  };

  /* Enlace profundo: #exp-<id> abre la experiencia (se puede compartir por WhatsApp) */
  const syncFromHash = useCallback(() => {
    const h = window.location.hash;
    const exp = h.startsWith(HASH) ? byId.get(h.slice(HASH.length)) : undefined;
    if (exp) {
      setZoneId(exp.zone);
      setOpenId(exp.id);
    } else {
      setOpenId(null);
    }
  }, [byId]);

  useEffect(() => {
    syncFromHash();
    if (window.location.hash.startsWith(HASH)) document.getElementById("country")?.scrollIntoView();
    window.addEventListener("popstate", syncFromHash);
    return () => window.removeEventListener("popstate", syncFromHash);
  }, [syncFromHash]);

  const open = (id: string) => {
    setOpenId(id);
    window.history.pushState({ exp: id }, "", `${HASH}${id}`);
  };
  const close = () => {
    setOpenId(null);
    if (window.history.state?.exp) window.history.back();
    else window.history.replaceState(null, "", window.location.pathname + window.location.search);
  };

  const onTabKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const step = e.key === "ArrowRight" ? 1 : -1;
    const next = zones[(zoneIndex + step + zones.length) % zones.length];
    selectZone(next.id);
    document.getElementById(`tab-${next.id}`)?.focus();
  };

  return (
    <section id="country" aria-labelledby="country-title" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <h2 id="country-title" className="text-4xl font-extrabold leading-tight md:text-6xl">
          {t(content.title)}
        </h2>
        <p className="mt-4 max-w-xl text-xl text-graphite">{t(content.intro)}</p>

        {/* Zonas: cada una con su forma y color de marca */}
        <div
          role="tablist"
          aria-label={t(UI.zones)}
          className="no-scrollbar -mx-6 mt-10 flex gap-2 overflow-x-auto px-6 pb-1 md:mx-0 md:px-0"
        >
          {zones.map((z) => {
            const active = z.id === zoneId;
            return (
              <button
                key={z.id}
                type="button"
                role="tab"
                id={`tab-${z.id}`}
                aria-selected={active}
                aria-controls="zone-panel"
                tabIndex={active ? 0 : -1}
                onClick={() => selectZone(z.id)}
                onKeyDown={onTabKey}
                className={cn(
                  "relative inline-flex min-h-12 shrink-0 items-center gap-2 rounded-control border-2 px-4 font-extrabold transition-colors duration-150",
                  active ? "border-ink text-parchment" : "border-line text-ink hover:border-ink",
                )}
              >
                {active && (
                  <motion.span
                    layoutId="zone-pill"
                    className="absolute inset-0 rounded-[10px] bg-ink"
                    transition={{ duration: 0.28, ease: EASE_OUT }}
                  />
                )}
                <ShapeGlyph kind={z.shape} className={cn("relative h-5 w-5", active ? "text-parchment" : ACCENT[z.accent].text)} />
                <span className="relative">{t(z.name)}</span>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait" custom={dir} initial={false}>
          <motion.div
            key={zoneId}
            id="zone-panel"
            role="tabpanel"
            aria-labelledby={`tab-${zoneId}`}
            custom={dir}
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="mt-8"
          >
            <div className="mb-6 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
              <p className="max-w-xl text-lg text-graphite">{t(zone.blurb)}</p>
              <p className="font-bold text-ink">{fmtN(t({ en: "{n} experiences", es: "{n} experiencias" }), list.length)}</p>
            </div>
            <ul role="list" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((exp) => (
                <ExperienceCard key={exp.id} exp={exp} zone={zone} onOpen={open} />
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>

      <ExperienceModal exp={openExp} zone={openZone} onClose={close} />
    </section>
  );
}
