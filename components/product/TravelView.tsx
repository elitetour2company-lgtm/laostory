"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/product/ProductCard";
import SortSelect from "@/components/ui/SortSelect";
import TravelDateFilter from "@/components/ui/TravelDateFilter";
import { sortItems } from "@/lib/sort";
import type { Product, ProductType, TravelTag } from "@/types";

const FILTERS: { label: string; value: "all" | ProductType; queryAlias?: string }[] = [
  { label: "전체", value: "all" },
  { label: "자유여행", value: "자유여행", queryAlias: "free" },
  { label: "패키지여행", value: "패키지여행", queryAlias: "package" },
  { label: "골프", value: "골프" },
  { label: "풀빌라", value: "풀빌라" },
];

function resolveType(raw?: string): "all" | ProductType {
  if (!raw) return "all";
  const match = FILTERS.find((f) => f.value === raw || f.queryAlias === raw);
  return match ? match.value : "all";
}

// Maps the homepage TripFinder's "style" select (region/style/guests search
// widget) onto whichever existing product field actually captures it —
// some styles are product types, others are tags. Mirrors the same mapping
// already used by /travel-style/[style] (e.g. "휴양" = pool villa there too).
const STYLE_TO_TYPE: Partial<Record<string, ProductType>> = {
  자유여행: "자유여행",
  골프: "골프",
  휴양: "풀빌라",
};
const STYLE_TO_TAG: Partial<Record<string, TravelTag>> = {
  커플: "커플",
  가족: "가족",
  친구: "친구",
};

type Params = { type?: string; region?: string; style?: string; sort?: string };

export function TravelSections({ travelProducts, params }: { travelProducts: Product[]; params: Params }) {
  const { type: rawType, region, style, sort } = params;
  const activeType = resolveType(rawType);
  const activeRegion = region && region !== "전체" ? region : undefined;
  const activeStyle = style && style !== "전체" ? style : undefined;

  let products =
    activeType === "all"
      ? travelProducts
      : travelProducts.filter((p) => p.type === activeType);

  if (activeRegion) {
    products = products.filter((p) => p.destination.includes(activeRegion));
  }
  if (activeStyle) {
    const styleType = STYLE_TO_TYPE[activeStyle];
    const styleTag = STYLE_TO_TAG[activeStyle];
    products = products.filter((p) =>
      styleType ? p.type === styleType : styleTag ? p.tags.includes(styleTag) : true
    );
  }

  products = sortItems(products, sort, (p) => p.title);

  const hasExtraFilters = Boolean(activeRegion || activeStyle);

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2.5">
          {FILTERS.map((filter) => {
            const isActive = filter.value === activeType;
            const filterParams = new URLSearchParams();
            if (filter.value !== "all") {
              filterParams.set("type", filter.queryAlias ?? filter.value);
            }
            if (sort) filterParams.set("sort", sort);
            const filterQuery = filterParams.toString();
            const href = filterQuery ? `/travel?${filterQuery}` : "/travel";
            return (
              <Link
                key={filter.value}
                href={href}
                className={`rounded-full border px-5 py-2.5 text-[14px] font-medium transition-colors ${
                  isActive
                    ? "border-forest bg-forest text-white"
                    : "border-border text-text hover:border-forest hover:text-forest"
                }`}
              >
                {filter.label}
              </Link>
            );
          })}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <TravelDateFilter style={activeStyle ?? (activeType !== "all" ? activeType : undefined)} />
          <SortSelect />
        </div>
      </div>

      {hasExtraFilters ? (
        <div className="mt-4 flex flex-wrap items-center gap-2 text-[13px] text-text-soft">
          <span>
            {[activeRegion, activeStyle].filter(Boolean).join(" · ")} 검색 결과{" "}
            {products.length}건
          </span>
          <Link
            href={(() => {
              const resetParams = new URLSearchParams();
              if (activeType !== "all") {
                resetParams.set(
                  "type",
                  FILTERS.find((f) => f.value === activeType)?.queryAlias ?? activeType
                );
              }
              if (sort) resetParams.set("sort", sort);
              const resetQuery = resetParams.toString();
              return resetQuery ? `/travel?${resetQuery}` : "/travel";
            })()}
            className="text-forest underline underline-offset-2 hover:text-forest-light"
          >
            필터 초기화
          </Link>
        </div>
      ) : null}

      {products.length > 0 ? (
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 md:mt-10 md:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
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

export default function TravelView({ travelProducts }: { travelProducts: Product[] }) {
  const sp = useSearchParams();
  const params: Params = {
    type: sp.get("type") ?? undefined,
    region: sp.get("region") ?? undefined,
    style: sp.get("style") ?? undefined,
    sort: sp.get("sort") ?? undefined,
  };
  return <TravelSections travelProducts={travelProducts} params={params} />;
}
