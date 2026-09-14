import { notFound } from "next/navigation";
import ProductForm from "@/components/admin/ProductForm";
import { getAdminProductById } from "@/lib/data/admin-products";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getAdminProductById(id);
  if (!product) notFound();

  return (
    <div className="p-6 md:p-10">
      <h1 className="text-[22px] font-semibold text-forest">상품 수정</h1>
      <div className="mt-6 max-w-3xl rounded-md border border-border bg-white p-6 md:p-8">
        <ProductForm product={product} />
      </div>
    </div>
  );
}
