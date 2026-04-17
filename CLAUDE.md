# CLAUDE.md — headup_agency_demo

> **Project**: Head Up Agency — multilingual marketing website for a Malaysia-based F&B growth agency
> **Client**: Head Up Agency · **Built by**: DuoCode Technology
> **Initialized**: 2026-04-17

The authoritative specification for this project lives in **[`PROJECT_BRIEF.md`](./PROJECT_BRIEF.md)**. Read it before making any implementation decisions. This file summarizes operational rules; the brief is the source of truth for design, features, and scope.

---

## Tech Stack (non-negotiable — see brief §2)

- **Next.js 15** (App Router, server components by default)
- **TypeScript** (strict mode, no `any` unless unavoidable)
- **Tailwind CSS v4** with CSS variables
- **Shadcn/UI** (copy in via CLI, do not wrap)
- **Framer Motion** (the only animation library)
- **next-intl** for i18n (`/en`, `/zh`, `/ms`)
- **Sanity** CMS
- **Cal.com** via `@calcom/embed-react`
- **Resend + React Email** for transactional mail
- **React Hook Form + Zod** for forms
- **GA4 + GTM + Meta Pixel** (all tags loaded through GTM)
- **Vercel** for deployment

Forbidden: Redux/Zustand, Styled Components/Emotion, Moment.js, Axios, any non-Framer animation library.

---

## Project Structure (target — per brief §13)

```
app/[locale]/...         # Next.js app router pages
app/api/...              # Form submission endpoints
components/ui/           # Shadcn components
components/layout/       # Header, footer, language switcher
components/sections/     # Reusable page sections
components/forms/        # Form components
components/motion/       # Framer Motion primitives (FadeIn, StaggerContainer, CountUp, UnderlineLink)
lib/sanity/              # Sanity client, queries, image helpers
lib/schemas/             # Zod schemas
lib/email/templates/     # React Email templates
lib/analytics.ts         # Typed dataLayer helpers
sanity/schemas/          # Sanity document types
messages/{en,zh,ms}.json # UI strings
public/assets/           # Client-supplied images
```

Do not place files in the project root except standard config (`next.config.ts`, `tailwind.config.ts`, `tsconfig.json`, `package.json`, etc.).

---

## Design Rules (critical — see brief §3.6)

This project must **not** look AI-generated. Actively resist default LLM patterns.

**Forbidden visual patterns:**
- Perfectly centered hero with two symmetric CTAs
- Purple/blue/indigo gradient backgrounds
- Generic 3-column feature icon grids with identical cards
- `py-20` on every section (no rhythm)
- Glassmorphism stacked on gradients
- Symmetric 50/50 two-column hero layouts
- Empty SaaS copy ("Supercharge your X", "Unlock the future of Y")
- Emoji in UI content or buttons
- Stock isometric illustrations / abstract flowing shapes
- Magnetic cursor, character-by-character text reveals, 3D tilt, parallax on hero, scroll-hijacking, blur-to-focus, gradient text animation

**Required patterns:**
- Asymmetric hero layouts, oversized editorial H1s
- Numbered section labels (`01 / Services`) in monospace font
- Intentional variation in card sizes (bento-style)
- Mixed rhythm (`py-16` some sections, `py-40` others)
- `tabular-nums` for metrics, `font-mono` for labels, small-caps for category tags
- Real photography, never stock AI illustration

**Animation:** Every section uses `<FadeIn>` reveal. Respect `prefers-reduced-motion`. Animate only `transform` and `opacity`. See brief §3.5 for the full required animation list.

**Copy voice:** Malaysian growth marketer talking to a cafe owner friend. Specific numbers, local context (CNY/Raya/Deepavali), varied sentence rhythm. Avoid tri-colon constructions ("grow, scale, and succeed").

---

## Responsive Requirements (brief §3.8)

- Mobile-first, but desktop must feel equally intentional
- Touch targets ≥ 44×44px
- Sticky mobile CTA bar on conversion pages (hides on scroll down)
- Mobile nav is a full-screen slide-in drawer, not half-width
- Inputs: `min-h-12`, font-size ≥ 16px (no iOS zoom on focus)
- Tablet (640–1023px) needs its own layout intent, not "narrow desktop"
- No horizontal scroll at any breakpoint
- Test matrix: iPhone SE (375), iPhone 14 Pro (393), iPad Mini (768), MBA 13" (1280), MBP 16" (1728)

---

## Forms Flow (brief §8)

On submit, run in parallel: (a) Resend email to `CONTACT_EMAIL`, (b) open `wa.me` link with pre-filled message, (c) show inline thank-you state (no navigation), (d) fire `dataLayer` conversion event. All public forms use Cloudflare Turnstile + honeypot + rate limit.

Resume uploads go to Vercel Blob Storage, not Sanity assets.

---

## Operational Rules

- **Read `PROJECT_BRIEF.md` before any non-trivial task.** The brief is authoritative.
- **Search before creating.** Use `Grep`/`Glob` to find existing implementations. Extend, don't duplicate.
- **Single source of truth.** No `foo_v2.tsx`, `enhanced_foo.tsx`, `foo_new.tsx`. Extend the original.
- **Environment variables are centralized.** All placeholders (WhatsApp number, Cal link, contact email) live in `.env` — never hardcode.
- **Before adding a new dependency**, check the "Do not add" list in brief §2.
- **Before writing copy**, check §3.6 for the AI-tell anti-patterns.

---

## Common Commands

*(Populate after Next.js scaffolding — see brief §14 build order.)*

```bash
# Scaffolding (first build step)
# npx create-next-app@latest . --typescript --tailwind --app --no-src-dir --import-alias "@/*"

# Dev
# npm run dev

# Type check
# npm run typecheck

# Lint
# npm run lint
```

---

## Open Questions (brief §17)

Unresolved with client: final WhatsApp number, contact email, Cal.com link, Resend verified domain, real testimonials, real case study metrics, team bios, current job listings, brand guidelines. Use placeholders from brief §15 until resolved.
