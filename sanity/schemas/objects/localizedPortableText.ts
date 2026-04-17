import { defineField, defineType } from "sanity";

export const localizedPortableText = defineType({
  name: "localizedPortableText",
  title: "Localized Portable Text",
  type: "object",
  fields: [
    defineField({
      name: "en",
      title: "English",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "zh",
      title: "中文",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "ms",
      title: "Bahasa Malaysia",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
  options: { collapsible: true, collapsed: true },
});
