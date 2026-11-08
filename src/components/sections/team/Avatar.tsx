/* eslint-disable @next/next/no-img-element */
import { ACCENT } from "@/lib/accent";
import { cn } from "@/lib/cn";
import type { TeamPerson, ZoneAccent } from "@/types/content";

export const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");

/**
 * Foto redonda de la persona dentro de un anillo con el color de su área (la paleta del comité). Sin foto, sus iniciales.
 * Proporciones: anillo del 9 % por lado (la foto ocupa el 82 % central); sello de Alchemist del 24 % del diámetro, en un círculo,
 * centrado abajo sobre el anillo (su centro al 92 % de la altura). El sello se pide con `seal` y solo conviene en tamaños medianos o grandes
 * (en los chicos no se lee). El tamaño lo da el contenedor.
 */
export function Avatar({ person, accent, className, seal = false }: { person: TeamPerson; accent: ZoneAccent; className?: string; seal?: boolean }) {
  return (
    <span className={cn("relative block aspect-square rounded-full [container-type:inline-size]", ACCENT[accent].bg, className)}>
      <span className="absolute inset-[9%] overflow-hidden rounded-full bg-parchment">
        {person.photo ? (
          <img src={person.photo} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
        ) : (
          <span className="grid h-full w-full place-items-center font-extrabold leading-none text-ink">
            <span className="text-[34cqw]">{initials(person.name)}</span>
          </span>
        )}
      </span>
      {seal && (
        // El logo es cuadrado: se mete con margen dentro de un círculo para que ninguna parte (el nombre de abajo) se corte
        <span className="absolute left-1/2 top-[92%] block aspect-square w-[24%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full bg-parchment shadow-sm">
          <img src="/brand/alchemist-logo.svg" alt="" loading="lazy" decoding="async" className="h-full w-full object-contain p-[9%]" />
        </span>
      )}
    </span>
  );
}
