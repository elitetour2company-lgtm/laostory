export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "dark",
  descriptionClassName = "",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
  descriptionClassName?: string;
}) {
  return (
    <div className={align === "center" ? "text-center" : "text-left"}>
      {eyebrow ? (
        <p className="font-display mb-3 text-sm tracking-[0.25em] text-gold uppercase">
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={`text-[26px] font-semibold tracking-tight md:text-[34px] ${
          tone === "light" ? "text-white" : "text-forest"
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`mt-3 text-[15px] leading-relaxed md:text-base ${
            tone === "light" ? "text-white/60" : "text-text-soft"
          } ${
            descriptionClassName || (align === "center" ? "mx-auto max-w-xl" : "max-w-xl")
          }`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
