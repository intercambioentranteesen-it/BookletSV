"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { useLang } from "@/lib/i18n";
import { EASE_OUT, fadeUp, stagger } from "@/lib/motion";
import type { TeamArea, TeamContent, TeamPerson } from "@/types/content";
import { Avatar } from "./Avatar";
import { layoutOak } from "./layout";
import { OakTree } from "./OakTree";
import { PersonDialog, type PersonView } from "./PersonDialog";

const panelMotion = {
  initial: { opacity: 0, transform: "translateY(14px)" },
  animate: { opacity: 1, transform: "translateY(0px)" },
  exit: { opacity: 0, transition: { duration: 0.12 } },
  transition: { duration: 0.3, ease: EASE_OUT },
};

function PersonCard({ person, area, onOpen }: { person: TeamPerson; area: TeamArea; onOpen: (v: PersonView) => void }) {
  const { t } = useLang();
  return (
    <motion.li variants={fadeUp(10, 0.35)}>
      <button
        type="button"
        aria-haspopup="dialog"
        onClick={() => onOpen({ person, area })}
        className="group flex w-full items-center gap-3 rounded-card border-2 border-line bg-white p-3 text-left transition-[transform,border-color] duration-200 ease-out-strong hover:-translate-y-0.5 hover:border-ink active:translate-y-0 active:scale-[0.99]"
      >
        <Avatar person={person} accent={area.accent} className="w-14 shrink-0 transition-transform duration-300 ease-out-strong group-hover:scale-105" />
        <span className="min-w-0">
          <span className="block font-extrabold leading-tight">{person.name}</span>
          <span className="block text-caption text-graphite">{t(person.role)}</span>
        </span>
      </button>
    </motion.li>
  );
}

/**
 * "Quiénes somos": un roble cuyo tronco es la presidencia y cuyas ramas son las áreas. Al elegir una rama aparece su LCVP
 * y, debajo, su equipo con los roles. Solo se publica a quien tenga `consent: true`.
 */
export function Team({ content }: { content: TeamContent }) {
  const { t } = useLang();
  const [selected, setSelected] = useState<string>("lcp");
  const panelRef = useRef<HTMLDivElement>(null);
  const touched = useRef(false);
  const [view, setView] = useState<PersonView | null>(null);

  const layout = useMemo(() => layoutOak(content), [content]);
  const area = content.areas.find((a) => a.id === selected);
  // El servidor ya descartó a quien no tiene permiso: aquí solo se muestra lo que llega.
  const members = area?.members ?? [];
  const lead = area?.lead;
  const lcp = content.lcp;

  // En pantallas chicas el panel queda debajo del árbol: si no se ve, se acerca al elegir una rama
  useEffect(() => {
    if (!touched.current) return;
    const el = panelRef.current;
    if (el && el.getBoundingClientRect().top > window.innerHeight * 0.65) el.scrollIntoView({ block: "start" });
  }, [selected]);

  const onSelect = (id: string) => {
    touched.current = true;
    setSelected(id);
  };

  return (
    <section id="team" aria-labelledby="team-title" className="bg-sand py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <h2 id="team-title" className="text-4xl font-extrabold leading-tight md:text-6xl">
            {t(content.title)}
          </h2>
          {!!content.pendingConsent && (
            <span className="mt-2 inline-flex max-w-md items-center rounded-2xl border-2 border-ink px-3 py-1 text-caption font-bold">{t(content.labels.preview).replace("{n}", String(content.pendingConsent))}</span>
          )}
          {content.sample && (
            <span className="mt-2 inline-flex items-center rounded-full border-2 border-ink px-3 py-1 text-caption font-bold">{t(content.labels.sample)}</span>
          )}
        </div>
        <p className="mt-4 max-w-xl text-xl text-graphite">{t(content.intro)}</p>

        <div className="mt-8">
          <OakTree team={content} layout={layout} selected={selected} onSelect={onSelect} />
        </div>

        {/* Panel: la presidencia, o el LCVP del área con su equipo */}
        <div id="team-panel" ref={panelRef} aria-live="polite" className="mx-auto mt-6 max-w-4xl scroll-mt-24">
          <AnimatePresence mode="wait">
            {area ? (
              <motion.div key={area.id} {...panelMotion}>
                <div className="grid gap-6 md:grid-cols-[18rem_1fr]">
                  {/* LCVP */}
                  {lead && area && (
                    <div className="rounded-card bg-ink p-6 text-parchment">
                      <p className="text-caption font-bold uppercase tracking-wide text-copper">{t(content.labels.lcvp)}</p>
                      <button type="button" aria-haspopup="dialog" aria-label={`${lead.name}, ${t(lead.role)}`} onClick={() => setView({ person: lead, area })} className="mt-4 block rounded-full transition-transform duration-200 ease-out-strong hover:scale-105 active:scale-95">
                        <Avatar person={lead} accent={area.accent} className="w-28 ring-4 ring-parchment" />
                      </button>
                      <p className="mt-4 text-2xl font-extrabold leading-tight">{lead.name}</p>
                      <p className="mt-1 text-parchment/85">{t(lead.role)}</p>
                      {area.blurb && <p className="mt-4 border-t border-parchment/25 pt-4 text-caption leading-relaxed text-parchment/85">{t(area.blurb)}</p>}
                    </div>
                  )}
                  {/* Equipo */}
                  {members.length === 0 ? (
                    <p className={cn("self-start rounded-card border-2 border-dashed border-line p-6 text-lg text-graphite", !lead && "md:col-span-2")}>{t(content.labels.empty)}</p>
                  ) : (
                  <div>
                    <p className="mb-3 font-extrabold">
                      {t(content.labels.team)} <span className="font-normal text-graphite">{t(area.name)} · {members.length}</span>
                    </p>
                    <motion.ul role="list" variants={stagger(0.06, 0.1)} initial="hidden" animate="visible" className="grid gap-3 sm:grid-cols-2">
                      {members.map((m) => (
                        <PersonCard key={m.id} person={m} area={area} onOpen={setView} />
                      ))}
                    </motion.ul>
                  </div>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div key="lcp" {...panelMotion}>
                <div className="flex flex-col items-center gap-5 rounded-card bg-ink p-6 text-center text-parchment sm:flex-row sm:text-left">
                  {lcp && (
                    <button type="button" aria-haspopup="dialog" aria-label={`${lcp.name}, ${t(lcp.role)}`} onClick={() => setView({ person: lcp, note: t(content.labels.lcp) })} className="shrink-0 rounded-full transition-transform duration-200 ease-out-strong hover:scale-105 active:scale-95">
                      <Avatar person={lcp} accent="charcoal" className="w-28 ring-4 ring-parchment" />
                    </button>
                  )}
                  <div>
                    <p className="text-caption font-bold uppercase tracking-wide text-copper">{t(content.labels.lcp)}</p>
                    {lcp && <p className="mt-1 text-2xl font-extrabold leading-tight">{lcp.name}</p>}
                    <p className="mt-2 text-parchment/85">{t(content.labels.pick)}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <PersonDialog view={view} onClose={() => setView(null)} />
    </section>
  );
}
