"use client";

import { useSearchParams } from "next/navigation";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ProductCard from "@/components/product/ProductCard";
import GolfCard from "@/components/golf/GolfCard";
import GolfPriceList from "@/components/golf/GolfPriceList";
import SortSelect from "@/components/ui/SortSelect";
import TravelDateFilter from "@/components/ui/TravelDateFilter";
import { sortItems } from "@/lib/sort";
import type { GolfCourse, Product } from "@/types";

export function GolfSections({
  packages,
  courses,
  sort,
}: {
  packages: Product[];
  courses: GolfCourse[];
  sort?: string;
}) {
  const golfPackages = sortItems(packages, sort, (p) => p.title);
  const sortedCourses = sortItems(courses, sort, (c) => c.name);

  return (
    <>
      <Container id="packages" className="scroll-mt-28 py-10 md:scroll-mt-32 md:py-14">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <SectionHeading eyebrow="Golf Package" title="골프패키지" />
          <div className="flex flex-wrap items-center gap-3">
            <TravelDateFilter style="골프" />
            <SortSelect />
          </div>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 md:mt-8 md:grid-cols-3">
          {golfPackages.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </Container>

      <Container id="booking" className="scroll-mt-28 border-t border-border py-10 md:scroll-mt-32 md:py-14">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <SectionHeading eyebrow="Golf Booking" title="골프부킹" />
          <p className="text-[13.5px] text-text-soft">
            원하는 골프장만 골라 그린피·카트·캐디를 예약하세요.
          </p>
        </div>

        <div className="mt-6">
          <GolfPriceList courses={sortedCourses} />
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
          {sortedCourses.map((course) => (
            <GolfCard key={course.slug} course={course} />
          ))}
        </div>
      </Container>
    </>
  );
}

export default function GolfView({
  packages,
  courses,
}: {
  packages: Product[];
  courses: GolfCourse[];
}) {
  const sort = useSearchParams().get("sort") ?? undefined;
  return <GolfSections packages={packages} courses={courses} sort={sort} />;
}
