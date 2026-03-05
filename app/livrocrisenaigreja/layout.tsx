import type { Metadata } from "next"
import type React from "react"

export const metadata: Metadata = {
  title: "A Crise de Autoridade na Igreja — Maxence Hecquard | Sedevacante",
  description:
    "Os papas do Vaticano II são legítimos? Obra fundamental de Maxence Hecquard traduzida para o português. 400+ páginas. Garanta seu exemplar no 1º Lote com 35% de desconto.",
  openGraph: {
    title: "A Crise de Autoridade na Igreja — Maxence Hecquard",
    description:
      "Os papas do Vaticano II são legítimos? 400+ páginas de análise teológica. 1º Lote com 35% de desconto.",
    url: "https://sedevacante.com.br/livrocrisenaigreja",
    siteName: "Sedevacante",
    images: [
      {
        url: "/images/livro/book-cover.png",
        width: 1200,
        height: 630,
        alt: "A Crise de Autoridade na Igreja — Maxence Hecquard",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
}

export default function LivroCriseLayout({ children }: { children: React.ReactNode }) {
  return <div className="!pb-0">{children}</div>
}
