import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";
import SectionHeading from "@/components/ui/SectionHeading";
import ProductCard from "@/components/product/ProductCard";
import VillaCard from "@/components/villa/VillaCard";
import GolfCard from "@/components/golf/GolfCard";
import Button from "@/components/ui/Button";
import { getAllProducts } from "@/lib/data/products";
import { getAllVillas } from "@/lib/data/villas";
import { getAllGolfCourses } from "@/lib/data/golf";
import { Product } from "@/types";

export const STYLE_CONFIG = {
  couple: {
    label: "커플",
    eyebrow: "Couple",
    description: "둘만의 시간에 집중할 수 있는 라오스 커플 여행 상품을 모았습니다.",
    match: (p: Product) => p.tags.includes("커플"),
    showVillas: false,
    showGolf: false,
  },
  family: {
    label: "가족",
    eyebrow: "Family",
    description: "아이와 함께해도 편안한 동선의 가족 여행 상품과 숙소를 모았습니다.",
    match: (p: Product) => p.tags.includes("가족"),
    showVillas: true,
    showGolf: false,
  },
  friends: {
    label: "친구",
    eyebrow: "Friends",
    description: "친구들과 함께 즐기기 좋은 액티비티 중심의 여행 상품을 모았습니다.",
    match: (p: Product) => p.tags.includes("친구"),
    showVillas: false,
    showGolf: false,
  },
  golf: {
    label: "골프",
    eyebrow: "Golf",
    description: "라운딩부터 숙소까지, 골퍼를 위한 여행 상품과 골프장을 모았습니다.",
    match: (p: Product) => p.type === "골프",
    showVillas: false,
    showGolf: true,
  },
  relax: {
    label: "휴양",
    eyebrow: "Relax",
    description: "프라이빗 풀빌라에서 온전히 쉬어가는 휴양 중심 여행 상품을 모았습니다.",
    match: (p: Product) => p.type === "풀빌라",
    showVillas: true,
    showGolf: false,
  },
} as const;

type StyleSlug = keyof typeof STYLE_CONFIG;

export function generateStaticParams() {
  return Object.keys(STYLE_CONFIG).map((style) => ({ style }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ style: string }>;
}): Promise<Metadata> {
  const { style } = await params;
  const config = STYLE_CONFIG[style as StyleSlug];
  if (!config) return {};
  return { title: `${config.label} 여행`, description: config.description };
}

export default async function TravelStylePage({
  params,
}: {
  params: Promise<{ style: string }>;
}) {
  const { style } = await params;
  const config = STYLE_CONFIG[style as StyleSlug];
  if (!config) notFound();

  const [travelProducts, featuredVillas, golfCourses] = await Promise.all([
    getAllProducts(),
    config.showVillas ? getAllVillas() : Promise.resolve([]),
    config.showGolf ? getAllGolfCourses() : Promise.resolve([]),
  ]);
  const matchedProducts = travelProducts.filter(config.match);

  return (
    <>
      <PageHeader
        eyebrow={config.eyebrow}
        title={`${config.label} 여행`}
        description={config.description}
      />

      <Container className="py-10 md:py-14">
        {matchedProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
            {matchedProducts.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        ) : (
          <p className="text-center text-[14.5px] text-text-soft">
            조건에 맞는 결과가 아직 준비되어 있지 않습니다.
          </p>
        )}
      </Container>

      {config.showVillas && featuredVillas.length > 0 && (
        <Container className="border-t border-border py-10 md:py-14">
          <SectionHeading eyebrow="Private Villas" title="추천 풀빌라" />
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
            {featuredVillas.map((v) => (
              <VillaCard key={v.slug} villa={v} />
            ))}
          </div>
        </Container>
      )}

      {config.showGolf && (
        <Container className="border-t border-border py-10 md:py-14">
          <SectionHeading eyebrow="Golf" title="추천 골프장" />
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
            {golfCourses.map((c) => (
              <GolfCard key={c.slug} course={c} />
            ))}
          </div>
        </Container>
      )}

      <Container className="border-t border-border py-14 text-center md:py-16">
        <p className="text-[15px] font-semibold text-forest">
          {config.label} 여행, 맞춤으로 설계해드립니다.
        </p>
        <Button href="/consultation" variant="primary" className="mt-5">
          1:1 여행상담
        </Button>
      </Container>
    </>
  );
}
