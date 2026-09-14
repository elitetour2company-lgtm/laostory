import Link from "next/link";
import { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "accent";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-forest text-white hover:bg-forest-light",
  secondary:
    "bg-transparent text-white border border-white/70 hover:bg-white/10",
  ghost:
    "bg-transparent text-forest border border-forest/25 hover:bg-forest/5",
  accent:
    "bg-gold text-forest hover:bg-gold-soft",
};

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
};

export default function Button({
  children,
  variant = "primary",
  className = "",
  href,
  ...props
}: CommonProps & { href?: string } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const classes = `inline-flex flex-shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-sm px-7 py-3.5 text-[15px] font-medium tracking-wide transition-colors duration-200 ${variantClasses[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
