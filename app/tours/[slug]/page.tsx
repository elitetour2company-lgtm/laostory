import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, MapPin, Check, X as XIcon } from "lucide-react";
import Container from "@/components/ui/Container";
import CoverImage from "@/components/ui/CoverImage";
import Badge from "@/components/ui/Badge";
import PhotoGallery from "@/components/ui/PhotoGallery";
import BookingProcess from "@/components/ui/BookingProcess";
import TravelNotices from "@/components/ui/TravelNotices";
import WishlistButton from "@/components/ui/WishlistButton";
import ShareButton from "@/components/ui/ShareButton";
import GuestPriceCalculator from "@/components/ui/GuestPriceCalculator";
import StatTiles from "@/components/ui/StatTiles";
import { getTourBySlug, getTourSlugs } from "@/lib/data/tours";
import { getReviewsForProduct } from "@/lib/data/reviews";
import { getImage } from "@/data/images";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema, productSchema } from "@/lib/seo/schema";
import ReviewSection from "@/components/reviews/ReviewSection";

export async function generateStaticParams() {
  const slugs = await getTourSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tour = await getTourBySlug(slug);
  if (!tour) return {};
  const image = getImage(tour.image);
  return {
    title: tour.title,
    description: tour.description,
    openGraph: {
      title: tour.title,
      description: tour.description,
      images: [image ?? "/images/vangvieng-hero.jpg"],
      locale: "ko_KR",
      type: "website",
    },
  };
}

export default async function TourDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tour = await getTourBySlug(slug);
  if (!tour) notFound();

  const reviews = await getReviewsForProduct("tour", tour.slug);

  const priceBasis = tour.description.includes("1대기준") ? "1대기준" : "1인기준";

  const tourStats: { value: string; label: string }[] = [
    { value: tour.duration, label: "소요시간" },
    { value: `${tour.included.length}가지`, label: "포함사항" },
    { value: `${tour.schedule.length}개`, label: "일정 코스" },
  ];

  return (
    <div className="pb-24 md:pb-16">
      <JsonLd
        data={breadcrumbSchema([
          { name: "홈", path: "/" },
          { name: "투어·액티비티", path: "/tours" },
          { name: tour.title, path: `/tours/${tour.slug}` },
        ])}
      />
      <JsonLd
        data={productSchema({
          name: tour.title,
          description: tour.description,
          image: getImage(tour.image),
          price: tour.price,
          path: `/tours/${tour.slug}`,
        })}
      />
      <div className="relative aspect-[16/9] w-full overflow-hidden md:aspect-[21/9]">
        <CoverImage
          src={getImage(tour.image)}
          alt={tour.title}
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest/60 via-forest/5 to-transparent" />
        <div className="absolute right-4 top-20 flex items-center gap-2 md:top-24">
          <ShareButton title={tour.title} />
          <WishlistButton type="tour" slug={tour.slug} />
        </div>
        <Container className="absolute inset-x-0 bottom-0 pb-6 md:pb-10">
          <p className="inline-flex items-center gap-1.5 text-xs font-medium tracking-wide text-gold-soft">
            <MapPin size={13} strokeWidth={2} />
            {tour.destination}
          </p>
          <h1 className="font-display mt-2 max-w-2xl text-[26px] font-semibold text-white md:text-[38px]">
            {tour.title}
          </h1>
        </Container>
      </div>

      <Container className="mt-8 grid grid-cols-1 gap-10 md:mt-12 md:grid-cols-[1fr_340px]">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="forest">{tour.category}</Badge>
            <span className="inline-flex items-center gap-1.5 text-[13.5px] text-text-soft">
              <Clock size={14} strokeWidth={1.5} />
              {tour.duration}
            </span>
          </div>

          <div className="mt-5">
            <StatTiles stats={tourStats} />
          </div>

          <p className="mt-5 text-[15px] leading-relaxed text-text md:text-base">
            {tour.description}
          </p>

          {tour.gallery.length > 0 ? (
            <div className="mt-6">
              <PhotoGallery
                photos={[
                  ...(getImage(tour.image)
                    ? [{ key: "hero", src: getImage(tour.image)!, alt: tour.title }]
                    : []),
                  ...tour.gallery
                    .map((key, i) => {
                      const src = getImage(key);
                      return src ? { key, src, alt: `${tour.title} 사진 ${i + 2}` } : null;
                    })
                    .filter((p): p is { key: string; src: string; alt: string } => p !== null),
                ]}
              />
            </div>
          ) : null}

          <div className="mt-10">
            <h2 className="text-[18px] font-semibold text-forest md:text-[20px]">
              일정
            </h2>
            <div className="mt-5 flex flex-col divide-y divide-border border-t border-b border-border">
              {tour.schedule.map((item) => (
                <div key={item.time} className="flex gap-5 py-4">
                  <span className="font-display flex-shrink-0 text-[14px] font-semibold text-gold">
                    {item.time}
                  </span>
                  <p className="text-[13.5px] text-text">{item.activity}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
            <div>
              <h3 className="text-[15px] font-semibold text-forest">포함사항</h3>
              <ul className="mt-3 space-y-2.5">
                {tour.included.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-[13.5px] text-text"
                  >
                    <Check size={15} strokeWidth={2} className="mt-0.5 flex-shrink-0 text-forest" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-[15px] font-semibold text-forest">불포함사항</h3>
              <ul className="mt-3 space-y-2.5">
                {tour.excluded.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-[13.5px] text-text-soft"
                  >
                    <XIcon size={15} strokeWidth={2} className="mt-0.5 flex-shrink-0 text-text-soft/60" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-10">
            <h3 className="text-[15px] font-semibold text-forest">미팅 장소</h3>
            <p className="mt-2 text-[13.5px] text-text-soft">{tour.meetingPoint}</p>
          </div>

          <TravelNotices type="tour" />

          <div className="mt-10">
            <BookingProcess />
          </div>

          <div className="mt-10 border-t border-border pt-6">
            <p className="text-[12px] font-medium text-text-soft">함께 보면 좋아요</p>
            <div className="mt-2.5 flex flex-col gap-2">
              <Link
                href="/travel"
                className="text-[13px] font-medium text-forest underline underline-offset-2"
              >
                여행상품 전체보기 →
              </Link>
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
            productType="tour"
            productSlug={tour.slug}
            productName={tour.title}
            initialReviews={reviews}
            categoryCode="TOUR"
            destination={tour.destination}
          />
        </div>

        <aside className="hidden h-fit rounded-xl border border-border bg-white p-6 md:sticky md:top-28 md:block">
          <GuestPriceCalculator
            itemName={tour.title}
            unitLabel={priceBasis}
            price={tour.price}
            priceUsd={tour.priceUsd}
            enableCalculator={priceBasis === "1인기준"}
          />
        </aside>
      </Container>

      <div className="fixed inset-x-0 bottom-16 z-40 border-t border-border bg-white/95 p-4 backdrop-blur-sm md:hidden">
        <div className="flex items-center justify-between gap-4">
          <GuestPriceCalculator
            compact
            itemName={tour.title}
            unitLabel={priceBasis}
            price={tour.price}
            priceUsd={tour.priceUsd}
            enableCalculator={priceBasis === "1인기준"}
          />
        </div>
      </div>
    </div>
  );
}
