"use client";

import { useActionState } from "react";
import { upsertProductAction, ProductFormState } from "@/lib/admin/product-actions";
import { AdminProductRow } from "@/lib/data/admin-products";

const TYPE_OPTIONS = [
  { value: "FREE_TRAVEL", label: "자유여행" },
  { value: "PACKAGE_TOUR", label: "패키지여행" },
  { value: "POOL_VILLA", label: "풀빌라" },
  { value: "GOLF", label: "골프" },
];

const fieldClass =
  "w-full rounded-sm border border-border bg-white px-3.5 py-2.5 text-[14px] text-text outline-none focus:border-forest";
const labelClass = "mb-1.5 block text-[12.5px] font-medium text-text-soft";

export default function ProductForm({ product }: { product?: AdminProductRow }) {
  const action = upsertProductAction.bind(null, product?.id ?? null);
  const [state, formAction, pending] = useActionState<ProductFormState | undefined, FormData>(
    action,
    undefined
  );

  return (
    <form action={formAction} className="space-y-6">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <label>
          <span className={labelClass}>슬러그 (URL, 영문/숫자/하이픈) *</span>
          <input
            name="slug"
            defaultValue={product?.slug}
            required
            className={fieldClass}
            placeholder="vang-vieng-example-trip"
          />
        </label>
        <label>
          <span className={labelClass}>상품명 *</span>
          <input name="title" defaultValue={product?.title} required className={fieldClass} />
        </label>
        <label>
          <span className={labelClass}>타입</span>
          <select name="type" defaultValue={product?.type ?? "FREE_TRAVEL"} className={fieldClass}>
            {TYPE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span className={labelClass}>카테고리 (표시용, 예: 자유패키지)</span>
          <input name="category" defaultValue={product?.category} className={fieldClass} />
        </label>
        <label>
          <span className={labelClass}>지역</span>
          <input name="destination" defaultValue={product?.destination} className={fieldClass} />
        </label>
        <label>
          <span className={labelClass}>기간 (예: 3박 5일)</span>
          <input name="duration" defaultValue={product?.duration} className={fieldClass} />
        </label>
        <label>
          <span className={labelClass}>가격 (원) *</span>
          <input
            name="price"
            type="number"
            defaultValue={product?.price}
            required
            className={fieldClass}
          />
        </label>
        <label>
          <span className={labelClass}>
            할인 전 정가 (원 — 선택, 입력 시 카드에 취소선+할인율로 표시됩니다)
          </span>
          <input
            name="originalPrice"
            type="number"
            defaultValue={product?.original_price ?? ""}
            className={fieldClass}
          />
        </label>
        <label>
          <span className={labelClass}>가격 (달러 — 선택, 입력 시 원화 옆에 함께 표시됩니다)</span>
          <input
            name="priceUsd"
            type="number"
            defaultValue={product?.price_usd ?? ""}
            className={fieldClass}
          />
        </label>
        <label>
          <span className={labelClass}>할인 전 정가 (달러 — 선택)</span>
          <input
            name="originalPriceUsd"
            type="number"
            defaultValue={product?.original_price_usd ?? ""}
            className={fieldClass}
          />
        </label>
        <label>
          <span className={labelClass}>뱃지 (예: 인기, 추천 — 선택)</span>
          <input name="badge" defaultValue={product?.badge ?? ""} className={fieldClass} />
        </label>
        <label>
          <span className={labelClass}>
            대표 이미지 키 (data/images.ts 참고, 예: product-1)
          </span>
          <input name="image" defaultValue={product?.image ?? ""} className={fieldClass} />
        </label>
        <label>
          <span className={labelClass}>태그 (쉼표로 구분, 예: 커플,친구)</span>
          <input name="tags" defaultValue={product?.tags.join(", ")} className={fieldClass} />
        </label>
      </div>

      <label className="block">
        <span className={labelClass}>
          갤러리 이미지 키 (쉼표로 구분, data/images.ts 참고 — 상세페이지 대표 사진 아래 그리드로 표시됨)
        </span>
        <textarea
          name="gallery"
          defaultValue={product?.gallery.join(", ")}
          rows={2}
          className={`${fieldClass} resize-none`}
          placeholder="product-1-g1, product-1-g2, ..."
        />
      </label>

      <label className="block">
        <span className={labelClass}>설명 (카드에 노출되는 한 줄 소개)</span>
        <textarea
          name="description"
          defaultValue={product?.description}
          rows={2}
          className={`${fieldClass} resize-none`}
        />
      </label>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <label>
          <span className={labelClass}>포함사항 (한 줄에 하나씩)</span>
          <textarea
            name="included"
            defaultValue={product?.included.join("\n")}
            rows={5}
            className={`${fieldClass} resize-none`}
          />
        </label>
        <label>
          <span className={labelClass}>불포함사항 (한 줄에 하나씩)</span>
          <textarea
            name="excluded"
            defaultValue={product?.excluded.join("\n")}
            rows={5}
            className={`${fieldClass} resize-none`}
          />
        </label>
      </div>

      <label className="block">
        <span className={labelClass}>
          일정 (JSON 형식 — 비워두면 상세페이지에 일정 섹션이 표시되지 않습니다)
        </span>
        <textarea
          name="itinerary"
          defaultValue={
            product?.itinerary ? JSON.stringify(product.itinerary, null, 2) : ""
          }
          rows={8}
          placeholder={
            '[\n  { "day": 1, "title": "도착", "description": "공항 픽업 후 숙소 체크인" }\n]'
          }
          className={`${fieldClass} resize-none font-mono text-[12.5px]`}
        />
      </label>

      <label className="flex items-center gap-2.5">
        <input
          type="checkbox"
          name="featured"
          defaultChecked={product?.featured}
          className="h-4 w-4 accent-forest"
        />
        <span className="text-[13.5px] text-text">
          베스트셀러(홈페이지 추천 상품)로 노출
        </span>
      </label>

      {state?.error ? (
        <p className="text-[13px] font-medium text-red-600">{state.error}</p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="rounded-sm bg-forest px-7 py-3 text-[14px] font-medium text-white hover:bg-forest-light disabled:opacity-60"
      >
        {pending ? "저장 중..." : "저장"}
      </button>
    </form>
  );
}
