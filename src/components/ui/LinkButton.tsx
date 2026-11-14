import type { AnchorHTMLAttributes, ReactNode } from "react";

interface LinkButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: "primary" | "ghost";
  size?: "sm" | "md";
  icon?: ReactNode;
  /** Opens in a new tab with safe rel attributes. */
  external?: boolean;
}

const variants = {
  primary:
    "bg-accent text-ink hover:shadow-[0_0_32px_-4px_var(--color-accent)] hover:-translate-y-0.5",
  ghost:
    "border border-accent/60 text-accent hover:bg-accent/10 hover:border-accent hover:-translate-y-0.5",
} as const;

const sizes = { sm: "px-3.5 py-1.5 text-xs", md: "px-6 py-3 text-sm" } as const;

export function LinkButton({
  variant = "ghost",
  size = "md",
  icon,
  external,
  className = "",
  children,
  ...rest
}: LinkButtonProps) {
  return (
    <a
      className={`inline-flex items-center gap-2 rounded-lg font-mono font-medium tracking-wide transition-all duration-300 ${variants[variant]} ${sizes[size]} ${className}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
    >
      {icon}
      {children}
    </a>
  );
}
