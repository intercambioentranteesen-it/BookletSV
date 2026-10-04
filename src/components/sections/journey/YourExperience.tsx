"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll } from "framer-motion";
import { Info } from "lucide-react";
import { ShapeGlyph } from "@/components/brand/Shapes";
import { ACCENT } from "@/lib/accent";
import { cn } from "@/lib/cn";
import { JOURNEY_ICONS } from "@/lib/icons";
import { useLang } from "@/lib/i18n";
import type { JourneyContent } from "@/types/content";

export function YourExperience({ content }: { content: JourneyContent }) {
  const { t } = useLang();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLOListElement>(null);
  // La línea se dibuja con el scroll: es una secuencia real (llegada → primer día)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });

  return (
    <section id="journey" aria-labelledby="journey-title" className="bg-sand py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2 id="journey-title" className="text-4xl font-extrabold leading-tight md:text-6xl">
            {t(content.title)}
          </h2>
          <p className="mt-4 max-w-md text-xl leading-relaxed text-graphite">{t(content.intro)}</p>
          <p className="mt-6 flex max-w-md items-start gap-3 border-l-4 border-ink bg-sand p-4 font-bold">
            <Info aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-terra-deep" />
            {t(content.varies)}
          </p>
        </div>

        <ol ref={ref} role="list" className="relative space-y-10">
          <span aria-hidden="true" className="absolute bottom-6 left-[21px] top-6 w-[3px] bg-line" />
          <motion.span
            aria-hidden="true"
            className="absolute bottom-6 left-[21px] top-6 w-[3px] bg-terra"
            style={{ transformOrigin: "top", scaleY: reduce ? 1 : scrollYProgress }}
          />
          {content.steps.filter((step) => !step.hidden).map((step) => {
            const Icon = JOURNEY_ICONS[step.icon];
            return (
              <li key={step.id} className="relative pl-20">
                <span className="absolute left-0 top-0 grid h-11 w-11 place-items-center bg-white">
                  <ShapeGlyph kind={step.shape} className={cn("absolute inset-0 h-full w-full", ACCENT[step.accent].text)} />
                  <Icon aria-hidden="true" className={cn("relative h-5 w-5", ACCENT[step.accent].on)} />
                </span>
                <h3 className="text-2xl font-extrabold leading-tight">{t(step.title)}</h3>
                <p className="mt-2 max-w-md text-lg leading-relaxed text-graphite">{t(step.text)}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
