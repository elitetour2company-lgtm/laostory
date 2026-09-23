"use client";

import { useActionState, useState } from "react";
import { upsertGuideArticleAction, GuideFormState } from "@/lib/admin/guide-actions";
import { AdminGuideArticleRow } from "@/lib/data/admin-guide";
import ImageUploader from "./ImageUploader";

const fieldClass =
  "w-full rounded-sm border border-border bg-white px-3.5 py-2.5 text-[14px] text-text outline-none focus:border-forest";
const labelClass = "mb-1.5 block text-[12.5px] font-medium text-text-soft";

export default function GuideForm({ article }: { article?: AdminGuideArticleRow }) {
  const action = upsertGuideArticleAction.bind(null, article?.id ?? null);
  const [state, formAction, pending] = useActionState<GuideFormState | undefined, FormData>(
    action,
    undefined
  );
  const [cover, setCover] = useState(article?.image ?? "");
  const [images, setImages] = useState<string[]>(article?.images ?? []);

  return (
    <form action={formAction} className="space-y-6">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <label>
          <span className={labelClass}>제목 *</span>
          <input name="title" defaultValue={article?.title} required className={fieldClass} />
        </label>
        <label>
          <span className={labelClass}>카테고리 (비워두면 &quot;여행정보&quot;)</span>
          <input
            name="category"
            defaultValue={article?.category}
            placeholder="여행정보"
            className={fieldClass}
          />
        </label>
        <label className="sm:col-span-2">
          <span className={labelClass}>슬러그 (URL) — 비워두면 자동 생성됩니다</span>
          <input
            name="slug"
            defaultValue={article?.slug}
            className={fieldClass}
            placeholder="비워두셔도 됩니다"
          />
        </label>
      </div>

      <div>
        <span className={labelClass}>대표 사진 (목록 카드와 글 맨 위에 크게 표시)</span>
        <ImageUploader
          value={cover.startsWith("/api/site-images/") ? [cover] : []}
          onChange={(urls) => setCover(urls[0] ?? "")}
          multiple={false}
          maxSide={2000}
          hint="가로로 긴 사진이 잘 어울려요. 글 맨 위에는 가로로 넓게 잘려 보여요."
        />
        <input type="hidden" name="image" value={cover} />
      </div>

      <label className="block">
        <span className={labelClass}>요약 (목록 카드에 노출)</span>
        <textarea
          name="excerpt"
          defaultValue={article?.excerpt}
          rows={2}
          className={`${fieldClass} resize-none`}
        />
      </label>

      <label className="block">
        <span className={labelClass}>본문 (문단 구분은 빈 줄 두 번)</span>
        <textarea
          name="content"
          defaultValue={article?.content.join("\n\n")}
          rows={10}
          className={`${fieldClass} resize-none`}
        />
      </label>

      <div>
        <span className={labelClass}>본문 사진 (본문 아래에 순서대로 표시됩니다)</span>
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
