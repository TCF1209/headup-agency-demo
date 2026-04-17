import type { SchemaTypeDefinition } from "sanity";

import { localizedString, localizedText } from "./objects/localizedString";
import { localizedPortableText } from "./objects/localizedPortableText";
import { metric } from "./objects/metric";

import { siteSettings } from "./documents/siteSettings";
import { category } from "./documents/category";
import { testimonial } from "./documents/testimonial";
import { caseStudy } from "./documents/caseStudy";
import { job } from "./documents/job";
import { faq } from "./documents/faq";
import { author } from "./documents/author";
import { blogPost } from "./documents/blogPost";
import { teamMember } from "./documents/teamMember";
import { value } from "./documents/value";

export const schemaTypes: SchemaTypeDefinition[] = [
  // objects
  localizedString,
  localizedText,
  localizedPortableText,
  metric,

  // singletons
  siteSettings,

  // documents
  category,
  testimonial,
  caseStudy,
  job,
  faq,
  author,
  blogPost,
  teamMember,
  value,
];
