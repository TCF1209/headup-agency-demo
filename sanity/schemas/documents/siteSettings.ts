import { defineField, defineType } from "sanity";
import { Settings } from "lucide-react";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  icon: Settings,
  fields: [
    defineField({ name: "title", type: "string" }),
    defineField({
      name: "description",
      type: "localizedString",
    }),
    defineField({
      name: "logo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({ name: "contactEmail", type: "string" }),
    defineField({
      name: "whatsappNumber",
      type: "string",
      description: "E.g. 60123456789 — no +, spaces, or dashes",
    }),
    defineField({
      name: "socialLinks",
      type: "object",
      fields: [
        defineField({ name: "instagram", type: "url" }),
        defineField({ name: "facebook", type: "url" }),
        defineField({ name: "linkedin", type: "url" }),
      ],
    }),
    defineField({
      name: "footerBlurb",
      type: "localizedText",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Site Settings" }),
  },
});
