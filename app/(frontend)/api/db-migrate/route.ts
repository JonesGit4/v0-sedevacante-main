import { NextResponse } from "next/server"
import { getPayload } from "payload"
import config from "@payload-config"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const payload = await getPayload({ config })
    const db = (payload.db as any).drizzle

    // Create news_gallery table (array field)
    await db.execute(`
      CREATE TABLE IF NOT EXISTS "news_gallery" (
        "id" serial PRIMARY KEY,
        "_order" integer NOT NULL,
        "_parent_id" integer NOT NULL REFERENCES "news"("id") ON DELETE CASCADE,
        "photo_id" integer REFERENCES "media"("id") ON DELETE SET NULL,
        "caption" varchar
      )
    `)
    await db.execute(`CREATE INDEX IF NOT EXISTS "news_gallery_order_idx" ON "news_gallery" USING btree ("_order")`)
    await db.execute(`CREATE INDEX IF NOT EXISTS "news_gallery_parent_id_idx" ON "news_gallery" USING btree ("_parent_id")`)
    await db.execute(`CREATE INDEX IF NOT EXISTS "news_gallery_photo_idx" ON "news_gallery" USING btree ("photo_id")`)

    // Verify
    const result = await db.execute(
      `SELECT column_name FROM information_schema.columns WHERE table_name = 'news_gallery' ORDER BY ordinal_position`
    )

    return NextResponse.json({ success: true, columns: result.rows })
  } catch (error: any) {
    return NextResponse.json({ error: error.message })
  }
}
