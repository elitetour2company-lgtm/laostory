import Link from "next/link";
import { Plus } from "lucide-react";
import { getAdminReviews } from "@/lib/data/admin-reviews";
import DeleteButton from "@/components/admin/DeleteButton";
import { deleteReviewAction } from "@/lib/admin/review-actions";

export const dynamic = "force-dynamic";

const CATEGORY_LABEL: Record<string, string> = {
  GOLF: "골프",
  POOL_VILLA: "풀빌라",
  FREE_TRAVEL: "자유여행",
  PACKAGE_TOUR: "패키지",
  TOUR: "투어",
};

export default async function AdminReviewsPage() {
  const reviews = await getAdminReviews();

  return (
    <div className="p-6 md:p-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[22px] font-semibold text-forest">후기 관리</h1>
          <p className="mt-1 text-[13px] text-text-soft">총 {reviews.length}개 후기</p>
        </div>
        <Link
          href="/admin/reviews/new"
          className="inline-flex items-center gap-1.5 rounded-sm bg-forest px-4 py-2.5 text-[13.5px] font-medium text-white hover:bg-forest-light"
        >
          <Plus size={15} strokeWidth={2} />
          새 후기 추가
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto rounded-md border border-border bg-white">
        <table className="w-full min-w-[720px] text-left text-[13px]">
          <thead>
            <tr className="border-b border-border bg-ivory text-[12px] text-text-soft">
              <th className="px-4 py-3 font-medium">작성자</th>
              <th className="px-4 py-3 font-medium">카테고리</th>
              <th className="px-4 py-3 font-medium">이용 상품</th>
              <th className="px-4 py-3 font-medium">평점</th>
              <th className="px-4 py-3 font-medium">샘플</th>
              <th className="px-4 py-3 font-medium">관리</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {reviews.map((review) => (
              <tr key={review.id}>
                <td className="px-4 py-3.5 font-medium text-text">{review.customer_name}</td>
                <td className="whitespace-nowrap px-4 py-3.5 text-text-soft">
                  {CATEGORY_LABEL[review.category] ?? review.category}
                </td>
                <td className="whitespace-nowrap px-4 py-3.5 text-text-soft">
                  {review.product}
                </td>
                <td className="whitespace-nowrap px-4 py-3.5 text-text-soft">
                  {review.rating}
                </td>
                <td className="whitespace-nowrap px-4 py-3.5">
                  {review.is_sample ? (
                    <span className="text-text-soft/40">샘플</span>
                  ) : (
                    <span className="text-forest">실제</span>
                  )}
                </td>
                <td className="whitespace-nowrap px-4 py-3.5">
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/admin/reviews/${review.id}/edit`}
                      className="text-[12.5px] font-medium text-forest hover:text-forest-light"
                    >
                      수정
                    </Link>
                    <DeleteButton
                      id={review.id}
                      action={deleteReviewAction}
                      confirmMessage={`"${review.customer_name}"님의 후기를 삭제하시겠습니까?`}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {reviews.length === 0 ? (
          <p className="py-10 text-center text-[13.5px] text-text-soft">
            등록된 후기가 없습니다.
          </p>
        ) : null}
      </div>
    </div>
  );
}
