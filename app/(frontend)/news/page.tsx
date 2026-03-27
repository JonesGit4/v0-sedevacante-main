import Link from "next/link"
import { getPayload } from "payload"
import config from "@payload-config"
import { NewsList } from "@/components/news-list"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "Notícias | Sedevacante",
  description: "Últimas notícias e atualizações da comunidade católica tradicional.",
}

export default async function NewsPage() {
  let allNews: any[] = []

  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: "news",
      where: { status: { equals: "published" } },
      sort: "-date",
      limit: 100,
      depth: 2,
    })
    allNews = result.docs
  } catch (e) {
    console.error("Error fetching news:", e)
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/#updates" className="text-primary hover:text-primary/80 font-serif">
            ← Voltar ao Início
          </Link>
          <h1 className="text-lg font-sans font-semibold text-foreground">Notícias</h1>
          <div className="w-24" />
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-5xl">
        <h2 className="text-4xl font-sans font-light text-foreground mb-2 text-center">
          Todas as Notícias
        </h2>
        <p className="text-muted-foreground font-serif text-center mb-12">
          Atualizações e acontecimentos da comunidade
        </p>
        <NewsList news={allNews} />
      </main>
    </div>
  )
}
