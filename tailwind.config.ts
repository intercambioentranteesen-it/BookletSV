import type { Config } from "tailwindcss";

/**
 * Tokens · Alchemist (AIESEC en ESEN)
 * Paleta del brandboard del comité: carbón, terracota, cobre y blanco pergamino.
 * Las variantes `deep`, `rust`, `clay`, `sand` y `line` son tonos derivados de esa misma familia.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  future: { hoverOnlyWhenSupported: true },
  theme: {
    extend: {
      colors: {
        terra: {
          DEFAULT: "#C3522C", // Terracota intenso: bloques y texto grande (blanco encima ≈ 4.6:1)
          deep: "#A4431F", // para texto pequeño y enlaces (≈ 5.6:1 sobre pergamino)
        },
        copper: "#D98850", // Cobre mate: acento (siempre con texto carbón encima)
        ink: "#2C2C2C", // Carbón profundo: texto principal (≈ 12:1 sobre pergamino)
        parchment: "#F6F4F0", // Blanco pergamino: fondo
        graphite: "#595959", // texto secundario (≈ 6:1 sobre pergamino)
        sand: "#ECE7DE", // fondo alterno (derivado del pergamino)
        line: "#D3CCC0", // bordes
        gold: { DEFAULT: "#D4AF37", light: "#F2D675" }, // oro: solo para el lema "rocas en oro" (≈ 6.7:1 sobre carbón)
        rust: "#8A3A1D", // terracota oscuro (identidad de zona)
        clay: "#C9735A", // terracota claro (identidad de zona)
      },
      fontFamily: {
        sans: ["var(--font-poppins, system-ui)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      fontSize: {
        display: ["clamp(2.75rem, 8.2vw, 6.25rem)", { lineHeight: "1.04", letterSpacing: "-0.03em" }],
      },
      borderRadius: {
        control: "0.75rem",
        card: "1rem",
      },
      transitionTimingFunction: {
        "out-strong": "cubic-bezier(0.23, 1, 0.32, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
