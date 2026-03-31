import Image from "next/image"
import Link from "next/link"

type Banner = {
  id: number
  title: string
  image: { url: string; alt?: string } | null
  link?: string
  openInNewTab?: boolean
  order: number
}

export function BannerSidebar({ banners }: { banners: Banner[] }) {
  if (!banners || banners.length === 0) return null

  return (
    <aside className="flex flex-col gap-6">
      {banners.map((banner) => {
        const imageUrl = banner.image?.url
        if (!imageUrl) return null

        const img = (
          <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <Image
              src={imageUrl}
              alt={banner.image?.alt || banner.title}
              width={300}
              height={400}
              className="w-full h-auto object-cover"
            />
          </div>
        )

        if (banner.link) {
          return (
            <Link
              key={banner.id}
              href={banner.link}
              target={banner.openInNewTab ? "_blank" : "_self"}
              rel={banner.openInNewTab ? "noopener noreferrer" : undefined}
            >
              {img}
            </Link>
          )
        }

        return <div key={banner.id}>{img}</div>
      })}
    </aside>
  )
}
