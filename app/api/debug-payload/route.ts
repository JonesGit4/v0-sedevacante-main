import { NextResponse } from "next/server"
import { getPayload } from "payload"
import config from "@payload-config"

export async function GET() {
  const results: Record<string, any> = {}

  // Test 1: Config
  try {
    results.configLoaded = !!config
    results.configCollections = config?.collections?.length ?? "none"
  } catch (e: any) {
    results.configError = e.message
  }

  // Test 2: Init Payload
  try {
    const payload = await getPayload({ config })
    results.payloadInit = true
    results.collections = payload.collections ? Object.keys(payload.collections) : []
  } catch (e: any) {
    results.payloadInitError = e.message
    results.payloadInitStack = e.stack?.split("\n").slice(0, 8)
  }

  // Test 3: Check Node version and env
  results.nodeVersion = process.version
  results.hasDbUrl = !!process.env.DATABASE_URL
  results.hasSecret = !!process.env.PAYLOAD_SECRET
  results.secretLength = process.env.PAYLOAD_SECRET?.length ?? 0

  return NextResponse.json(results)
}
