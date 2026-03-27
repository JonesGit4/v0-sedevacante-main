import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Amostra Gratis — A Crise de Autoridade na Igreja | Sedevacante",
  description: "Receba gratuitamente o sumario e os primeiros capitulos do livro A Crise de Autoridade na Igreja direto no seu e-mail.",
  openGraph: {
    title: "Amostra Gratis — A Crise de Autoridade na Igreja",
    description: "Receba gratuitamente o sumario e os primeiros capitulos do livro direto no seu e-mail. Conheca a obra antes de adquirir.",
    url: "https://sedevacante.com.br/amostra-gratis",
    siteName: "Sedevacante",
    images: [{ url: "/images/livro/book-cover.png", width: 800, height: 1200, alt: "A Crise de Autoridade na Igreja — Livro" }],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Amostra Gratis — A Crise de Autoridade na Igreja",
    description: "Receba gratuitamente os primeiros capitulos do livro no seu e-mail.",
    images: ["/images/livro/book-cover.png"],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
