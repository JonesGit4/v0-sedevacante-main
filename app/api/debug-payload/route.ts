import { NextResponse } from "next/server"
import config from "@payload-config"

export async function GET(request: Request) {
  const results: Record<string, any> = {}

  // Test: Actually try to render the admin page
  try {
    const { RootPage } = await import("@payloadcms/next/views")
    const { importMap } = await import("../../(payload)/admin/importMap")

    results.importMapKeys = Object.keys(importMap).length
    results.importMapSample = Object.keys(importMap).slice(0, 3)

    // Try calling RootPage like the actual page does
    const params = Promise.resolve({ segments: ["login"] })
    const searchParams = Promise.resolve({})

    const element = await RootPage({ config, params, searchParams, importMap })
    results.renderSuccess = true
    results.elementType = typeof element
  } catch (e: any) {
    results.renderError = e.message
    results.renderStack = e.stack?.split("\n").slice(0, 10)
    results.renderName = e.name
    // Check if it's a redirect (expected for /admin -> /admin/login)
    if (e.digest) {
      results.digest = e.digest
    }
  }

  results.nodeVersion = process.version
  return NextResponse.json(results)
}
