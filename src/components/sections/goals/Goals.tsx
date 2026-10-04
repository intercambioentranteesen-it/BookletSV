"use client";

/* eslint-disable @next/next/no-img-element */
import { UI } from "@/data/ui";
import { useLang } from "@/lib/i18n";
import type { GoalItem, GoalsContent } from "@/types/content";

function GoalTile({ goal, label }: { goal: GoalItem; label: string }) {
  const { lang } = useLang();
  const src = goal.image?.[lang] ?? goal.image?.es ?? goal.image?.en;

  // Los íconos oficiales se muestran sin recortar, recolorear ni deformar
  if (src) {
    return <img src={src} alt={label} width={160} height={160} loading="lazy" decoding="async" className="h-40 w-40 shrink-0 object-contain" />;
  }
  // Recuadro provisional (texto) hasta tener el ícono oficial
  return (
    <div
      role="img"
      aria-label={label}
      style={{ backgroundColor: goal.color }}
      className="flex h-40 w-40 shrink-0 flex-col justify-between p-3 font-black uppercase leading-tight text-white"
    >
      <span className="text-4xl">{goal.number}</span>
      <span className="text-sm">{label}</span>
    </div>
  );
}

export function Goals({ content }: { content: GoalsContent }) {
  const { t } = useLang();
  const items = content.items.filter((g) => !g.hidden);

  return (
    <section id="goals" aria-labelledby="goals-title" className="bg-mist py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <h2 id="goals-title" className="max-w-3xl text-4xl font-black leading-tight md:text-6xl">
          {t(content.title)}
        </h2>
        <p className="mt-4 max-w-2xl text-xl leading-relaxed text-graphite">{t(content.intro)}</p>

        <ul role="list" className="mt-12 grid gap-6 md:grid-cols-2">
          {items.map((goal) => {
            const label = `${t(UI.sdg)} ${goal.number}: ${t(goal.name)}`;
            return (
              <li key={goal.id} className="flex list-none flex-col gap-5 rounded-card border-2 border-line bg-white p-5 sm:flex-row">
                <GoalTile goal={goal} label={label} />
                <div>
                  <h3 className="text-2xl font-black leading-tight">{label}</h3>
                  <p className="mt-2 leading-relaxed text-graphite">{t(goal.official)}</p>
                  <p className="mt-4 border-l-4 border-ink pl-3 leading-relaxed">
                    <span className="block font-black">{t(UI.inPractice)}</span>
                    {t(goal.inPractice)}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>

        <p className="mt-8 max-w-3xl text-sm text-graphite">{t(content.disclaimer)}</p>
      </div>
    </section>
  );
}
