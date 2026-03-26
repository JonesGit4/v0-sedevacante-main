import Link from "next/link"
import Image from "next/image"
import { getPayload } from "payload"
import config from "@payload-config"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "Artigos | Sedevacante",
  description: "Artigos e reflexões sobre a fé católica tradicional.",
}

export default async function ArticlesPage() {
  let articles: any[] = []

  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: "articles",
      where: { status: { equals: "published" } },
      sort: "-publishedAt",
      limit: 50,
      depth: 1,
    })
    articles = result.docs
  } catch (e) {
    console.error("Error fetching articles:", e)
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-primary hover:text-primary/80 font-serif">
            ← Voltar ao Início
          </Link>
          <h1 className="text-lg font-sans font-semibold text-foreground">Artigos</h1>
          <div className="w-24" />
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-5xl">
        <h2 className="text-4xl font-sans font-light text-foreground mb-2 text-center">
          Artigos &amp; Reflexões
        </h2>
        <p className="text-muted-foreground font-serif text-center mb-12">
          Ensinamentos e reflexões sobre a fé católica tradicional
        </p>

        {articles.length === 0 ? (
          <p className="text-center text-muted-foreground font-serif py-20">
            Nenhum artigo publicado ainda.
          </p>
        ) : (
          <div className="grid gap-8">
            {articles.map((article: any) => (
              <Link
                key={article.id}
                href={`/articles/${article.slug}`}
                className="block group"
              >
                <article className="border border-border rounded-lg overflow-hidden bg-card hover:shadow-lg transition-shadow">
                  <div className="grid md:grid-cols-3 gap-0">
                    {article.featuredImage?.url && (
                      <div className="relative aspect-video md:aspect-square overflow-hidden">
                        <Image
                          src={article.featuredImage.url}
                          alt={article.featuredImage.alt || article.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className={`p-6 flex flex-col justify-between ${article.featuredImage?.url ? "md:col-span-2" : "md:col-span-3"}`}>
                      <div>
                        <h3 className="text-2xl font-sans font-semibold text-foreground mb-2 group-hover:underline">
                          {article.title}
                        </h3>
                        {article.excerpt && (
                          <p className="text-muted-foreground font-serif leading-relaxed mb-4 line-clamp-3">
                            {article.excerpt}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground font-serif">
                        <span>{article.author || "Sedevacante"}</span>
                        {article.publishedAt && (
                          <span>
                            {new Date(article.publishedAt).toLocaleDateString("pt-BR", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
