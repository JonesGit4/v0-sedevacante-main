"use client"

import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"

interface Article {
  id: string
  title: string
  slug: string
  excerpt?: string
  author?: string
  publishedAt?: string
  featuredImage?: { url: string; alt?: string }
}

export function PostsSliderCMS({ articles }: { articles: Article[] }) {
  const { t } = useLanguage()

  const mainArticle = articles[0]
  const otherArticles = articles.slice(1, 4)

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" })

  return (
    <section id="articles" className="pt-4 pb-12 bg-secondary/20 overflow-hidden">
      <div className="container mx-auto px-4 mb-8">
        <div className="text-center">
          <h2 className="text-4xl lg:text-5xl font-sans font-light text-foreground mb-4 text-balance">
            {t.postsTitle}
          </h2>
          <p className="text-lg text-muted-foreground font-serif">{t.postsSubtitle}</p>
        </div>
      </div>

      {/* Main article */}
      <div className="container mx-auto px-4 mb-8">
        <Link href={`/articles/${mainArticle.slug}`} className="block">
          <Card className="hover:shadow-lg transition-shadow bg-card border-border">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2 gap-0">
                {mainArticle.featuredImage?.url && (
                  <div className="relative aspect-video md:aspect-square overflow-hidden md:rounded-l-lg rounded-t-lg md:rounded-tr-none">
                    <Image
                      src={mainArticle.featuredImage.url}
                      alt={mainArticle.featuredImage.alt || mainArticle.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className={`p-6 flex flex-col justify-between ${mainArticle.featuredImage?.url ? "" : "md:col-span-2"}`}>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-sans font-semibold text-foreground mb-3 group-hover:underline">
                      {mainArticle.title}
                    </h3>
                    {mainArticle.excerpt && (
                      <p className="text-muted-foreground font-serif text-base leading-relaxed mb-6">
                        {mainArticle.excerpt}
                      </p>
                    )}
                    <span className="inline-block text-primary font-serif text-sm font-semibold">
                      {t.readArticle}...
                    </span>
                  </div>
                  <div className="border-t border-border pt-4 mt-4 flex items-center justify-between text-sm text-muted-foreground font-serif">
                    <span>{mainArticle.author || "Sedevacante"}</span>
                    {mainArticle.publishedAt && <span>{formatDate(mainArticle.publishedAt)}</span>}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Secondary articles */}
      {otherArticles.length > 0 && (
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6">
            {otherArticles.map((article) => (
              <Link key={article.id} href={`/articles/${article.slug}`} className="block group">
                <Card className="hover:shadow-lg transition-shadow bg-card border-border h-full">
                  <CardContent className="p-0">
                    {article.featuredImage?.url && (
                      <div className="relative aspect-video overflow-hidden rounded-t-lg">
                        <Image
                          src={article.featuredImage.url}
                          alt={article.featuredImage.alt || article.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <h4 className="text-xl font-sans font-semibold text-foreground mb-2 line-clamp-2 group-hover:underline">
                        {article.title}
                      </h4>
                      {article.excerpt && (
                        <p className="text-muted-foreground font-serif text-sm leading-relaxed mb-4 line-clamp-3">
                          {article.excerpt}
                        </p>
                      )}
                      <div className="flex items-center justify-between text-xs text-muted-foreground font-serif">
                        <span>{article.author || "Sedevacante"}</span>
                        {article.publishedAt && <span>{formatDate(article.publishedAt)}</span>}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-center mt-8 px-4">
        <a
          href="/articles"
          className="px-8 py-3 border border-primary text-primary hover:bg-primary/10 font-serif font-semibold rounded transition-colors"
        >
          {t.seeAll}
        </a>
      </div>
    </section>
  )
}
