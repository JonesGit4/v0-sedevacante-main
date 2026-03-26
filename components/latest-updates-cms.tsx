"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { useLanguage } from "@/lib/language-context"

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

  const featuredItem = news.find((n) => n.featured) || news[0]
  const sideItems = news.filter((n) => n.id !== featuredItem.id).slice(0, 2)

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" })

  return (
    <section id="updates" className="py-8 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-sans font-light text-foreground mb-4 text-balance">
            {t.latestUpdatesTitle}
          </h2>
          <p className="text-lg text-muted-foreground font-serif">{t.latestUpdatesSubtitle}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Featured */}
          <Card className="hover:shadow-xl transition-shadow bg-card border-border">
            <CardContent className="p-0 flex flex-col">
              {featuredItem.image?.url && (
                <div className="relative h-48 overflow-hidden rounded-t-lg">
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
                <h3 className="text-2xl font-sans font-semibold text-foreground mb-3">
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

          {/* Side items */}
          <div className="space-y-6">
            {sideItems.map((item) => (
              <Card key={item.id} className="hover:shadow-lg transition-shadow bg-card border-border">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <Badge
                        className="w-fit mb-2 font-serif"
                        variant={item.label === "highlight" ? "default" : "secondary"}
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
        </div>
      </div>
    </section>
  )
}
