import type { CollectionConfig } from "payload"
import { isLoggedIn, isAdminDelete, isEditorOrAbove } from "../lib/access"

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
    update: ({ req: { user } }) => {
      if (!user) return false
      if (isEditorOrAbove(user)) return true
      return { createdBy: { equals: user.id } }
    },
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
      label: "Imagem de Capa",
      admin: {
        description: "Imagem principal exibida no card.",
      },
    },
    {
      name: "gallery",
      type: "array",
      label: "Galeria de Fotos",
      maxRows: 5,
      admin: {
        description: "Até 5 fotos adicionais. Ao clicar na notícia, abre a galeria.",
      },
      fields: [
        {
          name: "photo",
          type: "upload",
          relationTo: "media",
          required: true,
          label: "Foto",
        },
        {
          name: "caption",
          type: "text",
          label: "Legenda",
        },
      ],
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
    {
      name: "createdBy",
      type: "relationship",
      relationTo: "users",
      admin: { readOnly: true, position: "sidebar" },
    },
  ],
  hooks: {
    beforeChange: [
      ({ req, operation, data }) => {
        if (operation === "create" && req.user) {
          data.createdBy = req.user.id
        }
        return data
      },
    ],
  },
}
