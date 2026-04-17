"use client";

import { useMemo, useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

type Step = "date" | "time" | "form" | "done";

const TIME_SLOTS = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
];

function startOfDay(d: Date) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function startOfMonth(d: Date) {
  const x = startOfDay(d);
  x.setDate(1);
  return x;
}

function addMonths(d: Date, n: number) {
  const x = new Date(d);
  x.setMonth(x.getMonth() + n);
  return x;
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function buildMonthGrid(viewMonth: Date): (Date | null)[] {
  const first = startOfMonth(viewMonth);
  const daysInMonth = new Date(
    first.getFullYear(),
    first.getMonth() + 1,
    0
  ).getDate();
  const firstDayOfWeek = first.getDay();
  const grid: (Date | null)[] = [];
  for (let i = 0; i < firstDayOfWeek; i++) grid.push(null);
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(first);
    date.setDate(d);
    grid.push(date);
  }
  while (grid.length < 42) grid.push(null);
  return grid;
}

function isDateBookable(date: Date, today: Date) {
  if (date < today) return false;
  const day = date.getDay();
  if (day === 0 || day === 6) return false;
  const diff = Math.floor(
    (date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );
  return diff <= 60;
}

function unavailableSlotsFor(date: Date): Set<string> {
  const seed = date.getDate() * 7 + date.getMonth() * 31;
  const unavailable = new Set<string>();
  const count = (seed % 3) + 1;
  for (let i = 0; i < count; i++) {
    const idx = (seed * (i + 3)) % TIME_SLOTS.length;
    unavailable.add(TIME_SLOTS[idx]);
  }
  return unavailable;
}

function toIntlLocale(loc: string) {
  if (loc === "zh") return "zh-CN";
  if (loc === "ms") return "ms-MY";
  return "en-US";
}

export function MockBooking() {
  const t = useTranslations("Book.mock");
  const locale = useLocale();
  const intlLocale = toIntlLocale(locale);

  const today = useMemo(() => startOfDay(new Date()), []);

  const [step, setStep] = useState<Step>("date");
  const [viewMonth, setViewMonth] = useState(() => startOfMonth(today));
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const grid = useMemo(() => buildMonthGrid(viewMonth), [viewMonth]);
  const unavailable = useMemo(
    () => (selectedDate ? unavailableSlotsFor(selectedDate) : new Set<string>()),
    [selectedDate]
  );

  const monthLabel = new Intl.DateTimeFormat(intlLocale, {
    year: "numeric",
    month: "long",
  }).format(viewMonth);

  const dayShortLabels = useMemo(() => {
    const sunday = new Date(2024, 0, 7);
    const fmt = new Intl.DateTimeFormat(intlLocale, { weekday: "short" });
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(sunday);
      d.setDate(sunday.getDate() + i);
      return fmt.format(d);
    });
  }, [intlLocale]);

  const fullDateLabel = (d: Date) =>
    new Intl.DateTimeFormat(intlLocale, {
      weekday: "long",
      month: "short",
      day: "numeric",
    }).format(d);

  const canGoBackMonth =
    startOfMonth(addMonths(viewMonth, -1)) >= startOfMonth(today);

  const submit = async () => {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 700));
    setSubmitting(false);
    setStep("done");
  };

  const reset = () => {
    setStep("date");
    setSelectedDate(null);
    setSelectedTime(null);
    setName("");
    setEmail("");
    setNotes("");
  };

  return (
    <div className="p-6 md:p-8">
      <p className="mb-6 inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-accent">
        <CalendarDays className="h-3 w-3" aria-hidden />
        {t("demoBadge")}
      </p>

      <AnimatePresence mode="wait">
        {step === "date" && (
          <motion.div
            key="date"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-ink md:text-xl">
                {t("pickDate")}
              </h3>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setViewMonth(addMonths(viewMonth, -1))}
                  disabled={!canGoBackMonth}
                  aria-label={t("prevMonth")}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-ink transition-colors hover:bg-surface-alt disabled:opacity-30"
                >
                  <ChevronLeft className="h-5 w-5" aria-hidden />
                </button>
                <span className="min-w-28 text-center text-sm font-medium text-ink">
                  {monthLabel}
                </span>
                <button
                  type="button"
                  onClick={() => setViewMonth(addMonths(viewMonth, 1))}
                  aria-label={t("nextMonth")}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-ink transition-colors hover:bg-surface-alt"
                >
                  <ChevronRight className="h-5 w-5" aria-hidden />
                </button>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-7 gap-1 text-center">
              {dayShortLabels.map((d) => (
                <div
                  key={d}
                  className="py-2 font-mono text-[11px] uppercase tracking-widest text-muted"
                >
                  {d}
                </div>
              ))}
              {grid.map((date, i) => {
                if (!date) return <div key={`empty-${i}`} />;
                const bookable = isDateBookable(date, today);
                const selected =
                  selectedDate && isSameDay(date, selectedDate);
                const isToday = isSameDay(date, today);
                return (
                  <button
                    key={date.toISOString()}
                    type="button"
                    disabled={!bookable}
                    onClick={() => {
                      setSelectedDate(date);
                      setStep("time");
                    }}
                    className={cn(
                      "relative aspect-square rounded-lg text-sm font-medium transition-colors",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                      bookable
                        ? "text-ink hover:bg-accent-soft hover:text-accent"
                        : "cursor-not-allowed text-muted/40",
                      selected && "bg-ink text-surface hover:bg-ink"
                    )}
                  >
                    {date.getDate()}
                    {isToday && bookable && !selected && (
                      <span
                        aria-hidden
                        className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-accent"
                      />
                    )}
                  </button>
                );
              })}
            </div>

            <p className="mt-6 text-xs text-muted">{t("dateHint")}</p>
          </motion.div>
        )}

        {step === "time" && selectedDate && (
          <motion.div
            key="time"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <button
              type="button"
              onClick={() => setStep("date")}
              className="inline-flex items-center gap-2 text-sm text-muted hover:text-ink"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              {t("changeDate")}
            </button>
            <h3 className="mt-4 text-lg font-semibold text-ink md:text-xl">
              {fullDateLabel(selectedDate)}
            </h3>
            <p className="mt-1 text-sm text-muted">{t("pickTime")}</p>

            <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {TIME_SLOTS.map((slot) => {
                const taken = unavailable.has(slot);
                return (
                  <button
                    key={slot}
                    type="button"
                    disabled={taken}
                    onClick={() => {
                      setSelectedTime(slot);
                      setStep("form");
                    }}
                    className={cn(
                      "min-h-11 rounded-lg border text-sm font-medium transition-colors",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                      taken
                        ? "cursor-not-allowed border-border bg-surface-alt text-muted line-through"
                        : "border-border bg-surface text-ink hover:border-ink hover:bg-accent-soft"
                    )}
                  >
                    <Clock className="mr-1 inline h-3.5 w-3.5" aria-hidden />
                    {slot}
                  </button>
                );
              })}
            </div>

            <p className="mt-6 text-xs text-muted">{t("timeHint")}</p>
          </motion.div>
        )}

        {step === "form" && selectedDate && selectedTime && (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <button
              type="button"
              onClick={() => setStep("time")}
              className="inline-flex items-center gap-2 text-sm text-muted hover:text-ink"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              {t("changeTime")}
            </button>
            <div className="mt-4 rounded-xl border border-border bg-surface-alt p-4">
              <p className="font-mono text-xs uppercase tracking-widest text-muted">
                {t("bookingFor")}
              </p>
              <p className="mt-1 text-base font-semibold text-ink">
                {fullDateLabel(selectedDate)} · {selectedTime}
              </p>
            </div>

            <form
              className="mt-5 flex flex-col gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                submit();
              }}
            >
              <div className="flex flex-col gap-2">
                <Label htmlFor="mb-name">{t("name")}</Label>
                <Input
                  id="mb-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  autoComplete="name"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="mb-email">{t("email")}</Label>
                <Input
                  id="mb-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="mb-notes">{t("notes")}</Label>
                <Textarea
                  id="mb-notes"
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={t("notesPlaceholder")}
                />
              </div>
              <Button
                type="submit"
                size="lg"
                disabled={submitting}
                className="mt-1"
              >
                {submitting ? t("submitting") : t("confirm")}
              </Button>
            </form>
          </motion.div>
        )}

        {step === "done" && selectedDate && selectedTime && (
          <motion.div
            key="done"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="py-4 text-center"
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent-soft text-accent">
              <Check className="h-7 w-7" aria-hidden />
            </div>
            <p className="mt-6 font-mono text-xs uppercase tracking-widest text-muted">
              {t("confirmedLabel")}
            </p>
            <h3 className="mt-3 text-2xl font-semibold text-ink md:text-3xl">
              {t("confirmedTitle")}
            </h3>
            <p className="mt-4 text-base text-ink-soft">
              {fullDateLabel(selectedDate)} · {selectedTime}
            </p>
            <p className="mt-3 text-sm text-muted">{t("confirmedBody")}</p>
            <button
              type="button"
              onClick={reset}
              className="mt-8 text-sm font-medium text-accent hover:underline"
            >
              {t("bookAnother")}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
