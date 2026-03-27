import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Hospedagem Colchao — Semana Santa 2026 | Sedevacante",
  description: "Reserve sua hospedagem (colchao) para a Semana Santa 2026 no Seminario Sao Jose. 1 a 5 de Abril, R$200,00 via PIX.",
  openGraph: {
    title: "Hospedagem Colchao — Semana Santa 2026",
    description: "Reserve sua hospedagem para a Semana Santa 2026 no Seminario Sao Jose. 1 a 5 de Abril, sem alimentacao. R$200,00 via PIX.",
    url: "https://sedevacante.com.br/hospedagem-colchao",
    siteName: "Sedevacante",
    images: [{ url: "/images/bishops-02.jpg", width: 1200, height: 630, alt: "Semana Santa 2026 — Sedevacante" }],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hospedagem Colchao — Semana Santa 2026",
    description: "Reserve sua hospedagem para a Semana Santa 2026. 1 a 5 de Abril, R$200,00 via PIX.",
    images: ["/images/bishops-02.jpg"],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
