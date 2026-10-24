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

/** Foto redonda de la persona; sin foto, sus iniciales sobre el color de su área. El tamaño lo da el contenedor. */
export function Avatar({ person, accent, className }: { person: TeamPerson; accent: ZoneAccent; className?: string }) {
  return (
    <span className={cn("block aspect-square overflow-hidden rounded-full [container-type:inline-size]", className)}>
      {person.photo ? (
        <img src={person.photo} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
      ) : (
        <span className={cn("grid h-full w-full place-items-center font-extrabold leading-none", ACCENT[accent].bg, ACCENT[accent].on)}>
          <span className="text-[38cqw]">{initials(person.name)}</span>
        </span>
      )}
    </span>
  );
}
