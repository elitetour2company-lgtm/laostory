import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import CoverImage from "@/components/ui/CoverImage";
import { getAllDestinations } from "@/lib/data/destinations";
import { getImage } from "@/data/images";
import { Destination } from "@/types";

function DestinationCard({
  dest,
  className = "",
  sizes,
}: {
  dest: Destination;
  className?: string;
  sizes: string;
}) {
  return (
    <Link
      href={`/destinations/${dest.slug}`}
      className={`group relative block overflow-hidden rounded-xl ${className}`}
    >
      <CoverImage
        src={getImage(dest.image)}
        alt={dest.name}
        sizes={sizes}
        className="transition-transform duration-500 group-hover:scale-[1.05]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-forest/80 via-forest/5 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-5">
        <p className="font-display text-xs tracking-[0.25em] text-gold-soft">
          {dest.nameEn}
        </p>
        <h3 className="mt-1 text-[17px] font-semibold text-white">
          {dest.name}
        </h3>
        <p className="mt-1.5 hidden max-w-xs text-xs leading-snug text-white/70 md:block">
          {dest.description}
        </p>
      </div>
    </Link>
  );
}

export default async function DestinationGrid() {
  const destinations = await getAllDestinations();
  if (destinations.length === 0) return null;
  const [main, ...rest] = destinations.slice(0, 4);

  return (
    <section className="border-t border-border bg-ivory py-20 md:py-28">
      <Container>
        <SectionHeading
          eyebrow="Destinations"
          title="라오스, 어디로 떠나볼까요"
          align="center"
        />

        {/* Mobile: 2-column grid */}
        <div className="mt-10 grid grid-cols-2 gap-3 md:hidden">
          {destinations.map((dest) => (
            <DestinationCard
              key={dest.slug}
              dest={dest}
              className="aspect-[3/4]"
              sizes="50vw"
            />
          ))}
        </div>

        {/* Desktop: bento grid, one large + three small */}
        <div className="mt-12 hidden gap-4 md:grid md:h-[620px] md:grid-cols-2">
          <DestinationCard
            dest={main}
            className="h-full"
            sizes="(min-width: 768px) 50vw, 100vw"
          />
          <div className="grid h-full grid-rows-3 gap-4">
            {rest.map((dest) => (
              <DestinationCard
                key={dest.slug}
                dest={dest}
                className="h-full"
                sizes="(min-width: 768px) 25vw, 50vw"
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
