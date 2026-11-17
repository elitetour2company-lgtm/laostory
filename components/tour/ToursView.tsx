"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import TourCard from "@/components/tour/TourCard";
import SortSelect from "@/components/ui/SortSelect";
import TravelDateFilter from "@/components/ui/TravelDateFilter";
import { sortItems } from "@/lib/sort";
import type { Tour } from "@/types";

const CATEGORIES = ["전체", "원데이투어", "반일투어", "액티비티"] as const;

export default function ToursView({ tours }: { tours: Tour[] }) {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") ?? undefined;
  const sort = searchParams.get("sort") ?? undefined;

  const activeCategory = CATEGORIES.includes(category as (typeof CATEGORIES)[number])
    ? (category as (typeof CATEGORIES)[number])
    : "전체";

  let filtered =
    activeCategory === "전체" ? tours : tours.filter((t) => t.category === activeCategory);
  filtered = sortItems(filtered, sort, (t) => t.title);

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2.5">
          {CATEGORIES.map((cat) => {
            const isActive = cat === activeCategory;
            const params = new URLSearchParams();
            if (cat !== "전체") params.set("category", cat);
            if (sort) params.set("sort", sort);
            const query = params.toString();
            const href = query ? `/tours?${query}` : "/tours";
            return (
              <Link
                key={cat}
                href={href}
                className={`rounded-full border px-5 py-2.5 text-[14px] font-medium transition-colors ${
                  isActive
                    ? "border-forest bg-forest text-white"
                    : "border-border text-text hover:border-forest hover:text-forest"
                }`}
              >
                {cat}
              </Link>
            );
          })}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <TravelDateFilter />
          <SortSelect />
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 md:mt-10 md:grid-cols-3">
          {filtered.map((tour) => (
            <TourCard key={tour.slug} tour={tour} />
          ))}
        </div>
      ) : (
        <p className="mt-14 text-center text-[14.5px] text-text-soft">
          조건에 맞는 결과가 아직 준비되어 있지 않습니다.
        </p>
      )}
    </>
  );
}
