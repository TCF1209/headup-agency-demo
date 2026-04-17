import Image from "next/image";
import { useTranslations } from "next-intl";
import { FadeIn } from "@/components/motion/fade-in";
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger";
import { urlFor } from "@/lib/sanity/image";
import { pickLocale } from "@/lib/sanity/locale";
import type { HomeTestimonial } from "@/lib/sanity/types";
import type { Locale } from "@/i18n/routing";

type Props = {
  items: HomeTestimonial[];
  locale: Locale;
};

export function Testimonials({ items, locale }: Props) {
  const t = useTranslations("Home.testimonials");

  if (items.length === 0) return null;

  return (
    <section className="border-t border-border bg-surface-alt py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <FadeIn className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-widest text-muted">
            {t("label")}
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-ink md:text-4xl lg:text-5xl">
            {t("heading")}
          </h2>
        </FadeIn>

        <StaggerContainer className="mt-14 grid gap-6 md:grid-cols-3 md:gap-8">
          {items.map((item) => {
            const quote = pickLocale(item.quote, locale);
            return (
              <StaggerItem key={item._id}>
                <figure className="flex h-full flex-col gap-6 rounded-2xl border border-border bg-surface p-6 md:p-8">
                  <blockquote className="text-base leading-relaxed text-ink-soft md:text-lg">
                    &ldquo;{quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-auto flex items-center gap-3">
                    {item.avatar?.asset ? (
                      <Image
                        src={urlFor(item.avatar).width(80).height(80).url()}
                        alt={item.authorName}
                        width={40}
                        height={40}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-soft font-mono text-sm font-medium text-accent">
                        {item.authorName.slice(0, 1)}
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-semibold text-ink">
                        {item.authorName}
                      </p>
                      {item.businessName && (
                        <p className="text-xs text-muted">
                          {item.businessName}
                        </p>
                      )}
                    </div>
                  </figcaption>
                </figure>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
