import type { ZoneAccent } from "@/types/content";

/** Clases completas (no dinámicas) para que Tailwind las detecte. */
export const ACCENT: Record<ZoneAccent, { bg: string; text: string; border: string; soft: string }> = {
  blue: { bg: "bg-brand", text: "text-brand", border: "border-brand", soft: "bg-brand/10" },
  mint: { bg: "bg-mint", text: "text-mint", border: "border-mint", soft: "bg-mint/15" },
  tangerine: { bg: "bg-tangerine", text: "text-tangerine", border: "border-tangerine", soft: "bg-tangerine/15" },
  ocean: { bg: "bg-ocean", text: "text-ocean", border: "border-ocean", soft: "bg-ocean/15" },
  coral: { bg: "bg-coral", text: "text-coral", border: "border-coral", soft: "bg-coral/15" },
};
