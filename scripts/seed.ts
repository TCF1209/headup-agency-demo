import { createClient } from "@sanity/client";
import fs from "node:fs";
import path from "node:path";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  token: process.env.SANITY_API_TOKEN!,
  apiVersion: "2024-10-01",
  useCdn: false,
});

const ASSETS_DIR = path.join(process.cwd(), "public", "assets");

async function uploadImage(filename: string) {
  const filePath = path.join(ASSETS_DIR, filename);
  const buffer = fs.readFileSync(filePath);
  const asset = await client.assets.upload("image", buffer, { filename });
  return asset._id;
}

const locString = (en: string, zh = "", ms = "") => ({
  _type: "localizedString",
  en,
  zh,
  ms,
});

const locText = (en: string, zh = "", ms = "") => ({
  _type: "localizedText",
  en,
  zh,
  ms,
});

let blockKey = 0;
const k = () => `b${++blockKey}`;
const block = (text: string) => ({
  _type: "block",
  _key: k(),
  style: "normal",
  markDefs: [],
  children: [{ _type: "span", _key: k(), text, marks: [] }],
});

const locPortable = (
  en: string[],
  zh: string[] = [],
  ms: string[] = []
) => ({
  _type: "localizedPortableText",
  en: en.map(block),
  zh: zh.map(block),
  ms: ms.map(block),
});

const imageRef = (assetId: string, alt?: string) => ({
  _type: "image",
  asset: { _type: "reference", _ref: assetId },
  ...(alt ? { alt } : {}),
});

const ref = (id: string) => ({ _type: "reference", _ref: id });
const slug = (current: string) => ({ _type: "slug", current });

async function main() {
  console.log("→ Uploading images to Sanity assets...");
  const assets = {
    cafe: await uploadImage("cafe.jpg"),
    cloudKitchen: await uploadImage("cloud-kitchen.jpg"),
    hawker: await uploadImage("hawker.jpg"),
    logo: await uploadImage("logo.png"),
  };
  console.log(`  uploaded ${Object.keys(assets).length} images`);

  console.log("→ Seeding siteSettings...");
  await client.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    title: "Head Up Agency",
    description: locString(
      "F&B growth marketing agency in Malaysia.",
      "马来西亚餐饮增长营销机构。",
      "Agensi pemasaran pertumbuhan F&B di Malaysia."
    ),
    logo: imageRef(assets.logo, "Head Up Agency logo"),
    contactEmail: "hello@headupagency.com",
    whatsappNumber: "60123456789",
    socialLinks: {
      instagram: "https://instagram.com/headupagency",
      facebook: "https://facebook.com/headupagency",
      linkedin: "https://linkedin.com/company/headupagency",
    },
    footerBlurb: locText(
      "We help F&B businesses across Malaysia grow online with performance marketing on GrabFood and Foodpanda, paired with modern POS infrastructure for sustainable operations."
    ),
  });

  console.log("→ Seeding categories...");
  const categories = [
    { _id: "category-cafe", name: "Cafe", zh: "咖啡馆", ms: "Kafe" },
    {
      _id: "category-cloud-kitchen",
      name: "Cloud Kitchen",
      zh: "云厨房",
      ms: "Dapur Awan",
    },
    { _id: "category-hawker", name: "Hawker", zh: "小贩", ms: "Penjaja" },
    {
      _id: "category-restaurant",
      name: "Restaurant",
      zh: "餐厅",
      ms: "Restoran",
    },
  ];
  for (const c of categories) {
    await client.createOrReplace({
      _id: c._id,
      _type: "category",
      name: locString(c.name, c.zh, c.ms),
      slug: slug(c._id.replace("category-", "")),
    });
  }

  console.log("→ Seeding testimonials...");
  await client.createOrReplace({
    _id: "testimonial-cafe-owner",
    _type: "testimonial",
    quote: locText(
      "We went from 40 GrabFood orders a day to 180+ in under 3 months. The menu photography alone paid for itself in the first two weeks."
    ),
    authorName: "Wei Ming",
    authorTitle: "Founder",
    businessName: "Bangsar Coffee Works",
  });
  await client.createOrReplace({
    _id: "testimonial-cloud-kitchen-ops",
    _type: "testimonial",
    quote: locText(
      "Launching four virtual brands out of the same kitchen seemed impossible until Head Up sat down with us and mapped the whole thing — ads, menus, pricing, everything."
    ),
    authorName: "Priya Menon",
    authorTitle: "Operations Lead",
    businessName: "Dapur Klang Cloud Kitchen",
  });
  await client.createOrReplace({
    _id: "testimonial-hawker-owner",
    _type: "testimonial",
    quote: locText(
      "I was skeptical about going digital — my business is 30 years old. But the POS paid for itself in the first CNY push. No more lost orders on busy nights."
    ),
    authorName: "Tan Chin Heng",
    authorTitle: "Owner",
    businessName: "Uncle Tan's Char Kuey Teow",
  });

  console.log("→ Seeding case studies...");
  await client.createOrReplace({
    _id: "caseStudy-bangsar-cafe",
    _type: "caseStudy",
    title: locString(
      "Boosting Weekday Orders for a Boutique Cafe in Bangsar",
      "让班萨一家精品咖啡馆的工作日订单翻倍",
      "Meningkatkan Tempahan Hari Kerja untuk Kafe Butik di Bangsar"
    ),
    slug: slug("bangsar-boutique-cafe"),
    client: "Bangsar Coffee Works",
    category: ref("category-cafe"),
    coverImage: imageRef(assets.cafe, "Bangsar cafe interior"),
    featured: true,
    quickStats: [
      {
        _type: "metric",
        _key: "m1",
        label: locString("GrabFood orders", "订单", "Tempahan"),
        value: "+180%",
      },
      {
        _type: "metric",
        _key: "m2",
        label: locString("Timeline"),
        value: "3 months",
      },
      {
        _type: "metric",
        _key: "m3",
        label: locString("Lower CAC"),
        value: "-40%",
      },
    ],
    problem: locPortable([
      "Weekday GrabFood orders had plateaued at 40/day despite strong weekend foot traffic. Menu photos were taken on a phone; the listing was buried below chain cafes. No one was running ads, no one was optimising.",
    ]),
    solution: locPortable([
      "Re-shot the entire 38-item menu with studio lighting. Rewrote every item description with dish-specific keywords in English and BM. Split the in-app ad budget 70/30 between weekday lunch hours and weekend brunch, then ran A/B tests on voucher thresholds for two weeks.",
    ]),
    results: locPortable([
      "Weekday orders climbed from 40 to 180+/day within 11 weeks. Customer acquisition cost dropped 40% as organic listing impressions grew. The cafe is now in the top 3 for 'Bangsar cafe' searches on GrabFood.",
    ]),
    metrics: [
      {
        _type: "metric",
        _key: "o1",
        label: locString("Daily orders (weekday)"),
        value: "40 → 180",
      },
      {
        _type: "metric",
        _key: "o2",
        label: locString("Customer acquisition cost"),
        value: "-40%",
      },
    ],
    testimonial: ref("testimonial-cafe-owner"),
    publishedAt: new Date("2026-01-15").toISOString(),
  });

  await client.createOrReplace({
    _id: "caseStudy-cloud-kitchen-brands",
    _type: "caseStudy",
    title: locString(
      "Scaling a Cloud Kitchen from 1 to 4 Brands on GrabFood",
      "将云厨房从 1 个品牌扩展到 4 个",
      "Mengembangkan Dapur Awan dari 1 ke 4 Jenama di GrabFood"
    ),
    slug: slug("cloud-kitchen-four-brands"),
    client: "Dapur Klang",
    category: ref("category-cloud-kitchen"),
    coverImage: imageRef(assets.cloudKitchen, "Cloud kitchen operations"),
    featured: true,
    quickStats: [
      {
        _type: "metric",
        _key: "m1",
        label: locString("Virtual brands"),
        value: "1 → 4",
      },
      {
        _type: "metric",
        _key: "m2",
        label: locString("Timeline"),
        value: "6 months",
      },
      {
        _type: "metric",
        _key: "m3",
        label: locString("Total orders"),
        value: "+220%",
      },
    ],
    problem: locPortable([
      "A single nasi lemak brand was hitting order ceilings during peak lunch windows while the kitchen still had capacity from 2-5pm. The owner wanted to launch additional brands but had no playbook for naming, menu design, or ad split.",
    ]),
    solution: locPortable([
      "Mapped four non-competing cuisines that could be produced with existing prep stations: western comfort food, halal Chinese, healthy bowls, and late-night supper. Built brand identities, menu photography, and distinct GrabFood listings for each. Ran staggered launches two weeks apart to avoid cannibalising ad spend.",
    ]),
    results: locPortable([
      "Six months in, all four brands are profitable. Kitchen utilisation went from 45% to 82% on weekdays. The Chinese late-night brand alone now matches the original nasi lemak brand's revenue.",
    ]),
    metrics: [
      {
        _type: "metric",
        _key: "o1",
        label: locString("Kitchen utilisation"),
        value: "45% → 82%",
      },
      {
        _type: "metric",
        _key: "o2",
        label: locString("Total monthly orders"),
        value: "+220%",
      },
    ],
    testimonial: ref("testimonial-cloud-kitchen-ops"),
    publishedAt: new Date("2026-02-01").toISOString(),
  });

  await client.createOrReplace({
    _id: "caseStudy-hawker-digitalize",
    _type: "caseStudy",
    title: locString(
      "Digitising a Hawker Stall: POS + Delivery in 30 Days",
      "30 天内将小贩档口数字化：POS + 外卖",
      "Mendigitalkan Gerai Penjaja: POS + Penghantaran dalam 30 Hari"
    ),
    slug: slug("hawker-pos-delivery-30-days"),
    client: "Uncle Tan's Char Kuey Teow",
    category: ref("category-hawker"),
    coverImage: imageRef(assets.hawker, "Hawker stall"),
    featured: true,
    quickStats: [
      {
        _type: "metric",
        _key: "m1",
        label: locString("Time to launch"),
        value: "30 days",
      },
      {
        _type: "metric",
        _key: "m2",
        label: locString("Order errors"),
        value: "Zero",
      },
      {
        _type: "metric",
        _key: "m3",
        label: locString("Evening orders"),
        value: "+65%",
      },
    ],
    problem: locPortable([
      "A 30-year-old stall losing 3-5 orders a night to miscommunication during rush hour. Handwritten tickets, no way to track what was selling, and zero presence on delivery platforms despite a queue of 20 people every Friday night.",
    ]),
    solution: locPortable([
      "Installed a 2-terminal POS with direct GrabFood and Foodpanda integration. Trained uncle and his two helpers in three 90-minute sessions. Ran a soft-launch week with friends-and-family orders to shake out the workflow, then hit public delivery platforms in week 3.",
    ]),
    results: locPortable([
      "Zero lost orders since launch. The CNY Eve rush saw 240 orders cleared across dine-in and delivery without a single dropped ticket. Evening orders are up 65% thanks to the delivery platform exposure.",
    ]),
    metrics: [
      {
        _type: "metric",
        _key: "o1",
        label: locString("Evening orders"),
        value: "+65%",
      },
      {
        _type: "metric",
        _key: "o2",
        label: locString("Lost tickets per night"),
        value: "3-5 → 0",
      },
    ],
    testimonial: ref("testimonial-hawker-owner"),
    publishedAt: new Date("2026-03-05").toISOString(),
  });

  console.log("→ Seeding FAQs...");
  const faqs = [
    {
      id: "faq-results-timing",
      q: "How long until I see results from GrabFood marketing?",
      a: "Typically 4-6 weeks for menu optimisation and ad management to compound. The first 2 weeks are setup and baseline measurement; week 3 onwards we start iterating on what's working. Case studies on our site show 3-month trajectories.",
      category: "services",
      order: 1,
    },
    {
      id: "faq-hawker-eligible",
      q: "Do you work with small hawker stalls or only established restaurants?",
      a: "We work with any F&B business doing at least 30 orders a day or RM10K/month in revenue. The hawker case study on our site started at that scale.",
      category: "services",
      order: 2,
    },
    {
      id: "faq-pos-compatibility",
      q: "What POS systems do you support?",
      a: "We deploy StoreHub and Slurp as our primary POS partners and can integrate with most existing systems via their APIs. For legacy cash-register setups, we typically recommend a fresh install.",
      category: "services",
      order: 3,
    },
    {
      id: "faq-pos-integration",
      q: "Can you integrate my existing POS with GrabFood and Foodpanda?",
      a: "In most cases, yes — direct integration eliminates the double-entry that kills margin on busy nights. Book a consultation and we'll do a compatibility check on your current stack.",
      category: "services",
      order: 4,
    },
    {
      id: "faq-pricing",
      q: "How much does a typical campaign cost?",
      a: "Marketing retainers start at RM3,500/month. POS hardware + setup starts at RM4,500 one-off plus a monthly support fee. All engagements include a free 30-minute consultation first.",
      category: "pricing",
      order: 5,
    },
  ];
  for (const f of faqs) {
    await client.createOrReplace({
      _id: f.id,
      _type: "faq",
      question: locString(f.q),
      answer: locPortable([f.a]),
      category: f.category,
      order: f.order,
    });
  }

  console.log("→ Seeding jobs...");
  await client.createOrReplace({
    _id: "job-digital-marketing-executive",
    _type: "job",
    title: locString(
      "Digital Marketing Executive",
      "数字营销专员",
      "Eksekutif Pemasaran Digital"
    ),
    slug: slug("digital-marketing-executive"),
    department: "Growth",
    location: "Kuala Lumpur (hybrid)",
    type: "full-time",
    description: locPortable([
      "Run day-to-day campaign execution on GrabFood and Foodpanda for our portfolio clients. You'll own budget pacing, creative iteration, and monthly performance reports.",
    ]),
    responsibilities: locText(
      "Own weekly ads reporting across 6-8 client accounts.\nManage voucher and promo calendars for seasonal pushes (CNY, Raya, Deepavali, MDCC).\nCoordinate menu photography shoots with our production partner.\nSpot underperforming listings and propose rework plans."
    ),
    requirements: locText(
      "1-3 years running performance marketing, ideally in F&B or retail.\nFluent in English and either BM or Mandarin — you'll work with Malaysian operators daily.\nComfortable with GrabFood Merchant Portal and Foodpanda Partner Portal.\nBonus: experience with looker / data studio for client reporting."
    ),
    active: true,
  });
  await client.createOrReplace({
    _id: "job-pos-implementation-specialist",
    _type: "job",
    title: locString(
      "POS Implementation Specialist",
      "POS 实施专员",
      "Pakar Pelaksanaan POS"
    ),
    slug: slug("pos-implementation-specialist"),
    department: "Delivery",
    location: "Klang Valley (on-site required)",
    type: "full-time",
    description: locPortable([
      "Install and configure POS hardware for new clients across the Klang Valley. You'll spend 60-70% of your time on client sites training staff and fine-tuning setups.",
    ]),
    responsibilities: locText(
      "Full installs of StoreHub / Slurp hardware and software (1-3 days per client).\nOn-site staff training for cashiers and kitchen crew.\nFirst-line support for clients in their first 60 days post-install.\nLiaise with GrabFood and Foodpanda integration teams."
    ),
    requirements: locText(
      "2+ years in POS implementation, F&B operations, or tech support in restaurants.\nDriving licence and own transport (client-site work across the Valley).\nPatient, clear communicator — you're teaching 50-year-old aunties and uncles new tech daily.\nFluency in English and BM required; Mandarin is a big plus."
    ),
    active: true,
  });

  console.log("✓ Seed complete.");
}

main().catch((err) => {
  console.error("✗ Seed failed:", err);
  process.exit(1);
});
