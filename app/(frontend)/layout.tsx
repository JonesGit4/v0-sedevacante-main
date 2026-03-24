import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Crimson_Text, Cinzel_Decorative } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { LanguageProvider } from "@/lib/language-context"
import { DevModalProvider } from "@/lib/dev-modal-context"
import "../globals.css"

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
  display: "swap",
})

const crimsonText = Crimson_Text({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-crimson-text",
  display: "swap",
})

const cinzelDecorative = Cinzel_Decorative({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-cinzel-decorative",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Sedevacante — Tradição Católica Apostólica Romana",
  description:
    "Preservando a verdadeira Fé e as tradições perenes da Igreja Católica através de comunidades autênticas espalhadas por todo o mundo.",
  icons: {
    icon: "/images/sede_favicon.png",
  },
  keywords: [
    "sedevacante",
    "tradição católica",
    "Igreja Católica",
    "sede vacante",
    "católico tradicional",
    "missa tridentina",
    "Vaticano II",
    "catolicismo",
    "tradicionalismo",
    "Dom Rodrigo da Silva",
    "Dom Altamira",
    "Dom Roy",
    "escapulário verde",
    "escapulário do Carmo",
    "cordão de São José",
    "Seminário São José",
  ],
  openGraph: {
    title: "Sedevacante — Tradição Católica Apostólica Romana",
    description:
      "Preservando a verdadeira Fé e as tradições perenes da Igreja Católica através de comunidades autênticas espalhadas por todo o mundo.",
    url: "https://sedevacante.com.br",
    siteName: "Sedevacante",
    images: [
      {
        url: "/images/bishops-02.jpg",
        width: 1200,
        height: 630,
        alt: "Sedevacante — Comunidade Católica Tradicional",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sedevacante — Tradição Católica Apostólica Romana",
    description:
      "Preservando a verdadeira Fé e as tradições perenes da Igreja Católica através de comunidades autênticas espalhadas por todo o mundo.",
    images: ["/images/bishops-02.jpg"],
  },
  alternates: {
    canonical: "https://sedevacante.com.br",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function FrontendLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`font-serif ${playfairDisplay.variable} ${crimsonText.variable} ${cinzelDecorative.variable} antialiased pb-20`}>
        <LanguageProvider>
          <DevModalProvider>
            <Suspense fallback={null}>{children}</Suspense>
            <Analytics />
          </DevModalProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
