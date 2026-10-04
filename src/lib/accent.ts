import type { ZoneAccent } from "@/types/content";

/** Clases completas (no dinámicas) para que Tailwind las detecte. `on` = color del ícono/texto sobre el color de la zona. */
export const ACCENT: Record<ZoneAccent, { bg: string; text: string; border: string; shape: string; on: string }> = {
  terra: { bg: "bg-terra", text: "text-terra", border: "border-terra", shape: "text-white/35", on: "text-white" },
  copper: { bg: "bg-copper", text: "text-copper", border: "border-copper", shape: "text-white/45", on: "text-ink" },
  charcoal: { bg: "bg-ink", text: "text-ink", border: "border-ink", shape: "text-white/20", on: "text-white" },
  rust: { bg: "bg-rust", text: "text-rust", border: "border-rust", shape: "text-white/25", on: "text-white" },
  clay: { bg: "bg-clay", text: "text-clay", border: "border-clay", shape: "text-white/45", on: "text-ink" },
};
