import type { CollectionConfig } from "payload"
import { isAdmin } from "../lib/access"

export const Users: CollectionConfig = {
  slug: "users",
  labels: {
    singular: "Usuário",
    plural: "Usuários",
  },
  auth: true,
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "email", "role"],
  },
  access: {
    // Admin vê todos; demais só veem a si mesmos
    read: ({ req: { user } }) => {
      if (!user) return false
      if (isAdmin(user)) return true
      return { id: { equals: user.id } }
    },
    create: ({ req: { user } }) => isAdmin(user),
    update: ({ req: { user } }) => {
      if (!user) return false
      if (isAdmin(user)) return true
      // Usuário pode editar o próprio perfil
      return { id: { equals: user.id } }
    },
    delete: ({ req: { user } }) => isAdmin(user),
  },
  fields: [
    {
      name: "name",
      type: "text",
      label: "Nome",
      required: true,
    },
    {
      name: "role",
      type: "select",
      label: "Nível de Acesso",
      required: true,
      defaultValue: "author",
      options: [
        { label: "Admin — Acesso total", value: "admin" },
        { label: "Editor — Publica artigos e gerencia mídia", value: "editor" },
        { label: "Autor — Cria rascunhos, não publica", value: "author" },
      ],
      access: {
        // Somente admin pode alterar o role
        update: ({ req: { user } }) => isAdmin(user),
      },
      admin: {
        position: "sidebar",
        description: "Define o que este usuário pode fazer no painel.",
      },
    },
  ],
}
