import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"

async function getNewsBySlug(slug: string) {
  const apiUrl = process.env.NEXT_PUBLIC_SITE_URL
    ? `${process.env.NEXT_PUBLIC_SITE_URL}/api/news?where[slug][equals]=${slug}&depth=1`
    : `https://sedevacante.com.br/api/news?where[slug][equals]=${slug}&depth=1`

  const res = await fetch(apiUrl, { next: { revalidate: 60 } })
  if (!res.ok) return null
  const data = await res.json()
  return data.docs?.[0] || null
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const news = await getNewsBySlug(slug)
  if (!news) return { title: "Notícia não encontrada" }

  return {
    title: `${news.title} — Sedevacante`,
    description: news.description,
    openGraph: {
      title: news.title,
      description: news.description,
      type: "article",
    },
  }
}

export default async function NewsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const news = await getNewsBySlug(slug)
  if (!news) notFound()

  const date = new Date(news.date).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  return (
    <article className="container mx-auto max-w-3xl px-4 py-12">
      {/* Breadcrumb */}
      <nav className="mb-6 font-serif text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary transition-colors">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/#updates" className="hover:text-primary transition-colors">
          Notícias
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{news.title}</span>
      </nav>

      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-sans font-semibold text-foreground mb-4 leading-tight">
          {news.title}
        </h1>
        <div className="flex items-center gap-3 text-sm text-muted-foreground font-serif">
          <time dateTime={news.date}>{date}</time>
          {news.label && (
            <>
              <span>·</span>
              <span className="inline-block px-2 py-0.5 bg-primary/10 text-primary rounded-[3px] text-xs uppercase tracking-wider">
                {news.label === "news" ? "Notícia" : news.label}
              </span>
            </>
          )}
        </div>
      </header>

      {/* Image */}
      {news.image && typeof news.image === "object" && news.image.url && (
        <div className="mb-8 rounded-lg overflow-hidden">
          <Image
            src={news.image.url}
            alt={news.image.alt || news.title}
            width={800}
            height={450}
            className="w-full h-auto object-cover"
            priority
          />
        </div>
      )}

      {/* Lead */}
      <p className="text-lg font-serif text-foreground/80 leading-relaxed mb-8 border-l-4 border-primary pl-4 italic">
        {news.description}
      </p>

      {/* Content */}
      {news.content && (
        <div className="prose prose-lg max-w-none font-serif text-foreground/90 leading-relaxed">
          {/* Payload rich text — render as HTML */}
          {Array.isArray(news.content) ? (
            news.content.map((node: any, i: number) => {
              if (!node.children) return null
              const text = node.children.map((c: any) => c.text || "").join("")
              if (!text.trim()) return <br key={i} />
              if (node.type === "h2") return <h2 key={i} className="text-2xl font-sans font-semibold mt-8 mb-4">{text}</h2>
              if (node.type === "h3") return <h3 key={i} className="text-xl font-sans font-semibold mt-6 mb-3">{text}</h3>
              if (node.type === "blockquote") return <blockquote key={i} className="border-l-4 border-primary/40 pl-4 italic my-4">{text}</blockquote>
              return <p key={i} className="mb-4">{text}</p>
            })
          ) : (
            <p className="mb-4">{String(news.content)}</p>
          )}
        </div>
      )}

      {/* Back link */}
      <div className="mt-12 pt-6 border-t border-border">
        <Link
          href="/#updates"
          className="inline-flex items-center gap-2 text-sm font-serif text-primary hover:text-primary/80 transition-colors"
        >
          ← Voltar para Notícias
        </Link>
      </div>
    </article>
  )
}
