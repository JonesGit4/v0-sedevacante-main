import { NextRequest, NextResponse } from "next/server"

const TELEGRAM_BOT = process.env.TELEGRAM_CORRECTION_BOT || "8964082782:AAHw-jXGw8dyBOtmQRPV_oMKORYrXZLrqrk"
const TELEGRAM_CHAT = process.env.TELEGRAM_CORRECTION_CHAT || "-1003950380440"
// message_thread_id será preenchido quando Jones criar o tópico
const TELEGRAM_THREAD = process.env.TELEGRAM_CORRECTION_THREAD || ""

export async function POST(req: NextRequest) {
  try {
    const { slug, titulo } = await req.json()

    if (!slug || !titulo) {
      return NextResponse.json({ error: "slug e titulo obrigatórios" }, { status: 400 })
    }

    const url = `https://sedevacante.com.br/news/${slug}`
    const text = `📝 Correção solicitada:\n\n*${titulo}*\n${url}`

    const body: Record<string, unknown> = {
      chat_id: TELEGRAM_CHAT,
      text,
      parse_mode: "Markdown",
    }

    if (TELEGRAM_THREAD) {
      body.message_thread_id = parseInt(TELEGRAM_THREAD)
    }

    const tgResp = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    )

    if (!tgResp.ok) {
      const err = await tgResp.json()
      return NextResponse.json({ error: "Telegram API error", detail: err }, { status: 502 })
    }

    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ error: "Internal error" }, { status: 500 })
  }
}
