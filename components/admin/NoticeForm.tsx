"use client";

import { useActionState, useState } from "react";
import { upsertNoticeAction, NoticeFormState } from "@/lib/admin/notice-actions";
import { AdminNoticeRow } from "@/lib/data/admin-notices";
import ImageUploader from "./ImageUploader";

const fieldClass =
  "w-full rounded-sm border border-border bg-white px-3.5 py-2.5 text-[14px] text-text outline-none focus:border-forest";
const labelClass = "mb-1.5 block text-[12.5px] font-medium text-text-soft";

export default function NoticeForm({ notice }: { notice?: AdminNoticeRow }) {
  const action = upsertNoticeAction.bind(null, notice?.id ?? null);
  const [state, formAction, pending] = useActionState<NoticeFormState | undefined, FormData>(
    action,
    undefined
  );
  const [images, setImages] = useState<string[]>(notice?.images ?? []);

  return (
    <form action={formAction} className="space-y-6">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <label>
          <span className={labelClass}>제목 *</span>
          <input name="title" defaultValue={notice?.title} required className={fieldClass} />
        </label>
        <label>
          <span className={labelClass}>슬러그 (URL) — 비워두면 자동 생성됩니다</span>
          <input
            name="slug"
            defaultValue={notice?.slug}
            className={fieldClass}
            placeholder="비워두셔도 됩니다"
          />
        </label>
      </div>

      <label className="block">
        <span className={labelClass}>요약 (목록에 노출)</span>
        <textarea
          name="excerpt"
          defaultValue={notice?.excerpt}
          rows={2}
          className={`${fieldClass} resize-none`}
        />
      </label>

      <label className="block">
        <span className={labelClass}>본문 (문단 구분은 빈 줄 두 번)</span>
        <textarea
          name="content"
          defaultValue={notice?.content.join("\n\n")}
          rows={10}
          className={`${fieldClass} resize-none`}
        />
      </label>

      <div>
        <span className={labelClass}>사진 (본문 아래에 순서대로 표시됩니다)</span>
        <ImageUploader
          value={images}
          onChange={setImages}
          hint="휴대폰·PC 사진을 그대로 올려도 자동으로 줄여서 저장돼요."
        />
        <input type="hidden" name="images" value={JSON.stringify(images)} />
      </div>

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
