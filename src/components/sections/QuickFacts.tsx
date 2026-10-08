"use client";

import { motion } from "framer-motion";
import { Flag } from "@/components/brand/Flag";
import { FACT_ICONS } from "@/lib/icons";
import { useLang } from "@/lib/i18n";
import { fadeUp, stagger } from "@/lib/motion";
import type { QuickFactsContent } from "@/types/content";

export function QuickFacts({ content }: { content: QuickFactsContent }) {
  const { t } = useLang();
  return (
    <section aria-labelledby="facts-title" className="border-y-2 border-ink">
      <h2 id="facts-title" className="sr-only">
        {t(content.title)}
      </h2>
      <motion.dl
        variants={stagger(0.07)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-8 px-6 py-8 sm:grid-cols-3 2xl:grid-cols-6"
      >
        {content.items.map((f) => {
          const Icon = f.icon === "flag" ? null : FACT_ICONS[f.icon];
          return (
            <motion.div key={f.id} variants={fadeUp(14, 0.45)} className="flex items-start gap-3">
              {Icon ? (
                <Icon aria-hidden="true" className="mt-1 h-6 w-6 shrink-0 text-terra-deep" />
              ) : (
                // La bandera hace de ícono de esta celda; el texto de al lado ya dice "El Salvador"
                <Flag size="sm" decorative className="mt-[0.4rem]" />
              )}
              <div>
                <dt className="text-sm text-graphite">{t(f.label)}</dt>
                <dd className="font-bold leading-snug">{t(f.value)}</dd>
              </div>
            </motion.div>
          );
        })}
      </motion.dl>
    </section>
  );
}
