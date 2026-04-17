import { defineField, defineType } from "sanity";
import { HelpCircle } from "lucide-react";

export const faq = defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  icon: HelpCircle,
  fields: [
    defineField({
      name: "question",
      type: "localizedString",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "answer",
      type: "localizedPortableText",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      type: "string",
      options: {
        list: ["services", "pricing", "general"],
        layout: "radio",
      },
      initialValue: "general",
    }),
    defineField({
      name: "order",
      type: "number",
      initialValue: 0,
    }),
  ],
  preview: {
    select: { title: "question.en", subtitle: "category" },
  },
  orderings: [
    {
      title: "Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
});
