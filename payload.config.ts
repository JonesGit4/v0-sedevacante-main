import { buildConfig } from "payload"
import { postgresAdapter } from "@payloadcms/db-postgres"
import { lexicalEditor } from "@payloadcms/richtext-lexical"
import { seoPlugin } from "@payloadcms/plugin-seo"
import sharp from "sharp"
import path from "path"
import { fileURLToPath } from "url"

import { Articles } from "./collections/Articles"
import { Media } from "./collections/Media"
import { Users } from "./collections/Users"

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: " | Sedevacante Admin",
    },
  },
  collections: [Users, Articles, Media],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "sedevacante-payload-secret-key-2026",
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
    }),
  ],
})
