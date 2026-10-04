import type { Metadata } from "next";
import { Lato } from "next/font/google";
import { Providers } from "@/components/Providers";
import { SkipLink } from "@/components/layout/Header";
import "./globals.css";

// Lato: tipografía oficial de la marca. Light y Black dan el contraste de peso del diseño.
const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-lato",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Discover El Salvador | AIESEC in ESEN",
  description:
    "A small country in size, but giant in heart. Explore beaches, volcanoes, towns and everyday costs before you come to El Salvador with AIESEC in ESEN.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={lato.variable}>
      <body>
        <Providers>
          <SkipLink />
          {children}
        </Providers>
      </body>
    </html>
  );
}
