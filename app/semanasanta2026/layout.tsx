import type { Metadata } from "next"
import type React from "react"

export const metadata: Metadata = {
  title: "Semana Santa 2026 — Seminário São José | Sedevacante",
  description:
    "Vivencia a Semana Santa 2026 com Dom Rodrigo da Silva no Seminário São José, Bragança Paulista. De 29 de março a 5 de abril. Inscrições abertas.",
  openGraph: {
    title: "Semana Santa 2026 — Seminário São José",
    description:
      "Vivencia a Semana Santa 2026 com Dom Rodrigo da Silva no Seminário São José. Inscrições abertas.",
    url: "https://sedevacante.com.br/semanasanta2026",
    siteName: "Sedevacante",
    images: [
      {
        url: "/images/semana-santa/hero-bispo-mitra.jpg",
        width: 1200,
        height: 630,
        alt: "Semana Santa 2026 — Seminário São José",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
}

export default function SemanaSanta2026Layout({ children }: { children: React.ReactNode }) {
  return <div className="!pb-0">{children}</div>
}
