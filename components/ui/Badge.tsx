import { cn } from "@/lib/utils";

type Color = "indigo" | "green" | "amber" | "red" | "gray" | "purple";

interface BadgeProps {
  children: React.ReactNode;
  color?: Color;
  className?: string;
}

const colors: Record<Color, string> = {
  indigo: "bg-indigo-50 text-indigo-700 ring-indigo-200",
  green:  "bg-emerald-50 text-emerald-700 ring-emerald-200",
  amber:  "bg-amber-50 text-amber-700 ring-amber-200",
  red:    "bg-red-50 text-red-700 ring-red-200",
  gray:   "bg-gray-100 text-gray-600 ring-gray-200",
  purple: "bg-purple-50 text-purple-700 ring-purple-200",
};

export default function Badge({ children, color = "gray", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-medium rounded-full ring-1",
        colors[color],
        className
      )}
    >
      {children}
    </span>
  );
}
