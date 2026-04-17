import Image from "next/image";
import { notFound } from "next/navigation";
import { useTranslations } from "next-intl";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { FadeIn } from "@/components/motion/fade-in";
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger";
import { BlogCard } from "@/components/blog/blog-card";
import { FinalCta } from "@/components/sections/final-cta";
import { sanityClient } from "@/lib/sanity/client";
import { urlFor } from "@/lib/sanity/image";
import { pickLocale, pickLocaleBlocks } from "@/lib/sanity/locale";
import {
  allBlogSlugsQuery,
  blogPostBySlugQuery,
  relatedBlogPostsQuery,
} from "@/lib/sanity/queries";
import type {
  BlogPostCard,
  BlogPostDetail,
} from "@/lib/sanity/types";
import type { Locale } from "@/i18n/routing";

export async function generateStaticParams() {
  const slugs = await sanityClient.fetch<{ slug: string }[]>(
    allBlogSlugsQuery
  );
  return slugs.map(({ slug }) => ({ slug }));
}

const articleComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="my-5 text-base leading-relaxed md:text-lg">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="mt-12 text-2xl font-semibold tracking-tight text-ink md:text-3xl">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 text-xl font-semibold text-ink md:text-2xl">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-2 border-accent pl-5 text-base italic text-ink-soft md:text-lg">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="my-5 list-disc space-y-2 pl-6 text-base leading-relaxed md:text-lg">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="my-5 list-decimal space-y-2 pl-6 text-base leading-relaxed md:text-lg">
        {children}
      </ol>
    ),
  },
};

type Props = {
  params: Promise<{ locale: Locale; slug: string }>;
};

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;

  const [post, related] = await Promise.all([
    sanityClient.fetch<BlogPostDetail | null>(blogPostBySlugQuery, { slug }),
    sanityClient.fetch<BlogPostCard[]>(relatedBlogPostsQuery, { slug }),
  ]);

  if (!post) notFound();

  const title = pickLocale(post.title, locale);
  const excerpt = pickLocale(post.excerpt, locale);
  const category = post.category
    ? pickLocale(post.category.name, locale)
    : null;
  const authorBio = post.author?.bio
    ? pickLocale(post.author.bio, locale)
    : null;
  const dateLabel = new Date(post.publishedAt).toLocaleDateString(
    locale === "zh" ? "zh-CN" : locale === "ms" ? "ms-MY" : "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );

  return (
    <>
      <ArticleHero
        title={title}
        excerpt={excerpt}
        category={category}
        coverImage={post.coverImage}
        authorName={post.author?.name ?? null}
        authorRole={post.author?.role ?? null}
        dateLabel={dateLabel}
        publishedAt={post.publishedAt}
      />

      <article className="pb-24 md:pb-32">
        <div className="mx-auto max-w-3xl px-4 text-ink-soft md:px-6 lg:px-8">
          <FadeIn>
            <PortableText
              value={pickLocaleBlocks(post.body, locale)}
              components={articleComponents}
            />
          </FadeIn>

          {(post.author?.name || authorBio) && (
            <FadeIn className="mt-16 border-t border-border pt-10">
              <AuthorBioBlock
                name={post.author?.name ?? ""}
                role={post.author?.role ?? null}
                bio={authorBio}
              />
            </FadeIn>
          )}
        </div>
      </article>

      {related.length > 0 && <RelatedPosts related={related} locale={locale} />}
      <FinalCta />
    </>
  );
}

function ArticleHero({
  title,
  excerpt,
  category,
  coverImage,
  authorName,
  authorRole,
  dateLabel,
  publishedAt,
}: {
  title: string;
  excerpt: string;
  category: string | null;
  coverImage: BlogPostDetail["coverImage"];
  authorName: string | null;
  authorRole: string | null;
  dateLabel: string;
  publishedAt: string;
}) {
  const t = useTranslations("Blog.detail");
  return (
    <section className="pt-10 md:pt-14">
      <div className="mx-auto max-w-3xl px-4 md:px-6 lg:px-8">
        <FadeIn>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            {t("back")}
          </Link>
          <div className="mt-8 flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-muted">
            {category && <span className="text-accent">{category}</span>}
            {category && <span aria-hidden>·</span>}
            <time dateTime={publishedAt}>{dateLabel}</time>
          </div>
          <h1 className="mt-6 text-4xl font-semibold leading-[1.1] tracking-tight text-ink md:text-5xl lg:text-6xl">
            {title}
          </h1>
          {excerpt && (
            <p className="mt-6 text-lg leading-relaxed text-ink-soft md:text-xl">
              {excerpt}
            </p>
          )}
          {authorName && (
            <p className="mt-8 text-sm text-muted">
              {authorName}
              {authorRole ? ` · ${authorRole}` : ""}
            </p>
          )}
        </FadeIn>
      </div>

      <FadeIn className="mt-10 md:mt-14" delay={0.1}>
        <div className="relative mx-auto aspect-[16/9] w-full max-w-5xl overflow-hidden bg-surface-alt md:rounded-2xl">
          <Image
            src={urlFor(coverImage).width(1600).height(900).url()}
            alt={title}
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1200px"
            className="object-cover"
          />
        </div>
      </FadeIn>
    </section>
  );
}

function AuthorBioBlock({
  name,
  role,
  bio,
}: {
  name: string;
  role: string | null;
  bio: string | null;
}) {
  const t = useTranslations("Blog.detail");
  return (
    <div className="flex flex-col gap-3">
      <p className="font-mono text-xs uppercase tracking-widest text-muted">
        {t("authorLabel")}
      </p>
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-soft font-mono text-base font-semibold text-accent">
          {name.slice(0, 1)}
        </div>
        <div>
          <p className="text-base font-semibold text-ink">{name}</p>
          {role && <p className="text-sm text-muted">{role}</p>}
        </div>
      </div>
      {bio && (
        <p className="text-base leading-relaxed text-ink-soft md:text-lg">
          {bio}
        </p>
      )}
    </div>
  );
}

function RelatedPosts({
  related,
  locale,
}: {
  related: BlogPostCard[];
  locale: Locale;
}) {
  const t = useTranslations("Blog.detail");
  return (
    <section className="border-t border-border py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <FadeIn className="mb-12 md:mb-16">
          <p className="font-mono text-xs uppercase tracking-widest text-muted">
            {t("relatedLabel")}
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-ink md:text-4xl">
            {t("relatedHeading")}
          </h2>
        </FadeIn>
        <StaggerContainer className="grid gap-8 md:grid-cols-2 md:gap-10 lg:grid-cols-3">
          {related.map((post) => (
            <StaggerItem key={post._id}>
              <BlogCard post={post} locale={locale} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
