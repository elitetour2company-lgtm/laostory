import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";
import CoverImage from "@/components/ui/CoverImage";
import { getAllDestinations } from "@/lib/data/destinations";
import { getImage } from "@/data/images";

export const metadata: Metadata = {
  title: "라오스 여행지",
  description: "라오스의 매력적인 도시들을 만나보세요.",
};

export default async function DestinationsPage() {
  const destinations = await getAllDestinations();

  return (
    <>
      <PageHeader
        eyebrow="Destinations"
        title="여행지"
        description="라오스에서 만날 수 있는 도시들을 미리 둘러보세요."
      />

      <Container className="py-10 md:py-14">
        {destinations.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-4">
            {destinations.map((d) => (
              <Link
                key={d.slug}
                href={`/destinations/${d.slug}`}
                className="group block overflow-hidden rounded-xl border border-border bg-white transition-shadow duration-300 hover:shadow-[0_8px_28px_-8px_rgba(18,60,50,0.18)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <CoverImage
                    src={getImage(d.image)}
                    alt={d.name}
                    sizes="(min-width: 768px) 25vw, 90vw"
                    className="transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="p-5">
                  <p className="text-xs font-medium tracking-wide text-gold">
                    {d.nameEn}
                  </p>
                  <h3 className="mt-1.5 text-[16px] font-semibold text-text">
                    {d.name}
                  </h3>
                  <p className="mt-1.5 line-clamp-2 text-[13.5px] leading-relaxed text-text-soft">
                    {d.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="mt-14 text-center text-[14.5px] text-text-soft">
            조건에 맞는 결과가 아직 준비되어 있지 않습니다.
          </p>
        )}
      </Container>
    </>
  );
}
