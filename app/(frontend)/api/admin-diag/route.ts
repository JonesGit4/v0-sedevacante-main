import { NextResponse } from "next/server"
import { getPayload } from "payload"
import config from "@payload-config"

export const maxDuration = 60

export async function GET() {
  const results: any = { tests: [] }

  try {
    const payload = await getPayload({ config })
    results.tests.push({ name: "payload-init", status: "ok" })

    // Test fetching a document (this is what the edit view does)
    try {
      const article = await payload.findByID({
        collection: "articles",
        id: 23,
        depth: 1,
      })
      results.tests.push({
        name: "fetch-article-23",
        status: "ok",
        title: article?.title,
        hasContent: !!article?.content,
        contentType: typeof article?.content,
        contentKeys: article?.content ? Object.keys(article.content).slice(0, 5) : null,
      })
    } catch (e: any) {
      results.tests.push({ name: "fetch-article-23", status: "error", error: e.message, stack: e.stack?.slice(0, 500) })
    }

    // Test fetching with depth 0
    try {
      const article = await payload.findByID({
        collection: "articles",
        id: 23,
        depth: 0,
      })
      results.tests.push({
        name: "fetch-article-23-depth0",
        status: "ok",
        keys: Object.keys(article),
      })
    } catch (e: any) {
      results.tests.push({ name: "fetch-article-23-depth0", status: "error", error: e.message })
    }

    // Test fetching user
    try {
      const user = await payload.findByID({
        collection: "users",
        id: 1,
        depth: 1,
      })
      results.tests.push({
        name: "fetch-user-1",
        status: "ok",
        email: user?.email,
      })
    } catch (e: any) {
      results.tests.push({ name: "fetch-user-1", status: "error", error: e.message })
    }

    // Test fetching banner
    try {
      const banner = await payload.findByID({
        collection: "banners",
        id: 51,
        depth: 1,
      })
      results.tests.push({
        name: "fetch-banner-51",
        status: "ok",
        title: banner?.title,
      })
    } catch (e: any) {
      results.tests.push({ name: "fetch-banner-51", status: "error", error: e.message })
    }

    // Check DB schema info
    try {
      const db = payload.db as any
      if (db.drizzle) {
        const tablesResult = await db.drizzle.execute(
          `SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name`
        )
        results.tests.push({
          name: "db-tables",
          status: "ok",
          tables: tablesResult.rows?.map((r: any) => r.table_name) || tablesResult?.map?.((r: any) => r.table_name),
        })
      }
    } catch (e: any) {
      results.tests.push({ name: "db-tables", status: "error", error: e.message })
    }

    // Check Payload version info
    results.payloadVersion = (payload as any).version || "unknown"

  } catch (e: any) {
    results.tests.push({ name: "payload-init", status: "error", error: e.message, stack: e.stack?.slice(0, 500) })
  }

  return NextResponse.json(results, { status: 200 })
}
