import Link from "next/link";
import { Users, BedDouble, Waves, ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import CoverImage from "@/components/ui/CoverImage";
import { formatPrice, formatPriceUsd } from "@/lib/format";
import { getAllVillas } from "@/lib/data/villas";
import { getImage } from "@/data/images";

export default async function VillaShowcase() {
  const featuredVillas = await getAllVillas();
  // Hide the section entirely when there's no published inventory yet,
  // rather than show an empty list next to the hero photo.
  if (featuredVillas.length === 0) return null;

  return (
    <section className="border-t border-border bg-ivory py-20 md:py-28">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Stays"
            title="풀빌라부터 호텔까지, 편안한 숙소를 찾아보세요"
          />
          <Link
            href="/villas"
            className="hidden shrink-0 items-center gap-1.5 border-b border-forest py-2 text-sm font-medium text-forest transition-colors hover:text-forest-light md:inline-flex"
          >
            숙소 전체보기
            <ArrowRight size={14} strokeWidth={2} />
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 md:mt-12 md:grid-cols-5">
          <div className="relative aspect-[4/5] overflow-hidden rounded-xl md:col-span-3">
            <CoverImage
              src={getImage("villa-hero")}
              alt="라오스 프라이빗 풀빌라"
              sizes="(min-width: 768px) 60vw, 100vw"
            />
          </div>

          <div className="flex flex-col divide-y divide-border rounded-xl border border-border bg-white md:col-span-2">
            {featuredVillas.map((villa) => (
              <Link
                key={villa.slug}
                href={`/villas/${villa.slug}`}
                className="group flex gap-4 p-4 transition-colors hover:bg-forest/[0.03] md:p-5"
              >
                <div className="relative h-24 w-28 flex-shrink-0 overflow-hidden rounded-sm">
                  <CoverImage
                    src={getImage(villa.image)}
                    alt={villa.name}
                    sizes="112px"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-center">
                  <p className="text-xs font-medium tracking-wide text-gold">
                    {villa.location}
                  </p>
                  <h3 className="mt-1 text-[15px] font-semibold text-text">
                    {villa.name}
                  </h3>
                  <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-text-soft">
                    <span className="inline-flex items-center gap-1">
                      <Users size={12.5} strokeWidth={1.5} /> {villa.maxGuests}명
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <BedDouble size={12.5} strokeWidth={1.5} /> {villa.bedrooms}
                      Bed
                    </span>
                    {villa.hasPrivatePool && (
                      <span className="inline-flex items-center gap-1">
                        <Waves size={12.5} strokeWidth={1.5} /> Private Pool
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex flex-shrink-0 flex-col items-end justify-center gap-2">
                  <span className="flex flex-col items-end">
                    <span className="text-sm font-semibold text-forest">
                      {villa.price === 0 ? "가격 문의" : formatPrice(villa.price)}
                    </span>
                    {villa.price !== 0 && villa.priceUsd ? (
                      <span className="text-[11px] text-text-soft">{formatPriceUsd(villa.priceUsd)}</span>
                    ) : null}
                  </span>
                  <ArrowRight
                    size={15}
                    strokeWidth={1.75}
                    className="text-text-soft transition-transform group-hover:translate-x-1"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link
            href="/villas"
            className="inline-flex items-center gap-1.5 border-b border-forest py-2 text-sm font-medium text-forest"
          >
            숙소 전체보기
            <ArrowRight size={14} strokeWidth={2} />
          </Link>
        </div>
      </Container>
    </section>
  );
}
