"use client";

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useEffect, useRef } from "react";

type Props = {
  value: number;
  format?: (n: number) => string;
  duration?: number;
  className?: string;
};

export function CountUp({
  value,
  format = (n) => Math.round(n).toString(),
  duration = 1.2,
  className,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const mv = useMotionValue(0);
  const display = useTransform(mv, format);

  useEffect(() => {
    if (inView) {
      const controls = animate(mv, value, { duration, ease: "easeOut" });
      return () => controls.stop();
    }
  }, [inView, mv, value, duration]);

  return (
    <motion.span ref={ref} className={className}>
      {display}
    </motion.span>
  );
}
