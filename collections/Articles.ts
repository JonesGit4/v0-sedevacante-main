import type { CollectionConfig } from "payload"
import { canCreate, isEditorOrSelf, isAdminDelete, canPublish } from "../lib/access"

// Gera slug a partir do título
function slugify(text: string): string {
  return text
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove acentos
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export const Articles: CollectionConfig = {
  slug: "articles",
  labels: {
    singular: "Artigo",
    plural: "Artigos",
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "language", "author", "status", "publishedAt"],
  },
  access: {
    read: ({ req: { user } }) => {
      if (!user) return { status: { equals: "published" } }
      const role = user?.role || "author"
      if (role === "admin" || role === "editor") return true
      return { createdBy: { equals: user.id } }
    },
    create: canCreate,
    update: isEditorOrSelf,
    delete: isAdminDelete,
  },
  hooks: {
    beforeValidate: [
      ({ data, operation }) => {
        // Auto-gerar slug a partir do título
        if (data?.title && (!data.slug || data.slug === "")) {
          data.slug = slugify(data.title)
        }
        return data
      },
    ],
    beforeChange: [
      ({ req, data, operation }) => {
        // Registrar quem criou e preencher autor automaticamente
        if (operation === "create" && req.user) {
          data.createdBy = req.user.id
          if (!data.author || data.author === "") {
            data.author = (req.user as any).name || req.user.email
          }
        }
        // Author não pode publicar — forçar draft
        if (req.user) {
          const role = (req.user as any).role || "author"
          if (role === "author" && data.status === "published") {
            data.status = "draft"
          }
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      label: "Título",
    },
    {
      name: "slug",
      type: "text",
      unique: true,
      label: "Slug (URL)",
      admin: {
        position: "sidebar",
        description: "Gerado automaticamente a partir do título. Editável.",
      },
    },
    {
      name: "language",
      type: "select",
      required: true,
      label: "Idioma",
      defaultValue: "pt",
      options: [
        { label: "Português", value: "pt" },
        { label: "English", value: "en" },
        { label: "Français", value: "fr" },
        { label: "Español", value: "es" },
      ],
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "author",
      type: "text",
      label: "Autor",
      admin: {
        description: "Preenchido automaticamente com seu nome. Editável.",
      },
    },
    {
      name: "excerpt",
      type: "textarea",
      label: "Resumo / Descrição",
      maxLength: 300,
      admin: {
        description: "Usado também como descrição SEO se não houver override.",
      },
    },
    {
      name: "featuredImage",
      type: "upload",
      relationTo: "media",
      label: "Imagem de Capa",
    },
    {
      name: "content",
      type: "richText",
      required: true,
      label: "Conteúdo",
    },
    {
      name: "tags",
      type: "text",
      hasMany: true,
      label: "Tags",
      admin: {
        description: "Digite e pressione Enter. Cole múltiplas separadas por vírgula.",
      },
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "draft",
      label: "Status",
      options: [
        { label: "Rascunho", value: "draft" },
        { label: "Publicado", value: "published" },
      ],
      access: {
        update: canPublish,
      },
      admin: {
        position: "sidebar",
        description: "Apenas Editors e Admins podem publicar.",
      },
    },
    {
      name: "publishedAt",
      type: "date",
      label: "Data de Publicação",
      admin: {
        position: "sidebar",
        date: {
          pickerAppearance: "dayOnly",
        },
      },
    },
    {
      name: "createdBy",
      type: "relationship",
      relationTo: "users",
      label: "Criado por",
      admin: {
        position: "sidebar",
        readOnly: true,
      },
    },
  ],
}
