import { NextRequest, NextResponse } from "next/server"

const OPENPIX_API = "https://api.openpix.com.br/api/v1/charge"
const OPENPIX_KEY = "Q2xpZW50X0lkXzUwZGI5YzlmLTZmMjYtNGUxYi04MzFkLTc4ZThiYTIxZDMwMTpDbGllbnRfU2VjcmV0X1MwSitiZzBjTkpqN0ZzZ3o1ZXJ5N0tKLzdFQWJEYnlpUzR0dnZQNEwwNTQ9"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, amount, observation } = body

    if (!name || !email || !amount) {
      return NextResponse.json({ error: "Campos obrigatórios ausentes" }, { status: 400 })
    }

    const valueCents = Math.round(amount * 100)
    const correlationID = `donation-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
    const obs = observation ? ` - Obs: ${String(observation).slice(0, 200)}` : ""

    const payload = {
      correlationID,
      value: valueCents,
      comment: `Doacao Seminario Sao Jose - ${name} - ${email}${obs}`,
    }

    const res = await fetch(OPENPIX_API, {
      method: "POST",
      headers: {
        Authorization: OPENPIX_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })

    const data = await res.json()

    if (!res.ok) {
      console.error("OpenPix donation error:", JSON.stringify(data))
      return NextResponse.json({ error: "Erro ao gerar doação PIX" }, { status: 502 })
    }

    return NextResponse.json({
      brCode: data.charge?.brCode || "",
      qrCodeImage: data.charge?.qrCodeImage || "",
      correlationID: data.charge?.correlationID || correlationID,
    })
  } catch (err) {
    console.error("PIX donation error:", err)
    return NextResponse.json({ error: "Erro interno" }, { status: 500 })
  }
}
