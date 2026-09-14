import Container from "./Container";

export default function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="border-b border-border bg-ivory pb-10 pt-28 md:pb-14 md:pt-36">
      <Container>
        {eyebrow ? (
          <p className="font-display text-sm tracking-[0.25em] text-gold uppercase">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="mt-3 text-[26px] font-semibold tracking-tight text-forest md:text-[36px]">
          {title}
        </h1>
        {description ? (
          <p className="mt-3 max-w-xl text-[14.5px] leading-relaxed text-text-soft md:text-base">
            {description}
          </p>
        ) : null}
      </Container>
    </section>
  );
}
