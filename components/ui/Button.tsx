import { cn } from "@/lib/utils";
import { type ButtonHTMLAttributes, forwardRef } from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", loading, className, children, disabled, style, ...props }, ref) => {
    const sizeClass: Record<Size, string> = {
      sm: "px-3 py-1.5 text-sm rounded-lg gap-1.5",
      md: "px-4 py-2.5 text-sm rounded-xl gap-2",
      lg: "px-6 py-3 text-base rounded-xl gap-2",
    };

    const variantStyle: Record<Variant, React.CSSProperties> = {
      primary:   { background: "var(--coral)", color: "#fff", boxShadow: "0 8px 16px -8px rgba(232,99,58,.6)" },
      secondary: { background: "var(--surface)", color: "var(--ink)", border: "1px solid var(--line)", boxShadow: "var(--shadow-sm)" },
      ghost:     { background: "transparent", color: "var(--ink-2)" },
      danger:    { background: "#dc2626", color: "#fff" },
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center font-semibold transition-all duration-150 active:scale-[.98] disabled:opacity-50 disabled:cursor-not-allowed",
          sizeClass[size],
          className
        )}
        style={{ ...variantStyle[variant], ...style }}
        {...props}
      >
        {loading && (
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
