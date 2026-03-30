import { NextResponse } from "next/server"
import { getPayload } from "payload"
import config from "@payload-config"
import fs from "fs/promises"
import path from "path"

export const dynamic = "force-dynamic"

// Parse inline markdown into Lexical text nodes with proper nested bold/italic
function parseInline(text: string): any[] {
  const nodes: any[] = []
  let i = 0

  while (i < text.length) {
    // Check for *** (bold+italic)
    if (text[i] === "*" && text[i + 1] === "*" && text[i + 2] === "*") {
      const end = text.indexOf("***", i + 3)
      if (end !== -1) {
        nodes.push({ type: "text", text: text.slice(i + 3, end), format: 3, version: 1 })
        i = end + 3
        continue
      }
    }

    // Check for ** (bold) — may contain *italic* inside
    if (text[i] === "*" && text[i + 1] === "*" && text[i + 2] !== "*") {
      // Find the closing ** (could be *** if italic is nested at end)
      let depth = 0
      let end = -1
      for (let j = i + 2; j < text.length - 1; j++) {
        if (text[j] === "*" && text[j + 1] === "*") {
          end = j
          break
        }
      }
      if (end !== -1) {
        const inner = text.slice(i + 2, end)
        // Parse inner for *italic* segments
        const innerNodes = parseItalicInBold(inner)
        nodes.push(...innerNodes)
        // Skip past closing ** (could be *** if next char is also *)
        i = end + 2
        continue
      }
    }

    // Check for * (italic)
    if (text[i] === "*" && text[i + 1] !== "*") {
      const end = text.indexOf("*", i + 1)
      if (end !== -1 && text[end + 1] !== "*") {
        nodes.push({ type: "text", text: text.slice(i + 1, end), format: 2, version: 1 })
        i = end + 1
        continue
      }
    }

    // Plain text — collect until next *
    let end = text.indexOf("*", i + 1)
    if (end === -1) end = text.length
    if (end > i) {
      nodes.push({ type: "text", text: text.slice(i, end), format: 0, version: 1 })
      i = end
    } else {
      nodes.push({ type: "text", text: text[i], format: 0, version: 1 })
      i++
    }
  }

  if (nodes.length === 0) {
    nodes.push({ type: "text", text, format: 0, version: 1 })
  }

  return nodes
}

// Parse text inside **bold** for nested *italic* segments
function parseItalicInBold(text: string): any[] {
  const nodes: any[] = []
  const regex = /\*(.+?)\*/g
  let lastIndex = 0
  let match

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push({ type: "text", text: text.slice(lastIndex, match.index), format: 1, version: 1 }) // bold
    }
    nodes.push({ type: "text", text: match[1], format: 3, version: 1 }) // bold+italic
    lastIndex = match.index + match[0].length
  }

  if (lastIndex < text.length) {
    nodes.push({ type: "text", text: text.slice(lastIndex), format: 1, version: 1 }) // bold
  }

  if (nodes.length === 0) {
    nodes.push({ type: "text", text, format: 1, version: 1 })
  }

  return nodes
}

function headingNode(tag: string, inlineChildren: any[]) {
  return { type: "heading", tag, children: inlineChildren, direction: "ltr", format: "", indent: 0, version: 1 }
}

function paragraphNode(inlineChildren: any[]) {
  return { type: "paragraph", children: inlineChildren, direction: "ltr", format: "", indent: 0, version: 1 }
}

function markdownToLexical(md: string) {
  const lines = md.split("\n")
  const children: any[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    if (line.trim() === "") { i++; continue }

    const h4 = line.match(/^#### (.+)/)
    if (h4) { children.push(headingNode("h4", parseInline(h4[1]))); i++; continue }
    const h3 = line.match(/^### (.+)/)
    if (h3) { children.push(headingNode("h3", parseInline(h3[1]))); i++; continue }
    const h2 = line.match(/^## (.+)/)
    if (h2) { children.push(headingNode("h2", parseInline(h2[1]))); i++; continue }
    const h1 = line.match(/^# (.+)/)
    if (h1) { children.push(headingNode("h1", parseInline(h1[1]))); i++; continue }

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
    root: { type: "root", children, direction: "ltr", format: "", indent: 0, version: 1 },
  }
}

export async function GET() {
  try {
    const payload = await getPayload({ config })
    const results: string[] = []

    const mdPath = path.join(process.cwd(), "public/Onde_esta_Pedro_Traducao.md")
    let markdown: string
    try {
      markdown = await fs.readFile(mdPath, "utf-8")
    } catch {
      return NextResponse.json({ error: "Markdown file not found in public/" }, { status: 404 })
    }
    results.push(`Read markdown: ${markdown.length} chars`)

    const lexicalContent = markdownToLexical(markdown)
    results.push(`Lexical nodes: ${lexicalContent.root.children.length}`)

    // Verify no literal * in text nodes
    let asteriskCount = 0
    for (const child of lexicalContent.root.children) {
      for (const tc of (child as any).children || []) {
        if (tc.text?.includes("*")) asteriskCount++
      }
    }
    results.push(`Nodes with literal *: ${asteriskCount}`)

    const existing = await payload.find({
      collection: "articles",
      where: { slug: { equals: "where-peter-is" } },
      limit: 1,
      overrideAccess: true,
    })

    if (existing.docs.length === 0) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 })
    }

    await payload.update({
      collection: "articles",
      id: existing.docs[0].id,
      overrideAccess: true,
      data: { content: lexicalContent as any },
    })
    results.push(`Updated article id=${existing.docs[0].id}`)

    return NextResponse.json({ success: true, results })
  } catch (error: any) {
    return NextResponse.json({ error: error.message, stack: error.stack?.split("\n").slice(0, 8) }, { status: 500 })
  }
}
