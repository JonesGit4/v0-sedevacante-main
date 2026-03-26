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
      // Check which columns exist in payload_locked_documents_rels
      const result = await db.execute(
        `SELECT column_name FROM information_schema.columns WHERE table_name = 'payload_locked_documents_rels' ORDER BY ordinal_position`
      )
      return NextResponse.json({ columns: result.rows })
    }

    if (action === "fix") {
      // Add news_id column to payload_locked_documents_rels
      await db.execute(`
        ALTER TABLE "payload_locked_documents_rels"
        ADD COLUMN IF NOT EXISTS "news_id" integer REFERENCES "news"("id") ON DELETE CASCADE
      `)
      await db.execute(`
        CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_news_id_idx"
        ON "payload_locked_documents_rels" USING btree ("news_id")
      `)

      // Also check payload_preferences_rels
      const prefCols = await db.execute(
        `SELECT column_name FROM information_schema.columns WHERE table_name = 'payload_preferences_rels' ORDER BY ordinal_position`
      )
      const prefHasNews = prefCols.rows.some((r: any) => r.column_name === "news_id")
      if (!prefHasNews) {
        await db.execute(`
          ALTER TABLE "payload_preferences_rels"
          ADD COLUMN IF NOT EXISTS "news_id" integer REFERENCES "news"("id") ON DELETE CASCADE
        `)
        await db.execute(`
          CREATE INDEX IF NOT EXISTS "payload_preferences_rels_news_id_idx"
          ON "payload_preferences_rels" USING btree ("news_id")
        `)
      }

      return NextResponse.json({ success: true, message: "news_id columns added" })
    }

    if (action === "test") {
      const result = await payload.update({
        collection: "news",
        id: 1,
        data: { title: "Dom Rodrigo em Brasília-DF" },
        overrideAccess: true,
      })
      return NextResponse.json({ success: true, id: result.id, title: (result as any).title })
    }

    return NextResponse.json({ error: "Unknown action" })
  } catch (error: any) {
    return NextResponse.json({ error: error.message, stack: error.stack?.split("\n").slice(0, 5) })
  }
}
