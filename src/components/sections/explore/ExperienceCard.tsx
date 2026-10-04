"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Photo } from "@/components/brand/Photo";
import { UI, fmtN } from "@/data/ui";
import { useLang } from "@/lib/i18n";
import { fadeUp } from "@/lib/motion";
import type { Experience, Zone } from "@/types/content";

interface ExperienceCardProps {
  exp: Experience;
  zone: Zone;
  onOpen: (id: string) => void;
}

export function ExperienceCard({ exp, zone, onOpen }: ExperienceCardProps) {
  const { t } = useLang();
  return (
    <motion.li variants={fadeUp(18, 0.4)} className="list-none">
      <button
        type="button"
        aria-haspopup="dialog"
        onClick={() => onOpen(exp.id)}
        className="group flex h-full w-full flex-col overflow-hidden rounded-card border-2 border-line bg-white text-left transition-colors duration-150 hover:border-ink"
      >
        <div className="aspect-[4/3] w-full overflow-hidden">
          <div className="h-full w-full transition-transform duration-500 ease-out-strong group-hover:scale-[1.04]">
            <Photo src={exp.image} alt={t(exp.title)} accent={zone.accent} shape={zone.shape} />
          </div>
        </div>
        <div className="flex flex-1 flex-col p-5">
          <h3 className="text-2xl font-extrabold leading-tight">{t(exp.title)}</h3>
          <p className="mt-2 text-graphite">{t(exp.hook)}</p>
          <ul role="list" className="mt-4 flex flex-wrap gap-2">
            {exp.tags.slice(0, 3).map((tag) => (
              <li key={tag.en} className="rounded-full bg-sand px-3 py-1 text-sm font-bold">
                {t(tag)}
              </li>
            ))}
          </ul>
          <div className="mt-auto flex items-center justify-between pt-5">
            <span className="font-bold text-terra-deep">{fmtN(t(UI.stopsCount), exp.stops.length)}</span>
            <span
              aria-hidden="true"
              className="grid h-10 w-10 place-items-center rounded-full bg-ink text-white transition-transform duration-200 ease-out-strong group-hover:translate-x-0.5"
            >
              <ArrowUpRight className="h-5 w-5" />
            </span>
          </div>
        </div>
      </button>
    </motion.li>
  );
}
