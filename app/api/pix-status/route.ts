import { NextRequest, NextResponse } from "next/server"

const OPENPIX_API = "https://api.openpix.com.br/api/v1/charge"

// Livro SDV Crise — used for book purchase charges (correlationID starts with "order-")
const OPENPIX_KEY_CHARGE = "Q2xpZW50X0lkX2Q3MzEzNzRjLWI4MTItNGI5Mi04MzM1LTRhM2FlMzZlN2FjYjpDbGllbnRfU2VjcmV0X24zN3VQZmplVUl0eXlheG1pNVI2dTJ2QmlZOGhHZkMvQmtKVGwwRGpHWXc9"

// Plugin SSSJ Livro — used for donations (correlationID starts with "donation-")
const OPENPIX_KEY_DONATION = "Q2xpZW50X0lkXzU3ZmVkNmYyLTkwOGYtNDliZi1hODgyLTY5YzcyNmJhMjUzMTpDbGllbnRfU2VjcmV0X0xyVXJvRkF2WlN0b0NPbnkyYUhDRUxIL0lzckZPZTlOczQxbmZ6cEd5eGs9"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "ID obrigatório" }, { status: 400 })
    }

    // Select key based on correlationID prefix
    const key = id.startsWith("order-") ? OPENPIX_KEY_CHARGE : OPENPIX_KEY_DONATION

    const res = await fetch(`${OPENPIX_API}/${id}`, {
      method: "GET",
      headers: {
        Authorization: key,
        "Content-Type": "application/json",
      },
    })

    const data = await res.json()

    if (!res.ok) {
      return NextResponse.json({ error: "Erro ao consultar status" }, { status: 502 })
    }

    // OpenPix statuses: ACTIVE (pending), COMPLETED (paid), EXPIRED
    const status = data.charge?.status || "UNKNOWN"
    const paidAt = data.charge?.paidAt || null
    const value = data.charge?.value || 0

    return NextResponse.json({ status, paidAt, value })
  } catch (err) {
    console.error("PIX status error:", err)
    return NextResponse.json({ error: "Erro interno" }, { status: 500 })
  }
}
