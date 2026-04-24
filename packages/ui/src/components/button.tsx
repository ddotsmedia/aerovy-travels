import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "../lib/cn";

export const buttonVariants = tv({
  base: [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md",
    "text-sm font-medium transition-colors",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  ].join(" "),
  variants: {
    variant: {
      primary:
        "bg-brand-primary text-brand-secondary hover:bg-brand-accent active:bg-brand-primary/90",
      secondary:
        "bg-brand-secondary text-bg hover:bg-brand-secondary/90 active:bg-brand-secondary/80",
      outline: "border border-border bg-transparent text-text hover:bg-surface",
      ghost: "bg-transparent text-text hover:bg-surface",
      danger: "bg-danger text-bg hover:bg-danger/90",
      link: "bg-transparent text-brand-primary underline-offset-4 hover:underline",
    },
    size: {
      sm: "h-8 rounded-md px-3 text-xs",
      md: "h-10 px-4 py-2",
      lg: "h-12 rounded-lg px-6 text-base",
      icon: "h-10 w-10",
    },
    fullWidth: {
      true: "w-full",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant, size, fullWidth, asChild = false, ...props },
  ref,
) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      ref={ref}
      className={cn(buttonVariants({ variant, size, fullWidth }), className)}
      {...props}
    />
  );
});
