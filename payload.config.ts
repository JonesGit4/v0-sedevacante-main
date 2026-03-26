import { buildConfig } from "payload"
import { postgresAdapter } from "@payloadcms/db-postgres"
import { lexicalEditor } from "@payloadcms/richtext-lexical"
import { seoPlugin } from "@payloadcms/plugin-seo"
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob"
import { pt } from "@payloadcms/translations/languages/pt"
import { en } from "@payloadcms/translations/languages/en"

import sharp from "sharp"
import path from "path"
import { fileURLToPath } from "url"

import { Articles } from "./collections/Articles"
import { News } from "./collections/News"
import { Media } from "./collections/Media"
import { Users } from "./collections/Users"

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  i18n: {
    supportedLanguages: { pt, en },
    fallbackLanguage: "pt",
  },
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: " | Sedevacante Admin",
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Articles, News, Media],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "sdv-payload-secret-2026-sssj-sede-vac",
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || "",
    },
    push: true,
  }),
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  plugins: [
    seoPlugin({
      collections: ["articles"],
      uploadsCollection: "media",
      generateTitle: ({ doc }: any) => doc?.title ? `${doc.title} | Sedevacante` : "Sedevacante",
      generateDescription: ({ doc }: any) => doc?.excerpt || "",
      generateURL: ({ doc }: any) => doc?.slug ? `https://sedevacante.com.br/articles/${doc.slug}` : "",
    }),
    vercelBlobStorage({
      enabled: true,
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN || "",
    }),
  ],
})
