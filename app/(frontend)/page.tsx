import { DarkHero } from "@/components/dark-hero"
import { LatestUpdates } from "@/components/latest-updates"
import { LatestUpdatesCMS } from "@/components/latest-updates-cms"
import { PostsSlider } from "@/components/posts-slider"
import { PostsSliderCMS } from "@/components/posts-slider-cms"
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

    const [articlesResult, newsResult] = await Promise.all([
      payload.find({
        collection: "articles",
        where: { status: { equals: "published" } },
        sort: "-publishedAt",
        limit: 4,
        depth: 1,
      }),
      payload.find({
        collection: "news",
        where: { status: { equals: "published" } },
        sort: "-date",
        limit: 4,
        depth: 1,
      }),
    ])

    cmsArticles = articlesResult.docs
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
      {cmsArticles.length > 0 ? (
        <PostsSliderCMS articles={cmsArticles} />
      ) : (
        <PostsSlider />
      )}
      <LocationsSection />
      <VideoSection />
      <DownloadablesSection />
      <ProductsShowcase />
      <Footer />
      <PreviewWarningBar />
    </main>
  )
}
