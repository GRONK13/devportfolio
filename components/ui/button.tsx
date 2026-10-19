import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const variants = {
  primary: "bg-accent text-accent-fg hover:brightness-110 shadow-[0_8px_24px_-10px_var(--accent)]",
  secondary: "border border-border bg-surface hover:border-fg/30",
  ghost: "text-muted hover:bg-surface-2 hover:text-fg",
} as const;

const sizes = {
  md: "h-11 px-5 text-[15px]",
  sm: "h-9 px-3.5 text-sm",
  icon: "size-11",
} as const;

export function buttonClass(variant: keyof typeof variants = "primary", size: keyof typeof sizes = "md", className?: string) {
  return cn(
    "inline-flex shrink-0 items-center justify-center gap-2 rounded-xl font-medium transition-[filter,border-color,background-color,color,transform] active:scale-[0.98] motion-reduce:active:scale-100",
    variants[variant],
    sizes[size],
    className,
  );
}

type ButtonLinkProps = ComponentProps<"a"> & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  external?: boolean;
};

/** A link styled as a button. Internal paths use next/link; external ones open in a new tab safely. */
export function ButtonLink({ href = "#", variant, size, external, className, children, ...props }: ButtonLinkProps) {
  const classes = buttonClass(variant, size, className);
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...props}>
        {children}
      </a>
    );
  }
  if (href.startsWith("/") && !href.endsWith(".pdf")) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={classes} {...props}>
      {children}
    </a>
  );
}
