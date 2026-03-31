import Link from "next/link"
import Image from "next/image"
import { getPayload } from "payload"
import config from "@payload-config"
import { BannerSidebar } from "@/components/banner-sidebar"

export const dynamic = "force-dynamic"

const ARTICLES_PER_PAGE = 12

export const metadata = {
  title: "Artigos | Sedevacante",
  description: "Artigos e reflexões sobre a fé católica tradicional.",
}

type Props = {
  searchParams: Promise<{ page?: string }>
}

export default async function ArticlesPage({ searchParams }: Props) {
  const params = await searchParams
  const currentPage = Math.max(1, parseInt(params.page || "1", 10))

  let pinned: any[] = []
  let paginatedArticles: any[] = []
  let totalPages = 1
  let banners: any[] = []

  try {
    const payload = await getPayload({ config })

    // Fetch pinned articles (always shown on top)
    const pinnedResult = await payload.find({
      collection: "articles",
      where: {
        status: { equals: "published" },
        pinned: { equals: true },
      },
      sort: "pinnedOrder",
      limit: 2,
      depth: 1,
    })
    pinned = pinnedResult.docs

    // Fetch paginated articles (excluding pinned)
    const pinnedIds = pinned.map((a) => a.id)
    const articlesResult = await payload.find({
      collection: "articles",
      where: {
        status: { equals: "published" },
        ...(pinnedIds.length > 0 ? { id: { not_in: pinnedIds } } : {}),
      },
      sort: "-publishedAt",
      limit: ARTICLES_PER_PAGE,
      page: currentPage,
      depth: 1,
    })
    paginatedArticles = articlesResult.docs
    totalPages = articlesResult.totalPages

    // Fetch banners for articles page
    const bannersResult = await payload.find({
      collection: "banners",
      where: {
        status: { equals: "active" },
        location: { contains: "articles" },
      },
      sort: "order",
      limit: 10,
      depth: 1,
    })
    banners = bannersResult.docs
  } catch (e) {
    console.error("Error fetching articles:", e)
  }

  const hasBanners = banners.length > 0

  return (
    <div className="min-h-screen bg-background pt-20">
      <main className="container mx-auto px-4 py-12 max-w-7xl">
        <h2 className="text-4xl font-sans font-light text-foreground mb-2 text-center">
          Artigos &amp; Reflexões
        </h2>
        <p className="text-muted-foreground font-serif text-center mb-12">
          Ensinamentos e reflexões sobre a fé católica tradicional
        </p>

        {pinned.length === 0 && paginatedArticles.length === 0 ? (
          <p className="text-center text-muted-foreground font-serif py-20">
            Nenhum artigo publicado ainda.
          </p>
        ) : (
          <>
            {/* Featured section — pinned articles (all pages) */}
            {pinned.length > 0 && (
              <section className="grid md:grid-cols-2 gap-6 mb-12">
                {pinned.map((article) => (
                  <FeaturedCard key={article.id} article={article} />
                ))}
              </section>
            )}

            {/* Content area: articles grid + optional sidebar */}
            <div className={`flex gap-8 ${hasBanners ? "" : ""}`}>
              {/* Articles grid */}
              <div className="flex-1 min-w-0">
                {paginatedArticles.length > 0 && (
                  <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {paginatedArticles.map((article) => (
                      <SmallCard key={article.id} article={article} />
                    ))}
                  </section>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <nav className="mt-12 flex items-center justify-center gap-2">
                    {currentPage > 1 && (
                      <Link
                        href={`/articles?page=${currentPage - 1}`}
                        className="px-4 py-2 text-sm font-serif border border-border rounded-lg hover:bg-secondary/50 transition-colors"
                      >
                        ← Anterior
                      </Link>
                    )}
                    <div className="flex items-center gap-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <Link
                          key={page}
                          href={`/articles?page=${page}`}
                          className={`w-9 h-9 flex items-center justify-center text-sm font-serif rounded-lg transition-colors ${
                            page === currentPage
                              ? "bg-primary text-white font-bold"
                              : "hover:bg-secondary/50 text-muted-foreground"
                          }`}
                        >
                          {page}
                        </Link>
                      ))}
                    </div>
                    {currentPage < totalPages && (
                      <Link
                        href={`/articles?page=${currentPage + 1}`}
                        className="px-4 py-2 text-sm font-serif border border-border rounded-lg hover:bg-secondary/50 transition-colors"
                      >
                        Próxima →
                      </Link>
                    )}
                  </nav>
                )}
              </div>

              {/* Sidebar banners */}
              {hasBanners && (
                <div className="hidden lg:block w-[280px] flex-shrink-0">
                  <div className="sticky top-28">
                    <BannerSidebar banners={banners} />
                  </div>
                </div>
              )}
            </div>
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
