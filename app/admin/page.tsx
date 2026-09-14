import Link from "next/link";
import { MessageSquare, Clock, CalendarDays, TrendingUp } from "lucide-react";
import { getDashboardStats } from "@/lib/data/admin-stats";
import { formatPrice } from "@/lib/format";

const STATUS_LABEL: Record<string, string> = {
  PENDING: "대기중",
  CONTACTED: "연락완료",
  CONFIRMED: "예약확정",
  CLOSED: "종료",
};

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();

  const cards = [
    { label: "오늘 신규 문의", value: stats.todayInquiries, icon: CalendarDays },
    { label: "미처리 문의", value: stats.pendingInquiries, icon: Clock },
    { label: "전체 문의", value: stats.totalInquiries, icon: MessageSquare },
    { label: "매출 (준비중)", value: "-", icon: TrendingUp },
  ];

  return (
    <div className="p-6 md:p-10">
      <h1 className="text-[22px] font-semibold text-forest">대시보드</h1>

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {cards.map(({ label, value, icon: Icon }) => (
          <div key={label} className="rounded-md border border-border bg-white p-5">
            <div className="flex items-center justify-between">
              <p className="text-[12.5px] text-text-soft">{label}</p>
              <Icon size={16} strokeWidth={1.5} className="text-gold" />
            </div>
            <p className="mt-3 text-[26px] font-semibold text-forest">{value}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-md border border-border bg-white">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <p className="text-[14px] font-semibold text-forest">최근 문의</p>
            <Link
              href="/admin/inquiries"
              className="text-[12.5px] font-medium text-forest hover:text-forest-light"
            >
              전체보기
            </Link>
          </div>
          {stats.recentInquiries.length > 0 ? (
            <ul className="divide-y divide-border">
              {stats.recentInquiries.map((inquiry) => (
                <li key={inquiry.id} className="px-5 py-3.5">
                  <div className="flex items-center justify-between">
                    <p className="text-[13.5px] font-medium text-text">
                      {inquiry.name}
                    </p>
                    <span className="text-[11px] text-text-soft">
                      {STATUS_LABEL[inquiry.status] ?? inquiry.status}
                    </span>
                  </div>
                  <p className="mt-1 line-clamp-1 text-[12.5px] text-text-soft">
                    {inquiry.message}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-5 py-8 text-center text-[13px] text-text-soft">
              아직 문의가 없습니다.
            </p>
          )}
        </div>

        <div className="rounded-md border border-border bg-white">
          <div className="border-b border-border px-5 py-4">
            <p className="text-[14px] font-semibold text-forest">인기 상품</p>
          </div>
          {stats.featuredProducts.length > 0 ? (
            <ul className="divide-y divide-border">
              {stats.featuredProducts.map((product) => (
                <li
                  key={product.slug}
                  className="flex items-center justify-between px-5 py-3.5"
                >
                  <div>
                    <p className="text-[13.5px] font-medium text-text">
                      {product.title}
                    </p>
                    <p className="mt-0.5 text-[12px] text-text-soft">
                      {product.category}
                    </p>
                  </div>
                  <span className="text-[13px] font-semibold text-forest">
                    {formatPrice(product.price)}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-5 py-8 text-center text-[13px] text-text-soft">
              등록된 상품이 없습니다.
            </p>
          )}
        </div>

        <div className="rounded-md border border-border bg-white lg:col-span-2">
          <div className="border-b border-border px-5 py-4">
            <p className="text-[14px] font-semibold text-forest">최근 후기</p>
          </div>
          {stats.recentReviews.length > 0 ? (
            <ul className="divide-y divide-border">
              {stats.recentReviews.map((review) => (
                <li
                  key={review.id}
                  className="flex items-center justify-between px-5 py-3.5"
                >
                  <div>
                    <p className="text-[13.5px] font-medium text-text">
                      {review.customer_name} · {review.product}
                    </p>
                  </div>
                  <span className="text-[12.5px] text-gold">★ {review.rating}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-5 py-8 text-center text-[13px] text-text-soft">
              등록된 후기가 없습니다.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
