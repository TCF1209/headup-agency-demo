import { groq } from "next-sanity";

export const featuredCaseStudiesQuery = groq`
  *[_type == "caseStudy" && featured == true] | order(publishedAt desc)[0...3] {
    _id,
    title,
    slug,
    client,
    "category": category->{ name },
    coverImage,
    "keyMetric": quickStats[0]{ label, value }
  }
`;

export const homeTestimonialsQuery = groq`
  *[_type == "testimonial"] | order(_createdAt asc)[0...3] {
    _id,
    quote,
    authorName,
    authorTitle,
    businessName,
    avatar
  }
`;

export const faqsQuery = groq`
  *[_type == "faq"] | order(order asc) {
    _id,
    question,
    answer,
    category
  }
`;

export const allCategoriesQuery = groq`
  *[_type == "category"] | order(_createdAt asc) {
    _id,
    name,
    slug
  }
`;

export const caseStudiesByCategoryQuery = groq`
  *[_type == "caseStudy" && ($category == null || category->slug.current == $category)]
  | order(publishedAt desc) {
    _id,
    title,
    slug,
    client,
    "category": category->{ _id, name, slug },
    coverImage,
    "keyMetric": quickStats[0]{ label, value }
  }
`;

export const caseStudyBySlugQuery = groq`
  *[_type == "caseStudy" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    client,
    "category": category->{ _id, name, slug },
    coverImage,
    quickStats,
    problem,
    solution,
    results,
    metrics,
    videoUrl,
    testimonial->{
      _id,
      quote,
      authorName,
      authorTitle,
      businessName,
      avatar
    },
    publishedAt
  }
`;

export const relatedCaseStudiesQuery = groq`
  *[_type == "caseStudy" && slug.current != $slug]
  | order(publishedAt desc)[0...3] {
    _id,
    title,
    slug,
    client,
    "category": category->{ _id, name, slug },
    coverImage,
    "keyMetric": quickStats[0]{ label, value }
  }
`;

export const allCaseStudySlugsQuery = groq`
  *[_type == "caseStudy" && defined(slug.current)] {
    "slug": slug.current
  }
`;
