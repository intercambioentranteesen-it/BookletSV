"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { useLang } from "@/lib/i18n";
import { EASE_OUT, fadeUp, stagger } from "@/lib/motion";
import type { HeroContent } from "@/types/content";

export function Hero({ content }: { content: HeroContent }) {
  const { t } = useLang();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const shapesY = useTransform(scrollYProgress, [0, 1], [0, -48]);
  const item = fadeUp(28, 0.7);

  // Las formas entran una a una: es el único movimiento "automático" de la página
  const shape = (i: number) => ({
    initial: { opacity: 0, scale: 0.88 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.7, delay: 0.35 + i * 0.12, ease: EASE_OUT },
  });

  return (
    <section ref={ref} id="top" aria-labelledby="hero-title" className="overflow-hidden">
      <div className="mx-auto grid min-h-[calc(100svh-4rem)] max-w-6xl items-center gap-10 px-6 py-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-6 lg:py-16">
        <motion.div variants={stagger(0.1, 0.05)} initial="hidden" animate="visible">
          <motion.p variants={item} className="leading-tight">
            <span className="block text-lg font-black">{t(content.organization)}</span>
            <span className="block text-graphite">{t(content.subOrganization)}</span>
          </motion.p>

          <motion.h1 id="hero-title" variants={item} className="mt-8 text-display font-light text-ink">
            <span className="block">{t(content.line1)}</span>
            <span className="mt-3 inline-block -rotate-2 bg-brand px-5 pb-2 pt-1 font-black italic text-white">{t(content.line2)}</span>
          </motion.h1>

          <motion.p variants={item} className="mt-10 max-w-xl text-xl leading-relaxed text-graphite">
            {t(content.subtitle)}
          </motion.p>

          <motion.div variants={item} className="mt-10">
            <ButtonLink href="#country" icon={<ArrowDown className="h-5 w-5" />}>
              {t(content.cta)}
            </ButtonLink>
          </motion.div>
        </motion.div>

        {/* Composición con las formas de la marca */}
        <motion.div style={{ y: shapesY }} aria-hidden="true" className="mx-auto w-full max-w-md lg:max-w-none">
          <svg viewBox="0 0 400 400" className="h-auto w-full">
            <motion.rect x="214" y="30" width="112" height="262" className="fill-mint" {...shape(0)} />
            <motion.circle cx="150" cy="156" r="112" className="fill-brand" style={{ mixBlendMode: "multiply" }} {...shape(1)} />
            <motion.polygon points="46,384 196,170 346,384" className="fill-tangerine" style={{ mixBlendMode: "multiply" }} {...shape(2)} />
            <motion.path d="M400 276 A124 124 0 0 0 276 400 L400 400 Z" className="fill-sun" {...shape(3)} />
            <motion.circle cx="262" cy="104" r="62" className="fill-none stroke-ink" strokeWidth="3" strokeDasharray="10 9" {...shape(4)} />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
