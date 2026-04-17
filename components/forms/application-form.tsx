"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { CheckCircle2 } from "lucide-react";
import {
  applicationSchema,
  type ApplicationInput,
} from "@/lib/schemas/application";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ResumeDropzone } from "./resume-dropzone";
import { cn } from "@/lib/utils";

type Props = {
  position: string;
  onSubmitSuccess?: () => void;
};

export function ApplicationForm({ position }: Props) {
  const t = useTranslations("Careers.form");
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ApplicationInput>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      position,
      linkedin: "",
      message: "",
    },
  });

  const onSubmit = async (data: ApplicationInput) => {
    // Backend wiring lands in brief §14 step 12 (Forms backend).
    // For now, simulate a successful submission.
    await new Promise((r) => setTimeout(r, 600));
    console.info("[application] simulated submit:", {
      ...data,
      resume: `${data.resume.name} (${data.resume.size} bytes)`,
    });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-4 py-10 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent-soft text-accent">
          <CheckCircle2 className="h-7 w-7" aria-hidden />
        </div>
        <h3 className="text-xl font-semibold text-ink">{t("successTitle")}</h3>
        <p className="max-w-sm text-sm text-ink-soft">{t("successBody")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <Label htmlFor="fullName">{t("fullName")}</Label>
        <Input
          id="fullName"
          autoComplete="name"
          aria-invalid={!!errors.fullName}
          {...register("fullName")}
        />
        {errors.fullName && (
          <p className="text-xs text-error">{errors.fullName.message}</p>
        )}
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

      <div className="flex flex-col gap-2">
        <Label htmlFor="position">{t("position")}</Label>
        <Input id="position" readOnly {...register("position")} />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="linkedin">{t("linkedin")}</Label>
        <Input
          id="linkedin"
          type="url"
          placeholder="https://linkedin.com/in/..."
          autoComplete="url"
          aria-invalid={!!errors.linkedin}
          {...register("linkedin")}
        />
        {errors.linkedin && (
          <p className="text-xs text-error">{errors.linkedin.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="message">{t("message")}</Label>
        <Textarea
          id="message"
          rows={5}
          aria-invalid={!!errors.message}
          {...register("message")}
        />
        {errors.message && (
          <p className="text-xs text-error">{errors.message.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label>{t("resume")}</Label>
        <Controller
          control={control}
          name="resume"
          render={({ field }) => (
            <ResumeDropzone
              value={field.value}
              onChange={field.onChange}
              hint={t("resumeHint")}
              dropHint={t("resumeDrop")}
              removeLabel={t("resumeRemove")}
            />
          )}
        />
        {errors.resume && (
          <p className="text-xs text-error">
            {errors.resume.message as string}
          </p>
        )}
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={isSubmitting}
        className={cn("mt-2", isSubmitting && "opacity-70")}
      >
        {isSubmitting ? t("submitting") : t("submit")}
      </Button>
    </form>
  );
}
