"use client";

import { useActionState } from "react";
import { upsertGuideArticleAction, GuideFormState } from "@/lib/admin/guide-actions";
import { AdminGuideArticleRow } from "@/lib/data/admin-guide";

const fieldClass =
  "w-full rounded-sm border border-border bg-white px-3.5 py-2.5 text-[14px] text-text outline-none focus:border-forest";
const labelClass = "mb-1.5 block text-[12.5px] font-medium text-text-soft";

export default function GuideForm({ article }: { article?: AdminGuideArticleRow }) {
  const action = upsertGuideArticleAction.bind(null, article?.id ?? null);
  const [state, formAction, pending] = useActionState<GuideFormState | undefined, FormData>(
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
            defaultValue={article?.slug}
            required
            className={fieldClass}
            placeholder="laos-visa-guide"
          />
        </label>
        <label>
          <span className={labelClass}>제목 *</span>
          <input name="title" defaultValue={article?.title} required className={fieldClass} />
        </label>
        <label>
          <span className={labelClass}>카테고리 (예: 여행준비, FAQ)</span>
          <input name="category" defaultValue={article?.category} className={fieldClass} />
        </label>
        <label>
          <span className={labelClass}>이미지 키 (data/images.ts 참고)</span>
          <input name="image" defaultValue={article?.image ?? ""} className={fieldClass} />
        </label>
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
