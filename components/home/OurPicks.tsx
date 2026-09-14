import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import CoverImage from "@/components/ui/CoverImage";
import { ourPicks } from "@/data/mock/picks";
import { getImage } from "@/data/images";

export default function OurPicks() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading eyebrow="Our Picks" title="라오스 현지 전문가가 추천하는 여행" />
          <Link
            href="/tours"
            className="hidden shrink-0 items-center gap-1.5 border-b border-forest py-2 text-sm font-medium text-forest transition-colors hover:text-forest-light md:inline-flex"
          >
            투어 전체보기
            <ArrowRight size={14} strokeWidth={2} />
          </Link>
        </div>

        <div className="mt-10 flex flex-col gap-4 md:mt-12">
          {ourPicks.map((pick, i) => (
            <Link
              key={pick.href}
              href={pick.href}
              className={`group flex flex-col gap-5 rounded-xl border border-border bg-white p-5 md:items-center md:p-6 ${
                i % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"
              }`}
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-sm md:aspect-[4/3] md:w-64 md:flex-shrink-0">
                <CoverImage
                  src={getImage(pick.imageKey)}
                  alt=""
                  sizes="(min-width: 768px) 256px, 100vw"
                  className="transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium tracking-wide text-gold">
                  {pick.tag} · {pick.meta}
                </p>
                <h3 className="mt-2 text-[17px] font-semibold text-text md:text-[19px]">
                  {pick.title}
                </h3>
                <p className="mt-2 max-w-lg text-[13.5px] leading-relaxed text-text-soft">
                  {pick.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-[13.5px] font-medium text-forest">
                  자세히 보기
                  <ArrowUpRight
                    size={14}
                    strokeWidth={2}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link
            href="/tours"
            className="inline-flex items-center gap-1.5 border-b border-forest py-2 text-sm font-medium text-forest"
          >
            투어 전체보기
            <ArrowRight size={14} strokeWidth={2} />
          </Link>
        </div>
      </Container>
    </section>
  );
}
