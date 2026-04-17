"use client";

import { useState } from "react";
import { PortableText } from "@portabletext/react";
import { MapPin, Briefcase } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ApplicationForm } from "@/components/forms/application-form";
import { pickLocale, pickLocaleBlocks } from "@/lib/sanity/locale";
import type { Job } from "@/lib/sanity/types";
import type { Locale } from "@/i18n/routing";

type Props = {
  job: Job;
  locale: Locale;
};

export function JobCard({ job, locale }: Props) {
  const t = useTranslations("Careers");
  const [open, setOpen] = useState(false);
  const title = pickLocale(job.title, locale);

  return (
    <article className="flex flex-col gap-5 rounded-2xl border border-border bg-surface p-6 md:flex-row md:items-start md:p-8">
      <div className="flex flex-1 flex-col gap-3">
        <h3 className="text-xl font-semibold text-ink md:text-2xl">{title}</h3>
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted">
          {job.department && (
            <span className="inline-flex items-center gap-1.5">
              <Briefcase className="h-3.5 w-3.5" aria-hidden />
              {job.department}
            </span>
          )}
          {job.location && (
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" aria-hidden />
              {job.location}
            </span>
          )}
          <span className="rounded-full bg-surface-alt px-3 py-1 font-mono text-xs uppercase tracking-widest">
            {t(`types.${job.type}`)}
          </span>
        </div>
        <div className="prose-job text-sm leading-relaxed text-ink-soft md:text-base">
          <PortableText value={pickLocaleBlocks(job.description, locale)} />
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button size="lg" className="md:shrink-0">
            {t("apply")}
          </Button>
        </DialogTrigger>
        <DialogContent aria-describedby={`job-${job._id}-desc`}>
          <div className="flex-1 overflow-y-auto px-6 py-8 md:px-10 md:py-10">
            <div className="mb-6">
              <p className="font-mono text-xs uppercase tracking-widest text-muted">
                {t("applyTo")}
              </p>
              <DialogTitle className="mt-2">{title}</DialogTitle>
              <DialogDescription id={`job-${job._id}-desc`} className="mt-2">
                {t("applyIntro")}
              </DialogDescription>
            </div>
            <ApplicationForm position={title} />
          </div>
        </DialogContent>
      </Dialog>
    </article>
  );
}
