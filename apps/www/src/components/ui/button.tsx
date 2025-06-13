import React, { ButtonHTMLAttributes } from "react"
import { cva, VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

export const buttonVariants = cva(
  "font-sans transition-all outline-hidden cursor-pointer duration-200 font-medium flex items-center [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
  {
    variants: {
      variant: {
        default:
          "shadow-md hover:shadow-none bg-primary text-black border-2 border-black transition hover:translate-y-1 hover:bg-primary-hover",
        secondary:
          "shadow-md hover:shadow-none hover:bg-secondary/80 bg-secondary shadow-primary text-secondary-foreground border-2 border-black transition hover:translate-y-1",
        outline:
          "hover:bg-accent hover:text-accent-foreground shadow-md hover:shadow-none bg-transparent border-2 transition hover:translate-y-1",
        link: "hover:text-accent underline-offset-4 duration-100 bg-transparent hover:underline",
        destructive:
          "hover:shadow-none hover:translate-y-1 bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        // outline:
        //   "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        // secondary:
        //   "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
      },
      size: {
        sm: "px-3 py-1 text-sm shadow hover:shadow-none",
        md: "px-4 py-1.5 text-base",
        lg: "px-8 py-3 text-lg",
        icon: "p-2",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "default",
    },
  }
)

export interface IButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, IButtonProps>(
  (
    {
      children,
      size = "md",
      className = "",
      variant = "default",
      ...props
    }: IButtonProps,
    forwardedRef
  ) => (
    <button
      ref={forwardedRef}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </button>
  )
)

Button.displayName = "Button"
