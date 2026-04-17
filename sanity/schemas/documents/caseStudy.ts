import { defineField, defineType } from "sanity";
import { Rocket } from "lucide-react";

export const caseStudy = defineType({
  name: "caseStudy",
  title: "Case Study",
  type: "document",
  icon: Rocket,
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
    defineField({ name: "client", type: "string" }),
    defineField({
      name: "category",
      type: "reference",
      to: [{ type: "category" }],
    }),
    defineField({
      name: "coverImage",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", type: "string" })],
    }),
    defineField({
      name: "featured",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "quickStats",
      title: "Quick Stats (3 headline metrics)",
      type: "array",
      of: [{ type: "metric" }],
      validation: (r) => r.max(3),
    }),
    defineField({ name: "problem", type: "localizedPortableText" }),
    defineField({ name: "solution", type: "localizedPortableText" }),
    defineField({ name: "results", type: "localizedPortableText" }),
    defineField({
      name: "metrics",
      title: "Outcome Metrics",
      type: "array",
      of: [{ type: "metric" }],
    }),
    defineField({ name: "videoUrl", type: "url" }),
    defineField({
      name: "testimonial",
      type: "reference",
      to: [{ type: "testimonial" }],
    }),
    defineField({ name: "publishedAt", type: "datetime" }),
  ],
  preview: {
    select: {
      title: "title.en",
      subtitle: "client",
      media: "coverImage",
    },
  },
});
