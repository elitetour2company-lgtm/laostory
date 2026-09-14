import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import CoverImage from "@/components/ui/CoverImage";
import Button from "@/components/ui/Button";
import { getGuideArticleBySlug, getGuideArticleSlugs } from "@/lib/data/guide";
import { getImage } from "@/data/images";

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
