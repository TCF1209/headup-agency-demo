# Head Up Agency — Website Project Brief

> **For:** Claude Code implementation
> **Client:** Head Up Agency
> **Built by:** DuoCode Technology
> **Version:** 1.0

---

## 1. Project Overview

Build a **full-featured, multilingual marketing website** for Head Up Agency — a Malaysia-based growth agency helping F&B businesses scale online. The site must convert F&B business owners (cafe, cloud kitchen, hawker, restaurant operators) into consultation bookings and inquiries.

**Primary goals:**
1. **Lead generation** — maximize form submissions (inquiry + consultation booking)
2. **Credibility signaling** — case studies and testimonials to build trust
3. **Multilingual reach** — EN / ZH / MS (Malaysia's three primary business languages)
4. **SEM-ready** — fully instrumented analytics for future Google/Meta ad campaigns
5. **CMS-managed content** — client can update blog, case studies, team, jobs without developer involvement

---

## 2. Tech Stack (Non-negotiable)

| Layer | Technology | Notes |
|---|---|---|
| Framework | **Next.js 15 (App Router)** | Server components by default, use client only when needed |
| Language | **TypeScript** (strict mode) | No `any` unless unavoidable |
| Styling | **Tailwind CSS v4** | Use CSS variables for theme tokens |
| UI Components | **Shadcn/UI** | Copy components in via CLI; don't wrap in abstractions |
| Animation | **Framer Motion** | Subtle only — fade/slide/stagger; NO parallax, NO magnetic buttons |
| i18n | **next-intl** | Sub-path routing (`/en`, `/zh`, `/ms`) |
| CMS | **Sanity** | Hosted, free tier, with document-level i18n |
| Booking | **Cal.com embed** | Use `@calcom/embed-react` |
| Email | **Resend + React Email** | For form notification delivery |
| Forms | **React Hook Form + Zod** | Validation, typed schemas |
| Analytics | **GA4 + Google Tag Manager + Meta Pixel** | GTM is the container; all tags load through it |
| Deployment | **Vercel** (Pro plan) | Commercial use compliant |
| Image optimization | **Next.js Image + Sanity CDN** | Use Sanity's image pipeline for CMS-sourced images |

**DO NOT add:**
- Redux / Zustand (use React state + URL state)
- Styled Components / Emotion (Tailwind only)
- Moment.js (use `date-fns`)
- Axios (use native `fetch`)
- Any animation library other than Framer Motion

---

## 3. Design System

### 3.1 Design Direction

**Clean Corporate Trust** — inspired by Stripe, Linear, Vercel. The feeling we want a cafe owner or cloud kitchen operator to have within 3 seconds: *"这家 agency 看起来很可靠。"*

**Core principles:**
- Content first, animation second
- Generous whitespace
- Clear typographic hierarchy
- No visual noise — every element earns its place
- Mobile-first, but desktop should feel equally intentional

### 3.2 Color Palette

Define these as CSS variables in `globals.css` and expose via Tailwind theme:

```css
:root {
  /* Brand - monochrome base echoing the logo */
  --color-ink: #1A1A1A;           /* Primary dark — headings, CTAs, footer */
  --color-ink-soft: #404040;      /* Body text */
  --color-muted: #737373;         /* Secondary text, metadata */
  --color-border: #E5E5E5;        /* Dividers, card borders */

  /* Backgrounds */
  --color-bg: #FAFAF7;            /* Page background — warm off-white */
  --color-surface: #FFFFFF;       /* Cards, modals */
  --color-surface-alt: #F5F5F2;   /* Alternating sections */

  /* Accent — warm amber (F&B association, differentiates from Grab green / Foodpanda pink) */
  --color-accent: #D97706;        /* Primary CTA, links, hover accents */
  --color-accent-hover: #B45309;  /* Darker on hover */
  --color-accent-soft: #FEF3C7;   /* Accent background tint */

  /* Semantic */
  --color-success: #059669;
  --color-error: #DC2626;
  --color-warning: #D97706;
}
```

### 3.3 Typography

- **Display / Headings:** `Inter` (weight 600–700), tight letter-spacing on large sizes (`tracking-tight`)
- **Body:** `Inter` (weight 400–500)
- Load via `next/font/google` with `display: swap`
- Type scale:
  - H1: `text-5xl md:text-6xl lg:text-7xl`, `font-semibold`, `tracking-tight`
  - H2: `text-3xl md:text-4xl lg:text-5xl`, `font-semibold`, `tracking-tight`
  - H3: `text-2xl md:text-3xl`, `font-semibold`
  - Body: `text-base md:text-lg`, `leading-relaxed`
  - Small: `text-sm`, `text-muted`

### 3.4 Spacing & Layout

- Section vertical padding: `py-16 md:py-24 lg:py-32`
- Container: `max-w-7xl mx-auto px-4 md:px-6 lg:px-8`
- Grid gaps: `gap-6 md:gap-8 lg:gap-12`
- Border radius: `rounded-lg` (8px) default, `rounded-2xl` (16px) for cards

### 3.5 Animation Rules (Moderate — Present, Not Overbearing)

Animation is a **required part of the experience**, not optional polish. The site should feel alive without being distracting. Use **Framer Motion** throughout.

**Required animations:**

- **Section reveal on scroll** — every major section uses `<FadeIn>` wrapper: 24px upward translate + fade, 0.6s duration, `ease-out`, triggered at 15% viewport intersection, `viewport={{ once: true }}`
- **Staggered children** — card grids, list items, nav items: 0.08s delay between siblings using `staggerChildren`
- **Hero entrance** — on initial load, hero headline, sub-headline, CTAs animate in sequentially (250ms between each) with fade + 16px up
- **Number counters** — case study metrics ("+180% orders", "40% cost reduction") animate from 0 to target value over 1.2s when scrolled into view (use `useMotionValue` + `useTransform`)
- **Underline draw** — primary nav links and in-text links animate an underline left-to-right on hover (0.25s)
- **Button hover** — primary buttons: subtle scale (1.0 → 1.02) + background shift, 0.2s
- **Card hover** — case study cards and service cards: lift 4px + soft shadow bloom, 0.25s
- **Page transitions** — 0.35s fade + 8px translate between route changes (use App Router's `loading.tsx` + layout animation)
- **Image reveal** — large content images use clip-path reveal on scroll-into-view (0.8s, `ease-out`)
- **Accordion (FAQ)** — smooth height + opacity animation, 0.3s
- **Mobile menu drawer** — slide-in from right, 0.3s, spring physics (`stiffness: 300, damping: 30`)
- **Form submit success** — checkmark SVG path draws in (0.5s) + fade in the thank-you message
- **Scroll progress indicator** — thin amber bar at top of viewport on long pages (case studies, blog posts)

**Stack-specific:**
- Marquee strip of partner logos in footer / trust section (slow, infinite, pauses on hover)
- Floating WhatsApp button (bottom-right, mobile + desktop) with gentle pulse animation every 4 seconds

**Still forbidden (these are the "AI-generated" tells):**
- Magnetic cursor / cursor followers
- Text-splitting character-by-character reveals (the classic over-done animation)
- 3D tilt / perspective transforms
- Scroll-hijacking (slowing or taking over native scroll)
- Parallax on hero images (cheesy)
- Blur-to-focus transitions
- Gradient text animations

**Performance:**
- Respect `prefers-reduced-motion` — wrap all non-essential animations in a check that disables them
- Use `will-change` sparingly and only on currently-animating elements
- Animate `transform` and `opacity` only — never `width`, `height`, `top`, `left`, or box-shadow directly (use filter or layered elements)

Create reusable motion primitives in `components/motion/`:
- `<FadeIn>` — default section reveal
- `<StaggerContainer>` + `<StaggerItem>` — list animations
- `<CountUp>` — number counter
- `<UnderlineLink>` — draw-underline link

---

### 3.6 Modern, Not AI-Generated (CRITICAL)

This is the **most important design directive**. The client explicitly does not want a site that looks "AI-generated." Claude Code must actively resist the default patterns that make LLM-generated sites recognizable.

**Anti-patterns to AVOID (the AI-generated "tells"):**

❌ **Perfectly centered hero** — big headline + subheadline + two buttons all center-aligned, perfectly symmetric. This is the #1 AI tell.
❌ **Purple/blue/indigo gradient backgrounds** — the stereotypical "AI product site" look. Stay with our defined warm monochrome + amber palette.
❌ **Generic 3 or 4-column icon card grid** — "Feature 1 / Feature 2 / Feature 3" all the same width, same icon size, same copy length. Boring and AI-default.
❌ **Every section `py-20` with the same vertical rhythm** — sections need different densities to create visual narrative.
❌ **Glassmorphism everywhere** — `backdrop-blur` and translucent cards stacked on gradients. One instance MAX, used intentionally.
❌ **"Supercharge your X" / "Unlock the future of Y" headline copy** — this kind of empty SaaS-speak screams AI. Write human, specific, Malaysian-F&B-specific copy.
❌ **All cards look identical** — same border radius, same shadow, same padding, same aspect ratio. Introduce intentional variation.
❌ **Over-reliance on emoji in UI** — no emoji in body content or buttons. Lucide icons only, and used sparingly.
❌ **Lorem-ipsum-style placeholder tone** — even for placeholder content, write in specific voice (e.g., "A Bangsar cafe that went from 40 orders/day to 180 in 90 days" — NOT "Amazing results for this great client").
❌ **Stock AI illustrations** (the isometric characters, the abstract flowing shapes). Use real photography only.
❌ **Symmetric 50/50 two-column hero** — the text-left / image-right default. Offset the image, vary the column widths (60/40, 55/45), add framing elements.

**PRO-patterns to ACTIVELY DO (modern, human-designed feel):**

✅ **Asymmetric hero layout** — left-align the H1, let it be oversized and slightly overflow the container on desktop (`ml-[-1rem]` or similar). Image positioned off-axis, with deliberate whitespace negative space.
✅ **Editorial typography hierarchy** — don't be afraid of H1 at `text-7xl` or `text-8xl` on desktop. Mix weights (light 300 body + semibold 600 display for contrast).
✅ **Intentional use of ruled lines** — thin `border-t border-ink/10` divider lines at section tops with a label ("01 / Services") in the corner, magazine-style.
✅ **Numbered sections** — use `01`, `02`, `03` labels (monospace font like `JetBrains Mono` or `IBM Plex Mono`) to anchor sections. This is a strong "editorial" signal.
✅ **Varied card sizes in grids** — in case study grid, one featured card can be 2× the size of others (bento-style layout). Not everything needs to be uniform.
✅ **Sharp corners in some places** — don't make every surface `rounded-2xl`. Hero image can be sharp-edged. Footer can be sharp-edged. Reserve rounded for interactive elements.
✅ **Real content density** — paragraphs should be substantial, headers should be specific. A modern site reads like a well-designed magazine, not a brochure.
✅ **Small typographic details** — use `tabular-nums` for metrics, `font-mono` for labels, small-caps for category tags (`text-xs tracking-widest uppercase`).
✅ **Directional energy** — let elements break alignment intentionally. A headline overflowing right, a photo bleeding off the left edge, an aside indented deeper than the main column.
✅ **Generous but uneven whitespace** — some sections breathe (`py-40`), some are tight (`py-16`). Creates rhythm.
✅ **One unexpected detail per page** — a rotating badge, a scribbled underline under a key word, a hand-drawn arrow pointing to a stat. Something that says "a human made this."

**Copywriting voice (avoid AI-sounding copy):**
- Write like a Malaysian growth marketer talking to a cafe owner friend, not like a SaaS company.
- Use specific numbers where possible ("180+ orders/day", not "massive growth").
- Use local context ("CNY, Raya, Deepavali campaigns" — not generic "holiday campaigns").
- Short sentences mixed with longer ones. Vary rhythm.
- Avoid the tri-colon construction ("We help you grow, scale, and succeed") — the ultimate AI pattern.

---

### 3.7 Reference Sites (Design Mood Board)

Claude Code should study these sites' layout, typography, and rhythm before generating any page:

**Primary references (closest to the target vibe):**

1. **Linear** (`linear.app`) — the hero typography, the monospace section labels, the restrained animation. Study how they use negative space.
2. **Vercel** (`vercel.com`) — clean monochrome with a single accent, sharp section transitions, editorial treatment of content.
3. **Stripe** (`stripe.com`) — trustworthy corporate feel, sophisticated but not cold. Study their case study pages specifically.
4. **Rauno Freiberg's personal site** (`rauno.me`) — how asymmetry and small typographic details create a "designed, not generated" feel.

**Secondary references (for specific patterns):**

5. **Attio** (`attio.com`) — case study / customer story pages. The way they present metrics.
6. **Arc browser website** (`arc.net`) — modern editorial feel, daring typography choices.
7. **Basecamp** (`basecamp.com`) — honest, human copywriting. Strong example of NOT sounding AI-generated.
8. **Posthog** (`posthog.com`) — bold but not gimmicky design, good humor in copy.

**What to extract from each:**
- Linear → typography scale + monospace labels + animation restraint
- Vercel → layout rhythm + dark section transitions
- Stripe → case study structure + credibility signals
- Attio → metrics display + customer story format
- Basecamp → copywriting voice

**What NOT to copy:**
- Linear's dark mode (we're light mode by default)
- Vercel's gradient mesh backgrounds (avoid per section 3.6)
- Any company mascot / illustration styles

---

### 3.8 Responsive Design (Phone + Laptop First-Class)

The site must feel **equally intentional** on mobile and desktop — not a desktop-first layout with a mobile stack as an afterthought.

**Breakpoints (Tailwind defaults, but used intentionally):**
- Mobile: 320px – 639px (`default`)
- Tablet: 640px – 1023px (`sm:` / `md:`)
- Desktop: 1024px+ (`lg:`)
- Large desktop: 1280px+ (`xl:`)
- Ultra-wide: 1536px+ (`2xl:`) — cap layouts at `max-w-7xl`

**Mobile-specific requirements:**

- **Touch targets:** Minimum 44×44px for all interactive elements (WCAG AAA). Buttons: `min-h-11 min-w-11` Tailwind utilities or `py-3 px-5` minimum.
- **Tap feedback:** All buttons and cards have active states (`active:scale-[0.98]` or background shift) — phones don't have hover so active feedback is critical.
- **Sticky mobile CTA bar:** On pages where booking is the goal (home, services, solutions, case study detail), a thin sticky bar at the bottom of mobile viewport with "Book Consultation" (amber) + WhatsApp icon. Auto-hides on scroll down, shows on scroll up. Desktop does not show this.
- **Floating WhatsApp button:** Bottom-right on mobile, 56×56 circular, amber background with WhatsApp icon. Also visible on desktop but positioned differently.
- **Mobile nav:** Hamburger → full-screen slide-in drawer (not half-width). Includes nav links, language switcher, CTAs, and social icons. Closes on link tap.
- **Hero on mobile:** H1 scales down appropriately (`text-4xl sm:text-5xl md:text-6xl lg:text-7xl`). Image moves below text, full-width, rounded-2xl top corners only.
- **Forms on mobile:** Inputs are 48px min height, font-size 16px minimum (prevents iOS zoom on focus). Labels above inputs, not inline.
- **Text sizing:** Body text 16px minimum on mobile for readability.

**Tablet-specific:**

- Tablet (640–1023px) must have its own layout consideration — NOT just "mobile but wider" or "desktop but narrower."
- Case study grid: 2 columns on tablet, 3 on desktop, 1 on mobile.
- Services sub-service cards: 2×2 grid on tablet, maintains 2×2 on desktop with more space.
- Header nav: condensed text nav visible on tablet (hides at mobile), full with CTAs on desktop.

**Desktop-specific:**

- Utilize wider canvas for asymmetric layouts described in 3.6.
- Case study detail: use a two-column layout (main content + sticky sidebar with CTA / table of contents).
- Hover states fully active.
- Cursor changes on interactive elements (`cursor-pointer` where appropriate).

**Cross-device quality bar:**

- Test on: iPhone SE (375px — smallest realistic mobile), iPhone 14 Pro (393px), iPad Mini (768px), MacBook Air 13" (1280px), MacBook Pro 16" (1728px).
- No horizontal scrolling at any breakpoint.
- No tiny unreadable text at any breakpoint.
- Images never pixelate — always serve 2x variants for retina displays via `next/image`.
- All forms submittable with on-screen keyboard visible (no fixed elements blocking submit button on mobile).
- Language switcher accessible in mobile nav (not hidden).

**Responsive images:**
- Use `next/image` with explicit `sizes` attribute on every image.
- Hero images: `sizes="(max-width: 768px) 100vw, (max-width: 1280px) 80vw, 1200px"`
- Card images: `sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"`
- Priority load hero images (`priority` prop), lazy load everything else.

---

## 4. Site Architecture

### 4.1 URL Structure

```
/                            → redirect to /en (default locale)
/[locale]/                   → Home
/[locale]/services           → Services
/[locale]/solutions          → Case Studies grid
/[locale]/solutions/[slug]   → Case Study detail
/[locale]/book               → Book a Consultation
/[locale]/careers            → Careers
/[locale]/careers/[slug]     → Job detail (optional, can use modal instead)
/[locale]/partners           → Partner with Us
/[locale]/blog               → Blog index (from Sanity)
/[locale]/blog/[slug]        → Blog post detail
```

Where `[locale]` ∈ `{ en, zh, ms }`.

### 4.2 Global Elements

**Header (sticky, transparent on hero → solid on scroll):**
- Logo (left)
- Nav: Home · Services · Solutions · Careers · Partners · Blog
- Language switcher (globe icon dropdown: EN / 中文 / BM)
- "Book Consultation" primary CTA button (amber accent)
- Mobile: hamburger → slide-in drawer

**Footer (dark — `--color-ink` background, white text):**
- Company blurb (50–80 words) + Head Up logo
- Column 1: Services links
- Column 2: Company (About, Careers, Partners, Blog)
- Column 3: Contact (email, WhatsApp button, address placeholder)
- Column 4: Newsletter signup (email input, stores to Sanity or simple submission)
- Bottom bar: Copyright · Privacy · Terms · Social icons (IG, FB, LinkedIn)

---

## 5. Page-by-Page Specifications

### 5.1 Home Page (`/[locale]/`)

**Section 1 — Hero**
- Full-viewport height, off-white background
- H1: "We Help F&B Businesses Grow Online." (ZH: "我们帮助餐饮业线上增长。" MS: "Kami Membantu Perniagaan F&B Berkembang Dalam Talian.")
- Sub-headline: One sentence on how (GrabFood marketing + POS solutions)
- Two CTAs: **"Book a Consultation"** (primary, amber) + **"See Our Work"** (ghost, links to /solutions)
- Subtle visual: consultation.jpg on right (desktop) or bottom (mobile), rounded-2xl, slight drop shadow
- Trust row below CTA: "Trusted by 50+ F&B businesses across Klang Valley" + small partner logo strip (Grab, Foodpanda logos — use grabfood.png and foodpanda.jpg)

**Section 2 — Services Overview**
- Two-column grid (stacks on mobile)
- Left card: **GrabFood / Foodpanda Marketing** — icon, 2-line description, "Learn more →" link
- Right card: **POS System Solutions** — icon, 2-line description, "Learn more →" link
- Both cards link to respective anchor on `/services`

**Section 3 — How We Work (Process)**
- 4-step numbered grid: Discover → Strategize → Execute → Optimize
- Each step: number (large amber numeral), title, 1-sentence description
- Minimal icons or none — let typography carry it

**Section 4 — Case Study Highlights**
- "Results that speak for themselves" header
- 3-card grid showing top case studies (pulled from Sanity, `featured: true`)
- Each card: image (cafe.jpg / cloud-kitchen.jpg / hawker.jpg), category tag, title, one key metric (e.g., "+180% GrabFood orders in 3 months")
- "View all case studies →" link to `/solutions`

**Section 5 — Testimonials**
- 3-column grid (single carousel on mobile) of quote cards
- Each: quote, client name, business name, avatar or business logo
- From Sanity `testimonial` collection

**Section 6 — Final CTA Banner**
- Dark background (`--color-ink`)
- H2: "Ready to grow your F&B business?"
- Two CTAs: "Book Consultation" + "Send Inquiry"

---

### 5.2 Services Page (`/[locale]/services`)

**Section 1 — Page header**
- Breadcrumb
- H1 + short intro paragraph

**Section 2 — Service 1: GrabFood / Foodpanda Marketing**
- Two-column: image (grabfood.png / foodpanda.jpg side-by-side collage) + content
- H2: GrabFood & Foodpanda Marketing
- Sub-services (4 cards in a 2×2 grid):
  1. **Store Setup & Optimization** — Menu photography, descriptions, pricing strategy designed for delivery platform conversion
  2. **Ads Management** — In-app ads, audience targeting, budget optimization across both platforms
  3. **Promotion & Campaign Planning** — Voucher strategy, seasonal campaigns, festive pushes (CNY, Raya, Deepavali)
  4. **Performance Analytics** — Monthly reports, ROI tracking, actionable insights

**Section 3 — Service 2: POS System Solutions**
- Two-column: image (pos-v2.jpg) + content
- H2: POS System Solutions
- Sub-services (4 cards):
  1. **POS Hardware & Software Setup** — Installation, configuration, full staff training
  2. **Menu & Inventory Management** — Digital menu sync, real-time stock tracking
  3. **Integration Services** — Connect GrabFood/Foodpanda orders directly to your POS — no more double entry
  4. **Ongoing Support & Maintenance** — Hotline support, updates, troubleshooting

**Section 4 — FAQ**
- Accordion (use Shadcn `Accordion` component)
- 8–10 common questions. Content stored in Sanity `faq` collection so client can add/edit
- Seed content for developer (English; translator fills ZH/MS):
  1. How long until I see results from GrabFood marketing?
  2. Do you work with small hawker stalls or only established restaurants?
  3. What POS systems do you support?
  4. Can you integrate my existing POS with GrabFood and Foodpanda?
  5. How much does a typical campaign cost?
  6. Do you handle the photography for my menu?
  7. What areas in Malaysia do you serve?
  8. How do I track the ROI of my campaigns?

**Section 5 — CTA Banner** (same as home's final CTA)

---

### 5.3 Solutions / Case Studies (`/[locale]/solutions`)

**Index page:**
- Hero: H1 "Real Results for Real F&B Businesses" + intro paragraph
- Filter bar: category chips (All / Cafe / Cloud Kitchen / Hawker / Restaurant)
- Grid of case study cards (3 cols desktop, 2 tablet, 1 mobile)
- Each card: cover image, category tag, business type, title, 1-line result highlight, hover state lifts slightly
- Clicking card → `/solutions/[slug]`

**Detail page (`/[locale]/solutions/[slug]`):**
- Hero image (full-bleed) + category tag + title + client name
- Quick stats bar: 3 key metrics (e.g., "+180% Orders" / "3 Months" / "40% Cost Reduction")
- **Problem section:** H2 "The Challenge" + body text
- **Solution section:** H2 "Our Approach" + body text + bullet list of what was done
- **Results section:** H2 "The Outcome" + body text + metrics visualization (simple stat cards, no charts needed)
- **Video section:** embedded YouTube/Vimeo player (from Sanity `videoUrl` field) + short caption
- **Testimonial block:** pull quote from the client
- **Related case studies:** 3 cards at bottom
- **CTA:** "Want results like these? Book a consultation →"

**Seed 3 case studies (for developer/Sanity):**
1. **Cafe** — use `cafe.jpg` — "Boosting Weekday Orders for a Boutique Cafe in Bangsar"
2. **Cloud Kitchen** — use `cloud-kitchen.jpg` — "Scaling a Cloud Kitchen from 1 to 4 Brands on GrabFood"
3. **Hawker** — use `hawker.jpg` — "Digitizing a Hawker Stall: POS + Delivery in 30 Days"

---

### 5.4 Book a Sales Consultant (`/[locale]/book`)

**Layout: 2-column (stacks on mobile)**

**Left column — Content:**
- H1: "Book Your Free 30-Min Consultation"
- Short paragraph on what to expect
- 3 bullet points: what they'll walk away with
- Testimonial quote
- Image: `consultation-2.jpg`

**Right column — Cal.com embed:**
- Use `@calcom/embed-react` `<Cal>` component
- Inline embed, `layout="month_view"`
- Calendar link: `calLink` stored in env var `NEXT_PUBLIC_CAL_LINK` (placeholder: `headupagency/consultation`)
- Styling: pass `cssVarsPerTheme` to match site palette (ink for primary, accent for highlights)
- On booking success → redirect to `/[locale]/book/confirmed` with success message + what's next

---

### 5.5 Careers (`/[locale]/careers`)

**Section 1 — Culture hero**
- H1: "Grow With Us"
- Intro paragraph
- Team photo collage (use `team-01.jpg`, `team-02.jpg`, `team-03.jpg` in an overlapping masonry layout)

**Section 2 — Values (4 cards)**
- Example values (finalize with client): Impact-driven · Client-obsessed · Always learning · Team first
- Each card: icon (use Lucide), title, 2-line description

**Section 3 — Open Positions**
- Pulled from Sanity `job` collection
- Accordion or card list
- Each job: title, department, location, type (full-time / part-time / intern), short description, "Apply" button
- Click Apply → opens slide-in drawer or modal with application form

**Section 4 — Application Form (modal/drawer, triggered from job card)**
Fields:
- Full name (required)
- Email (required)
- Phone (required)
- Position applying for (pre-filled, locked)
- LinkedIn URL (optional)
- Cover letter / message (textarea, required)
- **Resume upload** (PDF/DOC/DOCX, max 5MB) — use `react-dropzone`, upload to Sanity Assets or Vercel Blob Storage
- Submit button

On submit: email to Head Up + wa.me trigger with summary + "Thank you" confirmation.

---

### 5.6 Partner with Us (`/[locale]/partners`)

**Section 1 — Hero**
- H1: "Become an Authorised Partner"
- Intro paragraph on partnership benefits
- Image: `handshake.jpg`

**Section 2 — Partnership Types**
- 3 cards: POS Hardware Partner · Marketing Channel Partner · Strategic Referral Partner
- Each with benefits bullet list

**Section 3 — Benefits Grid (6 cards)**
- Revenue sharing · Co-marketing · Training & certification · Priority support · White-label options · Exclusive territories

**Section 4 — Application Form**
Fields:
- Company name
- Contact person name
- Email
- Phone
- Partnership type (dropdown)
- Company website
- Brief description of your business (textarea)
- Why you want to partner (textarea)
- Submit

Same submission flow (email + wa.me + thank-you).

**Section 5 — Existing partners section** (optional if no logos yet)
- "Proud to work with" — horizontal logo strip

---

### 5.7 Blog (`/[locale]/blog`)

- Index: grid of posts (cover image, category, title, excerpt, date, author)
- Detail: typography-focused article layout, Sanity Portable Text renderer
- Categories pulled from Sanity
- Related posts at bottom

---

## 6. Sanity CMS Schema

Define these document types in `sanity/schemas/`:

### 6.1 `siteSettings` (singleton)
- title, description
- logo (image)
- contactEmail, whatsappNumber
- socialLinks (IG, FB, LinkedIn)
- footerBlurb (localized string)

### 6.2 `caseStudy`
- title (localized)
- slug
- client (string)
- category (reference → `category`)
- coverImage
- featured (boolean)
- quickStats (array of { label, value })
- problem (localized portable text)
- solution (localized portable text)
- results (localized portable text)
- metrics (array of { label, value })
- videoUrl (url)
- testimonial (reference → `testimonial`)
- publishedAt (datetime)

### 6.3 `category`
- name (localized)
- slug

### 6.4 `testimonial`
- quote (localized)
- authorName
- authorTitle
- businessName
- avatar (image)

### 6.5 `job`
- title (localized)
- slug
- department
- location
- type (enum: full-time / part-time / intern / contract)
- description (localized portable text)
- responsibilities (localized array)
- requirements (localized array)
- active (boolean)

### 6.6 `faq`
- question (localized)
- answer (localized portable text)
- category (services / pricing / general)
- order (number)

### 6.7 `blogPost`
- title (localized)
- slug
- excerpt (localized)
- coverImage
- author (reference → `author`)
- category
- body (localized portable text)
- publishedAt

### 6.8 `author`
- name
- role
- avatar
- bio (localized)

### 6.9 `teamMember`
- name
- role
- photo
- order

### 6.10 `value`
- title (localized)
- description (localized)
- icon (string — Lucide icon name)

**Localization setup:** Use Sanity's `internationalizedArray` plugin or field-level `{ en, zh, ms }` objects. Pick whichever the Sanity Studio UI handles most cleanly — Studio UX matters because the client will be using it.

---

## 7. Internationalization (next-intl)

### 7.1 Setup
- `messages/en.json`, `messages/zh.json`, `messages/ms.json`
- Middleware for locale detection and routing
- `[locale]` dynamic segment in app directory
- Language switcher preserves current path when switching locales

### 7.2 Content Strategy
- **UI strings** (nav, buttons, form labels, error messages) → `messages/*.json`
- **CMS content** (case studies, blog, jobs, FAQ) → Sanity's i18n fields
- **Static copy** (service descriptions, hero text) → Either approach; prefer `messages/*.json` for ease

### 7.3 SEO Requirements per locale
- `<html lang="...">` reflects current locale
- `hreflang` tags on every page pointing to all language variants
- Locale-aware sitemap
- Locale-aware canonical URLs

### 7.4 Typography note
- Chinese text needs slightly different `leading-relaxed` adjustments — test with actual content
- Provide fallback font stack that includes `"PingFang SC", "Microsoft YaHei", sans-serif` for ZH and standard sans for MS

---

## 8. Forms & Submissions

### 8.1 Form Architecture

All forms use **React Hook Form + Zod** for validation. Create typed schemas in `lib/schemas/`.

**Forms to build:**
1. **Inquiry form** (home/services/footer CTA) — name, email, phone, business name, message
2. **Booking confirmation** — handled by Cal.com, we just track the event
3. **Career application** — as specified in 5.5
4. **Partner application** — as specified in 5.6
5. **Newsletter** (footer) — email only
6. **Contact** (if a dedicated /contact page is added later)

### 8.2 Submission Flow (CRITICAL)

On form submit, run **in parallel**:

**(a) Email notification** — via Resend API
- Send to: `hello@headupagency.com` (env var `CONTACT_EMAIL`)
- From: `noreply@headupagency.com` (verified Resend domain)
- Template: React Email component, nicely formatted
- Include all form fields + submission timestamp + locale + referrer URL
- Subject line pattern: `[Head Up] New {formType} — {name/company}`

**(b) WhatsApp delivery** — via `wa.me` link
- Generate URL: `https://wa.me/{WHATSAPP_NUMBER}?text={encodedMessage}`
- Env var: `NEXT_PUBLIC_WHATSAPP_NUMBER` (placeholder: `60123456789` — no `+`, no spaces, no dashes)
- Pre-filled message format (plain text, one field per line):
  ```
  🔔 New Inquiry from headupagency.com
  
  Name: {name}
  Email: {email}
  Phone: {phone}
  Business: {businessName}
  
  Message:
  {message}
  
  —
  Submitted via website ({locale})
  ```
- On submit success: `window.open(waLink, '_blank')` to launch WhatsApp
- This is a UX decision: user has already submitted; opening WhatsApp is a bonus touch

**(c) Thank-you state**
- Inline replacement of form (no page navigation): success checkmark, message, "Send another" link
- Track conversion event to GA4/GTM (see section 10)

### 8.3 File Upload (Career resume)
- Accept: `.pdf`, `.doc`, `.docx`
- Max size: 5 MB (client-side validated + server enforced)
- Upload destination: **Vercel Blob Storage** (simpler than Sanity Assets for this use case)
- Include signed URL in email notification to Head Up

### 8.4 Spam Protection
- **Cloudflare Turnstile** on all public forms (better than reCAPTCHA for this market, no Google dependency)
- Honeypot field as secondary defense
- Rate limit by IP in the API route (Upstash Redis or simple in-memory for MVP)

---

## 9. SEO

### 9.1 Metadata
- Implement `generateMetadata` in every page route
- Per-locale `title`, `description`
- Open Graph + Twitter Card images for every page (1200×630)
- JSON-LD structured data:
  - `Organization` on all pages (in root layout)
  - `LocalBusiness` on homepage with Malaysia address
  - `Article` on blog posts
  - `FAQPage` on services page (from FAQ section)
  - `BreadcrumbList` on all deep pages

### 9.2 Sitemap & Robots
- Dynamic `sitemap.ts` — include all locales, all case studies, all blog posts, all job listings
- `robots.ts` — allow all, reference sitemap

### 9.3 Performance (Core Web Vitals targets)
- LCP < 2.5s
- CLS < 0.1
- INP < 200ms
- Lighthouse score ≥ 90 on all categories
- All images via `next/image` with proper `sizes` attribute
- Font preload for Inter
- No client-side JavaScript for static content — leverage server components aggressively

### 9.4 Content SEO
- Ensure H1 is unique per page
- Image alt text mandatory (pull from Sanity `alt` field or fallback)
- Internal linking between case studies, services, and related blog posts

---

## 10. Analytics & Tracking

### 10.1 GTM Setup
- Install GTM container in root layout (use `@next/third-parties/google`'s `GoogleTagManager`)
- Container ID in env: `NEXT_PUBLIC_GTM_ID`
- All other tags (GA4, Meta Pixel, Google Ads conversion) load through GTM — do NOT install them as separate scripts

### 10.2 Events to Track (via `dataLayer.push`)
Create a typed helper: `lib/analytics.ts` with functions like `trackEvent(name, params)`.

**Events:**
- `page_view` — automatic via GTM
- `inquiry_submit` — from any inquiry form { form_location, locale }
- `booking_started` — when Cal.com embed loads and user interacts
- `booking_confirmed` — when Cal.com fires confirmation event
- `career_application_submit` — { position, locale }
- `partner_application_submit` — { partnership_type, locale }
- `whatsapp_click` — any wa.me link click { source_location }
- `language_switch` — { from, to }
- `case_study_view` — { slug, category }
- `cta_click` — primary CTA tracking { cta_text, location }

### 10.3 Meta Pixel Events
Map the same events to Meta Pixel standard/custom events via GTM (for future Facebook/Instagram ad retargeting).

### 10.4 Consent
- Simple cookie banner (accept/reject non-essential)
- GA4 and Meta Pixel respect consent state via GTM consent mode v2

---

## 11. Assets

All client-supplied assets should live in `public/assets/`:

| Filename | Location | Purpose |
|---|---|---|
| `logo.png` | `public/logo.png` | Header, footer (also generate favicon) |
| `consultation.jpg` | Home hero right-side visual | |
| `consultation-2.jpg` | Book page left-column visual | |
| `cafe.jpg` | Case study: Cafe | |
| `cloud-kitchen.jpg` | Case study: Cloud Kitchen | |
| `hawker.jpg` | Case study: Hawker | |
| `handshake.jpg` | Partners page hero | |
| `foodpanda.jpg` | Services page: Foodpanda section | |
| `grabfood.png` | Services page: GrabFood section | |
| `pos-v2.jpg` | Services page: POS section | |
| `team-01.jpg`, `team-02.jpg`, `team-03.jpg` | Careers culture collage | |

**Processing:**
- Optimize all JPGs (target ~200KB for content images, ~80KB for avatars)
- Convert logo to SVG if possible; otherwise extract transparent PNG
- Generate favicon set (16, 32, 192, 512) + `apple-touch-icon.png`
- Consider generating a dark-background version of the logo for footer if needed

---

## 12. Environment Variables

Create `.env.example`:

```bash
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=

# Cal.com
NEXT_PUBLIC_CAL_LINK=headupagency/consultation

# Contact & Submissions
CONTACT_EMAIL=hello@headupagency.com
NEXT_PUBLIC_WHATSAPP_NUMBER=60123456789

# Resend
RESEND_API_KEY=
RESEND_FROM_EMAIL=noreply@headupagency.com

# Vercel Blob (resume uploads)
BLOB_READ_WRITE_TOKEN=

# Analytics
NEXT_PUBLIC_GTM_ID=

# Turnstile
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=

# Site
NEXT_PUBLIC_SITE_URL=https://headupagency.com
```

---

## 13. Project Structure

```
headup-agency/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx
│   │   ├── page.tsx                    # Home
│   │   ├── services/page.tsx
│   │   ├── solutions/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── book/page.tsx
│   │   ├── careers/page.tsx
│   │   ├── partners/page.tsx
│   │   ├── blog/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   └── not-found.tsx
│   ├── api/
│   │   ├── inquiry/route.ts
│   │   ├── application/route.ts
│   │   ├── partner/route.ts
│   │   └── upload/route.ts
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── ui/                              # Shadcn components
│   ├── layout/
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   └── language-switcher.tsx
│   ├── sections/                        # Reusable page sections
│   │   ├── hero.tsx
│   │   ├── services-overview.tsx
│   │   ├── testimonials.tsx
│   │   └── cta-banner.tsx
│   ├── forms/
│   │   ├── inquiry-form.tsx
│   │   ├── application-form.tsx
│   │   └── partner-form.tsx
│   ├── case-study/
│   │   ├── case-study-card.tsx
│   │   └── case-study-grid.tsx
│   └── motion/
│       └── fade-in.tsx                  # Reusable animation wrapper
├── lib/
│   ├── sanity/
│   │   ├── client.ts
│   │   ├── queries.ts
│   │   └── image.ts
│   ├── schemas/                         # Zod schemas
│   ├── analytics.ts
│   ├── email/
│   │   └── templates/                   # React Email templates
│   └── utils.ts
├── sanity/
│   ├── schemas/
│   └── sanity.config.ts
├── messages/
│   ├── en.json
│   ├── zh.json
│   └── ms.json
├── i18n.ts
├── middleware.ts
├── public/
│   └── assets/                          # All client images here
├── .env.example
├── next.config.ts
├── tailwind.config.ts
└── package.json
```

---

## 14. Build Order (Suggested Implementation Sequence)

1. **Scaffold** — Next.js 15, Tailwind, Shadcn init, fonts, base CSS vars
2. **i18n setup** — next-intl middleware, locale routing, basic messages
3. **Layout** — Header (with language switcher) + Footer
4. **Sanity** — spin up Studio, define schemas, seed dummy data for 3 case studies, 3 testimonials, 5 FAQs, 2 jobs
5. **Home page** — all sections, Sanity data integration, animations
6. **Services page** — with FAQ accordion
7. **Solutions** — index + detail pages
8. **Book page** — Cal.com embed integration
9. **Careers page** — including application form + resume upload
10. **Partners page** — including partner form
11. **Blog** — index + detail
12. **Forms backend** — API routes, Resend, wa.me, Turnstile
13. **SEO** — metadata, sitemap, robots, JSON-LD
14. **Analytics** — GTM, events
15. **Performance pass** — Lighthouse, image optimization, font loading
16. **Translation** — fill ZH and MS content (Head Up will provide final copy; seed with reasonable placeholder)
17. **QA** — cross-browser, mobile, form submissions end-to-end

---

## 15. Content Placeholders & Assumptions

Client hasn't finalized:
- Official company blurb / about text → use reasonable Malaysian F&B marketing agency placeholder
- Specific sub-service content → use the 4-per-service breakdown in section 5.2
- Team member names/roles → use "Team Member" placeholders with team photos
- Testimonial quotes → use believable placeholder testimonials from "Restaurant Owner — Cafe XYZ" style
- Case study details → use the 3 seeded scenarios; client provides final copy later
- Job listings → seed 2 placeholder roles (e.g., Digital Marketing Executive, POS Implementation Specialist)
- Contact email → `hello@headupagency.com` (placeholder)
- WhatsApp number → `60123456789` (placeholder)
- Cal.com calendar → `headupagency/consultation` (placeholder)

**All placeholders must be trivial to replace** — centralize in env vars, Sanity singletons, or one clearly-marked constants file.

---

## 16. Definition of Done

- [ ] All 7 pages render correctly in all 3 locales
- [ ] Header/footer consistent across all pages
- [ ] Language switcher preserves current path
- [ ] All forms submit successfully with email + wa.me + thank-you
- [ ] Resume upload works end-to-end
- [ ] Cal.com embed loads and can book a test slot
- [ ] Sanity Studio is accessible and client can edit all content types
- [ ] Lighthouse scores ≥ 90 (Performance, Accessibility, Best Practices, SEO) on key pages
- [ ] Mobile responsive from 320px upward, tested on iPhone SE, iPhone 14 Pro, iPad Mini, MacBook Air 13", MacBook Pro 16"
- [ ] No horizontal scrolling at any breakpoint
- [ ] All touch targets ≥ 44×44px on mobile
- [ ] Sticky mobile CTA bar functions correctly
- [ ] All required animations from section 3.5 are implemented and smooth
- [ ] `prefers-reduced-motion` is respected everywhere
- [ ] Site passes the "AI-generated test" — review against section 3.6 checklist before submitting (no centered-everything heroes, no gradient backgrounds, no generic icon grids, asymmetric layouts present, numbered section labels used)
- [ ] GTM fires `page_view` and at least one custom event (e.g., `inquiry_submit`)
- [ ] Sitemap includes all locales and dynamic routes
- [ ] `README.md` documents setup, env vars, Sanity Studio access, deployment steps
- [ ] Deployed to Vercel with environment variables configured

---

## 17. Open Questions for Client (Resolve Before Handoff)

1. Final WhatsApp Business number
2. Final contact email (`hello@headupagency.com` sounds right but confirm)
3. Cal.com account + meeting type URL
4. Verified domain for Resend sending
5. Final company blurb (50–80 words, EN + ZH + MS)
6. Real testimonials (at least 3) with client permission
7. Case study real details (problem/solution/metrics) for the 3 seeded scenarios
8. Team member names, roles, short bios for featured team on careers page
9. Current open job listings
10. Brand guideline doc if any (beyond logo)

---

*End of brief.*
