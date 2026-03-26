import { NextResponse } from "next/server"
import { getPayload } from "payload"
import config from "@payload-config"

export const dynamic = "force-dynamic"

export async function GET(request: Request) {
  const url = new URL(request.url)
  const action = url.searchParams.get("action") || "check"

  try {
    const payload = await getPayload({ config })
    const db = (payload.db as any).drizzle

    if (action === "check") {
      const gallery = await db.execute(
        `SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'news_gallery' ORDER BY ordinal_position`
      )
      return NextResponse.json({ news_gallery: gallery.rows })
    }

    if (action === "fix") {
      // Drop and recreate with correct Payload column names
      // Payload uses varchar IDs for array rows (not serial)
      await db.execute(`DROP TABLE IF EXISTS "news_gallery"`)
      await db.execute(`
        CREATE TABLE "news_gallery" (
          "id" varchar PRIMARY KEY NOT NULL,
          "_order" integer NOT NULL,
          "_parent_id" integer NOT NULL REFERENCES "news"("id") ON DELETE CASCADE,
          "caption" varchar,
          "photo_id" integer REFERENCES "media"("id") ON DELETE SET NULL
        )
      `)
      await db.execute(`CREATE INDEX "news_gallery_order_idx" ON "news_gallery" USING btree ("_order")`)
      await db.execute(`CREATE INDEX "news_gallery_parent_id_idx" ON "news_gallery" USING btree ("_parent_id")`)
      await db.execute(`CREATE INDEX "news_gallery_photo_idx" ON "news_gallery" USING btree ("photo_id")`)

      // Verify
      const result = await db.execute(
        `SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'news_gallery' ORDER BY ordinal_position`
      )
      return NextResponse.json({ success: true, columns: result.rows })
    }

    if (action === "test-save") {
      const result = await payload.update({
        collection: "news",
        id: 1,
        data: {
          gallery: [{ photo: 16, caption: "Teste galeria" }],
        },
        overrideAccess: true,
      })
      return NextResponse.json({ success: true, gallery: (result as any).gallery })
    }

    if (action === "drizzle-schema") {
      // Inspect what Drizzle expects
      const tables = (payload.db as any).tables
      const newsGallery = tables?.news_gallery
      if (newsGallery) {
        const cols = Object.keys(newsGallery)
        return NextResponse.json({ drizzleColumns: cols })
      }
      // Try alternative access
      const schema = (payload.db as any).schema
      if (schema?.news_gallery) {
        return NextResponse.json({ schemaKeys: Object.keys(schema.news_gallery) })
      }
      return NextResponse.json({ note: "Could not find news_gallery in drizzle schema" })
    }

    return NextResponse.json({ error: "use ?action=check|fix|test-save|drizzle-schema" })
  } catch (error: any) {
    return NextResponse.json({ error: error.message, stack: error.stack?.split("\n").slice(0, 8) })
  }
}
