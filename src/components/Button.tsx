import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md";
  className?: string;
  /* Render as a different element/component (e.g. react-router Link). */
  as?: React.ElementType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  as,
  type,
  ...rest
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-mint/60 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas active:scale-[0.98]";

  const sizes = {
    md: "px-6 py-3 text-[0.92rem]",
    sm: "px-4 py-2 text-[0.82rem]",
  };

  const variants = {
    primary: "bg-mint text-mint-ink hover:bg-mint-deep",
    secondary:
      "text-ink border border-line-strong hover:border-mint/50 hover:bg-mint/[0.06]",
    ghost: "text-soft hover:text-ink hover:bg-white/[0.04]",
  };

  const Component = as ?? "button";
  const elProps = as ? rest : { type: type ?? "button", ...rest };

  return (
    <Component
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      {...elProps}
    >
      {children}
    </Component>
  );
}
