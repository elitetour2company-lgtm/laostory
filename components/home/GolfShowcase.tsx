import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import CoverImage from "@/components/ui/CoverImage";
import GolfCard from "@/components/golf/GolfCard";
import { getAllGolfCourses } from "@/lib/data/golf";
import { getImage } from "@/data/images";

export default async function GolfShowcase() {
  const golfCourses = await getAllGolfCourses();

  return (
    <section className="border-t border-border py-20 md:py-28">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading eyebrow="Laos Golf" title="골프를 위해 떠나는 라오스" />
          <Link
            href="/golf"
            className="hidden shrink-0 items-center gap-1.5 border-b border-forest py-2 text-sm font-medium text-forest transition-colors hover:text-forest-light md:inline-flex"
          >
            골프 상품 전체보기
            <ArrowRight size={14} strokeWidth={2} />
          </Link>
        </div>

        <div className="relative mt-10 aspect-[16/7] overflow-hidden rounded-xl md:mt-12">
          <CoverImage
            src={getImage("golf-hero")}
            alt="라오스 골프 코스"
            sizes="(min-width: 1280px) 1216px, 100vw"
          />
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {golfCourses.map((course) => (
            <GolfCard key={course.slug} course={course} />
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link
            href="/golf"
            className="inline-flex items-center gap-1.5 border-b border-forest py-2 text-sm font-medium text-forest"
          >
            골프 상품 전체보기
            <ArrowRight size={14} strokeWidth={2} />
          </Link>
        </div>

        <Link
          href="/travel/laos-golf-poolvilla-3nights"
          className="group relative mt-6 flex flex-col overflow-hidden rounded-xl md:mt-8 md:flex-row md:items-center"
        >
          <div className="relative h-40 w-full overflow-hidden md:h-auto md:w-64 md:flex-shrink-0 md:self-stretch">
            <CoverImage
              src={getImage("golf-villa-combo")}
              alt="골프와 풀빌라"
              sizes="(min-width: 768px) 256px, 100vw"
              className="transition-transform duration-500 group-hover:scale-[1.04]"
            />
          </div>
          <div className="flex flex-1 items-center justify-between gap-4 bg-forest px-6 py-6 md:py-7">
            <div>
              <p className="text-xs font-medium tracking-[0.25em] text-gold-soft">
                GOLF + PRIVATE VILLA
              </p>
              <p className="mt-1.5 text-[17px] font-semibold text-white md:text-[19px]">
                라운딩과 휴식을 한 번에
              </p>
            </div>
            <ArrowUpRight
              size={20}
              strokeWidth={1.75}
              className="flex-shrink-0 text-white/80 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </div>
        </Link>
      </Container>
    </section>
  );
}
