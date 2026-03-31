import { NextResponse } from "next/server"
import { getPayload } from "payload"
import config from "@payload-config"

export const maxDuration = 60

export async function GET(req: Request) {
  const url = new URL(req.url)
  const action = url.searchParams.get("action") || "check"
  const results: any = { action, tests: [] }

  try {
    const payload = await getPayload({ config })

    const db = payload.db as any
    if (!db.drizzle) {
      return NextResponse.json({ error: "No drizzle instance" }, { status: 500 })
    }

    if (action === "check") {
      // Check if banners_id column exists in payload_locked_documents_rels
      const cols = await db.drizzle.execute(
        `SELECT column_name FROM information_schema.columns WHERE table_name = 'payload_locked_documents_rels' ORDER BY ordinal_position`
      )
      const colNames = (cols.rows || cols).map((r: any) => r.column_name)
      results.tests.push({
        name: "locked-rels-columns",
        columns: colNames,
        hasBannersId: colNames.includes("banners_id"),
      })

      // Also check banners_rels
      const bCols = await db.drizzle.execute(
        `SELECT column_name FROM information_schema.columns WHERE table_name = 'banners_rels' ORDER BY ordinal_position`
      )
      results.tests.push({
        name: "banners-rels-columns",
        columns: (bCols.rows || bCols).map((r: any) => r.column_name),
      })

      // Check payload_preferences_rels
      const pCols = await db.drizzle.execute(
        `SELECT column_name FROM information_schema.columns WHERE table_name = 'payload_preferences_rels' ORDER BY ordinal_position`
      )
      results.tests.push({
        name: "preferences-rels-columns",
        columns: (pCols.rows || pCols).map((r: any) => r.column_name),
      })
    }

    if (action === "fix") {
      const fixResults: string[] = []

      // Add banners_id to payload_locked_documents_rels if missing
      try {
        const check1 = await db.drizzle.execute(
          `SELECT column_name FROM information_schema.columns WHERE table_name = 'payload_locked_documents_rels' AND column_name = 'banners_id'`
        )
        if ((check1.rows || check1).length === 0) {
          await db.drizzle.execute(
            `ALTER TABLE payload_locked_documents_rels ADD COLUMN banners_id integer`
          )
          fixResults.push("Added banners_id to payload_locked_documents_rels")

          // Add index
          await db.drizzle.execute(
            `CREATE INDEX IF NOT EXISTS payload_locked_documents_rels_banners_idx ON payload_locked_documents_rels (banners_id)`
          )
          fixResults.push("Created index for banners_id")

          // Add foreign key
          await db.drizzle.execute(
            `ALTER TABLE payload_locked_documents_rels ADD CONSTRAINT payload_locked_documents_rels_banners_fk FOREIGN KEY (banners_id) REFERENCES banners(id) ON DELETE CASCADE`
          )
          fixResults.push("Added foreign key constraint for banners_id")
        } else {
          fixResults.push("banners_id already exists in payload_locked_documents_rels")
        }
      } catch (e: any) {
        fixResults.push(`Error (locked_rels): ${e.message}`)
      }

      // Add banners_id to payload_preferences_rels if missing
      try {
        const check2 = await db.drizzle.execute(
          `SELECT column_name FROM information_schema.columns WHERE table_name = 'payload_preferences_rels' AND column_name = 'banners_id'`
        )
        if ((check2.rows || check2).length === 0) {
          await db.drizzle.execute(
            `ALTER TABLE payload_preferences_rels ADD COLUMN banners_id integer`
          )
          fixResults.push("Added banners_id to payload_preferences_rels")

          await db.drizzle.execute(
            `CREATE INDEX IF NOT EXISTS payload_preferences_rels_banners_idx ON payload_preferences_rels (banners_id)`
          )
          fixResults.push("Created index for banners_id in preferences_rels")

          await db.drizzle.execute(
            `ALTER TABLE payload_preferences_rels ADD CONSTRAINT payload_preferences_rels_banners_fk FOREIGN KEY (banners_id) REFERENCES banners(id) ON DELETE CASCADE`
          )
          fixResults.push("Added foreign key constraint for banners_id in preferences_rels")
        } else {
          fixResults.push("banners_id already exists in payload_preferences_rels")
        }
      } catch (e: any) {
        fixResults.push(`Error (preferences_rels): ${e.message}`)
      }

      results.fixes = fixResults
    }

  } catch (e: any) {
    results.error = e.message
    results.stack = e.stack?.slice(0, 500)
  }

  return NextResponse.json(results, { status: 200 })
}
