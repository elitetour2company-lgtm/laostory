import ProductForm from "@/components/admin/ProductForm";

export default function NewProductPage() {
  return (
    <div className="p-6 md:p-10">
      <h1 className="text-[22px] font-semibold text-forest">새 상품 추가</h1>
      <div className="mt-6 max-w-3xl rounded-md border border-border bg-white p-6 md:p-8">
        <ProductForm />
      </div>
    </div>
  );
}
