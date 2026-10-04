"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { UI } from "@/data/ui";
import { ACCENT } from "@/lib/accent";
import { useLang } from "@/lib/i18n";
import { EASE_OUT } from "@/lib/motion";
import type { CostContent, TransportTier } from "@/types/content";

interface TransportModalProps {
  open: boolean;
  onClose: () => void;
  content: CostContent["transport"];
}

const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
const usd0 = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

function Bar({ tier, scaleMax, index }: { tier: TransportTier; scaleMax: number; index: number }) {
  const left = (tier.min / scaleMax) * 100;
  const width = ((tier.max - tier.min) / scaleMax) * 100;
  const a = ACCENT[tier.accent];
  // La parte sólida de un tramo sin tope cubre solo los primeros $0.30; el resto es punteado
  const solidShare = tier.openEnded ? Math.min(100, (0.3 / (tier.max - tier.min)) * 100) : 100;

  return (
    <motion.span
      className="absolute top-0 block h-full"
      style={{ left: `${left}%`, width: `${width}%`, minWidth: 14, transformOrigin: "left center" }}
      initial={{ transform: "scaleX(0)" }}
      animate={{ transform: "scaleX(1)" }}
      transition={{ duration: 0.55, delay: 0.15 + index * 0.09, ease: EASE_OUT }}
    >
      <span className={`absolute left-0 top-0 h-full rounded-full ${a.bg}`} style={{ width: `${solidShare}%`, minWidth: 14 }} />
      {tier.openEnded && (
        <span
          className={`absolute right-0 top-1/2 h-0 -translate-y-1/2 border-t-[6px] border-dashed ${a.border}`}
          style={{ left: `${solidShare}%` }}
        />
      )}
    </motion.span>
  );
}

export function TransportModal({ open, onClose, content }: TransportModalProps) {
  const { t } = useLang();
  const ticks = Array.from({ length: content.scaleMax + 1 }, (_, i) => i);

  const rangeText = (tier: TransportTier) =>
    tier.openEnded ? `${t(UI.from)} ${usd.format(tier.min)}` : `${usd.format(tier.min)} – ${usd.format(tier.max)}`;

  return (
    <Modal open={open} onClose={onClose} labelledBy="transport-title">
      <article className="p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <h2 id="transport-title" className="text-4xl font-black leading-tight sm:text-5xl">
            {t(content.title)}
          </h2>
          <button
            type="button"
            data-autofocus
            onClick={onClose}
            aria-label={t(UI.close)}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-mist text-ink transition-colors duration-150 hover:bg-ink hover:text-white"
          >
            <X aria-hidden="true" className="h-5 w-5" />
          </button>
        </div>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-graphite">{t(content.intro)}</p>

        {/* Escala común: así se ve de un vistazo cuánto se solapan los rangos */}
        <div className="mt-8" role="group" aria-label={t(UI.scaleLabel)}>
          <div aria-hidden="true" className="relative h-6 text-sm text-graphite">
            {ticks.map((n) => (
              <span
                key={n}
                className={`absolute top-0 ${n === 0 ? "" : n === content.scaleMax ? "-translate-x-full" : "-translate-x-1/2"}`}
                style={{ left: `${(n / content.scaleMax) * 100}%` }}
              >
                {usd0.format(n)}
              </span>
            ))}
          </div>
          <div className="relative">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
              {ticks.map((n) => (
                <span key={n} className="absolute inset-y-0 border-l border-line" style={{ left: `${(n / content.scaleMax) * 100}%` }} />
              ))}
            </div>
            <ul role="list" className="relative">
              {content.tiers.map((tier, i) => (
                <li key={tier.id} className="py-4">
                  <div className="flex items-baseline justify-between gap-4">
                    <div>
                      <p className="text-lg font-black">{t(tier.label)}</p>
                      {tier.detail && <p className="text-sm text-graphite">{t(tier.detail)}</p>}
                    </div>
                    <p className="shrink-0 bg-white pl-2 text-lg font-black tabular-nums">
                      {rangeText(tier)}
                      {tier.openEnded && <span className="block text-right text-sm font-normal text-graphite">{t(UI.moreWithDistance)}</span>}
                    </p>
                  </div>
                  <div aria-hidden="true" className="relative mt-3 h-3 rounded-full bg-mist">
                    <Bar tier={tier} scaleMax={content.scaleMax} index={i} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6 grid gap-6 border-t-2 border-ink pt-6 md:grid-cols-2">
          <div>
            <h3 className="text-lg font-black">{t(content.examplesTitle)}</h3>
            <ul role="list" className="mt-3 space-y-2">
              {content.examples.map((ex) => (
                <li key={ex.label.en} className="flex items-baseline justify-between gap-4">
                  <span>{t(ex.label)}</span>
                  <span className="shrink-0 font-black tabular-nums">{t(ex.value)}</span>
                </li>
              ))}
            </ul>
          </div>
          <p className="self-end border-l-4 border-ink bg-mist p-3 text-sm leading-relaxed">{t(content.note)}</p>
        </div>
        <p className="mt-6 text-sm text-graphite">{t(UI.confirm)}</p>
      </article>
    </Modal>
  );
}
