import { NextResponse } from "next/server"
import { getPayload } from "payload"
import config from "@payload-config"

export const dynamic = "force-dynamic"

function lexical(paragraphs: string[]) {
  return {
    root: {
      type: "root",
      children: paragraphs.map((text) => ({
        type: "paragraph",
        children: [{ type: "text", text }],
        direction: "ltr",
        format: "",
        indent: 0,
        version: 1,
      })),
      direction: "ltr",
      format: "",
      indent: 0,
      version: 1,
    },
  }
}

export async function GET() {
  try {
    const payload = await getPayload({ config })
    const results: string[] = []

    // 1. Create "Where Peter Is" article in CMS with slug matching the hardcoded page
    const existing = await payload.find({
      collection: "articles",
      where: { slug: { equals: "where-peter-is" } },
      limit: 1,
    })

    let wherePeterId: number | string
    if (existing.docs.length > 0) {
      wherePeterId = existing.docs[0].id
      results.push(`Where Peter Is already exists (id=${wherePeterId})`)
    } else {
      const doc = await payload.create({
        collection: "articles",
        overrideAccess: true,
        data: {
          title: "Onde está Pedro, aí está a Igreja",
          slug: "where-peter-is",
          language: "pt",
          author: "Dom Donald J. Sanborn",
          excerpt:
            "Homilia de Dom Donald J. Sanborn sobre a crise na Igreja e a necessidade de permanecer onde está Pedro — o verdadeiro Papa — para estar na verdadeira Igreja.",
          content: lexical([
            "Esta homilia de Dom Donald J. Sanborn aborda a questão fundamental da crise na Igreja: onde está Pedro, aí está a Igreja.",
            "Disponível em Português, English, Français e Español.",
          ]) as any,
          tags: [{ tag: "Papado" }, { tag: "Sedevacantismo" }, { tag: "Homilia" }],
          status: "published",
          publishedAt: "2025-03-15T12:00:00.000Z",
        },
      })
      wherePeterId = doc.id
      results.push(`Created Where Peter Is (id=${wherePeterId})`)
    }

    // 2. Pin "Where Peter Is" as featured #1
    await payload.update({
      collection: "articles",
      id: wherePeterId,
      overrideAccess: true,
      data: { pinned: true, pinnedOrder: 1 },
    })
    results.push(`Pinned Where Peter Is as #1`)

    // 3. Pin most recent article as featured #2
    // (O Concílio Vaticano II — id 3, the most recent by date)
    const mostRecent = await payload.find({
      collection: "articles",
      where: {
        status: { equals: "published" },
        slug: { not_equals: "where-peter-is" },
      },
      sort: "-publishedAt",
      limit: 1,
    })

    if (mostRecent.docs.length > 0) {
      const recentDoc = mostRecent.docs[0]
      await payload.update({
        collection: "articles",
        id: recentDoc.id,
        overrideAccess: true,
        data: { pinned: true, pinnedOrder: 2 },
      })
      results.push(`Pinned "${recentDoc.title}" (id=${recentDoc.id}) as #2`)
    }

    return NextResponse.json({ success: true, results })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message, stack: error.stack?.split("\n").slice(0, 8) },
      { status: 500 }
    )
  }
}
