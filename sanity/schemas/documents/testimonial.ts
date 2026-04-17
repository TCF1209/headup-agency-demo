import { defineField, defineType } from "sanity";
import { Quote } from "lucide-react";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  icon: Quote,
  fields: [
    defineField({
      name: "quote",
      type: "localizedText",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "authorName",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({ name: "authorTitle", type: "string" }),
    defineField({ name: "businessName", type: "string" }),
    defineField({
      name: "avatar",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: {
      title: "authorName",
      subtitle: "businessName",
      media: "avatar",
    },
  },
});
