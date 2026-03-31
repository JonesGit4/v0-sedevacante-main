import { NextResponse } from "next/server"
import { getPayload } from "payload"
import config from "@payload-config"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const payload = await getPayload({ config })
    const db = (payload.db as any).drizzle

    // Limpar
    await db.execute(`DELETE FROM "banners_location"`)
    await db.execute(`DELETE FROM "banners"`)

    // Buscar media do banner (já uploadada anteriormente)
    const mediaResult = await db.execute(
      `SELECT id, filename, alt FROM "media" ORDER BY id DESC LIMIT 10`
    )

    // Encontrar o banner image
    const bannerMedia = mediaResult.rows.find((r: any) =>
      r.alt?.includes('Crise') || r.filename?.includes('banner')
    )

    if (!bannerMedia) {
      return NextResponse.json({ error: "No banner media found", recentMedia: mediaResult.rows })
    }

    const mediaId = bannerMedia.id

    // Insert banner
    const r = await db.execute(
      `INSERT INTO "banners" ("title", "image_id", "link", "open_in_new_tab", "status", "order", "updated_at", "created_at") VALUES ('Livro - A Crise de Autoridade na Igreja', ${mediaId}, '/store', false, 'active', 1, NOW(), NOW()) RETURNING "id"`
    )
    const bannerId = r.rows[0]?.id

    // Locations
    await db.execute(`INSERT INTO "banners_location" ("order", "parent_id", "value") VALUES (1, ${bannerId}, 'homepage')`)
    await db.execute(`INSERT INTO "banners_location" ("order", "parent_id", "value") VALUES (2, ${bannerId}, 'articles')`)
    await db.execute(`INSERT INTO "banners_location" ("order", "parent_id", "value") VALUES (3, ${bannerId}, 'article-detail')`)

    return NextResponse.json({ success: true, bannerId, mediaId })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
