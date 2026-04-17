import { defineField, defineType } from "sanity";
import { FileText } from "lucide-react";

export const blogPost = defineType({
  name: "blogPost",
  title: "Blog Post",
  type: "document",
  icon: FileText,
  fields: [
    defineField({
      name: "title",
      type: "localizedString",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title.en" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "excerpt",
      type: "localizedText",
    }),
    defineField({
      name: "coverImage",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", type: "string" })],
    }),
    defineField({
      name: "author",
      type: "reference",
      to: [{ type: "author" }],
    }),
    defineField({
      name: "category",
      type: "reference",
      to: [{ type: "category" }],
    }),
    defineField({ name: "body", type: "localizedPortableText" }),
    defineField({ name: "publishedAt", type: "datetime" }),
  ],
  preview: {
    select: {
      title: "title.en",
      subtitle: "author.name",
      media: "coverImage",
    },
  },
});
