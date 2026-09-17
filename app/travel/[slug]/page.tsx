import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, X as XIcon, BedDouble, UtensilsCrossed, MapPin, MessageCircleQuestion } from "lucide-react";
import Container from "@/components/ui/Container";
import CoverImage from "@/components/ui/CoverImage";
import PhotoGallery from "@/components/ui/PhotoGallery";
import BookingProcess from "@/components/ui/BookingProcess";
import TravelNotices from "@/components/ui/TravelNotices";
import WishlistButton from "@/components/ui/WishlistButton";
import ShareButton from "@/components/ui/ShareButton";
import Badge from "@/components/ui/Badge";
import GuestPriceCalculator from "@/components/ui/GuestPriceCalculator";
import StatTiles from "@/components/ui/StatTiles";
import { getProductBySlug, getProductSlugs } from "@/lib/data/products";
import { getReviewsForProduct } from "@/lib/data/reviews";
import { getImage } from "@/data/images";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema, productSchema } from "@/lib/seo/schema";
import ReviewSection from "@/components/reviews/ReviewSection";
import { Product } from "@/types";

// Maps a Product's Korean `type` label to the reviews table's category code
// (see CATEGORY_MAP / TYPE_MAP conventions in lib/data/reviews.ts and lib/data/products.ts).
const PRODUCT_TYPE_TO_REVIEW_CATEGORY: Record<
  Product["type"],
  "GOLF" | "POOL_VILLA" | "FREE_TRAVEL" | "PACKAGE_TOUR"
> = {
  자유여행: "FREE_TRAVEL",
  패키지여행: "PACKAGE_TOUR",
  풀빌라: "POOL_VILLA",
  골프: "GOLF",
};

export async function generateStaticParams() {
  const slugs = await getProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};
  const image = getImage(product.image);
  return {
    title: product.title,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: [image ?? "/images/vangvieng-hero.jpg"],
      locale: "ko_KR",
      type: "website",
    },
  };
}

export default async function TravelDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const reviews = await getReviewsForProduct("product", product.slug);

  const cityCount = product.destination.split("·").length;
  const totalMeals =
    product.itinerary?.reduce((sum, day) => sum + (day.meals?.length ?? 0), 0) ?? 0;

  const productStats: { value: string; label: string }[] = [
    { value: product.duration, label: "일정" },
    { value: `${product.included?.length ?? 0}가지`, label: "포함사항" },
    ...(totalMeals > 0 ? [{ value: `${totalMeals}회`, label: "식사 포함" }] : []),
    { value: `${cityCount}개`, label: "방문 도시" },
    ...(product.minParticipants ? [{ value: `${product.minParticipants}명`, label: "최소 인원" }] : []),
  ];

  return (
    <div className="pb-24 md:pb-16">
      <JsonLd
        data={breadcrumbSchema([
          { name: "홈", path: "/" },
          { name: "여행상품", path: "/travel" },
          { name: product.title, path: `/travel/${product.slug}` },
        ])}
      />
      <JsonLd
        data={productSchema({
          name: product.title,
          description: product.description,
          image: getImage(product.image),
          price: product.price,
          path: `/travel/${product.slug}`,
        })}
      />
      <div className="relative aspect-[16/9] w-full overflow-hidden md:aspect-[21/9]">
        <CoverImage
          src={getImage(product.image)}
          alt={product.title}
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest/60 via-forest/5 to-transparent" />
        <div className="absolute right-4 top-20 flex items-center gap-2 md:top-24">
          <ShareButton title={product.title} />
          <WishlistButton type="travel" slug={product.slug} />
        </div>
        <Container className="absolute inset-x-0 bottom-0 pb-6 md:pb-10">
          <p className="text-xs font-medium tracking-wide text-gold-soft">
            {product.category} · {product.destination}
          </p>
          <h1 className="font-display mt-2 max-w-2xl text-[26px] font-semibold text-white md:text-[38px]">
            {product.title}
          </h1>
        </Container>
      </div>

      <Container className="mt-8 grid grid-cols-1 gap-10 md:mt-12 md:grid-cols-[1fr_340px]">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            {product.badge ? <Badge tone="forest">{product.badge}</Badge> : null}
            {product.tags.map((tag) => (
              <Badge key={tag} tone="gold">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="mt-5">
            <StatTiles stats={productStats} />
          </div>

          <p className="mt-5 text-[15px] leading-relaxed text-text md:text-base">
            {product.description}
          </p>

          {product.gallery.length > 0 ? (
            <div className="mt-6">
              <PhotoGallery
                photos={[
                  ...(getImage(product.image)
                    ? [{ key: "hero", src: getImage(product.image)!, alt: product.title }]
                    : []),
                  ...product.gallery
                    .map((key, i) => {
                      const src = getImage(key);
                      return src ? { key, src, alt: `${product.title} 사진 ${i + 2}` } : null;
                    })
                    .filter((p): p is { key: string; src: string; alt: string } => p !== null),
                ]}
              />
            </div>
          ) : null}

          {product.destinationHighlights?.length ? (
            <div className="mt-10">
              <h2 className="text-[18px] font-semibold text-forest md:text-[20px]">
                이 여행이 들르는 도시
              </h2>
              <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                {product.destinationHighlights.map((h) => (
                  <div
                    key={h.city}
                    className="overflow-hidden rounded-xl border border-border bg-white"
                  >
                    {h.image ? (
                      <div className="relative aspect-[16/10] w-full">
                        <CoverImage src={getImage(h.image)} alt={h.city} sizes="(min-width: 768px) 50vw, 100vw" />
                      </div>
                    ) : null}
                    <div className="p-5">
                      <p className="inline-flex items-center gap-1.5 text-xs font-medium tracking-wide text-gold">
                        <MapPin size={13} strokeWidth={2} />
                        {h.city}
                      </p>
                      <p className="mt-1.5 text-[14.5px] font-semibold text-text">{h.title}</p>
                      <p className="mt-1.5 text-[13px] leading-relaxed text-text-soft">
                        {h.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {product.itinerary ? (
            <div className="mt-10">
              <h2 className="text-[18px] font-semibold text-forest md:text-[20px]">
                일정
              </h2>
              <div className="mt-5 flex flex-col divide-y divide-border border-t border-b border-border">
                {product.itinerary.map((day) => (
                  <div key={day.day} className="flex gap-5 py-5">
                    <span className="font-display flex-shrink-0 text-[15px] font-semibold text-gold">
                      Day {day.day}
                    </span>
                    {day.image ? (
                      <div className="relative hidden h-20 w-28 flex-shrink-0 overflow-hidden rounded-lg sm:block">
                        <CoverImage src={getImage(day.image)} alt={day.title} sizes="112px" />
                      </div>
                    ) : null}
                    <div>
                      <p className="text-[14.5px] font-semibold text-text">
                        {day.title}
                      </p>
                      <p className="mt-1 text-[13.5px] leading-relaxed text-text-soft">
                        {day.description}
                      </p>
                      {day.hotel || day.meals?.length ? (
                        <div className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1.5">
                          {day.hotel ? (
                            <span className="inline-flex items-center gap-1.5 text-[12.5px] text-text-soft">
                              <BedDouble size={14} strokeWidth={1.5} className="text-forest/70" />
                              {day.hotel}
                            </span>
                          ) : null}
                          {day.meals?.length ? (
                            <span className="inline-flex items-center gap-1.5 text-[12.5px] text-text-soft">
                              <UtensilsCrossed
                                size={14}
                                strokeWidth={1.5}
                                className="text-forest/70"
                              />
                              {day.meals.join(" · ")}
                            </span>
                          ) : null}
                        </div>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {product.customizationQA?.length ? (
            <div className="mt-10">
              <h2 className="text-[18px] font-semibold text-forest md:text-[20px]">
                이렇게 바꾸셔도 됩니다
              </h2>
              <div className="mt-5 flex flex-col gap-4">
                {product.customizationQA.map((qa) => (
                  <div
                    key={qa.question}
                    className="rounded-xl border border-border bg-ivory p-5"
                  >
                    <p className="flex items-start gap-2 text-[14px] font-semibold text-text">
                      <MessageCircleQuestion
                        size={17}
                        strokeWidth={2}
                        className="mt-0.5 flex-shrink-0 text-forest"
                      />
                      &ldquo;{qa.question}&rdquo;
                    </p>
                    <p className="mt-2 text-[13.5px] leading-relaxed text-text-soft">
                      {qa.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {(product.included || product.excluded) && (
            <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
              {product.included ? (
                <div>
                  <h3 className="text-[15px] font-semibold text-forest">
                    포함사항
                  </h3>
                  <ul className="mt-3 space-y-2.5">
                    {product.included.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-[13.5px] text-text"
                      >
                        <Check
                          size={15}
                          strokeWidth={2}
                          className="mt-0.5 flex-shrink-0 text-forest"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {product.excluded ? (
                <div>
                  <h3 className="text-[15px] font-semibold text-forest">
                    불포함사항
                  </h3>
                  <ul className="mt-3 space-y-2.5">
                    {product.excluded.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-[13.5px] text-text-soft"
                      >
                        <XIcon
                          size={15}
                          strokeWidth={2}
                          className="mt-0.5 flex-shrink-0 text-text-soft/60"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          )}

          <TravelNotices type={product.type === "골프" ? "golf" : "travel"} />

          <div className="mt-10">
            <BookingProcess />
          </div>

          <div className="mt-10 border-t border-border pt-6">
            <p className="text-[12px] font-medium text-text-soft">함께 보면 좋아요</p>
            <div className="mt-2.5 flex flex-col gap-2">
              {product.type === "골프" ? (
                <Link
                  href="/golf"
                  className="text-[13px] font-medium text-forest underline underline-offset-2"
                >
                  골프장 전체보기 →
                </Link>
              ) : (
                <Link
                  href="/tours"
                  className="text-[13px] font-medium text-forest underline underline-offset-2"
                >
                  투어·액티비티 둘러보기 →
                </Link>
              )}
              <Link
                href="/transport"
                className="text-[13px] font-medium text-forest underline underline-offset-2"
              >
                차량·픽업 예약하기 →
              </Link>
              <Link
                href="/guide/faq"
                className="text-[13px] font-medium text-forest underline underline-offset-2"
              >
                자주 묻는 질문 보기 →
              </Link>
            </div>
          </div>

          <ReviewSection
            productType="product"
            productSlug={product.slug}
            productName={product.title}
            initialReviews={reviews}
            categoryCode={PRODUCT_TYPE_TO_REVIEW_CATEGORY[product.type]}
            destination={product.destination}
          />
        </div>

        <aside className="hidden h-fit rounded-xl border border-border bg-white p-6 md:sticky md:top-28 md:block">
          <GuestPriceCalculator
            itemName={product.title}
            topLabel={product.duration}
            unitLabel="1인기준"
            price={product.price}
            originalPrice={product.originalPrice}
            priceUsd={product.priceUsd}
            originalPriceUsd={product.originalPriceUsd}
          />
        </aside>
      </Container>

      <div className="fixed inset-x-0 bottom-16 z-40 border-t border-border bg-white/95 p-4 backdrop-blur-sm md:hidden">
        <div className="flex items-center justify-between gap-4">
          <GuestPriceCalculator
            compact
            itemName={product.title}
            topLabel={product.duration}
            unitLabel="1인기준"
            price={product.price}
            originalPrice={product.originalPrice}
            priceUsd={product.priceUsd}
            originalPriceUsd={product.originalPriceUsd}
          />
        </div>
      </div>
    </div>
  );
}
