"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { useLanguage } from "@/lib/language-context"
import { useState, useEffect, useCallback } from "react"

interface GalleryPhoto {
  photo?: { url: string; alt?: string }
  caption?: string
}

interface NewsItem {
  id: string
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

function GalleryLightbox({
  images,
  initialIndex,
  onClose,
}: {
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
    <div
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white/80 hover:text-white text-3xl font-light z-10"
      >
        ✕
      </button>

      <div
        className="relative w-full max-w-4xl mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-[4/3] w-full">
          <Image
            src={images[index].url}
            alt={images[index].alt}
            fill
            className="object-contain"
            sizes="(max-width: 1024px) 100vw, 900px"
          />
        </div>

        {images[index].caption && (
          <p className="text-center text-white/80 font-serif text-sm mt-3">
            {images[index].caption}
          </p>
        )}

        <p className="text-center text-white/50 font-serif text-xs mt-2">
          {index + 1} / {images.length}
        </p>

        {images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 text-white/70 hover:text-white text-4xl font-light"
            >
              ‹
            </button>
            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 text-white/70 hover:text-white text-4xl font-light"
            >
              ›
            </button>
          </>
        )}
      </div>
    </div>
  )
}

function getNewsImages(item: NewsItem): { url: string; alt: string; caption?: string }[] {
  const images: { url: string; alt: string; caption?: string }[] = []
  if (item.image?.url) {
    images.push({ url: item.image.url, alt: item.image.alt || item.title })
  }
  if (item.gallery) {
    for (const g of item.gallery) {
      if (g.photo?.url) {
        images.push({ url: g.photo.url, alt: g.photo.alt || item.title, caption: g.caption })
      }
    }
  }
  return images
}

export function LatestUpdatesCMS({ news }: { news: NewsItem[] }) {
  const { t } = useLanguage()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [lightbox, setLightbox] = useState<{ images: { url: string; alt: string; caption?: string }[]; index: number } | null>(null)

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" })

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % news.length)
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + news.length) % news.length)

  const openGallery = (item: NewsItem) => {
    const images = getNewsImages(item)
    if (images.length > 0) {
      setLightbox({ images, index: 0 })
    }
  }

  return (
    <section id="updates" className="py-8 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-sans font-light text-foreground mb-4 text-balance">
            {t.latestUpdatesTitle}
          </h2>
          <p className="text-lg text-muted-foreground font-serif">{t.latestUpdatesSubtitle}</p>
        </div>

        {/* Desktop: 3 cards em grid */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-6">
          {news.slice(0, 3).map((item) => {
            const images = getNewsImages(item)
            const hasGallery = images.length > 1
            return (
              <Card
                key={item.id}
                className={`hover:shadow-xl transition-shadow bg-card border-border flex flex-col ${hasGallery ? "cursor-pointer" : ""}`}
                onClick={hasGallery ? () => openGallery(item) : undefined}
              >
                <CardContent className="p-0 flex flex-col h-full">
                  {item.image?.url && (
                    <div className="relative aspect-video overflow-hidden rounded-t-lg flex-shrink-0">
                      <Image
                        src={item.image.url}
                        alt={item.image.alt || item.title}
                        fill
                        className="object-cover"
                      />
                      {hasGallery && (
                        <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded font-serif">
                          {images.length} fotos
                        </div>
                      )}
                    </div>
                  )}
                  <div className="p-6 flex flex-col flex-grow">
                    <Badge
                      className="w-fit mb-3 font-serif"
                      variant={item.label === "highlight" || item.label === "featured" ? "default" : "secondary"}
                    >
                      {labelMap[item.label] || item.label}
                    </Badge>
                    <h3 className="text-xl font-sans font-semibold text-foreground mb-3 text-balance">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground font-serif text-sm leading-relaxed mb-4 flex-grow">
                      {item.description}
                    </p>
                    <span className="text-sm text-muted-foreground font-serif mt-auto">
                      {formatDate(item.date)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Mobile: carrossel */}
        <div className="lg:hidden">
          <div className="relative">
            {(() => {
              const item = news[currentIndex]
              const images = getNewsImages(item)
              const hasGallery = images.length > 1
              return (
                <Card
                  className={`hover:shadow-xl transition-shadow bg-card border-border ${hasGallery ? "cursor-pointer" : ""}`}
                  onClick={hasGallery ? () => openGallery(item) : undefined}
                >
                  <CardContent className="p-0 flex flex-col">
                    {item.image?.url && (
                      <div className="relative aspect-video overflow-hidden rounded-t-lg flex-shrink-0">
                        <Image
                          src={item.image.url}
                          alt={item.image.alt || item.title}
                          fill
                          className="object-cover"
                        />
                        {hasGallery && (
                          <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded font-serif">
                            {images.length} fotos
                          </div>
                        )}
                      </div>
                    )}
                    <div className="p-6 flex flex-col">
                      <Badge
                        className="w-fit mb-3 font-serif"
                        variant={item.label === "highlight" || item.label === "featured" ? "default" : "secondary"}
                      >
                        {labelMap[item.label] || item.label}
                      </Badge>
                      <h3 className="text-xl font-sans font-semibold text-foreground mb-3 text-balance">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground font-serif text-sm leading-relaxed mb-4">
                        {item.description}
                      </p>
                      <span className="text-sm text-muted-foreground font-serif">
                        {formatDate(item.date)}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              )
            })()}

            {news.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); handlePrev() }}
                  className="absolute -left-3 top-1/2 -translate-y-1/2 bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center hover:bg-primary/80 transition-colors shadow-md"
                >
                  ←
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); handleNext() }}
                  className="absolute -right-3 top-1/2 -translate-y-1/2 bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center hover:bg-primary/80 transition-colors shadow-md"
                >
                  →
                </button>
              </>
            )}
          </div>

          {news.length > 1 && (
            <div className="flex justify-center gap-2 mt-4">
              {news.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    index === currentIndex ? "bg-primary" : "bg-muted"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <GalleryLightbox
          images={lightbox.images}
          initialIndex={lightbox.index}
          onClose={() => setLightbox(null)}
        />
      )}
    </section>
  )
}
