import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import CoverImage from "@/components/ui/CoverImage";
import Button from "@/components/ui/Button";
import {
  getAllGuideArticles,
  getGuideArticleBySlug,
  getGuideArticleSlugs,
} from "@/lib/data/guide";
import { getImage } from "@/data/images";

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await getGuideArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getGuideArticleBySlug(slug);
  if (!article) return {};
  const image = getImage(article.image);
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [image ?? "/images/vangvieng-hero.jpg"],
      locale: "ko_KR",
      type: "article",
    },
  };
}

export default async function GuideDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getGuideArticleBySlug(slug);
  if (!article) notFound();

  const all = await getAllGuideArticles();
  const others = all.filter((a) => a.slug !== article.slug);
  const sameCategory = others.filter((a) => a.category === article.category);
  const rotateFrom = Math.max(
    0,
    all.filter((a) => a.category === article.category).findIndex((a) => a.slug === article.slug)
  );
  const rotated = sameCategory.length
    ? [...sameCategory.slice(rotateFrom % sameCategory.length), ...sameCategory.slice(0, rotateFrom % sameCategory.length)]
    : [];
  const related = [...rotated, ...others.filter((a) => a.category !== article.category)].slice(0, 3);

  return (
    <div className="pb-16">
      <div className="relative aspect-[16/9] w-full overflow-hidden md:aspect-[21/9]">
        <CoverImage
          src={getImage(article.image)}
          alt={article.title}
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest/60 via-forest/5 to-transparent" />
        <Container className="absolute inset-x-0 bottom-0 pb-6 md:pb-10">
          <p className="text-xs font-medium tracking-wide text-gold-soft">
            {article.category}
          </p>
          <h1 className="font-display mt-2 max-w-2xl text-[24px] font-semibold text-white md:text-[34px]">
            {article.title}
          </h1>
        </Container>
      </div>

      <Container className="mt-8 md:mt-12">
        <div className="mx-auto max-w-2xl">
          <p className="text-[15px] leading-relaxed text-text-soft">
            {article.excerpt}
          </p>

          <div className="mt-8 space-y-5 border-t border-border pt-8">
            {(article.content ?? []).map((paragraph, i) => (
              <p key={i} className="text-[15px] leading-relaxed text-text">
                {paragraph}
              </p>
            ))}
          </div>

          {article.images && article.images.length > 0 ? (
            <div className="mt-8 space-y-4">
              {article.images.map((src) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={src}
                  src={src}
                  alt=""
                  loading="lazy"
                  className="h-auto w-full rounded-xl border border-border"
                />
              ))}
            </div>
          ) : null}

          {related.length > 0 ? (
            <div className="mt-12 border-t border-border pt-8">
              <h2 className="text-[15px] font-semibold text-forest">함께 읽으면 좋은 글</h2>
              <div className="mt-4 flex flex-col divide-y divide-border">
                {related.map((a) => (
                  <Link
                    key={a.slug}
                    href={`/guide/${a.slug}`}
                    className="group flex gap-4 py-4 first:pt-0"
                  >
                    <div className="relative h-20 w-28 flex-shrink-0 overflow-hidden rounded-md">
                      <CoverImage
                        src={getImage(a.image)}
                        alt=""
                        sizes="112px"
                        className="transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <p className="text-xs font-medium tracking-wide text-gold">{a.category}</p>
                      <p className="mt-1 line-clamp-2 text-[14px] font-semibold leading-snug text-text">
                        {a.title}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : null}

          <div className="mt-12 rounded-xl border border-border bg-ivory p-6 text-center">
            <p className="text-[15px] font-semibold text-forest">
              더 궁금한 점이 있으신가요?
            </p>
            <p className="mt-1.5 text-[13.5px] text-text-soft">
              라오스 현지 전문가에게 1:1로 편하게 상담받아보세요.
            </p>
            <Button href="/consultation" variant="primary" className="mt-5">
              1:1 여행상담
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
