import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Check, X as XIcon } from "lucide-react";
import Container from "@/components/ui/Container";
import CoverImage from "@/components/ui/CoverImage";
import PhotoGallery from "@/components/ui/PhotoGallery";
import BookingProcess from "@/components/ui/BookingProcess";
import TravelNotices from "@/components/ui/TravelNotices";
import WishlistButton from "@/components/ui/WishlistButton";
import ShareButton from "@/components/ui/ShareButton";
import LocationMap from "@/components/ui/LocationMap";
import GolfPriceCalculator from "@/components/golf/GolfPriceCalculator";
import { getGolfCourseBySlug, getGolfCourseSlugs } from "@/lib/data/golf";
import { getReviewsForProduct } from "@/lib/data/reviews";
import { getImage } from "@/data/images";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema, productSchema } from "@/lib/seo/schema";
import ReviewSection from "@/components/reviews/ReviewSection";

export async function generateStaticParams() {
  const slugs = await getGolfCourseSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = await getGolfCourseBySlug(slug);
  if (!course) return {};
  const image = getImage(course.image);
  return {
    title: course.name,
    description: course.description,
    openGraph: {
      title: course.name,
      description: course.description,
      images: [image ?? "/images/vangvieng-hero.jpg"],
      locale: "ko_KR",
      type: "website",
    },
  };
}

export default async function GolfCourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = await getGolfCourseBySlug(slug);
  if (!course) notFound();

  const reviews = await getReviewsForProduct("golf_course", course.slug);

  return (
    <div className="pb-24 md:pb-16">
      <JsonLd
        data={breadcrumbSchema([
          { name: "홈", path: "/" },
          { name: "골프", path: "/golf" },
          { name: course.name, path: `/golf/courses/${course.slug}` },
        ])}
      />
      <JsonLd
        data={productSchema({
          name: course.name,
          description: course.description,
          image: getImage(course.image),
          price: course.price,
          path: `/golf/courses/${course.slug}`,
        })}
      />
      <div className="relative aspect-[16/9] w-full overflow-hidden md:aspect-[21/9]">
        <CoverImage
          src={getImage(course.image)}
          alt={course.name}
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest/60 via-forest/5 to-transparent" />
        <div className="absolute right-4 top-20 flex items-center gap-2 md:top-24">
          <ShareButton title={course.name} />
          <WishlistButton type="golf" slug={course.slug} />
        </div>
        <Container className="absolute inset-x-0 bottom-0 pb-6 md:pb-10">
          <p className="inline-flex items-center gap-1.5 text-xs font-medium tracking-wide text-gold-soft">
            <MapPin size={13} strokeWidth={2} />
            {course.location}
          </p>
          <h1 className="font-display mt-2 max-w-2xl text-[26px] font-semibold text-white md:text-[38px]">
            {course.name}
          </h1>
        </Container>
      </div>

      <Container className="mt-8 grid grid-cols-1 gap-10 md:mt-12 md:grid-cols-[1fr_340px]">
        <div>
          <div className="grid grid-cols-2 gap-3 border-b border-border pb-8 sm:grid-cols-4">
            <div className="rounded-lg bg-ivory p-4">
              <p className="text-[20px] font-semibold text-forest">{course.holes}</p>
              <p className="mt-0.5 text-[12px] text-text-soft">Holes</p>
            </div>
            <div className="rounded-lg bg-ivory p-4">
              <p className="text-[20px] font-semibold text-forest">
                Par {course.par}
                {course.yardage ? (
                  <span className="text-[13px] font-normal text-text-soft">
                    {" "}
                    · {course.yardage.toLocaleString()}yd
                  </span>
                ) : null}
              </p>
              <p className="mt-0.5 text-[12px] text-text-soft">코스 규모</p>
            </div>
            <div className="rounded-lg bg-ivory p-4">
              <p className="text-[20px] font-semibold text-forest">{course.difficulty}</p>
              <p className="mt-0.5 text-[12px] text-text-soft">난이도</p>
            </div>
            {course.locationNote ? (
              <div className="rounded-lg bg-ivory p-4">
                <p className="text-[14px] font-semibold leading-snug text-forest">
                  {course.locationNote}
                </p>
                <p className="mt-0.5 text-[12px] text-text-soft">위치</p>
              </div>
            ) : null}
          </div>

          <LocationMap query={`${course.name} 골프장, ${course.location}, 라오스`} />

          <p className="mt-6 text-[15px] leading-relaxed text-text md:text-base">
            {course.description}
          </p>

          {course.gallery.length > 0 ? (
            <div className="mt-8">
              <PhotoGallery
                photos={[
                  ...(getImage(course.image)
                    ? [{ key: "hero", src: getImage(course.image)!, alt: course.name }]
                    : []),
                  ...course.gallery
                    .map((key, i) => {
                      const src = getImage(key);
                      return src ? { key, src, alt: `${course.name} 사진 ${i + 2}` } : null;
                    })
                    .filter((p): p is { key: string; src: string; alt: string } => p !== null),
                ]}
              />
            </div>
          ) : null}

          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
            <div>
              <h3 className="text-[15px] font-semibold text-forest">포함사항</h3>
              <ul className="mt-3 space-y-2.5">
                <li className="flex items-center gap-2 text-[13.5px] text-text">
                  {course.includesCart ? (
                    <Check size={15} strokeWidth={2} className="flex-shrink-0 text-forest" />
                  ) : (
                    <XIcon size={15} strokeWidth={2} className="flex-shrink-0 text-text-soft/60" />
                  )}
                  카트
                </li>
                <li className="flex items-center gap-2 text-[13.5px] text-text">
                  {course.includesCaddie ? (
                    <Check size={15} strokeWidth={2} className="flex-shrink-0 text-forest" />
                  ) : (
                    <XIcon size={15} strokeWidth={2} className="flex-shrink-0 text-text-soft/60" />
                  )}
                  캐디
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-[15px] font-semibold text-forest">부대시설</h3>
              <ul className="mt-3 space-y-2.5">
                {course.facilities.map((facility) => (
                  <li
                    key={facility}
                    className="flex items-center gap-2 text-[13.5px] text-text"
                  >
                    <Check size={15} strokeWidth={2} className="flex-shrink-0 text-forest" />
                    {facility}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <TravelNotices type="golf" />

          <div className="mt-10">
            <BookingProcess />
          </div>

          <div className="mt-10 border-t border-border pt-6">
            <p className="text-[12px] font-medium text-text-soft">함께 보면 좋아요</p>
            <div className="mt-2.5 flex flex-col gap-2">
              <Link
                href="/golf"
                className="text-[13px] font-medium text-forest underline underline-offset-2"
              >
                골프 패키지 전체보기 →
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
            productType="golf_course"
            productSlug={course.slug}
            productName={course.name}
            initialReviews={reviews}
            categoryCode="GOLF"
            destination={course.location}
          />
        </div>

        <aside className="hidden h-fit rounded-xl border border-border bg-white p-6 md:sticky md:top-28 md:block">
          <GolfPriceCalculator
            itemName={course.name}
            price={course.price}
            priceUsd={course.priceUsd}
            weekendPrice={course.weekendPrice}
            weekendPriceUsd={course.weekendPriceUsd}
          />
        </aside>
      </Container>

      <div className="fixed inset-x-0 bottom-16 z-40 border-t border-border bg-white/95 p-4 backdrop-blur-sm md:hidden">
        <div className="flex items-center justify-between gap-4">
          <GolfPriceCalculator
            compact
            itemName={course.name}
            price={course.price}
            priceUsd={course.priceUsd}
            weekendPrice={course.weekendPrice}
            weekendPriceUsd={course.weekendPriceUsd}
          />
        </div>
      </div>
    </div>
  );
}
