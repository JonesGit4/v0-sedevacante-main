"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { useLanguage } from "@/lib/language-context"
import { useState } from "react"

interface NewsItem {
  id: string
  title: string
  description: string
  label: string
  date: string
  featured: boolean
  image?: { url: string; alt?: string }
}

const labelMap: Record<string, string> = {
  news: "Notícia",
  highlight: "Destaque",
  featured: "Especial",
}

export function LatestUpdatesCMS({ news }: { news: NewsItem[] }) {
  const { t } = useLanguage()
  const [currentIndex, setCurrentIndex] = useState(0)

  const featuredItem = news.find((n) => n.featured) || news[0]
  const sideItems = news.filter((n) => n.id !== featuredItem.id)

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" })

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % sideItems.length)
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + sideItems.length) % sideItems.length)

  return (
    <section id="updates" className="py-8 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-sans font-light text-foreground mb-4 text-balance">
            {t.latestUpdatesTitle}
          </h2>
          <p className="text-lg text-muted-foreground font-serif">{t.latestUpdatesSubtitle}</p>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-6">
          {/* Featured Card */}
          <Card className="lg:row-span-3 hover:shadow-xl transition-shadow bg-card border-border h-fit">
            <CardContent className="p-0 h-full flex flex-col">
              {featuredItem.image?.url && (
                <div className="relative aspect-video overflow-hidden rounded-t-lg flex-shrink-0">
                  <Image
                    src={featuredItem.image.url}
                    alt={featuredItem.image.alt || featuredItem.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-6 flex flex-col flex-grow">
                <Badge className="w-fit mb-3 bg-accent text-accent-foreground font-serif">
                  {labelMap[featuredItem.label] || featuredItem.label}
                </Badge>
                <h3 className="text-2xl font-sans font-semibold text-foreground mb-3 text-balance">
                  {featuredItem.title}
                </h3>
                <p className="text-muted-foreground font-serif leading-relaxed mb-4 flex-grow">
                  {featuredItem.description}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-sm text-muted-foreground font-serif">
                    {formatDate(featuredItem.date)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Side Cards */}
          {sideItems.length > 0 && (
            <div className="space-y-6">
              {sideItems.slice(0, 3).map((item) => (
                <Card key={item.id} className="hover:shadow-lg transition-shadow bg-card border-border flex-shrink-0">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <Badge
                          className="w-fit mb-2 font-serif"
                          variant={item.label === "highlight" || item.label === "featured" ? "default" : "secondary"}
                        >
                          {labelMap[item.label] || item.label}
                        </Badge>
                        <h3 className="text-lg font-sans font-semibold text-foreground mb-2">
                          {item.title}
                        </h3>
                        <p className="text-muted-foreground font-serif text-sm leading-relaxed mb-3">
                          {item.description}
                        </p>
                        <span className="text-xs text-muted-foreground font-serif">
                          {formatDate(item.date)}
                        </span>
                      </div>
                      {item.image?.url && (
                        <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden rounded-lg">
                          <Image
                            src={item.image.url}
                            alt={item.image.alt || item.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden space-y-6">
          {/* Featured Card */}
          <Card className="hover:shadow-xl transition-shadow bg-card border-border">
            <CardContent className="p-0 flex flex-col">
              {featuredItem.image?.url && (
                <div className="relative aspect-video overflow-hidden rounded-t-lg flex-shrink-0">
                  <Image
                    src={featuredItem.image.url}
                    alt={featuredItem.image.alt || featuredItem.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-6 flex flex-col flex-grow">
                <Badge className="w-fit mb-3 bg-accent text-accent-foreground font-serif">
                  {labelMap[featuredItem.label] || featuredItem.label}
                </Badge>
                <h3 className="text-2xl font-sans font-semibold text-foreground mb-3 text-balance">
                  {featuredItem.title}
                </h3>
                <p className="text-muted-foreground font-serif leading-relaxed mb-4 flex-grow">
                  {featuredItem.description}
                </p>
                <span className="text-sm text-muted-foreground font-serif">
                  {formatDate(featuredItem.date)}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Side items carousel */}
          {sideItems.length > 0 && (
            <div className="space-y-4">
              <div className="relative">
                <Card className="hover:shadow-lg transition-shadow bg-card border-border">
                  <CardContent className="p-6">
                    <div className="flex gap-4 flex-col">
                      <div className="flex-1">
                        <Badge
                          className="w-fit mb-2 font-serif"
                          variant={sideItems[currentIndex].label === "highlight" || sideItems[currentIndex].label === "featured" ? "default" : "secondary"}
                        >
                          {labelMap[sideItems[currentIndex].label] || sideItems[currentIndex].label}
                        </Badge>
                        <h3 className="text-lg font-sans font-semibold text-foreground mb-2">
                          {sideItems[currentIndex].title}
                        </h3>
                        <p className="text-muted-foreground font-serif text-sm leading-relaxed mb-3">
                          {sideItems[currentIndex].description}
                        </p>
                        <span className="text-xs text-muted-foreground font-serif">
                          {formatDate(sideItems[currentIndex].date)}
                        </span>
                      </div>
                      {sideItems[currentIndex].image?.url && (
                        <div className="relative w-full h-32 flex-shrink-0 overflow-hidden rounded-lg">
                          <Image
                            src={sideItems[currentIndex].image.url}
                            alt={sideItems[currentIndex].image.alt || sideItems[currentIndex].title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {sideItems.length > 1 && (
                  <>
                    <button
                      onClick={handlePrev}
                      className="absolute -left-4 top-1/2 -translate-y-1/2 bg-primary text-primary-foreground rounded-full p-2 hover:bg-primary/80 transition-colors"
                    >
                      ←
                    </button>
                    <button
                      onClick={handleNext}
                      className="absolute -right-4 top-1/2 -translate-y-1/2 bg-primary text-primary-foreground rounded-full p-2 hover:bg-primary/80 transition-colors"
                    >
                      →
                    </button>
                  </>
                )}
              </div>

              {sideItems.length > 1 && (
                <div className="flex justify-center gap-2">
                  {sideItems.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentIndex ? "bg-primary" : "bg-muted"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
