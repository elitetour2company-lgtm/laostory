import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Users, BedDouble, Bath, Waves, Check, MapPin } from "lucide-react";
import Container from "@/components/ui/Container";
import CoverImage from "@/components/ui/CoverImage";
import PhotoGallery from "@/components/ui/PhotoGallery";
import Button from "@/components/ui/Button";
import LocationMap from "@/components/ui/LocationMap";
import WishlistButton from "@/components/ui/WishlistButton";
import ShareButton from "@/components/ui/ShareButton";
import { getVillaBySlug, getVillaSlugs } from "@/lib/data/villas";
import { getReviewsForProduct } from "@/lib/data/reviews";
import { getImage } from "@/data/images";
import { formatPrice } from "@/lib/format";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema, productSchema } from "@/lib/seo/schema";
import ReviewSection from "@/components/reviews/ReviewSection";

export async function generateStaticParams() {
  const slugs = await getVillaSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const villa = await getVillaBySlug(slug);
  if (!villa) return {};
  const image = getImage(villa.image);
  return {
    title: villa.name,
    description: villa.description,
    openGraph: {
      title: villa.name,
      description: villa.description,
      images: [image ?? "/images/vangvieng-hero.jpg"],
      locale: "ko_KR",
      type: "website",
    },
  };
}

export default async function VillaDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const villa = await getVillaBySlug(slug);
  if (!villa) notFound();

  const reviews = await getReviewsForProduct("villa", villa.slug);

  const bookingHref = `/consultation?items=${encodeURIComponent(
    `${villa.name} - ${villa.price === 0 ? "가격 문의" : formatPrice(villa.price)}`
  )}`;

  const keyInfo = [
    { icon: Users, label: `최대 ${villa.maxGuests}명` },
    { icon: BedDouble, label: `침실 ${villa.bedrooms}개` },
    { icon: Bath, label: `욕실 ${villa.bathrooms}개` },
    ...(villa.hasPrivatePool ? [{ icon: Waves, label: "Private Pool" }] : []),
  ];

  return (
    <div className="pb-24 md:pb-16">
      <JsonLd
        data={breadcrumbSchema([
          { name: "홈", path: "/" },
          { name: "풀빌라·호텔", path: "/villas" },
          { name: villa.name, path: `/villas/${villa.slug}` },
        ])}
      />
      <JsonLd
        data={productSchema({
          name: villa.name,
          description: villa.description,
          image: getImage(villa.image),
          price: villa.price,
          path: `/villas/${villa.slug}`,
        })}
      />
      <div className="relative aspect-[16/9] w-full overflow-hidden md:aspect-[21/9]">
        <CoverImage
          src={getImage(villa.image)}
          alt={villa.name}
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest/60 via-forest/5 to-transparent" />
        <div className="absolute right-4 top-20 flex items-center gap-2 md:top-24">
          <ShareButton title={villa.name} />
          <WishlistButton type="villa" slug={villa.slug} />
        </div>
        <Container className="absolute inset-x-0 bottom-0 pb-6 md:pb-10">
          <p className="inline-flex items-center gap-1.5 text-xs font-medium tracking-wide text-gold-soft">
            <MapPin size={13} strokeWidth={2} />
            {villa.location}
          </p>
          <h1 className="font-display mt-2 max-w-2xl text-[26px] font-semibold text-white md:text-[38px]">
            {villa.name}
          </h1>
        </Container>
      </div>

      <Container className="mt-8 grid grid-cols-1 gap-10 md:mt-12 md:grid-cols-[1fr_340px]">
        <div>
          <div className="flex flex-wrap gap-x-6 gap-y-3 border-b border-border pb-6">
            {keyInfo.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-2 text-[14px] text-text"
              >
                <Icon size={17} strokeWidth={1.5} className="text-forest" />
                {label}
              </span>
            ))}
          </div>

          <LocationMap query={`${villa.name}, ${villa.location}, 라오스`} />

          {villa.gallery.length > 0 ? (
            <div className="mt-8">
              <PhotoGallery
                photos={[
                  ...(getImage(villa.image)
                    ? [{ key: "hero", src: getImage(villa.image)!, alt: villa.name }]
                    : []),
                  ...villa.gallery
                    .map((key, i) => {
                      const src = getImage(key);
                      return src ? { key, src, alt: `${villa.name} 사진 ${i + 2}` } : null;
                    })
                    .filter((p): p is { key: string; src: string; alt: string } => p !== null),
                ]}
              />
            </div>
          ) : null}

          <p className="mt-6 text-[15px] leading-relaxed text-text md:text-base">
            {villa.description}
          </p>

          <div className="mt-10">
            <h2 className="text-[18px] font-semibold text-forest md:text-[20px]">
              시설
            </h2>
            <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3">
              {villa.facilities.map((facility) => (
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

          <div className="mt-10">
            <h2 className="text-[18px] font-semibold text-forest md:text-[20px]">
              주변 명소
            </h2>
            <ul className="mt-5 space-y-2.5">
              {villa.nearby.map((place) => (
                <li
                  key={place}
                  className="flex items-center gap-2 text-[13.5px] text-text-soft"
                >
                  <MapPin size={14} strokeWidth={1.5} className="flex-shrink-0 text-gold" />
                  {place}
                </li>
              ))}
            </ul>
          </div>

          <ReviewSection
            productType="villa"
            productSlug={villa.slug}
            productName={villa.name}
            initialReviews={reviews}
            categoryCode={villa.hasPrivatePool ? "POOL_VILLA" : "HOTEL"}
            destination={villa.location}
          />
        </div>

        <aside className="hidden h-fit rounded-xl border border-border bg-white p-6 md:sticky md:top-28 md:block">
          {villa.price === 0 ? (
            <p className="text-[22px] font-semibold text-forest">가격 문의</p>
          ) : (
            <>
              <p className="text-[13px] text-text-soft">1박기준</p>
              <p className="mt-1 text-[22px] font-semibold text-forest">
                {formatPrice(villa.price)}
              </p>
            </>
          )}
          <Button href={bookingHref} variant="primary" className="mt-5 w-full">
            예약하기
          </Button>
          <Button href={bookingHref} variant="ghost" className="mt-2.5 w-full">
            1:1 여행상담
          </Button>
        </aside>
      </Container>

      <div className="fixed inset-x-0 bottom-16 z-40 border-t border-border bg-white/95 p-4 backdrop-blur-sm md:hidden">
        <div className="flex items-center justify-between gap-4">
          <div>
            {villa.price === 0 ? (
              <p className="text-[16px] font-semibold text-forest">가격 문의</p>
            ) : (
              <>
                <p className="text-[11px] text-text-soft">1박기준</p>
                <p className="text-[16px] font-semibold text-forest">
                  {formatPrice(villa.price)}
                </p>
              </>
            )}
          </div>
          <Button href={bookingHref} variant="primary" className="flex-shrink-0">
            예약하기
          </Button>
        </div>
      </div>
    </div>
  );
}
