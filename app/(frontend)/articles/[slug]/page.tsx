import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { getPayload } from "payload"
import config from "@payload-config"
import type { Metadata } from "next"

export const dynamic = "force-dynamic"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: "articles",
      where: { slug: { equals: slug }, status: { equals: "published" } },
      limit: 1,
    })
    const article = result.docs[0]
    if (!article) return { title: "Artigo não encontrado" }
    return {
      title: `${article.title} | Sedevacante`,
      description: article.excerpt || "",
    }
  } catch {
    return { title: "Artigo | Sedevacante" }
  }
}

// Render Lexical rich text to HTML
function renderRichText(content: any): string {
  if (!content?.root?.children) return ""
  return renderNodes(content.root.children)
}

function renderNodes(nodes: any[]): string {
  if (!nodes) return ""
  return nodes.map(renderNode).join("")
}

function renderNode(node: any): string {
  if (!node) return ""

  // Text node
  if (node.type === "text") {
    let text = escapeHtml(node.text || "")
    if (node.format & 1) text = `<strong>${text}</strong>`  // bold
    if (node.format & 2) text = `<em>${text}</em>`          // italic
    if (node.format & 4) text = `<s>${text}</s>`            // strikethrough
    if (node.format & 8) text = `<u>${text}</u>`            // underline
    if (node.format & 16) text = `<code>${text}</code>`     // code
    return text
  }

  // Line break
  if (node.type === "linebreak") return "<br/>"

  const children = renderNodes(node.children || [])

  switch (node.type) {
    case "paragraph":
      return `<p>${children}</p>`
    case "heading":
      const tag = node.tag || "h2"
      return `<${tag}>${children}</${tag}>`
    case "list":
      const listTag = node.listType === "number" ? "ol" : "ul"
      return `<${listTag}>${children}</${listTag}>`
    case "listitem":
      return `<li>${children}</li>`
    case "quote":
      return `<blockquote>${children}</blockquote>`
    case "link":
    case "autolink":
      const href = node.fields?.url || node.url || "#"
      return `<a href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer">${children}</a>`
    case "upload":
      const url = node.value?.url || ""
      const alt = node.value?.alt || ""
      if (url) return `<figure><img src="${escapeHtml(url)}" alt="${escapeHtml(alt)}" class="rounded-lg max-w-full" />${alt ? `<figcaption>${escapeHtml(alt)}</figcaption>` : ""}</figure>`
      return ""
    case "horizontalrule":
      return "<hr/>"
    default:
      return children
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params

  let article: any = null
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: "articles",
      where: { slug: { equals: slug }, status: { equals: "published" } },
      limit: 1,
      depth: 1,
    })
    article = result.docs[0]
  } catch (e) {
    console.error("Error fetching article:", e)
  }

  if (!article) notFound()

  const contentHtml = renderRichText(article.content)

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/articles" className="text-primary hover:text-primary/80 font-serif">
            ← Artigos
          </Link>
          <Link href="/" className="text-muted-foreground hover:text-foreground font-serif text-sm">
            Início
          </Link>
        </div>
      </header>

      <article className="container mx-auto px-4 py-12 max-w-3xl">
        {/* Header */}
        <header className="mb-10">
          <h1 className="text-3xl md:text-4xl font-sans font-bold text-foreground mb-4 text-balance">
            {article.title}
          </h1>
          {article.excerpt && (
            <p className="text-lg text-muted-foreground font-serif leading-relaxed mb-6">
              {article.excerpt}
            </p>
          )}
          <div className="flex items-center gap-4 text-sm text-muted-foreground font-serif border-b border-border pb-6">
            {article.author && <span>Por {article.author}</span>}
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
        </header>

        {/* Featured Image */}
        {article.featuredImage?.url && (
          <div className="relative aspect-video overflow-hidden rounded-lg mb-10">
            <Image
              src={article.featuredImage.url}
              alt={article.featuredImage.alt || article.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* Content */}
        <div
          className="prose prose-lg max-w-none font-serif
            prose-headings:font-sans prose-headings:font-semibold
            prose-p:leading-relaxed prose-p:mb-4
            prose-a:text-primary prose-a:underline
            prose-blockquote:border-l-primary prose-blockquote:italic
            prose-img:rounded-lg"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="mt-10 pt-6 border-t border-border">
            <div className="flex flex-wrap gap-2">
              {article.tags.map((t: any, i: number) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-secondary text-secondary-foreground font-serif text-sm rounded-full"
                >
                  {t.tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  )
}
