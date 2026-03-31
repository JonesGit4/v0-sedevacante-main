import type { CollectionConfig } from "payload"

export const Banners: CollectionConfig = {
  slug: "banners",
  labels: {
    singular: "Banner",
    plural: "Banners",
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "location", "status", "order"],
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => {
      const role = (user as any)?.role || "author"
      return role === "admin" || role === "editor"
    },
    update: ({ req: { user } }) => {
      const role = (user as any)?.role || "author"
      return role === "admin" || role === "editor"
    },
    delete: ({ req: { user } }) => {
      const role = (user as any)?.role || "author"
      return role === "admin"
    },
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      label: "Nome do Banner",
      admin: {
        description: "Nome interno para identificação (não aparece no site).",
      },
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
      label: "Imagem",
    },
    {
      name: "link",
      type: "text",
      label: "Link de Destino",
      admin: {
        description: "URL para onde o banner redireciona ao clicar.",
      },
    },
    {
      name: "openInNewTab",
      type: "checkbox",
      defaultValue: true,
      label: "Abrir em nova aba",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "location",
      type: "select",
      hasMany: true,
      required: true,
      label: "Exibir em",
      options: [
        { label: "Homepage", value: "homepage" },
        { label: "Lista de Artigos", value: "articles" },
        { label: "Artigo (interna)", value: "article-detail" },
      ],
      admin: {
        description: "Selecione onde este banner deve aparecer.",
      },
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "active",
      label: "Status",
      options: [
        { label: "Ativo", value: "active" },
        { label: "Inativo", value: "inactive" },
      ],
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "order",
      type: "number",
      defaultValue: 1,
      label: "Ordem",
      admin: {
        position: "sidebar",
        description: "Menor número = aparece primeiro.",
      },
    },
  ],
}
