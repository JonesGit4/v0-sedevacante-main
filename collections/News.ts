import type { CollectionConfig } from "payload"
import { isLoggedIn, isEditorOrSelf, isAdminDelete, canPublish } from "../lib/access"

export const News: CollectionConfig = {
  slug: "news",
  labels: {
    singular: "Notícia",
    plural: "Notícias",
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "label", "status", "date"],
  },
  access: {
    read: ({ req: { user } }) => {
      if (!user) return { status: { equals: "published" } }
      return true
    },
    create: isLoggedIn,
    update: isEditorOrSelf,
    delete: isAdminDelete,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      label: "Título",
    },
    {
      name: "label",
      type: "select",
      required: true,
      label: "Etiqueta",
      defaultValue: "news",
      options: [
        { label: "Notícia", value: "news" },
        { label: "Destaque", value: "highlight" },
        { label: "Especial", value: "featured" },
      ],
      admin: { position: "sidebar" },
    },
    {
      name: "description",
      type: "textarea",
      required: true,
      label: "Descrição",
      maxLength: 500,
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      label: "Imagem",
    },
    {
      name: "date",
      type: "date",
      required: true,
      label: "Data",
      admin: {
        position: "sidebar",
        date: { pickerAppearance: "dayOnly" },
      },
    },
    {
      name: "featured",
      type: "checkbox",
      label: "Destaque na homepage",
      defaultValue: false,
      admin: {
        position: "sidebar",
        description: "Marque para exibir como card principal.",
      },
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "published",
      label: "Status",
      options: [
        { label: "Rascunho", value: "draft" },
        { label: "Publicado", value: "published" },
      ],
      admin: { position: "sidebar" },
    },
  ],
}
