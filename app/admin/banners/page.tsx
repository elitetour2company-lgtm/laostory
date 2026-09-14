import Link from "next/link";
import { Plus } from "lucide-react";
import { getAdminBanners } from "@/lib/data/admin-banners";
import DeleteButton from "@/components/admin/DeleteButton";
import { deleteBannerAction } from "@/lib/admin/banner-actions";

export const dynamic = "force-dynamic";

export default async function AdminBannersPage() {
  const banners = await getAdminBanners();

  return (
    <div className="p-6 md:p-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[22px] font-semibold text-forest">배너 관리</h1>
          <p className="mt-1 text-[13px] text-text-soft">총 {banners.length}개 배너</p>
        </div>
        <Link
          href="/admin/banners/new"
          className="inline-flex items-center gap-1.5 rounded-sm bg-forest px-4 py-2.5 text-[13.5px] font-medium text-white hover:bg-forest-light"
        >
          <Plus size={15} strokeWidth={2} />
          새 배너 추가
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto rounded-md border border-border bg-white">
        <table className="w-full min-w-[600px] text-left text-[13px]">
          <thead>
            <tr className="border-b border-border bg-ivory text-[12px] text-text-soft">
              <th className="px-4 py-3 font-medium">배너명</th>
              <th className="px-4 py-3 font-medium">순서</th>
              <th className="px-4 py-3 font-medium">활성화</th>
              <th className="px-4 py-3 font-medium">관리</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {banners.map((banner) => (
              <tr key={banner.id}>
                <td className="px-4 py-3.5 font-medium text-text">{banner.title}</td>
                <td className="whitespace-nowrap px-4 py-3.5 text-text-soft">
                  {banner.sort_order}
                </td>
                <td className="whitespace-nowrap px-4 py-3.5">
                  {banner.is_active ? (
                    <span className="text-forest">✓</span>
                  ) : (
                    <span className="text-text-soft/40">-</span>
                  )}
                </td>
                <td className="whitespace-nowrap px-4 py-3.5">
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/admin/banners/${banner.id}/edit`}
                      className="text-[12.5px] font-medium text-forest hover:text-forest-light"
                    >
                      수정
                    </Link>
                    <DeleteButton
                      id={banner.id}
                      action={deleteBannerAction}
                      confirmMessage={`"${banner.title}" 배너를 삭제하시겠습니까?`}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {banners.length === 0 ? (
          <p className="py-10 text-center text-[13.5px] text-text-soft">
            등록된 배너가 없습니다.
          </p>
        ) : null}
      </div>
    </div>
  );
}
