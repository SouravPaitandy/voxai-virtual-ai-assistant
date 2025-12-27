/* eslint-disable react/prop-types */
// Atomic Button Component

import { forwardRef } from "react";
import { Loader2 } from "lucide-react";

const Button = forwardRef(
  (
    {
      className = "",
      variant = "primary",
      size = "md",
      isLoading = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center rounded-xl font-medium transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:pointer-events-none active:scale-95";

    const variants = {
      primary:
        "bg-primary text-primary-foreground shadow-lg hover:shadow-primary/25 hover:brightness-110",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      outline:
        "border-2 border-primary/20 bg-transparent hover:bg-primary/10 text-primary",
      ghost: "hover:bg-accent hover:text-accent-foreground",
      glow: "bg-primary text-primary-foreground shadow-[0_0_20px_rgba(124,58,237,0.5)] hover:shadow-[0_0_30px_rgba(124,58,237,0.6)]",
    };

    const sizes = {
      sm: "h-9 px-3 text-xs",
      md: "h-11 px-6 text-sm",
      lg: "h-14 px-8 text-base",
      icon: "h-10 w-10",
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
