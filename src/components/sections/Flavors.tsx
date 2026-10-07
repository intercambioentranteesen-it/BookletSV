"use client";

import { motion } from "framer-motion";
import { Info } from "lucide-react";
import { Photo } from "@/components/brand/Photo";
import { Carousel } from "@/components/ui/Carousel";
import { UI } from "@/data/ui";
import { useLang } from "@/lib/i18n";
import { fadeUp, stagger } from "@/lib/motion";
import type { Dish, FlavorsContent, Festival } from "@/types/content";

function DishCard({ dish }: { dish: Dish }) {
  const { t } = useLang();
  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-card border-2 border-line bg-white">
      <div className="aspect-[16/10] overflow-hidden">
        <div className="h-full w-full transition-transform duration-500 ease-out-strong group-hover:scale-[1.04]">
          {/* Convención: si el platillo no trae `image`, se busca /fotos/sabor-<id>.jpg. Si no existe, se ve el bloque de color. */}
          <Photo src={dish.image ?? `/fotos/sabor-${dish.id}.jpg`} alt={t(dish.name)} accent={dish.accent} shape={dish.shape} />
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <p className="font-semibold text-terra-deep">{t(dish.kind)}</p>
        <h4 className="text-2xl font-extrabold leading-tight">{t(dish.name)}</h4>
        <p className="leading-relaxed text-graphite">{t(dish.text)}</p>
        {dish.tip && (
          <p className="mt-auto flex gap-2 pt-3 text-sm text-graphite">
            <Info aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-terra-deep" />
            <span>{t(dish.tip)}</span>
          </p>
        )}
      </div>
    </div>
  );
}

function FestivalItem({ f }: { f: Festival }) {
  const { t } = useLang();
  return (
    <motion.li variants={fadeUp(16, 0.5)} className="flex list-none gap-4">
      <div className="grid h-20 w-20 shrink-0 place-content-center rounded-control bg-ink text-center text-parchment">
        {f.day ? (
          <>
            <span className="text-sm leading-none">{t(f.month)}</span>
            <span className="mt-1 text-3xl font-extrabold leading-none">{f.day}</span>
          </>
        ) : (
          <span className="px-1 text-lg font-extrabold leading-tight">{t(f.month)}</span>
        )}
      </div>
      <div className="min-w-0">
        <h4 className="text-xl font-extrabold leading-tight">{t(f.title)}</h4>
        {f.where && <p className="font-semibold text-terra-deep">{t(f.where)}</p>}
        <p className="mt-1 leading-relaxed text-graphite">{t(f.text)}</p>
        {f.notice && (
          <p className="mt-3 border-l-4 border-ink bg-white p-3 text-sm leading-relaxed">
            <span className="font-bold">{t(UI.goodToKnow)}. </span>
            {t(f.notice)}
          </p>
        )}
      </div>
    </motion.li>
  );
}

export function Flavors({ content }: { content: FlavorsContent }) {
  const { t } = useLang();
  return (
    <section id="flavors" aria-labelledby="flavors-title" className="bg-sand py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <h2 id="flavors-title" className="max-w-3xl text-4xl font-extrabold leading-tight md:text-6xl">
          {t(content.title)}
        </h2>
        <p className="mt-4 max-w-2xl text-xl leading-relaxed text-graphite">{t(content.intro)}</p>

        <div className="mt-12">
          <Carousel
            prevLabel={t(UI.prev)}
            nextLabel={t(UI.next)}
            heading={<h3 className="text-2xl font-extrabold">{t(content.dishesTitle)}</h3>}
          >
            {content.dishes.map((d) => (
              <li key={d.id} className="min-w-[82%] snap-start sm:min-w-[46%] lg:min-w-[calc((100%-2rem)/3)]">
                <DishCard dish={d} />
              </li>
            ))}
          </Carousel>
        </div>

        <div className="mt-20">
          <h3 className="text-2xl font-extrabold">{t(content.festivalsTitle)}</h3>
          <p className="mt-2 max-w-xl text-graphite">{t(content.festivalsIntro)}</p>
          <motion.ol
            role="list"
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="mt-8 grid gap-x-12 gap-y-8 md:grid-cols-2"
          >
            {content.festivals.map((f) => (
              <FestivalItem key={f.id} f={f} />
            ))}
          </motion.ol>
        </div>
      </div>
    </section>
  );
}
