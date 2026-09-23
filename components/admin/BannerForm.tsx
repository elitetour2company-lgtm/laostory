"use client";

import { useActionState, useState } from "react";
import { upsertBannerAction, BannerFormState } from "@/lib/admin/banner-actions";
import { AdminBannerRow } from "@/lib/data/admin-banners";
import ImageUploader from "./ImageUploader";

const fieldClass =
  "w-full rounded-sm border border-border bg-white px-3.5 py-2.5 text-[14px] text-text outline-none focus:border-forest";
const labelClass = "mb-1.5 block text-[12.5px] font-medium text-text-soft";

export default function BannerForm({ banner }: { banner?: AdminBannerRow }) {
  const action = upsertBannerAction.bind(null, banner?.id ?? null);
  const [state, formAction, pending] = useActionState<BannerFormState | undefined, FormData>(
    action,
    undefined
  );
  const [image, setImage] = useState(banner?.image ?? "");

  return (
    <form action={formAction} className="space-y-6">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <label>
          <span className={labelClass}>배너명 *</span>
          <input name="title" defaultValue={banner?.title} required className={fieldClass} />
        </label>
        <div className="sm:col-span-2">
          <span className={labelClass}>배너 사진 *</span>
          <ImageUploader
            value={image.startsWith("/api/site-images/") ? [image] : []}
            onChange={(urls) => setImage(urls[0] ?? "")}
            multiple={false}
            maxSide={2400}
            hint="가로로 긴 3:1 비율(예: 2400×800)로 만들어 올리시면 잘림 없이 보여요. 글자가 들어간 포스터는 좌우 여백을 두세요."
          />
          <input type="hidden" name="image" value={image} />
        </div>
        <label>
          <span className={labelClass}>링크 (선택, 예: /travel)</span>
          <input name="href" defaultValue={banner?.href ?? ""} className={fieldClass} />
        </label>
        <label>
          <span className={labelClass}>노출 순서 (낮을수록 먼저)</span>
          <input
            name="sortOrder"
            type="number"
            defaultValue={banner?.sort_order ?? 0}
            className={fieldClass}
          />
        </label>
      </div>

      <label className="flex items-center gap-2.5">
        <input
          type="checkbox"
          name="isActive"
          defaultChecked={banner?.is_active ?? true}
          className="h-4 w-4 accent-forest"
        />
        <span className="text-[13.5px] text-text">노출 활성화</span>
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
