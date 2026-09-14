import Link from "next/link";
import { Plus } from "lucide-react";
import { getAdminTours } from "@/lib/data/admin-tours";
import { formatPrice } from "@/lib/format";
import DeleteButton from "@/components/admin/DeleteButton";
import { deleteTourAction } from "@/lib/admin/tour-actions";

export const dynamic = "force-dynamic";

const CATEGORY_LABEL: Record<string, string> = {
  ONE_DAY: "원데이투어",
  HALF_DAY: "반일투어",
  ACTIVITY: "액티비티",
};

export default async function AdminToursPage() {
  const tours = await getAdminTours();

  return (
    <div className="p-6 md:p-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[22px] font-semibold text-forest">투어 관리</h1>
          <p className="mt-1 text-[13px] text-text-soft">총 {tours.length}개 투어</p>
        </div>
        <Link
          href="/admin/tours/new"
          className="inline-flex items-center gap-1.5 rounded-sm bg-forest px-4 py-2.5 text-[13.5px] font-medium text-white hover:bg-forest-light"
        >
          <Plus size={15} strokeWidth={2} />
          새 투어 추가
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto rounded-md border border-border bg-white">
        <table className="w-full min-w-[680px] text-left text-[13px]">
          <thead>
            <tr className="border-b border-border bg-ivory text-[12px] text-text-soft">
              <th className="px-4 py-3 font-medium">투어명</th>
              <th className="px-4 py-3 font-medium">카테고리</th>
              <th className="px-4 py-3 font-medium">지역</th>
              <th className="px-4 py-3 font-medium">가격</th>
              <th className="px-4 py-3 font-medium">관리</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {tours.map((tour) => (
              <tr key={tour.id}>
                <td className="px-4 py-3.5 font-medium text-text">{tour.title}</td>
                <td className="whitespace-nowrap px-4 py-3.5 text-text-soft">
                  {CATEGORY_LABEL[tour.category] ?? tour.category}
                </td>
                <td className="whitespace-nowrap px-4 py-3.5 text-text-soft">
                  {tour.destination}
                </td>
                <td className="whitespace-nowrap px-4 py-3.5 text-text-soft">
                  {formatPrice(tour.price)}
                </td>
                <td className="whitespace-nowrap px-4 py-3.5">
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/admin/tours/${tour.id}/edit`}
                      className="text-[12.5px] font-medium text-forest hover:text-forest-light"
                    >
                      수정
                    </Link>
                    <DeleteButton
                      id={tour.id}
                      action={deleteTourAction}
                      confirmMessage={`"${tour.title}" 투어를 삭제하시겠습니까?`}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {tours.length === 0 ? (
          <p className="py-10 text-center text-[13.5px] text-text-soft">
            등록된 투어가 없습니다.
          </p>
        ) : null}
      </div>
    </div>
  );
}
