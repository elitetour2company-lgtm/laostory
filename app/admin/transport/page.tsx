import Link from "next/link";
import { Plus } from "lucide-react";
import { getAdminTransportOptions } from "@/lib/data/admin-transport";
import { formatPrice } from "@/lib/format";
import DeleteButton from "@/components/admin/DeleteButton";
import { deleteTransportOptionAction } from "@/lib/admin/transport-actions";

export const dynamic = "force-dynamic";

const CATEGORY_LABEL: Record<string, string> = {
  AIRPORT_TRANSFER: "공항 픽업·샌딩",
  CHARTER_VAN: "전세밴",
  JOIN_VAN: "조인밴",
  TRAIN_TICKET: "기차표",
};

export default async function AdminTransportPage() {
  const options = await getAdminTransportOptions();

  return (
    <div className="p-6 md:p-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[22px] font-semibold text-forest">차량 관리</h1>
          <p className="mt-1 text-[13px] text-text-soft">총 {options.length}개 상품</p>
        </div>
        <Link
          href="/admin/transport/new"
          className="inline-flex items-center gap-1.5 rounded-sm bg-forest px-4 py-2.5 text-[13.5px] font-medium text-white hover:bg-forest-light"
        >
          <Plus size={15} strokeWidth={2} />
          새 상품 추가
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto rounded-md border border-border bg-white">
        <table className="w-full min-w-[680px] text-left text-[13px]">
          <thead>
            <tr className="border-b border-border bg-ivory text-[12px] text-text-soft">
              <th className="px-4 py-3 font-medium">상품명</th>
              <th className="px-4 py-3 font-medium">카테고리</th>
              <th className="px-4 py-3 font-medium">구간</th>
              <th className="px-4 py-3 font-medium">가격</th>
              <th className="px-4 py-3 font-medium">관리</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {options.map((option) => (
              <tr key={option.id}>
                <td className="px-4 py-3.5 font-medium text-text">{option.title}</td>
                <td className="whitespace-nowrap px-4 py-3.5 text-text-soft">
                  {CATEGORY_LABEL[option.category] ?? option.category}
                </td>
                <td className="whitespace-nowrap px-4 py-3.5 text-text-soft">{option.route}</td>
                <td className="whitespace-nowrap px-4 py-3.5 text-text-soft">
                  {formatPrice(option.price)}
                </td>
                <td className="whitespace-nowrap px-4 py-3.5">
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/admin/transport/${option.id}/edit`}
                      className="text-[12.5px] font-medium text-forest hover:text-forest-light"
                    >
                      수정
                    </Link>
                    <DeleteButton
                      id={option.id}
                      action={deleteTransportOptionAction}
                      confirmMessage={`"${option.title}" 상품을 삭제하시겠습니까?`}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {options.length === 0 ? (
          <p className="py-10 text-center text-[13.5px] text-text-soft">
            등록된 차량 상품이 없습니다.
          </p>
        ) : null}
      </div>
    </div>
  );
}
