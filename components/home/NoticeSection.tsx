import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { getAllNotices } from "@/lib/data/notices";
import { formatDate } from "@/lib/format";

export default async function NoticeSection() {
  const notices = (await getAllNotices()).slice(0, 3);
  if (notices.length === 0) return null;

  return (
    <section className="border-t border-border py-12 md:py-16">
      <Container>
        <div className="flex items-end justify-between gap-6">
          <SectionHeading eyebrow="News" title="라오스토리 새소식" />
          <Link
            href="/notices"
            className="inline-flex shrink-0 items-center gap-1.5 border-b border-forest py-2 text-sm font-medium text-forest transition-colors hover:text-forest-light"
          >
            전체보기
            <ArrowRight size={14} strokeWidth={2} />
          </Link>
        </div>

        <div className="mt-8 divide-y divide-border border-y border-border">
          {notices.map((notice) => (
            <Link
              key={notice.slug}
              href={`/notices/${notice.slug}`}
              className="flex items-center justify-between gap-4 py-4 transition-colors hover:bg-ivory/60 md:py-5"
            >
              <span className="text-[15px] font-medium text-text">{notice.title}</span>
              <span className="flex-shrink-0 text-[12.5px] text-text-soft">
                {formatDate(notice.createdAt)}
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
