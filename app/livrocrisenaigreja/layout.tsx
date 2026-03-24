import type { Metadata } from "next"
import type React from "react"

export const metadata: Metadata = {
  title: "A Crise de Autoridade na Igreja — Maxence Hecquard | Sedevacante",
  description:
    "Os papas do Vaticano II são legítimos? Obra fundamental de Maxence Hecquard traduzida para o português. 400+ páginas de análise teológica e filosófica. Garanta seu exemplar no 1º Lote com 25% de desconto e frete grátis.",
  keywords: [
    "crise na igreja",
    "autoridade na igreja",
    "Maxence Hecquard",
    "sedevacante",
    "Vaticano II",
    "papas do Vaticano II",
    "tradição católica",
    "teologia católica",
    "sede vacante",
    "livro católico",
    "crise de autoridade",
    "Igreja Católica",
    "Seminário São José",
    "catolicismo",
    "tradicionalismo",
    "Dom Rodrigo da Silva",
    "Dom Altamira",
    "Dom Roy",
  ],
  openGraph: {
    title: "A Crise de Autoridade na Igreja — Maxence Hecquard",
    description:
      "Os papas do Vaticano II são legítimos? 400+ páginas de análise teológica e filosófica. 1º Lote com 25% de desconto e frete grátis.",
    url: "https://sedevacante.com.br/livrocrisenaigreja",
    siteName: "Sedevacante",
    images: [
      {
        url: "https://sedevacante.com.br/images/livro/book-cover.png",
        width: 1200,
        height: 630,
        alt: "Livro A Crise de Autoridade na Igreja — Maxence Hecquard",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "A Crise de Autoridade na Igreja — Maxence Hecquard",
    description:
      "Os papas do Vaticano II são legítimos? 400+ páginas. 1º Lote com 25% de desconto e frete grátis.",
    images: ["https://sedevacante.com.br/images/livro/book-cover.png"],
  },
  alternates: {
    canonical: "https://sedevacante.com.br/livrocrisenaigreja",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function LivroCriseLayout({ children }: { children: React.ReactNode }) {
  return <div className="!pb-0 !mb-[-5rem]">{children}</div>
}
