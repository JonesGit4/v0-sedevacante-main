"use client"

import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { useState, useEffect, useCallback } from "react"

interface GalleryPhoto {
  photo?: { url: string; alt?: string }
  caption?: string
}

interface NewsItem {
  id: number
  title: string
  description: string
  label: string
  date: string
  featured: boolean
  image?: { url: string; alt?: string }
  gallery?: GalleryPhoto[]
}

const labelMap: Record<string, string> = {
  news: "Notícia",
  highlight: "Destaque",
  featured: "Especial",
}

const PER_PAGE = 10

function getNewsImages(item: NewsItem): { url: string; alt: string; caption?: string }[] {
  const images: { url: string; alt: string; caption?: string }[] = []
  if (item.image?.url) images.push({ url: item.image.url, alt: item.image.alt || item.title })
  if (item.gallery) {
    for (const g of item.gallery) {
      if (g.photo?.url) images.push({ url: g.photo.url, alt: g.photo.alt || item.title, caption: g.caption })
    }
  }
  return images
}

function GalleryLightbox({ images, initialIndex, onClose }: {
  images: { url: string; alt: string; caption?: string }[]
  initialIndex: number
  onClose: () => void
}) {
  const [index, setIndex] = useState(initialIndex)
  const handlePrev = useCallback(() => setIndex((i) => (i - 1 + images.length) % images.length), [images.length])
  const handleNext = useCallback(() => setIndex((i) => (i + 1) % images.length), [images.length])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft") handlePrev()
      if (e.key === "ArrowRight") handleNext()
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [onClose, handlePrev, handleNext])

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center" onClick={onClose}>
      <button onClick={onClose} className="absolute top-4 right-4 text-white/80 hover:text-white text-3xl font-light z-10">✕</button>
      <div className="relative w-full max-w-4xl mx-4" onClick={(e) => e.stopPropagation()}>
        <div className="relative aspect-[4/3] w-full">
          <Image src={images[index].url} alt={images[index].alt} fill className="object-contain" sizes="(max-width: 1024px) 100vw, 900px" />
        </div>
        {images[index].caption && <p className="text-center text-white/80 font-serif text-sm mt-3">{images[index].caption}</p>}
        <p className="text-center text-white/50 font-serif text-xs mt-2">{index + 1} / {images.length}</p>
        {images.length > 1 && (
          <>
            <button onClick={handlePrev} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 text-white/70 hover:text-white text-4xl font-light">‹</button>
            <button onClick={handleNext} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 text-white/70 hover:text-white text-4xl font-light">›</button>
          </>
        )}
      </div>
    </div>
  )
}

export function NewsList({ news }: { news: NewsItem[] }) {
  const [page, setPage] = useState(1)
  const [lightbox, setLightbox] = useState<{ images: { url: string; alt: string; caption?: string }[]; index: number } | null>(null)

  const totalPages = Math.ceil(news.length / PER_PAGE)
  const paged = news.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" })

  const openGallery = (item: NewsItem) => {
    const images = getNewsImages(item)
    if (images.length > 0) setLightbox({ images, index: 0 })
  }

  return (
    <>
      {news.length === 0 ? (
        <p className="text-center text-muted-foreground font-serif py-20">
          Nenhuma notícia publicada ainda.
        </p>
      ) : (
        <>
          <div className="grid gap-8">
            {paged.map((item) => {
              const images = getNewsImages(item)
              const hasGallery = images.length > 1
              return (
                <article
                  key={item.id}
                  className={`border border-border rounded-lg overflow-hidden bg-card hover:shadow-lg transition-shadow ${hasGallery ? "cursor-pointer" : ""}`}
                  onClick={hasGallery ? () => openGallery(item) : undefined}
                >
                  <div className="grid md:grid-cols-3 gap-0">
                    {item.image?.url && (
                      <div className="relative aspect-video md:aspect-square overflow-hidden">
                        <Image src={item.image.url} alt={item.image.alt || item.title} fill className="object-cover" />
                        {images.length > 1 && (
                          <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded font-serif">
                            {images.length} fotos
                          </div>
                        )}
                      </div>
                    )}
                    <div className={`p-6 flex flex-col justify-between ${item.image?.url ? "md:col-span-2" : "md:col-span-3"}`}>
                      <div>
                        <Badge className="w-fit mb-3 font-serif" variant={item.label === "highlight" || item.label === "featured" ? "default" : "secondary"}>
                          {labelMap[item.label] || item.label}
                        </Badge>
                        <h3 className="text-2xl font-sans font-semibold text-foreground mb-2">{item.title}</h3>
                        <p className="text-muted-foreground font-serif leading-relaxed mb-4 line-clamp-3">{item.description}</p>
                      </div>
                      <span className="text-sm text-muted-foreground font-serif">{formatDate(item.date)}</span>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>

          {/* Paginação */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 rounded-lg border border-border text-sm font-serif disabled:opacity-30 hover:bg-muted transition-colors"
              >
                ← Anterior
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-10 h-10 rounded-lg text-sm font-serif transition-colors ${
                    p === page ? "bg-primary text-primary-foreground" : "border border-border hover:bg-muted"
                  }`}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-4 py-2 rounded-lg border border-border text-sm font-serif disabled:opacity-30 hover:bg-muted transition-colors"
              >
                Próxima →
              </button>
            </div>
          )}
        </>
      )}

      {lightbox && (
        <GalleryLightbox images={lightbox.images} initialIndex={lightbox.index} onClose={() => setLightbox(null)} />
      )}
    </>
  )
}
