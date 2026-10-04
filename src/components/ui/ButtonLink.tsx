import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: "solid" | "outline";
  icon?: ReactNode;
}

const VARIANTS = {
  // Blanco sobre #0062C9 ≈ 5.9:1
  solid: "bg-brand-deep text-white hover:bg-ink",
  outline: "border-2 border-ink text-ink hover:bg-ink hover:text-white",
} as const;

export function ButtonLink({ variant = "solid", icon, className, children, ...props }: ButtonLinkProps) {
  return (
    <a
      {...props}
      className={cn(
        "inline-flex min-h-12 items-center justify-center gap-2 rounded-control px-6 text-base font-bold",
        "transition-[transform,background-color,color] duration-[160ms] ease-out-strong active:scale-[0.97]",
        VARIANTS[variant],
        className,
      )}
    >
      {children}
      {icon ? <span aria-hidden="true">{icon}</span> : null}
    </a>
  );
}
