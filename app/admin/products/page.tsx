import Link from "next/link";
import { Plus } from "lucide-react";
import { getAdminProducts } from "@/lib/data/admin-products";
import { formatPrice } from "@/lib/format";
import DeleteButton from "@/components/admin/DeleteButton";
import { deleteProductAction } from "@/lib/admin/product-actions";

export const dynamic = "force-dynamic";

const TYPE_LABEL: Record<string, string> = {
  FREE_TRAVEL: "자유여행",
  PACKAGE_TOUR: "패키지여행",
  POOL_VILLA: "풀빌라",
  GOLF: "골프",
};

export default async function AdminProductsPage() {
  const products = await getAdminProducts();

  return (
    <div className="p-6 md:p-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[22px] font-semibold text-forest">여행상품 관리</h1>
          <p className="mt-1 text-[13px] text-text-soft">총 {products.length}개 상품</p>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-1.5 rounded-sm bg-forest px-4 py-2.5 text-[13.5px] font-medium text-white hover:bg-forest-light"
        >
          <Plus size={15} strokeWidth={2} />
          새 상품 추가
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto rounded-md border border-border bg-white">
        <table className="w-full min-w-[760px] text-left text-[13px]">
          <thead>
            <tr className="border-b border-border bg-ivory text-[12px] text-text-soft">
              <th className="px-4 py-3 font-medium">상품명</th>
              <th className="px-4 py-3 font-medium">타입</th>
              <th className="px-4 py-3 font-medium">지역</th>
              <th className="px-4 py-3 font-medium">가격</th>
              <th className="px-4 py-3 font-medium">추천</th>
              <th className="px-4 py-3 font-medium">관리</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-4 py-3.5 font-medium text-text">{product.title}</td>
                <td className="whitespace-nowrap px-4 py-3.5 text-text-soft">
                  {TYPE_LABEL[product.type] ?? product.type}
                </td>
                <td className="whitespace-nowrap px-4 py-3.5 text-text-soft">
                  {product.destination}
                </td>
                <td className="whitespace-nowrap px-4 py-3.5 text-text-soft">
                  {formatPrice(product.price)}
                </td>
                <td className="whitespace-nowrap px-4 py-3.5">
                  {product.featured ? (
                    <span className="text-forest">✓</span>
                  ) : (
                    <span className="text-text-soft/40">-</span>
                  )}
                </td>
                <td className="whitespace-nowrap px-4 py-3.5">
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/admin/products/${product.id}/edit`}
                      className="text-[12.5px] font-medium text-forest hover:text-forest-light"
                    >
                      수정
                    </Link>
                    <DeleteButton
                      id={product.id}
                      action={deleteProductAction}
                      confirmMessage={`"${product.title}" 상품을 삭제하시겠습니까?`}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {products.length === 0 ? (
          <p className="py-10 text-center text-[13.5px] text-text-soft">
            등록된 상품이 없습니다.
          </p>
        ) : null}
      </div>
    </div>
  );
}
