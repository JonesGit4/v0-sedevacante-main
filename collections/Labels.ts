import type { CollectionConfig } from "payload"

export const Labels: CollectionConfig = {
  slug: "labels",
  labels: {
    singular: "Label",
    plural: "Labels",
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "createdAt"],
    group: "Conteúdo",
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: "name",
      type: "text",
      label: "Nome da Label",
      required: true,
      unique: true,
    },
    {
      name: "description",
      type: "textarea",
      label: "Descrição",
    },
  ],
}
