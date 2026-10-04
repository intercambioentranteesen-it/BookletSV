"use client";

/* eslint-disable @next/next/no-img-element */
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { useLang } from "@/lib/i18n";
import { EASE_OUT, fadeUp, stagger } from "@/lib/motion";
import type { HeroContent } from "@/types/content";

export function Hero({ content }: { content: HeroContent }) {
  const { t } = useLang();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const markY = useTransform(scrollYProgress, [0, 1], [0, -56]);
  const item = fadeUp(28, 0.7);

  return (
    <section ref={ref} id="top" aria-labelledby="hero-title" className="overflow-hidden">
      <div className="mx-auto grid min-h-[calc(100svh-4rem)] max-w-6xl items-center gap-10 px-6 py-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8 lg:py-16">
        <motion.div variants={stagger(0.1, 0.05)} initial="hidden" animate="visible">
          <motion.p variants={item} className="leading-tight">
            <span className="block text-lg font-bold">{t(content.organization)}</span>
            <span className="block text-graphite">{t(content.subOrganization)}</span>
          </motion.p>

          <motion.h1 id="hero-title" variants={item} className="mt-8 text-display font-light text-ink">
            <span className="block">{t(content.line1)}</span>
            {/* El bloque terracota se "dibuja" de izquierda a derecha: el único gesto grande de la portada */}
            <motion.span
              initial={reduce ? false : { clipPath: "inset(0 100% 0 0)" }}
              animate={{ clipPath: "inset(0 0% 0 0)" }}
              transition={{ duration: 0.85, delay: 0.55, ease: EASE_OUT }}
              className="mt-3 inline-block -rotate-2 bg-terra px-5 pb-2 pt-1 font-extrabold text-white"
            >
              {t(content.line2)}
            </motion.span>
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

        {/* El árbol de Alchemist, sobre un círculo de arena */}
        <motion.div style={{ y: markY }} aria-hidden="true" className="relative mx-auto aspect-square w-full max-w-md lg:max-w-none">
          <motion.div
            className="absolute inset-[4%] rounded-full bg-sand"
            initial={reduce ? false : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: EASE_OUT }}
          />
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
            <circle cx="50" cy="50" r="48.5" fill="none" className="stroke-ink" strokeWidth="0.35" strokeDasharray="1.6 1.6" />
          </svg>
          <motion.img
            src="/brand/alchemist-mark.svg"
            alt=""
            width={640}
            height={770}
            className="absolute inset-0 m-auto h-[84%] w-auto"
            initial={reduce ? false : { opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.5, ease: EASE_OUT }}
          />
        </motion.div>
      </div>
    </section>
  );
}
