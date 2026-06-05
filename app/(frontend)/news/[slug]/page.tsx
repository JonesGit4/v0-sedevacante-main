import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"

const PAYLOAD_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://sedevacante.com.br"

const labelMap: Record<string, string> = {
  news: "Notícia",
  highlight: "Destaque",
  featured: "Especial",
}

async function getNews(slug: string) {
  const res = await fetch(
    `${PAYLOAD_URL}/api/news?where[slug][equals]=${slug}&depth=2`,
    { next: { revalidate: 60 } }
  )
  if (!res.ok) return null
  const data = await res.json()
  return data.docs?.[0] || null
}

export default async function NewsPage({ params }: { params: { slug: string } }) {
  const news = await getNews(params.slug)
  if (!news) notFound()

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" })

  return (
    <main className="min-h-screen bg-background">
      <article className="container mx-auto px-4 py-12 max-w-3xl">
        {/* Breadcrumb */}
        <nav className="mb-8 font-serif text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/news" className="hover:text-foreground transition-colors">Notícias</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{news.title}</span>
        </nav>

        {/* Badge */}
        <Badge className="mb-4 font-serif" variant="secondary">
          {labelMap[news.label] || news.label}
        </Badge>

        {/* Title */}
        <h1 className="text-3xl lg:text-4xl font-sans font-bold text-foreground mb-6 text-balance">
          {news.title}
        </h1>

        {/* Image */}
        {news.image?.url && (
          <div className="relative aspect-video mb-8 rounded-lg overflow-hidden">
            <Image
              src={news.image.url}
              alt={news.image.alt || news.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Lead */}
        {news.description && (
          <p className="text-lg font-serif text-muted-foreground leading-relaxed mb-8 border-l-4 border-primary pl-4 italic">
            {news.description}
          </p>
        )}

        {/* Content */}
        {news.content && (
          <div className="prose prose-lg max-w-none font-serif text-foreground leading-relaxed
            prose-headings:font-sans prose-headings:font-semibold
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            prose-strong:text-foreground
            [&>p]:mb-5 [&>p]:leading-relaxed"
            dangerouslySetInnerHTML={{ __html: news.content_html || news.content }}
          />
        )}

        {/* Date */}
        <div className="mt-10 pt-6 border-t border-border text-sm text-muted-foreground font-serif">
          Publicado em {formatDate(news.date)}
        </div>
      </article>
    </main>
  )
}
