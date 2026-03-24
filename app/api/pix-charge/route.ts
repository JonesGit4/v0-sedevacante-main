import { NextRequest, NextResponse } from "next/server"

const OPENPIX_API = "https://api.openpix.com.br/api/v1/charge"
const OPENPIX_KEY = "Q2xpZW50X0lkX2Q3MzEzNzRjLWI4MTItNGI5Mi04MzM1LTRhM2FlMzZlN2FjYjpDbGllbnRfU2VjcmV0X0Q4Qm5naWxsQlJHeXRGcVFxSU9RYTN6aFptVDNsNERxMXRXNFZCT1NJZTg9"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { correlationID, name, email, phone, cpf, quantity, totalAmount } = body

    if (!correlationID || !name || !email || !totalAmount) {
      return NextResponse.json({ error: "Campos obrigatórios ausentes" }, { status: 400 })
    }

    const valueCents = Math.round(totalAmount * 100)

    const payload: Record<string, unknown> = {
      correlationID,
      value: valueCents,
      comment: `Livro A Crise de Autoridade na Igreja — ${quantity}x exemplar(es)`,
      customer: {
        name,
        email,
        phone: phone?.replace(/\D/g, "") || undefined,
        taxID: cpf?.replace(/\D/g, "") || undefined,
      },
      additionalInfo: [
        { key: "quantity", value: String(quantity) },
        { key: "tier", value: "lote1" },
      ],
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
      console.error("OpenPix error:", data)
      return NextResponse.json({ error: "Erro ao gerar cobrança PIX" }, { status: 502 })
    }

    return NextResponse.json({
      brCode: data.charge?.brCode || data.brCode || "",
      qrCodeImage: data.charge?.qrCodeImage || data.qrCodeImage || "",
      correlationID: data.charge?.correlationID || correlationID,
    })
  } catch (err) {
    console.error("PIX charge error:", err)
    return NextResponse.json({ error: "Erro interno" }, { status: 500 })
  }
}
