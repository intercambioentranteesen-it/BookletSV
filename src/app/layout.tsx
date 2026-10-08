import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Providers } from "@/components/Providers";
import { SkipLink } from "@/components/layout/Header";
import "./globals.css";

// Poppins: tipografía sugerida en el brandboard del comité (gratuita y libre).
// Si el comité confirma otra familia para títulos, se agrega aquí como segunda fuente.
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

// Si el sitio pasa a un dominio propio, se define NEXT_PUBLIC_SITE_URL (así las vistas previas apuntan a la dirección correcta).
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://bookletsvesen.vercel.app";
const TITLE = "Discover El Salvador | AIESEC in ESEN";
const DESCRIPTION =
  "A small country in size, but giant in heart. Explore beaches, volcanoes, towns and everyday costs before you come to El Salvador with AIESEC in ESEN.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    type: "website",
    url: "/",
    siteName: "AIESEC in ESEN",
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_US",
    alternateLocale: ["es_SV"],
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Discover El Salvador, AIESEC in ESEN" }],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: ["/og.png"] },
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
