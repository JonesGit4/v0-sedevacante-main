import { NextResponse } from "next/server"
import { getPayload } from "payload"
import config from "@payload-config"
import fs from "fs/promises"
import path from "path"

export const dynamic = "force-dynamic"

// Convert markdown to Lexical rich text JSON
function markdownToLexical(md: string) {
  const lines = md.split("\n")
  const children: any[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    // Skip empty lines
    if (line.trim() === "") {
      i++
      continue
    }

    // Headings
    const h4 = line.match(/^#### (.+)/)
    if (h4) {
      children.push(headingNode("h4", parseInline(h4[1])))
      i++
      continue
    }
    const h3 = line.match(/^### (.+)/)
    if (h3) {
      children.push(headingNode("h3", parseInline(h3[1])))
      i++
      continue
    }
    const h2 = line.match(/^## (.+)/)
    if (h2) {
      children.push(headingNode("h2", parseInline(h2[1])))
      i++
      continue
    }
    const h1 = line.match(/^# (.+)/)
    if (h1) {
      children.push(headingNode("h1", parseInline(h1[1])))
      i++
      continue
    }

    // Paragraph: collect consecutive non-empty, non-heading lines
    const paraLines: string[] = []
    while (i < lines.length && lines[i].trim() !== "" && !lines[i].match(/^#{1,4} /)) {
      paraLines.push(lines[i])
      i++
    }
    if (paraLines.length > 0) {
      children.push(paragraphNode(parseInline(paraLines.join(" "))))
    }
  }

  return {
    root: {
      type: "root",
      children,
      direction: "ltr",
      format: "",
      indent: 0,
      version: 1,
    },
  }
}

function headingNode(tag: string, inlineChildren: any[]) {
  return {
    type: "heading",
    tag,
    children: inlineChildren,
    direction: "ltr",
    format: "",
    indent: 0,
    version: 1,
  }
}

function paragraphNode(inlineChildren: any[]) {
  return {
    type: "paragraph",
    children: inlineChildren,
    direction: "ltr",
    format: "",
    indent: 0,
    version: 1,
  }
}

// Parse inline markdown (bold, italic, bold+italic) into Lexical text nodes
function parseInline(text: string): any[] {
  const nodes: any[] = []
  // Regex: ***bold italic***, **bold**, *italic*, or plain text
  const regex = /(\*\*\*(.+?)\*\*\*|\*\*(.+?)\*\*|\*(.+?)\*)/g
  let lastIndex = 0
  let match

  while ((match = regex.exec(text)) !== null) {
    // Plain text before this match
    if (match.index > lastIndex) {
      nodes.push(textNode(text.slice(lastIndex, match.index), 0))
    }

    if (match[2]) {
      // ***bold italic*** → format 3 (bold=1 + italic=2)
      nodes.push(textNode(match[2], 3))
    } else if (match[3]) {
      // **bold** → format 1
      nodes.push(textNode(match[3], 1))
    } else if (match[4]) {
      // *italic* → format 2
      nodes.push(textNode(match[4], 2))
    }

    lastIndex = match.index + match[0].length
  }

  // Remaining plain text
  if (lastIndex < text.length) {
    nodes.push(textNode(text.slice(lastIndex), 0))
  }

  // If nothing was parsed, return at least one empty text node
  if (nodes.length === 0) {
    nodes.push(textNode(text, 0))
  }

  return nodes
}

function textNode(text: string, format: number) {
  return { type: "text", text, format, version: 1 }
}

export async function GET() {
  try {
    const payload = await getPayload({ config })
    const results: string[] = []

    // Read the Portuguese markdown
    const mdPath = path.join(process.cwd(), "public/Onde_esta_Pedro_Traducao.md")
    const markdown = await fs.readFile(mdPath, "utf-8")
    results.push(`Read markdown: ${markdown.length} chars`)

    // Convert to Lexical
    const lexicalContent = markdownToLexical(markdown)
    results.push(`Lexical nodes: ${lexicalContent.root.children.length}`)

    // Find and update the article
    const existing = await payload.find({
      collection: "articles",
      where: { slug: { equals: "where-peter-is" } },
      limit: 1,
      overrideAccess: true,
    })

    if (existing.docs.length === 0) {
      return NextResponse.json({ error: "Article where-peter-is not found" }, { status: 404 })
    }

    await payload.update({
      collection: "articles",
      id: existing.docs[0].id,
      overrideAccess: true,
      data: {
        content: lexicalContent as any,
      },
    })
    results.push(`Updated article id=${existing.docs[0].id} with full Lexical content`)

    return NextResponse.json({ success: true, results })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message, stack: error.stack?.split("\n").slice(0, 8) },
      { status: 500 }
    )
  }
}
