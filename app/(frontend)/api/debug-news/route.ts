import { getPayload } from "payload"
import config from "@payload-config"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET(request: Request) {
  const url = new URL(request.url)
  const action = url.searchParams.get("action")

  try {
    const payload = await getPayload({ config })

    if (action === "create-table") {
      const db = (payload.db as any).drizzle
      await db.execute(`
        CREATE TABLE IF NOT EXISTS "news" (
          "id" serial PRIMARY KEY,
          "title" varchar NOT NULL,
          "label" varchar DEFAULT 'news',
          "description" varchar NOT NULL,
          "image_id" integer REFERENCES "media"("id") ON DELETE SET NULL,
          "date" timestamptz,
          "featured" boolean DEFAULT false,
          "status" varchar DEFAULT 'published',
          "created_by_id" integer REFERENCES "users"("id") ON DELETE SET NULL,
          "updated_at" timestamptz DEFAULT now() NOT NULL,
          "created_at" timestamptz DEFAULT now() NOT NULL
        )
      `)
      await db.execute(`CREATE INDEX IF NOT EXISTS "news_created_at_idx" ON "news" USING btree ("created_at")`)
      await db.execute(`CREATE INDEX IF NOT EXISTS "news_image_idx" ON "news" USING btree ("image_id")`)
      await db.execute(`CREATE INDEX IF NOT EXISTS "news_created_by_idx" ON "news" USING btree ("created_by_id")`)
      return NextResponse.json({ success: true, message: "News table created" })
    }

    if (action === "push") {
      if (typeof (payload.db as any).push === "function") {
        await (payload.db as any).push({ forceAcceptWarning: true })
        return NextResponse.json({ success: true, message: "Push executed" })
      }
      return NextResponse.json({ error: "push function not found" })
    }

    const result = await payload.find({
      collection: "news",
      limit: 1,
      overrideAccess: true,
    })
    return NextResponse.json({ success: true, totalDocs: result.totalDocs })
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      stack: error.stack?.split("\n").slice(0, 5),
    })
  }
}
