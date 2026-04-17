import { defineField, defineType } from "sanity";
import { Sparkles } from "lucide-react";

export const value = defineType({
  name: "value",
  title: "Value",
  type: "document",
  icon: Sparkles,
  fields: [
    defineField({
      name: "title",
      type: "localizedString",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "description",
      type: "localizedText",
    }),
    defineField({
      name: "icon",
      type: "string",
      description: "Lucide icon name (e.g. Rocket, Target, Users)",
    }),
    defineField({ name: "order", type: "number", initialValue: 0 }),
  ],
  preview: { select: { title: "title.en", subtitle: "icon" } },
  orderings: [
    {
      title: "Display order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
});
