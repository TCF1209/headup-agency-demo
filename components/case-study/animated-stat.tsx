"use client";

import { CountUp } from "@/components/motion/count-up";

type Props = {
  value: string;
  className?: string;
};

/**
 * Parses a stat string like "+180%", "-40%", "3 months" into
 * animated number + static prefix/suffix. Falls back to static
 * text when the string doesn't start with a numeric segment.
 */
export function AnimatedStat({ value, className }: Props) {
  const match = value.match(/^([^\d+\-]*)([+\-]?)(\d+(?:\.\d+)?)(.*)$/);
  if (!match) return <span className={className}>{value}</span>;
  const [, prefix, sign, numStr, suffix] = match;
  const num = parseFloat(numStr);

  return (
    <span className={className}>
      {prefix}
      {sign}
      <CountUp value={num} />
      {suffix}
    </span>
  );
}
