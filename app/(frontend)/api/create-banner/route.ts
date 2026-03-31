import { NextResponse } from "next/server"
import { getPayload } from "payload"
import config from "@payload-config"

export const dynamic = "force-dynamic"

export async function GET(request: Request) {
  try {
    const payload = await getPayload({ config })
    const db = (payload.db as any).drizzle

    // Limpar
    await db.execute(`DELETE FROM "banners_location"`)
    await db.execute(`DELETE FROM "banners"`)

    // Upload imagem
    const origin = new URL(request.url).origin
    const res = await fetch(`${origin}/tmp-banner-livro.png`)
    if (!res.ok) throw new Error("Failed to fetch image")
    const buffer = Buffer.from(await res.arrayBuffer())

    const media = await payload.create({
      collection: "media",
      data: { alt: "A Crise de Autoridade na Igreja - Livro" },
      file: { data: buffer, mimetype: "image/png", name: "banner-livro-crise-autoridade.png", size: buffer.length },
      overrideAccess: true,
    })

    const mediaId = media.id

    // Insert banner - separado do payload.create para isolar erro
    let bannerId: number
    try {
      const r = await db.execute(
        `INSERT INTO "banners" ("title", "image_id", "link", "open_in_new_tab", "status", "order", "updated_at", "created_at") VALUES ('Banner Livro', ${mediaId}, '/store', false, 'active', 1, NOW(), NOW()) RETURNING "id"`
      )
      bannerId = r.rows[0]?.id
    } catch (sqlErr: any) {
      return NextResponse.json({ step: "banner-insert", mediaId, error: sqlErr.message, code: sqlErr.code, detail: sqlErr.detail })
    }

    // Locations
    try {
      await db.execute(`INSERT INTO "banners_location" ("order", "parent_id", "value") VALUES (1, ${bannerId}, 'homepage')`)
      await db.execute(`INSERT INTO "banners_location" ("order", "parent_id", "value") VALUES (2, ${bannerId}, 'articles')`)
      await db.execute(`INSERT INTO "banners_location" ("order", "parent_id", "value") VALUES (3, ${bannerId}, 'article-detail')`)
    } catch (locErr: any) {
      return NextResponse.json({ step: "location-insert", bannerId, error: locErr.message })
    }

    return NextResponse.json({ success: true, bannerId, mediaId })
  } catch (error: any) {
    return NextResponse.json({ error: error.message, stack: error.stack?.split("\n").slice(0, 3) }, { status: 500 })
  }
}
