import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";
import SectionHeading from "@/components/ui/SectionHeading";
import ProductCard from "@/components/product/ProductCard";
import GolfCard from "@/components/golf/GolfCard";
import TourCard from "@/components/tour/TourCard";
import VillaCard from "@/components/villa/VillaCard";
import { getAllProducts } from "@/lib/data/products";
import { getAllGolfCourses } from "@/lib/data/golf";
import { getAllTours } from "@/lib/data/tours";
import { getAllTransportOptions } from "@/lib/data/transport";
import { getAllVillas } from "@/lib/data/villas";
import { formatPrice } from "@/lib/format";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}): Promise<Metadata> {
  const { q } = await searchParams;
  const trimmed = q?.trim();
  return {
    title: trimmed ? `"${trimmed}" 검색 결과` : "검색",
  };
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";

  if (!query) {
    return (
      <>
        <PageHeader
          eyebrow="Search"
          title="검색"
          description="찾으시는 여행상품, 골프장, 투어를 검색해보세요."
        />
        <Container className="py-14 text-center md:py-20">
          <p className="text-[14.5px] text-text-soft">검색어를 입력해주세요.</p>
        </Container>
      </>
    );
  }

  const [allProducts, allGolfCourses, allTours, allTransportOptions, allVillas] = await Promise.all([
    getAllProducts(),
    getAllGolfCourses(),
    getAllTours(),
    getAllTransportOptions(),
    getAllVillas(),
  ]);

  const q_ = query.toLowerCase();

  const products = allProducts.filter((p) =>
    [p.title, p.category, p.destination, p.type].some((f) => f.toLowerCase().includes(q_))
  );
  const golfCourses = allGolfCourses.filter((g) =>
    [g.name, g.location].some((f) => f.toLowerCase().includes(q_))
  );
  const tours = allTours.filter((t) =>
    [t.title, t.destination, t.category].some((f) => f.toLowerCase().includes(q_))
  );
  const transportOptions = allTransportOptions.filter((t) =>
    [t.title, t.route, t.category].some((f) => f.toLowerCase().includes(q_))
  );
  const villas = allVillas.filter((v) =>
    [v.name, v.location].some((f) => f.toLowerCase().includes(q_))
  );

  const totalCount =
    products.length + golfCourses.length + tours.length + transportOptions.length + villas.length;

  return (
    <>
      <PageHeader
        eyebrow="Search"
        title={`"${query}" 검색 결과`}
        description={`총 ${totalCount}개의 결과를 찾았습니다.`}
      />

      {totalCount === 0 ? (
        <Container className="py-14 text-center md:py-20">
          <p className="text-[14.5px] text-text-soft">
            검색 결과가 없습니다. 다른 검색어로 다시 시도해보세요.
          </p>
          <Link
            href="/travel"
            className="mt-4 inline-block text-[14px] font-medium text-forest underline underline-offset-2"
          >
            여행상품 둘러보기
          </Link>
        </Container>
      ) : (
        <>
          {products.length > 0 ? (
            <Container className="border-t border-border py-10 first:border-t-0 md:py-14">
              <SectionHeading eyebrow="Products" title="여행상품" />
              <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 md:mt-8 md:grid-cols-3">
                {products.map((product) => (
                  <ProductCard key={product.slug} product={product} />
                ))}
              </div>
            </Container>
          ) : null}

          {golfCourses.length > 0 ? (
            <Container className="border-t border-border py-10 first:border-t-0 md:py-14">
              <SectionHeading eyebrow="Golf" title="골프장" />
              <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 md:mt-8 md:grid-cols-3">
                {golfCourses.map((course) => (
                  <GolfCard key={course.slug} course={course} />
                ))}
              </div>
            </Container>
          ) : null}

          {tours.length > 0 ? (
            <Container className="border-t border-border py-10 first:border-t-0 md:py-14">
              <SectionHeading eyebrow="Tours" title="투어·액티비티" />
              <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 md:mt-8 md:grid-cols-3">
                {tours.map((tour) => (
                  <TourCard key={tour.slug} tour={tour} />
                ))}
              </div>
            </Container>
          ) : null}

          {villas.length > 0 ? (
            <Container className="border-t border-border py-10 first:border-t-0 md:py-14">
              <SectionHeading eyebrow="Stays" title="숙소" />
              <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 md:mt-8 md:grid-cols-3">
                {villas.map((villa) => (
                  <VillaCard key={villa.slug} villa={villa} />
                ))}
              </div>
            </Container>
          ) : null}

          {transportOptions.length > 0 ? (
            <Container className="border-t border-border py-10 first:border-t-0 md:py-14">
              <SectionHeading eyebrow="Transport" title="차량·픽업" />
              <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 md:mt-8 md:grid-cols-3">
                {transportOptions.map((item) => (
                  <a
                    key={item.slug}
                    href={`/transport#${encodeURIComponent(item.category)}`}
                    className="block rounded-xl border border-border bg-white p-5 transition-shadow duration-300 hover:shadow-[0_8px_28px_-8px_rgba(18,60,50,0.18)]"
                  >
                    <p className="text-xs font-medium tracking-wide text-gold">
                      {item.category}
                    </p>
                    <h3 className="mt-1.5 text-[16px] font-semibold text-text">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 line-clamp-2 text-[13.5px] leading-relaxed text-text-soft">
                      {item.route}
                    </p>
                    <div className="mt-4 flex items-center justify-between border-t border-border pt-3.5">
                      <span className="text-[13px] text-text-soft">{item.duration}</span>
                      <span className="text-[15px] font-semibold text-forest">
                        {formatPrice(item.price)}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </Container>
          ) : null}
        </>
      )}
    </>
  );
}
