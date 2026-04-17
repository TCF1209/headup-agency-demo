import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { urlFor } from "@/lib/sanity/image";
import { pickLocale } from "@/lib/sanity/locale";
import type { BlogPostCard as BlogPostCardData } from "@/lib/sanity/types";
import type { Locale } from "@/i18n/routing";

type Props = {
  post: BlogPostCardData;
  locale: Locale;
  priority?: boolean;
};

export function BlogCard({ post, locale, priority = false }: Props) {
  const title = pickLocale(post.title, locale);
  const excerpt = pickLocale(post.excerpt, locale);
  const category = post.category
    ? pickLocale(post.category.name, locale)
    : null;

  const dateLabel = new Date(post.publishedAt).toLocaleDateString(
    locale === "zh" ? "zh-CN" : locale === "ms" ? "ms-MY" : "en-US",
    { year: "numeric", month: "short", day: "numeric" }
  );

  return (
    <Link
      href={`/blog/${post.slug.current}`}
      className="group flex flex-col gap-4"
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-surface-alt">
        <Image
          src={urlFor(post.coverImage).width(800).height(500).url()}
          alt={title}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-muted">
          {category && <span>{category}</span>}
          {category && <span aria-hidden>·</span>}
          <time dateTime={post.publishedAt}>{dateLabel}</time>
        </div>
        <h3 className="text-lg font-semibold leading-snug text-ink md:text-xl">
          {title}
        </h3>
        {excerpt && (
          <p className="line-clamp-3 text-sm leading-relaxed text-ink-soft md:text-base">
            {excerpt}
          </p>
        )}
        {post.author && (
          <p className="mt-1 text-xs text-muted">
            {post.author.name}
            {post.author.role ? ` · ${post.author.role}` : ""}
          </p>
        )}
      </div>
    </Link>
  );
}
