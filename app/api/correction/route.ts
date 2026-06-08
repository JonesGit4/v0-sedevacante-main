import { NextRequest, NextResponse } from "next/server"

const TELEGRAM_BOT = process.env.TELEGRAM_CORRECTION_BOT || "8964082782:AAHw-jXGw8dyBOtmQRPV_oMKORYrXZLrqrk"
const TELEGRAM_CHAT = process.env.TELEGRAM_CORRECTION_CHAT || "-1003950380440"
const TELEGRAM_THREAD = process.env.TELEGRAM_CORRECTION_THREAD || "121"
const NOCO_TOKEN = process.env.NOCO_TOKEN || "nc_pat_Gk9mhaSo8kBRRZbqDhMlilu295RzJXumzZYotk1z"
const NOCO_URL = "https://app.nocodb.com/api/v1/db/data/noco/py4u5xa8fhycl7d/mubobvy53ckqler"

async function checkCorrectionLimit(slug: string): Promise<{ allowed: boolean; count: number }> {
  try {
    const where = encodeURIComponent(`(Slug_Publicado,eq,${slug})`)
    const url = `${NOCO_URL}?where=${where}&fields=Correcoes&limit=1`
    const resp = await fetch(url, {
      headers: { "xc-token": NOCO_TOKEN, "Content-Type": "application/json" },
    })
    if (!resp.ok) return { allowed: true, count: 0 } // NocoDB unreachable → allow
    const data = await resp.json()
    const records = data.list || data.records || []
    if (records.length === 0) return { allowed: true, count: 0 } // not in NocoDB → allow
    const count = records[0].Correcoes || 0
    return { allowed: count < 3, count }
  } catch {
    return { allowed: true, count: 0 } // error → allow (don't block legit corrections)
  }
}

async function incrementCorrection(slug: string): Promise<void> {
  try {
    // Find record
    const where = encodeURIComponent(`(Slug_Publicado,eq,${slug})`)
    const url = `${NOCO_URL}?where=${where}&limit=1`
    const resp = await fetch(url, {
      headers: { "xc-token": NOCO_TOKEN, "Content-Type": "application/json" },
    })
    if (!resp.ok) return
    const data = await resp.json()
    const records = data.list || data.records || []
    if (records.length === 0) return
    const id = records[0].Id || records[0].id
    const current = records[0].Correcoes || 0

    // Increment
    await fetch(`${NOCO_URL}/${id}`, {
      method: "PATCH",
      headers: { "xc-token": NOCO_TOKEN, "Content-Type": "application/json" },
      body: JSON.stringify({ Correcoes: current + 1 }),
    })
  } catch {
    // silent
  }
}

export async function POST(req: NextRequest) {
  try {
    const { slug, titulo } = await req.json()

    if (!slug || !titulo) {
      return NextResponse.json({ error: "slug e titulo obrigatórios" }, { status: 400 })
    }

    // Check correction limit
    const { allowed, count } = await checkCorrectionLimit(slug)
    if (!allowed) {
      return NextResponse.json(
        { error: `Limite de correções atingido (${count}/3). Entre em contato pelo Telegram.` },
        { status: 429 }
      )
    }

    const url = `https://sedevacante.com.br/news/${slug}`
    const text = `📝 Correção ${count + 1}/3 solicitada:\n\n*${titulo}*\n${url}`

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

    // Increment counter after successful send
    await incrementCorrection(slug)

    return NextResponse.json({ ok: true, correcao: count + 1, limite: 3 })
  } catch (e) {
    return NextResponse.json({ error: "Internal error" }, { status: 500 })
  }
}
