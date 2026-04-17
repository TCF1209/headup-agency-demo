"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { CheckCircle2, ChevronDown } from "lucide-react";
import {
  partnerSchema,
  PARTNERSHIP_TYPES,
  type PartnerInput,
} from "@/lib/schemas/partner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function PartnerForm() {
  const t = useTranslations("Partners.form");
  const tTypes = useTranslations("Partners.types.items");
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PartnerInput>({
    resolver: zodResolver(partnerSchema),
    defaultValues: {
      companyName: "",
      contactName: "",
      email: "",
      phone: "",
      partnershipType: "pos-hardware",
      website: "",
      businessDescription: "",
      partnerReason: "",
    },
  });

  const onSubmit = async (data: PartnerInput) => {
    await new Promise((r) => setTimeout(r, 600));
    console.info("[partner] simulated submit:", data);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-surface p-10 text-center md:p-14">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent-soft text-accent">
          <CheckCircle2 className="h-7 w-7" aria-hidden />
        </div>
        <h3 className="text-2xl font-semibold text-ink md:text-3xl">
          {t("successTitle")}
        </h3>
        <p className="max-w-md text-base text-ink-soft">{t("successBody")}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-5 rounded-2xl border border-border bg-surface p-6 md:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="companyName">{t("companyName")}</Label>
          <Input
            id="companyName"
            autoComplete="organization"
            aria-invalid={!!errors.companyName}
            {...register("companyName")}
          />
          {errors.companyName && (
            <p className="text-xs text-error">{errors.companyName.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="contactName">{t("contactName")}</Label>
          <Input
            id="contactName"
            autoComplete="name"
            aria-invalid={!!errors.contactName}
            {...register("contactName")}
          />
          {errors.contactName && (
            <p className="text-xs text-error">{errors.contactName.message}</p>
          )}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">{t("email")}</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            aria-invalid={!!errors.email}
            {...register("email")}
          />
          {errors.email && (
            <p className="text-xs text-error">{errors.email.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="phone">{t("phone")}</Label>
          <Input
            id="phone"
            type="tel"
            autoComplete="tel"
            aria-invalid={!!errors.phone}
            {...register("phone")}
          />
          {errors.phone && (
            <p className="text-xs text-error">{errors.phone.message}</p>
          )}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="partnershipType">{t("partnershipType")}</Label>
          <div className="relative">
            <select
              id="partnershipType"
              aria-invalid={!!errors.partnershipType}
              className={cn(
                "flex h-12 w-full appearance-none rounded-lg border border-border bg-surface pl-4 pr-10 text-base text-ink",
                "focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-0"
              )}
              {...register("partnershipType")}
            >
              {PARTNERSHIP_TYPES.map((type) => (
                <option key={type} value={type}>
                  {tTypes(`${type}.title`)}
                </option>
              ))}
            </select>
            <ChevronDown
              className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted"
              aria-hidden
            />
          </div>
          {errors.partnershipType && (
            <p className="text-xs text-error">
              {errors.partnershipType.message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="website">{t("website")}</Label>
          <Input
            id="website"
            type="url"
            placeholder="https://example.com"
            autoComplete="url"
            aria-invalid={!!errors.website}
            {...register("website")}
          />
          {errors.website && (
            <p className="text-xs text-error">{errors.website.message}</p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="businessDescription">{t("businessDescription")}</Label>
        <Textarea
          id="businessDescription"
          rows={4}
          aria-invalid={!!errors.businessDescription}
          {...register("businessDescription")}
        />
        {errors.businessDescription && (
          <p className="text-xs text-error">
            {errors.businessDescription.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="partnerReason">{t("partnerReason")}</Label>
        <Textarea
          id="partnerReason"
          rows={4}
          aria-invalid={!!errors.partnerReason}
          {...register("partnerReason")}
        />
        {errors.partnerReason && (
          <p className="text-xs text-error">{errors.partnerReason.message}</p>
        )}
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={isSubmitting}
        className={cn("mt-2 self-start", isSubmitting && "opacity-70")}
      >
        {isSubmitting ? t("submitting") : t("submit")}
      </Button>
    </form>
  );
}
