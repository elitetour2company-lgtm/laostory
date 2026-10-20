import type { ReactNode } from "react";

export default function DetailHeading({
  eyebrow,
  title,
  subtitle,
  actions,
  chips,
  compact = false,
  className = "",
}: {
  eyebrow?: ReactNode;
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  chips?: string[];
  compact?: boolean;
  className?: string;
}) {
  const TitleTag = compact ? "p" : "h1";

  return (
    <div
      className={`${
        compact
          ? "mb-5 border-b border-border pb-5"
          : "mt-6 md:mt-8"
      } ${className}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          {eyebrow ? (
            <p className="text-xs font-medium tracking-wide text-gold">{eyebrow}</p>
          ) : null}
          <TitleTag
            className={`font-display mt-1.5 font-semibold leading-tight text-forest ${
              compact ? "text-[20px]" : "text-[24px] md:text-[32px]"
            }`}
          >
            {title}
          </TitleTag>
          {subtitle ? (
            <p className="mt-2 text-[15px] leading-relaxed text-text-soft md:text-base">
              {subtitle}
            </p>
          ) : null}
        </div>
        {actions ? <div className="flex shrink-0 items-center gap-2">{actions}</div> : null}
      </div>
      {chips && chips.length > 0 ? (
        <ul className="mt-3.5 flex flex-wrap gap-1.5">
          {chips.map((chip) => (
            <li
              key={chip}
              className="rounded-full bg-ivory px-3 py-1 text-[12.5px] text-text"
            >
              {chip}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
