import { NextResponse } from "next/server"
import { getPayload } from "payload"
import config from "@payload-config"

export const dynamic = "force-dynamic"

const IMAGE_MAP: Record<string, string> = {
  "o-concilio-vaticano-ii-e-prescritivo-para-o-terror-dos-falsos-tradicionalistas":
    "https://static.wixstatic.com/media/54cc51_737863470c2f4ae6a513f83b230d64d7~mv2.jpg",
  "o-video-do-padre-jose-eduardo-diagnostico-incompleto-da-enfermidade":
    "https://static.wixstatic.com/media/54cc51_74eff192839b4c179a35e48b8e5f2c04~mv2.png",
  "poderia-um-papa-herege-impor-erros-a-igreja":
    "https://static.wixstatic.com/media/54cc51_4fdd833c92ff412190f6a8c0f99c17d6~mv2.png",
  "leao-xiv-a-pena-de-morte-e-inadmissivel":
    "https://static.wixstatic.com/media/54cc51_156c443be7214815aec325908ea52c89~mv2.png",
  "os-clerigos-modernos-sao-pertinazes-ou-apenas-mentevacante":
    "https://static.wixstatic.com/media/54cc51_07345ea72b9c4b73856612ca8db436f8~mv2.png",
  "contra-a-fsspx-e-congeneres-a-teologia-catolica-do-papado":
    "https://static.wixstatic.com/media/54cc51_af1f59edcb6e4e6b8a26fef6901dc668~mv2.png",
  "analise-do-discurso-de-leao-xiv-na-fundacao-da-centesimus-annus-pro-pontifice":
    "https://static.wixstatic.com/media/54cc51_5ffb8ddca6604aada12c313655c1ee8e~mv2.png",
  "fsspx-e-crisma-a-destruicao-do-legado-de-mons-lefebvre":
    "https://static.wixstatic.com/media/54cc51_3a888efbcfe147ab8ea4ef1119260b2b~mv2.png",
  "estamos-desobedecendo-pio-xii":
    "https://static.wixstatic.com/media/54cc51_826edeb914564ebd8ab26a1cc0133169~mv2.png",
  "sobre-a-eleicao-de-robert-francis-prevost-nada-mudou":
    "https://static.wixstatic.com/media/54cc51_c9ec5c9117fb41048c2ecf57fa98e5b0~mv2.png",
}

export async function GET() {
  try {
    const payload = await getPayload({ config })
    const results: string[] = []

    for (const [slug, imageUrl] of Object.entries(IMAGE_MAP)) {
      try {
        // Find the article
        const found = await payload.find({
          collection: "articles",
          where: { slug: { equals: slug } },
          limit: 1,
          overrideAccess: true,
        })
        if (found.docs.length === 0) {
          results.push(`SKIP ${slug}: not found`)
          continue
        }
        const article = found.docs[0] as any
        if (article.featuredImage) {
          results.push(`SKIP ${slug}: already has image`)
          continue
        }

        // Download image
        const resp = await fetch(imageUrl)
        if (!resp.ok) {
          results.push(`FAIL ${slug}: fetch ${resp.status}`)
          continue
        }
        const buffer = Buffer.from(await resp.arrayBuffer())
        const ext = imageUrl.includes(".png") ? "png" : "jpg"
        const filename = `seminario-${slug.slice(0, 40)}.${ext}`

        // Upload as media
        const media = await payload.create({
          collection: "media",
          overrideAccess: true,
          data: { alt: article.title },
          file: {
            data: buffer,
            mimetype: ext === "png" ? "image/png" : "image/jpeg",
            name: filename,
            size: buffer.length,
          },
        })

        // Associate with article
        await payload.update({
          collection: "articles",
          id: article.id,
          overrideAccess: true,
          data: { featuredImage: media.id as number },
        })

        results.push(`OK ${slug}: media=${media.id}`)
      } catch (err: any) {
        results.push(`ERR ${slug}: ${err.message?.slice(0, 80)}`)
      }
    }

    return NextResponse.json({ success: true, results })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
