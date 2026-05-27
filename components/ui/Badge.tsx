import { cn } from "@/lib/utils";

type Color = "coral" | "indigo" | "green" | "amber" | "red" | "gray" | "purple" | "sage" | "sky" | "lavender" | "butter";

interface BadgeProps {
  children: React.ReactNode;
  color?: Color;
  className?: string;
}

const colorStyles: Record<Color, React.CSSProperties> = {
  coral:    { background: "var(--coral-soft)", color: "var(--coral-ink)", border: "1px solid #f4c8a8" },
  indigo:   { background: "var(--coral-soft)", color: "var(--coral-ink)", border: "1px solid #f4c8a8" },
  sage:     { background: "var(--sage)",       color: "var(--sage-ink)",  border: "1px solid #b5d8be" },
  green:    { background: "var(--sage)",       color: "var(--sage-ink)",  border: "1px solid #b5d8be" },
  sky:      { background: "var(--sky)",        color: "var(--sky-ink)",   border: "1px solid #b4cfe4" },
  amber:    { background: "var(--sky)",        color: "var(--sky-ink)",   border: "1px solid #b4cfe4" },
  lavender: { background: "var(--lavender)",   color: "var(--lav-ink)",   border: "1px solid #c9bce4" },
  purple:   { background: "var(--lavender)",   color: "var(--lav-ink)",   border: "1px solid #c9bce4" },
  butter:   { background: "var(--butter)",     color: "var(--butter-ink)",border: "1px solid #efd884" },
  red:      { background: "var(--rose)",       color: "var(--rose-ink)",  border: "1px solid #ecb9b9" },
  gray:     { background: "var(--bg-2)",       color: "var(--muted)",     border: "1px solid var(--line)" },
};

export default function Badge({ children, color = "gray", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-semibold rounded-full",
        className
      )}
      style={colorStyles[color]}
    >
      {children}
    </span>
  );
}
