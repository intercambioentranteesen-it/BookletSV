import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Providers } from "@/components/Providers";
import { SkipLink } from "@/components/layout/Header";
import "./globals.css";

// Poppins: tipografía sugerida en el brandboard del comité (gratuita y libre).
// Si el comité confirma otra familia para títulos, se agrega aquí como segunda fuente.
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Discover El Salvador | AIESEC in ESEN",
  description:
    "A small country in size, but giant in heart. Explore beaches, volcanoes, towns and everyday costs before you come to El Salvador with AIESEC in ESEN.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body>
        <Providers>
          <SkipLink />
          {children}
        </Providers>
      </body>
    </html>
  );
}
