import { defineField, defineType } from "sanity";
import { User } from "lucide-react";

export const author = defineType({
  name: "author",
  title: "Author",
  type: "document",
  icon: User,
  fields: [
    defineField({
      name: "name",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({ name: "role", type: "string" }),
    defineField({
      name: "avatar",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({ name: "bio", type: "localizedText" }),
  ],
  preview: { select: { title: "name", subtitle: "role", media: "avatar" } },
});
