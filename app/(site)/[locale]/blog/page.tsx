import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { FadeIn } from "@/components/motion/fade-in";
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger";
import { BlogCard } from "@/components/blog/blog-card";
import { FinalCta } from "@/components/sections/final-cta";
import { sanityClient } from "@/lib/sanity/client";
import { allBlogPostsQuery } from "@/lib/sanity/queries";
import type { BlogPostCard } from "@/lib/sanity/types";
import type { Locale } from "@/i18n/routing";

function BlogHeader() {
  const t = useTranslations("Blog.header");
  const tNav = useTranslations("Nav");

  return (
    <section className="pb-12 pt-12 md:pb-16 md:pt-16">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <FadeIn>
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted"
          >
            <Link href="/" className="hover:text-ink">
              {tNav("home")}
            </Link>
            <span aria-hidden>/</span>
            <span className="text-ink">{tNav("blog")}</span>
          </nav>
          <h1 className="mt-8 max-w-3xl text-5xl font-semibold leading-[1.05] tracking-tight text-ink md:text-6xl lg:text-7xl">
            {t("title")}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft md:text-xl">
            {t("intro")}
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

export default async function BlogIndexPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const posts = await sanityClient.fetch<BlogPostCard[]>(allBlogPostsQuery);

  return (
    <>
      <BlogHeader />
      <section className="pb-24 md:pb-32">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          {posts.length === 0 ? (
            <EmptyState />
          ) : (
            <StaggerContainer className="grid gap-8 md:grid-cols-2 md:gap-10 lg:grid-cols-3">
              {posts.map((post, i) => (
                <StaggerItem key={post._id}>
                  <BlogCard post={post} locale={locale} priority={i < 3} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          )}
        </div>
      </section>
      <FinalCta />
    </>
  );
}

function EmptyState() {
  const t = useTranslations("Blog.header");
  return (
    <div className="rounded-2xl border border-border bg-surface p-10 text-center">
      <p className="text-base text-ink-soft">{t("empty")}</p>
    </div>
  );
}
