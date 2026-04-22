import { DarkHero } from "@/components/dark-hero"
import { LatestUpdates } from "@/components/latest-updates"
import { LatestUpdatesCMS } from "@/components/latest-updates-cms"
import { PostsSlider } from "@/components/posts-slider"
import { PostsSliderCMS } from "@/components/posts-slider-cms"
import { DonationMarquee } from "@/components/donation-marquee"
import { DonationMarqueeAlt } from "@/components/donation-marquee-alt"
import { LocationsSection } from "@/components/locations-section"
import { VideoSection } from "@/components/video-section"
import { ProductsShowcase } from "@/components/products-showcase"
import { DownloadablesSection } from "@/components/downloadables-section"
import { Footer } from "@/components/footer"
import { LanguageToggle } from "@/components/language-toggle"
import { PreviewWarningBar } from "@/components/preview-warning-bar"
import { getPayload } from "payload"
import config from "@payload-config"

export const dynamic = "force-dynamic"

export default async function Home() {
  let cmsArticles: any[] = []
  let cmsNews: any[] = []

  try {
    const payload = await getPayload({ config })

    const [articlesResult, pinnedResult, newsResult] = await Promise.all([
      payload.find({
        collection: "articles",
        where: { status: { equals: "published" } },
        sort: "-publishedAt",
        limit: 10,
        depth: 1,
      }),
      payload.find({
        collection: "articles",
        where: { status: { equals: "published" }, pinned: { equals: true } },
        sort: "pinnedOrder",
        limit: 2,
        depth: 1,
      }),
      payload.find({
        collection: "news",
        where: { status: { equals: "published" } },
        sort: "-date",
        limit: 4,
        depth: 2,
      }),
    ])

    // Pinned first, then remaining by date (excluding pinned)
    const pinnedIds = new Set(pinnedResult.docs.map((d: any) => d.id))
    const rest = articlesResult.docs.filter((d: any) => !pinnedIds.has(d.id))
    cmsArticles = [...pinnedResult.docs, ...rest].slice(0, 4)
    cmsNews = newsResult.docs
  } catch (e) {
    // CMS data not available, components will use fallback
  }

  return (
    <main className="min-h-screen">
      <LanguageToggle />
      <DarkHero />
      {cmsNews.length > 0 ? (
        <LatestUpdatesCMS news={cmsNews} />
      ) : (
        <LatestUpdates />
      )}
      <DonationMarqueeAlt />
      {cmsArticles.length > 0 ? (
        <PostsSliderCMS articles={cmsArticles} />
      ) : (
        <PostsSlider />
      )}
      <DonationMarquee />
      <LocationsSection />
      <VideoSection />
      <DownloadablesSection />
      <ProductsShowcase />
      <Footer />
      <PreviewWarningBar />
    </main>
  )
}
