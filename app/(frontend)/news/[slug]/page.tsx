import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { getPayload } from "payload"
import config from "@payload-config"
import CorrectionButton from "@/components/correction-button"

export const dynamic = "force-dynamic"

type Props = {
  params: Promise<{ slug: string }>
}

async function getNewsBySlug(slug: string) {
  // Strip accents to match database (Payload strips them natively)
  const asciiSlug = slug.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: "news",
    where: { slug: { equals: asciiSlug }, status: { equals: "published" } },
    limit: 1,
  })
  return result.docs[0] || null
}

export async function generateMetadata({ params }: Props) {
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

export default async function NewsPage({ params }: Props) {
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
      <nav className="mb-6 font-serif text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/#updates" className="hover:text-primary transition-colors">Notícias</Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{news.title}</span>
      </nav>

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

      {news.image && typeof news.image === "object" && news.image.url && (
        <div className="mb-8 rounded-lg overflow-hidden">
          <Image src={news.image.url} alt={news.image.alt || news.title} width={800} height={450} className="w-full h-auto object-cover" priority />
        </div>
      )}

      <p className="text-lg font-serif text-foreground/80 leading-relaxed mb-8 border-l-4 border-primary pl-4 italic">
        {news.description}
      </p>

      {news.content && (
        <div className="prose prose-lg max-w-none font-serif text-foreground/90 leading-relaxed">
          {Array.isArray(news.content) ? (
            news.content.map((node: any, i: number) => {
              if (!node.children) return null
              const fullText = node.children.map((c: any) => c.text || "").join("")
              const isSourceFooter = fullText.includes("📎") && fullText.includes("Fonte original")
              if (!fullText.trim()) return <br key={i} />
              if (node.type === "h2") return <h2 key={i} className="text-2xl font-sans font-semibold mt-8 mb-4">{fullText}</h2>
              if (node.type === "h3") return <h3 key={i} className="text-xl font-sans font-semibold mt-6 mb-3">{fullText}</h3>
              if (node.type === "blockquote") return <blockquote key={i} className="border-l-4 border-primary/40 pl-4 italic my-4">{fullText}</blockquote>
              if (isSourceFooter) {
                const linkChild = node.children.find((c: any) => c.link)
                const sourceUrl = linkChild?.link || "#"
                const sourceName = fullText.replace("📎 Fonte original: ", "").trim()
                return (
                  <div key={i} className="mt-8 pt-4 border-t border-border text-sm text-muted-foreground font-serif">
                    <p>
                      <span className="mr-1">📎</span>
                      <strong>Fonte original:</strong>{" "}
                      <a href={sourceUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{sourceName}</a>
                    </p>
                  </div>
                )
              }
              return (
                <p key={i} className="mb-4">
                  {node.children.map((child: any, j: number) => {
                    if (child.bold) return <strong key={j}>{child.text}</strong>
                    if (child.italic) return <em key={j}>{child.text}</em>
                    if (child.code) return <code key={j} className="bg-muted px-1 rounded text-sm">{child.text}</code>
                    return <span key={j}>{child.text}</span>
                  })}
                </p>
              )
            })
          ) : (
            <p className="mb-4">{String(news.content)}</p>
          )}
        </div>
      )}

      <CorrectionButton slug={slug} titulo={news.title} />

      <div className="mt-12 pt-6 border-t border-border">
        <Link href="/#updates" className="inline-flex items-center gap-2 text-sm font-serif text-primary hover:text-primary/80 transition-colors">
          ← Voltar para Notícias
        </Link>
      </div>
    </article>
  )
}
