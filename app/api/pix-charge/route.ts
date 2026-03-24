import { NextRequest, NextResponse } from "next/server"

const OPENPIX_API = "https://api.openpix.com.br/api/v1/charge"
const OPENPIX_KEY = "Q2xpZW50X0lkXzU3ZmVkNmYyLTkwOGYtNDliZi1hODgyLTY5YzcyNmJhMjUzMTpDbGllbnRfU2VjcmV0X2pSZmR6LzFUUFJRazFScGJHWW55V1VTclpMd0Z6U293VjZUdCtndXcyc2c9"

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
      comment: `Livro A Crise - ${quantity}x - ${name} - ${email}`,
    }

    // Add customer if CPF is provided
    if (cpf) {
      payload.customer = {
        name,
        email,
        phone: phone?.replace(/\D/g, "") || undefined,
        taxID: { taxID: cpf.replace(/\D/g, ""), type: "BR:CPF" },
      }
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
      console.error("OpenPix error:", JSON.stringify(data))
      return NextResponse.json({ error: "Erro ao gerar cobrança PIX" }, { status: 502 })
    }

    return NextResponse.json({
      brCode: data.charge?.brCode || "",
      qrCodeImage: data.charge?.qrCodeImage || "",
      correlationID: data.charge?.correlationID || correlationID,
    })
  } catch (err) {
    console.error("PIX charge error:", err)
    return NextResponse.json({ error: "Erro interno" }, { status: 500 })
  }
}
