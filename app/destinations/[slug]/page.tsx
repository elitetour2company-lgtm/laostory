import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, MapPin, Lightbulb } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import CoverImage from "@/components/ui/CoverImage";
import PhotoGallery from "@/components/ui/PhotoGallery";
import ProductCard from "@/components/product/ProductCard";
import VillaCard from "@/components/villa/VillaCard";
import GolfCard from "@/components/golf/GolfCard";
import TourCard from "@/components/tour/TourCard";
import Button from "@/components/ui/Button";
import { getDestinationBySlug, getDestinationSlugs } from "@/lib/data/destinations";
import { getAllProducts } from "@/lib/data/products";
import { getAllVillas } from "@/lib/data/villas";
import { getAllGolfCourses } from "@/lib/data/golf";
import { getAllTours } from "@/lib/data/tours";
import { getImage } from "@/data/images";

export async function generateStaticParams() {
  const slugs = await getDestinationSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const destination = await getDestinationBySlug(slug);
  if (!destination) return {};
  const image = getImage(destination.image);
  return {
    title: destination.name,
    description: destination.description,
    openGraph: {
      title: destination.name,
      description: destination.description,
      images: [image ?? "/images/vangvieng-hero.jpg"],
      locale: "ko_KR",
      type: "website",
    },
  };
}

export default async function DestinationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const destination = await getDestinationBySlug(slug);
  if (!destination) notFound();

  const [travelProducts, featuredVillas, golfCourses, tours] = await Promise.all([
    getAllProducts(),
    getAllVillas(),
    getAllGolfCourses(),
    getAllTours(),
  ]);

  const relatedProducts = travelProducts.filter((p) =>
    p.destination.includes(destination.name)
  );
  const relatedVillas = featuredVillas.filter(
    (v) => v.location === destination.name
  );
  const relatedGolf = golfCourses.filter(
    (g) => g.location === destination.name
  );
  const relatedTours = tours.filter(
    (t) => t.destination === destination.name
  );

  return (
    <div className="pb-16">
      <div className="relative h-[360px] w-full overflow-hidden md:h-[460px]">
        <CoverImage
          src={getImage(destination.image)}
          alt={destination.name}
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest/70 via-forest/10 to-forest/30" />
        <Container className="absolute inset-x-0 bottom-0 pb-8 md:pb-12">
          <p className="font-display text-[11px] tracking-[0.3em] text-gold-soft">
            {destination.nameEn}
          </p>
          <h1 className="font-display mt-2 text-[30px] font-semibold text-white md:text-[42px]">
            {destination.name}
          </h1>
          <p className="mt-2 max-w-lg text-[14.5px] text-white/80 md:text-base">
            {destination.description}
          </p>
        </Container>
      </div>

      <Container className="mt-10 md:mt-14">
        <SectionHeading eyebrow="Things To Do" title="이런 것들을 즐길 수 있어요" />
        <div className="mt-6 flex flex-wrap gap-2.5">
          {destination.highlights.map((h) => (
            <span
              key={h}
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-[13.5px] text-text"
            >
              <MapPin size={13} strokeWidth={1.5} className="text-gold" />
              {h}
            </span>
          ))}
        </div>
      </Container>

      {destination.gallery.length > 0 && (
        <Container className="mt-14 border-t border-border pt-10 md:mt-16 md:pt-14">
          <SectionHeading eyebrow="Photo Gallery" title="여행지 사진" />
          <div className="mt-6">
            <PhotoGallery
              photos={[
                ...(getImage(destination.image)
                  ? [{ key: "hero", src: getImage(destination.image)!, alt: destination.name }]
                  : []),
                ...destination.gallery
                  .map((key, i) => {
                    const src = getImage(key);
                    return src ? { key, src, alt: `${destination.name} 사진 ${i + 2}` } : null;
                  })
                  .filter((p): p is { key: string; src: string; alt: string } => p !== null),
              ]}
            />
          </div>
        </Container>
      )}

      {relatedProducts.length > 0 && (
        <Container className="mt-14 border-t border-border pt-10 md:mt-16 md:pt-14">
          <div className="flex items-center justify-between">
            <SectionHeading eyebrow="Travel Products" title="관련 여행상품" />
            <Link
              href="/travel"
              className="hidden shrink-0 items-center gap-1.5 text-[13.5px] font-medium text-forest hover:text-forest-light md:inline-flex"
            >
              전체보기 <ArrowRight size={14} strokeWidth={2} />
            </Link>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
            {relatedProducts.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </Container>
      )}

      {relatedVillas.length > 0 && (
        <Container className="mt-14 border-t border-border pt-10 md:mt-16 md:pt-14">
          <SectionHeading eyebrow="Stays" title="관련 숙소" />
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
            {relatedVillas.map((v) => (
              <VillaCard key={v.slug} villa={v} />
            ))}
          </div>
        </Container>
      )}

      {relatedGolf.length > 0 && (
        <Container className="mt-14 border-t border-border pt-10 md:mt-16 md:pt-14">
          <SectionHeading eyebrow="Golf" title="관련 골프장" />
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
            {relatedGolf.map((g) => (
              <GolfCard key={g.slug} course={g} />
            ))}
          </div>
        </Container>
      )}

      {relatedTours.length > 0 && (
        <Container className="mt-14 border-t border-border pt-10 md:mt-16 md:pt-14">
          <SectionHeading eyebrow="Tours" title="관련 투어" />
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
            {relatedTours.map((t) => (
              <TourCard key={t.slug} tour={t} />
            ))}
          </div>
        </Container>
      )}

      <Container className="mt-14 border-t border-border pt-10 md:mt-16 md:pt-14">
        <SectionHeading eyebrow="Travel Tips" title="여행 팁" />
        <ul className="mt-6 space-y-3">
          {destination.travelTips.map((tip) => (
            <li key={tip} className="flex items-start gap-2.5 text-[14px] text-text-soft">
              <Lightbulb size={16} strokeWidth={1.5} className="mt-0.5 flex-shrink-0 text-gold" />
              {tip}
            </li>
          ))}
        </ul>
      </Container>

      <Container className="mt-14 text-center md:mt-16">
        <Button href="/consultation" variant="primary">
          {destination.name} 여행 상담받기
        </Button>
      </Container>
    </div>
  );
}
