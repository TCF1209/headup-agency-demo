import { defineField, defineType } from "sanity";
import { Tag } from "lucide-react";

export const category = defineType({
  name: "category",
  title: "Category",
  type: "document",
  icon: Tag,
  fields: [
    defineField({
      name: "name",
      type: "localizedString",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "name.en" },
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    select: { title: "name.en" },
  },
});
