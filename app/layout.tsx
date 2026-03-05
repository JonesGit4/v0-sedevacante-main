import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Crimson_Text, Cinzel_Decorative } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { LanguageProvider } from "@/lib/language-context"
import { DevModalProvider } from "@/lib/dev-modal-context"
import "./globals.css"

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
  title: "Sedevacante - Roman Catholic Apostolic Tradition",
  description:
    "Preserving the true faith and timeless traditions of the Catholic Church through authentic communities spread throughout the world.",
  generator: "v0.app",
  icons: {
    icon: "/images/sede_favicon.png",
  },
  openGraph: {
    title: "Sedevacante - Roman Catholic Apostolic Tradition",
    description:
      "Preserving the true faith and timeless traditions of the Catholic Church through authentic communities spread throughout the world.",
    url: "https://sedevacante.com.br",
    siteName: "Sedevacante",
    images: [
      {
        url: "/images/bishops-02.jpg",
        width: 1200,
        height: 630,
        alt: "Sedevacante - Traditional Catholic Community",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sedevacante - Roman Catholic Apostolic Tradition",
    description:
      "Preserving the true faith and timeless traditions of the Catholic Church through authentic communities spread throughout the world.",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
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
