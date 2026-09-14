import { ReactNode } from "react";

export default function Badge({
  children,
  tone = "gold",
  className = "",
}: {
  children: ReactNode;
  tone?: "gold" | "forest" | "neutral" | "sale" | "tier" | "hot" | "overlay";
  className?: string;
}) {
  const toneClasses = {
    gold: "bg-gold/15 text-[#8a6d34]",
    forest: "bg-forest text-white",
    neutral: "bg-white/90 text-text border border-border",
    sale: "bg-red-600 text-white",
    tier: "bg-forest text-white",
    hot: "bg-white border border-red-500 text-red-600",
    overlay: "bg-white/15 text-white/90 backdrop-blur-sm",
  }[tone];

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium tracking-wide ${toneClasses} ${className}`}
    >
      {children}
    </span>
  );
}
