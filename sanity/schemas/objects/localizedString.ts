import { defineField, defineType } from "sanity";

export const localizedString = defineType({
  name: "localizedString",
  title: "Localized String",
  type: "object",
  fields: [
    defineField({ name: "en", title: "English", type: "string" }),
    defineField({ name: "zh", title: "中文", type: "string" }),
    defineField({ name: "ms", title: "Bahasa Malaysia", type: "string" }),
  ],
  options: { collapsible: true, collapsed: false },
});

export const localizedText = defineType({
  name: "localizedText",
  title: "Localized Text",
  type: "object",
  fields: [
    defineField({ name: "en", title: "English", type: "text", rows: 3 }),
    defineField({ name: "zh", title: "中文", type: "text", rows: 3 }),
    defineField({
      name: "ms",
      title: "Bahasa Malaysia",
      type: "text",
      rows: 3,
    }),
  ],
  options: { collapsible: true, collapsed: false },
});
