import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import CoverImage from "@/components/ui/CoverImage";
import Badge from "@/components/ui/Badge";
import { categories } from "@/data/mock/categories";
import { getImage } from "@/data/images";
import { formatPrice } from "@/lib/format";
import { getAllProducts } from "@/lib/data/products";
import { getAllVillas } from "@/lib/data/villas";
import { getAllGolfCourses } from "@/lib/data/golf";
import { getAllTours } from "@/lib/data/tours";
import { getAllTransportOptions } from "@/lib/data/transport";

function stats(count: number, minPrice: number | null) {
  if (count === 0 || minPrice === null) return null;
  return `${count}개 상품 · ${formatPrice(minPrice)}`;
}

async function getCategoryStats(): Promise<Record<string, string | null>> {
  const [products, villas, golfCourses, tours, transportOptions] = await Promise.all([
    getAllProducts(),
    getAllVillas(),
    getAllGolfCourses(),
    getAllTours(),
    getAllTransportOptions(),
  ]);

  const packageProducts = products.filter((p) => p.type === "패키지여행");
  const freeProducts = products.filter((p) => p.type === "자유여행");
  const golfProducts = products.filter((p) => p.type === "골프");

  const min = (prices: number[]) => (prices.length ? Math.min(...prices) : null);

  return {
    "패키지 여행": stats(packageProducts.length, min(packageProducts.map((p) => p.price))),
    자유여행: stats(freeProducts.length, min(freeProducts.map((p) => p.price))),
    "풀빌라·호텔": stats(villas.length, min(villas.map((v) => v.price))),
    골프여행: stats(
      golfProducts.length + golfCourses.length,
      min([...golfProducts.map((p) => p.price), ...golfCourses.map((c) => c.price)])
    ),
    "투어·액티비티": stats(tours.length, min(tours.map((t) => t.price))),
    "차량·픽업": stats(
      transportOptions.length,
      min(transportOptions.map((t) => t.price))
    ),
  };
}

export default async function CategoryGrid() {
  const categoryStats = await getCategoryStats();

  return (
    <section className="py-20 md:py-28">
      <Container>
        <SectionHeading eyebrow="Categories" title="카테고리별로 둘러보세요" />
        <div className="mt-8 grid grid-cols-2 gap-3 md:mt-10 md:grid-cols-3 md:gap-4">
          {categories.map((category) => {
            const stat = categoryStats[category.label];
            return (
              <Link
                key={category.href}
                href={category.href}
                className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-xl border border-border md:aspect-[3/4]"
              >
                <CoverImage
                  src={getImage(category.imageKey)}
                  alt=""
                  sizes="(min-width: 768px) 33vw, 50vw"
                  className="transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest/80 via-forest/10 to-transparent" />
                <div className="relative z-10 p-4 md:p-6">
                  {stat ? (
                    <Badge tone="overlay" className="whitespace-nowrap">
                      {stat}
                    </Badge>
                  ) : null}
                  <p className="mt-2 text-[15px] font-semibold text-white md:text-[17px]">
                    {category.label}
                  </p>
                  <p className="mt-1 hidden text-xs leading-snug text-white/70 md:block">
                    {category.description}
                  </p>
                  <ArrowUpRight
                    size={16}
                    strokeWidth={1.75}
                    className="mt-2 text-white/80 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
