import Image from "next/image";
import { useTranslations } from "next-intl";
import { FadeIn } from "@/components/motion/fade-in";
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger";

type SubServiceKey = "setup" | "ads" | "campaigns" | "analytics";
type PosSubServiceKey = "setup" | "menu" | "integration" | "support";

type Props = {
  id: string;
  namespace: "grabfood" | "pos";
  subKeys: readonly (SubServiceKey | PosSubServiceKey)[];
  image: { src: string; alt: string };
  logos?: { src: string; alt: string }[];
  flipped?: boolean;
};

export function ServiceBlock({
  id,
  namespace,
  subKeys,
  image,
  logos,
  flipped = false,
}: Props) {
  const t = useTranslations(`Services.${namespace}`);

  return (
    <section
      id={id}
      className="scroll-mt-20 border-t border-border py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div
          className={`grid gap-10 md:gap-16 lg:grid-cols-[1fr_1.1fr] lg:items-start ${
            flipped ? "lg:[&>*:first-child]:order-2" : ""
          }`}
        >
          <FadeIn className="lg:sticky lg:top-28">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
            {logos && logos.length > 0 && (
              <div className="mt-6 flex items-center gap-5">
                <p className="font-mono text-xs uppercase tracking-widest text-muted">
                  {t("integrates")}
                </p>
                <div className="flex items-center gap-4">
                  {logos.map((l) => (
                    <Image
                      key={l.alt}
                      src={l.src}
                      alt={l.alt}
                      width={48}
                      height={48}
                      className="h-12 w-12 rounded-lg object-contain"
                    />
                  ))}
                </div>
              </div>
            )}
          </FadeIn>

          <div className="flex flex-col gap-8">
            <FadeIn>
              <p className="font-mono text-xs uppercase tracking-widest text-muted">
                {t("label")}
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-ink md:text-4xl lg:text-5xl">
                {t("title")}
              </h2>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-soft md:text-lg">
                {t("blurb")}
              </p>
            </FadeIn>

            <StaggerContainer className="mt-4 grid gap-5 md:grid-cols-2">
              {subKeys.map((key) => (
                <StaggerItem key={key}>
                  <div className="rounded-xl border border-border bg-surface p-5 md:p-6">
                    <h3 className="text-base font-semibold text-ink md:text-lg">
                      {t(`sub.${key}.title`)}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                      {t(`sub.${key}.description`)}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </div>
    </section>
  );
}
