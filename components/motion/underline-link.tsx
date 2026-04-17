import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import type { ComponentProps, ReactNode } from "react";

type UnderlineLinkProps = Omit<ComponentProps<typeof Link>, "children"> & {
  children: ReactNode;
  className?: string;
};

export function UnderlineLink({
  children,
  className,
  ...props
}: UnderlineLinkProps) {
  return (
    <Link
      {...props}
      className={cn(
        "relative inline-block text-ink",
        "after:absolute after:left-0 after:bottom-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-[250ms] after:ease-out",
        "hover:after:scale-x-100 focus-visible:after:scale-x-100",
        "focus-visible:outline-none",
        className
      )}
    >
      {children}
    </Link>
  );
}
