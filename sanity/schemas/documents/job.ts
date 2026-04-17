import { defineField, defineType } from "sanity";
import { Briefcase } from "lucide-react";

export const job = defineType({
  name: "job",
  title: "Job",
  type: "document",
  icon: Briefcase,
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
    defineField({ name: "department", type: "string" }),
    defineField({ name: "location", type: "string" }),
    defineField({
      name: "type",
      type: "string",
      options: {
        list: [
          { title: "Full-time", value: "full-time" },
          { title: "Part-time", value: "part-time" },
          { title: "Intern", value: "intern" },
          { title: "Contract", value: "contract" },
        ],
        layout: "radio",
      },
      initialValue: "full-time",
    }),
    defineField({ name: "description", type: "localizedPortableText" }),
    defineField({
      name: "responsibilities",
      type: "localizedText",
      description:
        "One bullet per language; use line breaks for multiple points",
    }),
    defineField({
      name: "requirements",
      type: "localizedText",
    }),
    defineField({
      name: "active",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "title.en",
      subtitle: "department",
    },
  },
});
