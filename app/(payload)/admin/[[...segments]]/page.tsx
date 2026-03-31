/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import type { Metadata } from "next"

import config from "@payload-config"
import { RootPage, generatePageMetadata } from "@payloadcms/next/views"
import { importMap } from "../importMap"

export const maxDuration = 60

type Args = {
  params: Promise<{
    segments: string[]
  }>
  searchParams: Promise<{
    [key: string]: string | string[]
  }>
}

export const generateMetadata = ({ params, searchParams }: Args): Promise<Metadata> =>
  generatePageMetadata({ config, params, searchParams })

const Page = async ({ params, searchParams }: Args) => {
  try {
    const result = await RootPage({ config, params, searchParams, importMap })
    return result
  } catch (error: any) {
    // Re-throw Next.js internal errors (redirect, notFound)
    if (
      error?.digest?.startsWith("NEXT_REDIRECT") ||
      error?.digest?.startsWith("NEXT_NOT_FOUND") ||
      error?.message === "NEXT_REDIRECT" ||
      error?.message === "NEXT_NOT_FOUND"
    ) {
      throw error
    }
    console.error("[PAYLOAD ADMIN ERROR]", error?.message, error?.stack)
    return (
      <div style={{ padding: 40, fontFamily: "monospace" }}>
        <h1 style={{ color: "red" }}>Admin Render Error</h1>
        <pre style={{ whiteSpace: "pre-wrap", background: "#f5f5f5", padding: 20, borderRadius: 8 }}>
          {error?.message || "Unknown error"}
          {"\n\n"}
          {error?.stack || "No stack trace"}
        </pre>
      </div>
    )
  }
}

export default Page
