import type { Config } from "tailwindcss";

/**
 * Tokens · AIESEC, Incoming Exchange
 * Paleta tomada de la guía de marca (Blue Book). Un azul protagonista, blanco, y los
 * colores de apoyo solo como identidad de zona: nunca como degradado.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  // `hover:` solo en dispositivos con hover real (evita falsos hovers al tocar)
  future: { hoverOnlyWhenSupported: true },
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#037EF3", // azul AIESEC: bloques y títulos grandes (blanco encima ≈ 4:1)
          deep: "#0062C9", // azul para texto pequeño y botones (blanco encima ≈ 5.9:1)
        },
        ink: "#0B1F3A", // texto principal
        graphite: "#52565E", // texto secundario (≈ 7:1 sobre blanco)
        mist: "#F3F4F7", // fondo suave
        line: "#CACCD1", // bordes
        haze: "#EAF3FE", // azul muy tenue
        // Identidad de zona
        mint: "#30C39E",
        ocean: "#0A8EA0",
        tangerine: "#F48924",
        sun: "#FFC845",
        coral: "#F85A40",
      },
      fontFamily: {
        sans: ["var(--font-lato)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      fontSize: {
        display: ["clamp(3.25rem, 10vw, 7.5rem)", { lineHeight: "0.95", letterSpacing: "-0.025em" }],
      },
      borderRadius: {
        control: "0.75rem", // 12px
        card: "1rem", // 16px
      },
      transitionTimingFunction: {
        "out-strong": "cubic-bezier(0.23, 1, 0.32, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
