import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { travelStyles } from "@/data/mock/categories";

export default function TravelStyle() {
  return (
    <section className="border-t border-border py-20 md:py-28">
      <Container>
        <SectionHeading
          eyebrow="Travel Style"
          title="당신의 여행 스타일은 무엇인가요"
          align="center"
        />

        <div className="mt-7 flex flex-wrap justify-center gap-3 md:mt-8">
          {travelStyles.map((style) => (
            <Link
              key={style.href}
              href={style.href}
              className="rounded-full border border-border px-7 py-3 text-[14.5px] font-medium text-text transition-colors hover:border-forest hover:text-forest"
            >
              {style.label}
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
