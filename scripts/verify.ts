import { createClient } from "@sanity/client";

const c = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  token: process.env.SANITY_API_TOKEN!,
  apiVersion: "2024-10-01",
  useCdn: false,
});

async function main() {
  const counts = await c.fetch(`{
    "caseStudies": count(*[_type=="caseStudy"]),
    "testimonials": count(*[_type=="testimonial"]),
    "categories": count(*[_type=="category"]),
    "faqs": count(*[_type=="faq"]),
    "jobs": count(*[_type=="job"]),
    "settings": count(*[_id=="siteSettings"])
  }`);
  console.log(counts);

  const featured = await c.fetch(
    `*[_type=="caseStudy" && featured==true]{_id, "title": title.en, client, "category": category->name.en}`
  );
  console.log("Featured case studies:", featured);
}
main();
