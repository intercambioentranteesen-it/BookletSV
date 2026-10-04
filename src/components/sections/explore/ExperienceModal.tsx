"use client";

import { useRef } from "react";
import { Info, X } from "lucide-react";
import { Photo } from "@/components/brand/Photo";
import { Carousel } from "@/components/ui/Carousel";
import { CountUp } from "@/components/ui/CountUp";
import { Modal } from "@/components/ui/Modal";
import { UI } from "@/data/ui";
import { ACCENT } from "@/lib/accent";
import { cn } from "@/lib/cn";
import { useLang } from "@/lib/i18n";
import type { Experience, Zone } from "@/types/content";

interface ExperienceModalProps {
  exp: Experience | null;
  zone: Zone | null;
  onClose: () => void;
}

export function ExperienceModal({ exp, zone, onClose }: ExperienceModalProps) {
  const { t } = useLang();
  // Mantiene el último contenido mientras corre la animación de salida
  const last = useRef<{ exp: Experience; zone: Zone } | null>(null);
  if (exp && zone) last.current = { exp, zone };
  const shown = last.current;

  return (
    <Modal open={!!exp} onClose={onClose} labelledBy="exp-title">
      {shown && (
        <article>
          <div className="relative h-44 sm:h-60">
            <Photo src={shown.exp.image} alt={t(shown.exp.title)} accent={shown.zone.accent} shape={shown.zone.shape} />
            <button
              type="button"
              data-autofocus
              onClick={onClose}
              aria-label={t(UI.close)}
              className="absolute right-3 top-3 grid h-11 w-11 place-items-center rounded-full bg-white text-ink transition-colors duration-150 hover:bg-ink hover:text-white"
            >
              <X aria-hidden="true" className="h-5 w-5" />
            </button>
          </div>

          <div className="p-6 sm:p-8">
            <p className="flex items-center gap-2 font-bold text-graphite">
              <span aria-hidden="true" className={cn("h-3 w-3 rounded-full", ACCENT[shown.zone.accent].bg)} />
              {t(shown.zone.name)}
            </p>
            <h2 id="exp-title" className="mt-2 text-4xl font-extrabold leading-tight sm:text-5xl">
              {t(shown.exp.title)}
            </h2>

            {shown.exp.stat && (
              <p className="mt-4 flex items-baseline gap-2">
                <span className="text-5xl font-extrabold text-terra">
                  <CountUp to={shown.exp.stat.value} />
                  <span className="ml-1 text-3xl">{t(shown.exp.stat.unit)}</span>
                </span>
                <span className="text-graphite">{t(shown.exp.stat.label)}</span>
              </p>
            )}

            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-graphite">{t(shown.exp.intro)}</p>

            <ul role="list" className="mt-4 flex flex-wrap gap-2">
              {shown.exp.tags.map((tag) => (
                <li key={tag.en} className="rounded-full bg-sand px-3 py-1 text-sm font-bold">
                  {t(tag)}
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <Carousel
                prevLabel={t(UI.prev)}
                nextLabel={t(UI.next)}
                heading={<h3 className="text-2xl font-extrabold">{t(UI.stops)}</h3>}
              >
                {shown.exp.stops.map((stop) => (
                  <li key={stop.id} className="min-w-[82%] snap-start sm:min-w-[46%] lg:min-w-[calc((100%-2rem)/3)]">
                    <div className="flex h-full flex-col gap-3 rounded-card border-2 border-line p-5">
                      <div className="aspect-[16/10] overflow-hidden rounded-control">
                        <Photo src={stop.image} alt={t(stop.name)} accent={shown.zone.accent} shape={shown.zone.shape} />
                      </div>
                      <h4 className="text-xl font-extrabold leading-tight">{t(stop.name)}</h4>
                      <p className="leading-relaxed">{t(stop.what)}</p>
                      {stop.tip && (
                        <p className="flex gap-2 text-sm text-graphite">
                          <Info aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-terra-deep" />
                          <span>{t(stop.tip)}</span>
                        </p>
                      )}
                      {stop.notice && (
                        <p className="border-l-4 border-ink bg-sand p-3 text-sm leading-relaxed">
                          <span className="font-extrabold">{t(UI.goodToKnow)}. </span>
                          {t(stop.notice)}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </Carousel>
            </div>

            <p className="mt-6 text-sm text-graphite">{t(UI.confirm)}</p>
          </div>
        </article>
      )}
    </Modal>
  );
}
