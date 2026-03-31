import { NextResponse } from "next/server"
import { getPayload } from "payload"
import config from "@payload-config"

export const dynamic = "force-dynamic"

export async function GET(request: Request) {
  try {
    const payload = await getPayload({ config })

    // Download banner image from own public dir
    const origin = new URL(request.url).origin
    const res = await fetch(`${origin}/tmp-banner-livro.png`)
    if (!res.ok) throw new Error("Failed to fetch banner image")
    const buffer = Buffer.from(await res.arrayBuffer())

    // Upload to Payload media
    const media = await payload.create({
      collection: "media",
      data: {
        alt: "A Crise de Autoridade na Igreja - Livro",
      },
      file: {
        data: buffer,
        mimetype: "image/png",
        name: "banner-livro-crise-autoridade.png",
        size: buffer.length,
      },
      overrideAccess: true,
    })

    // Create banner
    const banner = await payload.create({
      collection: "banners",
      data: {
        title: "Livro - A Crise de Autoridade na Igreja",
        image: media.id,
        link: "/store",
        openInNewTab: false,
        location: ["homepage", "articles", "article-detail"],
        status: "active",
        order: 1,
      },
      overrideAccess: true,
    })

    return NextResponse.json({
      success: true,
      mediaId: media.id,
      bannerId: banner.id,
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message, stack: error.stack?.split("\n").slice(0, 5) }, { status: 500 })
  }
}
