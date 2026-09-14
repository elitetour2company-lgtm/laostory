import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ProductCard from "@/components/product/ProductCard";
import { getBestSellerProducts } from "@/lib/data/products";

export default async function BestSellers() {
  const bestSellerProducts = await getBestSellerProducts();

  if (bestSellerProducts.length === 0) return null;

  return (
    <section className="border-t border-border py-20 md:py-28">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading eyebrow="Best Sellers" title="지금 가장 인기 있는 라오스 여행" />
          <Link
            href="/travel"
            className="hidden shrink-0 items-center gap-1.5 border-b border-forest py-2 text-sm font-medium text-forest transition-colors hover:text-forest-light md:inline-flex"
          >
            전체 상품 보기
            <ArrowRight size={14} strokeWidth={2} />
          </Link>
        </div>

        <div className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 md:mt-12 md:grid md:grid-cols-4 md:gap-5 md:overflow-visible md:pb-0">
          {bestSellerProducts.map((product) => (
            <div
              key={product.slug}
              className="min-w-[78%] snap-start sm:min-w-[45%] md:min-w-0"
            >
              <ProductCard product={product} hideFeaturedBadge />
            </div>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link
            href="/travel"
            className="inline-flex items-center gap-1.5 border-b border-forest py-2 text-sm font-medium text-forest"
          >
            전체 상품 보기
            <ArrowRight size={14} strokeWidth={2} />
          </Link>
        </div>
      </Container>
    </section>
  );
}
