import { NextRequest, NextResponse } from 'next/server'

const NOCODB_TOKEN = process.env.NOCODB_TOKEN || 'nc_pat_1aOj3QbDFESJWURvzf83z8vRBfALrPWOOWxuafUP'
const NOCODB_URL = process.env.NOCODB_URL || 'https://app.nocodb.com'
const NOCODB_TABLE = process.env.NOCODB_TABLE || 'm13x2wdrf4x1lv0'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const nome = body.nome || ''
    const descricao = body.descricao || ''
    const fotos_urls = body.fotos_urls || []

    if (!nome || !descricao) {
      return NextResponse.json(
        { error: 'Nome e descrição são obrigatórios' },
        { status: 400 }
      )
    }

    const payload: Record<string, unknown> = {
      nome,
      descricao,
      rito: body.rito || null,
      status: body.status || null,
      jurisdicao: body.jurisdicao || null,
      padre_responsavel: body.padre_responsavel || null,
      logradouro: body.logradouro || null,
      cidade: body.cidade || null,
      estado: body.estado || null,
      cep: body.cep || null,
      coordenadas: body.coordenadas || null,
      dia_missa_1: body.dia_missa_1 || null,
      dia_missa_2: body.dia_missa_2 || null,
      dia_missa_3: body.dia_missa_3 || null,
      horario_missa_1: body.horario_missa_1 || null,
      horario_missa_2: body.horario_missa_2 || null,
      horario_missa_3: body.horario_missa_3 || null,
      dias_confissao: body.dias_confissao || null,
      horario_confissao: body.horario_confissao || null,
      capacidade: body.capacidade ? parseInt(String(body.capacidade), 10) : null,
      telefone: body.telefone || null,
      whatsapp: body.whatsapp || null,
      email: body.email || null,
      telegram: body.telegram || null,
      site: body.site || null,
      instagram: body.instagram || null,
      x_twitter: body.x_twitter || null,
      facebook: body.facebook || null,
      tiktok: body.tiktok || null,
      observacoes: body.observacoes || null,
      fotos_urls: Array.isArray(fotos_urls) && fotos_urls.length > 0
        ? JSON.stringify(fotos_urls)
        : null,
      data_envio: new Date().toISOString(),
    }

    const nocodbRes = await fetch(
      `${NOCODB_URL}/api/v2/tables/${NOCODB_TABLE}/records`,
      {
        method: 'POST',
        headers: {
          'xc-token': NOCODB_TOKEN,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }
    )

    if (!nocodbRes.ok) {
      const errText = await nocodbRes.text()
      console.error('NocoDB error:', errText)
      return NextResponse.json(
        { error: 'Erro ao salvar os dados' },
        { status: 502 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Missão cadastrada com sucesso!',
      photos_count: Array.isArray(fotos_urls) ? fotos_urls.length : 0,
    })
  } catch (err) {
    console.error('Mission submit error:', err)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
