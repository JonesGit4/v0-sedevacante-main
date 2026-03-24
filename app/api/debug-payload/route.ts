import { NextResponse } from "next/server"
import { getPayload } from "payload"
import config from "@payload-config"

export async function GET() {
  const results: Record<string, any> = {}

  // Test 1: Payload init (confirmed working)
  try {
    const payload = await getPayload({ config })
    results.payloadInit = true
  } catch (e: any) {
    results.payloadInitError = e.message
  }

  // Test 2: Test importMap components
  const componentTests: Record<string, string> = {}

  try {
    const seoClient = await import("@payloadcms/plugin-seo/client")
    componentTests.seoClient = Object.keys(seoClient).join(", ")
  } catch (e: any) {
    componentTests.seoClientError = e.message
  }

  try {
    const lexicalClient = await import("@payloadcms/richtext-lexical/client")
    componentTests.lexicalClient = Object.keys(lexicalClient).slice(0, 5).join(", ") + "..."
    componentTests.lexicalClientCount = Object.keys(lexicalClient).length
  } catch (e: any) {
    componentTests.lexicalClientError = e.message
  }

  try {
    const lexicalRsc = await import("@payloadcms/richtext-lexical/rsc")
    componentTests.lexicalRsc = Object.keys(lexicalRsc).join(", ")
  } catch (e: any) {
    componentTests.lexicalRscError = e.message
  }

  results.componentTests = componentTests

  // Test 3: Try to render admin view
  try {
    const { RootPage } = await import("@payloadcms/next/views")
    results.rootPageLoaded = typeof RootPage
  } catch (e: any) {
    results.rootPageError = e.message
    results.rootPageStack = e.stack?.split("\n").slice(0, 5)
  }

  try {
    const { RootLayout } = await import("@payloadcms/next/layouts")
    results.rootLayoutLoaded = typeof RootLayout
  } catch (e: any) {
    results.rootLayoutError = e.message
    results.rootLayoutStack = e.stack?.split("\n").slice(0, 5)
  }

  // Test 4: Node/env info
  results.nodeVersion = process.version
  results.secretLength = process.env.PAYLOAD_SECRET?.length ?? 0

  return NextResponse.json(results)
}
