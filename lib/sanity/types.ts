export type LocalizedString = {
  en: string;
  zh?: string;
  ms?: string;
};

export type SanityImageRef = {
  asset: { _ref: string };
  alt?: string;
};

export type HomeCaseStudy = {
  _id: string;
  title: LocalizedString;
  slug: { current: string };
  client: string;
  category: { name: LocalizedString } | null;
  coverImage: SanityImageRef;
  keyMetric: { label: LocalizedString; value: string } | null;
};

export type HomeTestimonial = {
  _id: string;
  quote: LocalizedString;
  authorName: string;
  authorTitle?: string;
  businessName?: string;
  avatar?: SanityImageRef;
};
