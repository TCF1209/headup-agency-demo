"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

export function Hero() {
  const t = useTranslations("Home.hero");

  return (
    <section className="relative overflow-hidden pb-20 pt-12 md:pb-28 md:pt-16 lg:pb-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 md:px-6 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-16 lg:px-8">
        <div className="flex flex-col">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="font-mono text-xs uppercase tracking-widest text-muted"
          >
            {t("label")}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
            className="mt-6 text-5xl font-semibold leading-[1.05] tracking-tight text-ink md:text-6xl lg:text-7xl xl:text-[5.5rem]"
          >
            {t("title")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft md:text-xl"
          >
            {t("subtitle")}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.75, ease: "easeOut" }}
            className="mt-10 flex flex-col gap-3 sm:flex-row"
          >
            <Button asChild size="lg">
              <Link href="/book">{t("primaryCta")}</Link>
            </Button>
            <Button asChild size="lg" variant="ghost">
              <Link href="/solutions">{t("secondaryCta")}</Link>
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0, ease: "easeOut" }}
            className="mt-14 flex flex-col gap-5 border-t border-border pt-8 md:flex-row md:items-center md:gap-8"
          >
            <p className="max-w-xs text-sm text-muted">{t("trustBadge")}</p>
            <div className="flex items-center gap-6 opacity-80">
              <Image
                src="/assets/grabfood.png"
                alt="GrabFood"
                width={80}
                height={28}
                className="h-6 w-auto object-contain"
              />
              <Image
                src="/assets/foodpanda.jpg"
                alt="Foodpanda"
                width={80}
                height={28}
                className="h-6 w-auto rounded object-contain"
              />
            </div>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="relative lg:-mr-8 xl:-mr-16"
        >
          <Image
            src="/assets/consultation.jpg"
            alt="Head Up Agency consultation session"
            width={720}
            height={900}
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="aspect-[4/5] w-full rounded-2xl object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}
