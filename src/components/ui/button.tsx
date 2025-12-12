import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium ring-offset-background transition-all duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 shadow-sm",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-primary/90 to-primary text-primary-foreground shadow-md hover:from-primary hover:to-primary/90 hover:shadow-lg hover:scale-[1.03]",
        secondary:
          "bg-gradient-to-r from-secondary/80 to-secondary text-secondary-foreground hover:from-secondary hover:to-secondary/90 hover:shadow-md hover:scale-[1.03]",
        outline:
          "border border-gray-200 bg-white text-gray-700 hover:bg-primary/10 hover:text-primary hover:shadow-md transition-all duration-300",
        ghost:
          "bg-transparent text-gray-700 hover:bg-gray-100 hover:text-primary transition-all duration-300",
        subtle:
          "bg-muted text-foreground hover:bg-muted/70 transition-all duration-300",
        link: "text-primary underline-offset-4 hover:underline",
        destructive:
          "bg-red-500 text-white hover:bg-red-600 shadow-sm hover:shadow-md hover:scale-[1.03]",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-9 rounded-lg px-3 text-sm",
        lg: "h-11 rounded-xl px-8 text-base",
        icon: "h-10 w-10 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
