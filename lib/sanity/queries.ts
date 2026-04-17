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
