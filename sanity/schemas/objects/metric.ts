import { defineField, defineType } from "sanity";

export const metric = defineType({
  name: "metric",
  title: "Metric",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "localizedString",
    }),
    defineField({
      name: "value",
      title: "Value",
      type: "string",
      description: "e.g. +180% or 3 months",
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    select: { value: "value", label: "label.en" },
    prepare: ({ value, label }) => ({
      title: value || "—",
      subtitle: label || "",
    }),
  },
});
