import { NextResponse } from "next/server"
import { getPayload } from "payload"
import config from "@payload-config"

export const dynamic = "force-dynamic"

export async function GET(request: Request) {
  try {
    const payload = await getPayload({ config })
    const db = (payload.db as any).drizzle

    // Debug: check table structure
    const cols = await db.execute(
      `SELECT column_name, data_type, udt_name FROM information_schema.columns WHERE table_name = 'banners' ORDER BY ordinal_position`
    )

    // Try simplest possible insert
    try {
      const test = await db.execute(`INSERT INTO "banners" ("title","updated_at","created_at") VALUES ('test', NOW(), NOW()) RETURNING *`)
      // Clean up
      await db.execute(`DELETE FROM "banners" WHERE title = 'test'`)
      return NextResponse.json({ columns: cols.rows, testInsert: "OK", row: test.rows[0] })
    } catch (insertErr: any) {
      return NextResponse.json({ columns: cols.rows, insertError: insertErr.message })
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
