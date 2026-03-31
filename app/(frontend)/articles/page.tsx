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
  let allArticles: any[] = []

  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: "articles",
      where: { status: { equals: "published" } },
      sort: "-publishedAt",
      limit: 50,
      depth: 1,
    })
    allArticles = result.docs
  } catch (e) {
    console.error("Error fetching articles:", e)
  }

  // Separate pinned from regular
  const pinned = allArticles
    .filter((a) => a.pinned)
    .sort((a, b) => (a.pinnedOrder || 99) - (b.pinnedOrder || 99))
    .slice(0, 2)

  const pinnedIds = new Set(pinned.map((a) => a.id))
  const rest = allArticles.filter((a) => !pinnedIds.has(a.id))

  // If fewer than 2 pinned, fill featured spots with most recent
  const featured = [...pinned]
  for (const a of rest) {
    if (featured.length >= 2) break
    featured.push(a)
  }
  const featuredIds = new Set(featured.map((a) => a.id))
  const cards = allArticles.filter((a) => !featuredIds.has(a.id))

  return (
    <div className="min-h-screen bg-background pt-20">
      <main className="container mx-auto px-4 py-12 max-w-6xl">
        <h2 className="text-4xl font-sans font-light text-foreground mb-2 text-center">
          Artigos &amp; Reflexões
        </h2>
        <p className="text-muted-foreground font-serif text-center mb-12">
          Ensinamentos e reflexões sobre a fé católica tradicional
        </p>

        {allArticles.length === 0 ? (
          <p className="text-center text-muted-foreground font-serif py-20">
            Nenhum artigo publicado ainda.
          </p>
        ) : (
          <>
            {/* Featured section — up to 2 articles */}
            {featured.length > 0 && (
              <section className="grid md:grid-cols-2 gap-6 mb-12">
                {featured.map((article) => (
                  <FeaturedCard key={article.id} article={article} />
                ))}
              </section>
            )}

            {/* Remaining articles grid */}
            {cards.length > 0 && (
              <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {cards.map((article) => (
                  <SmallCard key={article.id} article={article} />
                ))}
              </section>
            )}
          </>
        )}
      </main>
    </div>
  )
}

/* ── Featured card (large, with image) ── */
function FeaturedCard({ article }: { article: any }) {
  return (
    <Link href={`/articles/${article.slug}`} className="block group">
      <article className="border border-border rounded-xl overflow-hidden bg-card hover:shadow-xl transition-shadow h-full flex flex-col">
        {/* Image area */}
        <div className="relative aspect-[4/3] overflow-hidden bg-secondary/30">
          {article.featuredImage?.url ? (
            <Image
              src={article.featuredImage.url}
              alt={article.featuredImage.alt || article.title}
              fill
              className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-6xl opacity-20 font-cinzel-decorative select-none">✠</span>
            </div>
          )}
          {article.pinned && (
            <span className="absolute top-3 left-3 px-2 py-0.5 bg-primary/90 text-white text-xs font-sans font-semibold rounded backdrop-blur-sm">
              Destaque
            </span>
          )}
        </div>

        {/* Text */}
        <div className="p-5 flex flex-col flex-1">
          <h3 className="text-xl font-sans font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {article.title}
          </h3>
          {article.excerpt && (
            <p className="text-sm text-muted-foreground font-serif leading-relaxed mb-4 line-clamp-3 flex-1">
              {article.excerpt}
            </p>
          )}
          <div className="flex items-center justify-between text-xs text-muted-foreground font-serif mt-auto pt-3 border-t border-border/50">
            <span className="font-medium">{article.author || "Sedevacante"}</span>
            {article.publishedAt && (
              <span>
                {new Date(article.publishedAt).toLocaleDateString("pt-BR", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            )}
          </div>
        </div>
      </article>
    </Link>
  )
}

/* ── Small card (grid below) ── */
function SmallCard({ article }: { article: any }) {
  return (
    <Link href={`/articles/${article.slug}`} className="block group">
      <article className="border border-border rounded-lg overflow-hidden bg-card hover:shadow-lg transition-shadow h-full flex flex-col">
        {/* Compact image */}
        <div className="relative aspect-[16/10] overflow-hidden bg-secondary/20">
          {article.featuredImage?.url ? (
            <Image
              src={article.featuredImage.url}
              alt={article.featuredImage.alt || article.title}
              fill
              className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl opacity-15 font-cinzel-decorative select-none">✠</span>
            </div>
          )}
        </div>

        <div className="p-4 flex flex-col flex-1">
          <h3 className="text-base font-sans font-semibold text-foreground mb-1.5 group-hover:text-primary transition-colors line-clamp-2">
            {article.title}
          </h3>
          {article.excerpt && (
            <p className="text-xs text-muted-foreground font-serif leading-relaxed mb-3 line-clamp-2 flex-1">
              {article.excerpt}
            </p>
          )}
          <div className="flex items-center justify-between text-xs text-muted-foreground font-serif mt-auto pt-2 border-t border-border/50">
            <span>{article.author || "Sedevacante"}</span>
            {article.publishedAt && (
              <span>
                {new Date(article.publishedAt).toLocaleDateString("pt-BR", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            )}
          </div>
        </div>
      </article>
    </Link>
  )
}
