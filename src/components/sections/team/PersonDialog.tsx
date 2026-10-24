"use client";

import { X } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { UI } from "@/data/ui";
import { ACCENT } from "@/lib/accent";
import { cn } from "@/lib/cn";
import { useLang } from "@/lib/i18n";
import type { TeamArea, TeamPerson } from "@/types/content";
import { Avatar } from "./Avatar";

export interface PersonView {
  person: TeamPerson;
  area?: TeamArea;
  /** Descripción extra para la presidencia. */
  note?: string;
}

/** Ficha de una persona del equipo: su foto grande (o sus iniciales), su nombre, su rol y su área. Se abre al tocarla. */
export function PersonDialog({ view, onClose }: { view: PersonView | null; onClose: () => void }) {
  const { t } = useLang();
  return (
    <Modal open={!!view} onClose={onClose} labelledBy="person-title">
      {view && (
        <article className="relative p-6 sm:p-10">
          <button
            type="button"
            data-autofocus
            onClick={onClose}
            aria-label={t(UI.close)}
            className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-sand text-ink transition-[transform,background-color,color] duration-150 ease-out-strong hover:bg-ink hover:text-white active:scale-90"
          >
            <X aria-hidden="true" className="h-5 w-5" />
          </button>
          <div className="grid items-center gap-8 sm:grid-cols-[14rem_1fr]">
            <Avatar person={view.person} accent={view.area?.accent ?? "charcoal"} className="mx-auto w-48 ring-4 ring-white shadow-lg sm:w-56" />
            <div className="text-center sm:text-left">
              {view.area && (
                <p className="flex items-center justify-center gap-2 font-bold text-graphite sm:justify-start">
                  <span aria-hidden="true" className={cn("h-3 w-3 rounded-full", ACCENT[view.area.accent].bg)} />
                  {t(view.area.name)}
                </p>
              )}
              <h2 id="person-title" className="mt-2 text-4xl font-extrabold leading-tight sm:text-5xl">
                {view.person.name}
              </h2>
              <p className="mt-2 text-xl font-semibold text-terra-deep">{t(view.person.role)}</p>
              {view.area?.blurb && <p className="mt-4 max-w-md text-lg leading-relaxed text-graphite">{t(view.area.blurb)}</p>}
              {view.note && <p className="mt-4 max-w-md text-lg leading-relaxed text-graphite">{view.note}</p>}
              {view.person.link && (
                <a
                  href={view.person.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex min-h-11 items-center rounded-control border-2 border-ink px-5 font-bold transition-[transform,background-color,color] duration-150 ease-out-strong hover:bg-ink hover:text-parchment active:scale-[0.97]"
                >
                  {t(UI.viewDetails)}
                </a>
              )}
            </div>
          </div>
        </article>
      )}
    </Modal>
  );
}
