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

export type PortableBlock = {
  _type: string;
  _key?: string;
  [key: string]: unknown;
};

export type LocalizedPortable = {
  en: PortableBlock[];
  zh?: PortableBlock[];
  ms?: PortableBlock[];
};

export type Faq = {
  _id: string;
  question: LocalizedString;
  answer: LocalizedPortable;
  category: "services" | "pricing" | "general";
};

export type Category = {
  _id: string;
  name: LocalizedString;
  slug: { current: string };
};

export type CaseStudyCardData = {
  _id: string;
  title: LocalizedString;
  slug: { current: string };
  client: string;
  category: Category | null;
  coverImage: SanityImageRef;
  keyMetric: { label: LocalizedString; value: string } | null;
};

export type Stat = { label: LocalizedString; value: string };

export type CaseStudyDetail = {
  _id: string;
  title: LocalizedString;
  slug: { current: string };
  client: string;
  category: Category | null;
  coverImage: SanityImageRef;
  quickStats: Stat[];
  problem: LocalizedPortable;
  solution: LocalizedPortable;
  results: LocalizedPortable;
  metrics: Stat[];
  videoUrl?: string;
  testimonial: HomeTestimonial | null;
  publishedAt?: string;
};

export type JobType = "full-time" | "part-time" | "intern" | "contract";

export type Job = {
  _id: string;
  title: LocalizedString;
  slug: { current: string };
  department?: string;
  location?: string;
  type: JobType;
  description: LocalizedPortable;
  responsibilities?: LocalizedString;
  requirements?: LocalizedString;
};
