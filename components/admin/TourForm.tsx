"use client";

import { useActionState } from "react";
import { upsertTourAction, TourFormState } from "@/lib/admin/tour-actions";
import { AdminTourRow } from "@/lib/data/admin-tours";

const CATEGORY_OPTIONS = [
  { value: "ONE_DAY", label: "원데이투어" },
  { value: "HALF_DAY", label: "반일투어" },
  { value: "ACTIVITY", label: "액티비티" },
];

const fieldClass =
  "w-full rounded-sm border border-border bg-white px-3.5 py-2.5 text-[14px] text-text outline-none focus:border-forest";
const labelClass = "mb-1.5 block text-[12.5px] font-medium text-text-soft";

export default function TourForm({ tour }: { tour?: AdminTourRow }) {
  const action = upsertTourAction.bind(null, tour?.id ?? null);
  const [state, formAction, pending] = useActionState<TourFormState | undefined, FormData>(
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
            defaultValue={tour?.slug}
            required
            className={fieldClass}
            placeholder="vang-vieng-kayaking"
          />
        </label>
        <label>
          <span className={labelClass}>투어명 *</span>
          <input name="title" defaultValue={tour?.title} required className={fieldClass} />
        </label>
        <label>
          <span className={labelClass}>카테고리</span>
          <select
            name="category"
            defaultValue={tour?.category ?? "ONE_DAY"}
            className={fieldClass}
          >
            {CATEGORY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span className={labelClass}>지역</span>
          <input name="destination" defaultValue={tour?.destination} className={fieldClass} />
        </label>
        <label>
          <span className={labelClass}>소요시간 (예: 4시간)</span>
          <input name="duration" defaultValue={tour?.duration} className={fieldClass} />
        </label>
        <label>
          <span className={labelClass}>가격 (원) *</span>
          <input
            name="price"
            type="number"
            defaultValue={tour?.price}
            required
            className={fieldClass}
          />
        </label>
        <label>
          <span className={labelClass}>가격 (달러 — 선택, 입력 시 원화 옆에 함께 표시됩니다)</span>
          <input
            name="priceUsd"
            type="number"
            defaultValue={tour?.price_usd ?? ""}
            className={fieldClass}
          />
        </label>
        <label>
          <span className={labelClass}>이미지 키 (data/images.ts 참고)</span>
          <input name="image" defaultValue={tour?.image ?? ""} className={fieldClass} />
        </label>
        <label className="sm:col-span-2">
          <span className={labelClass}>갤러리 이미지 키 (쉼표로 구분, data/images.ts 참고)</span>
          <input
            name="gallery"
            defaultValue={tour?.gallery?.join(", ") ?? ""}
            className={fieldClass}
          />
        </label>
        <label>
          <span className={labelClass}>집결지</span>
          <input
            name="meetingPoint"
            defaultValue={tour?.meeting_point}
            className={fieldClass}
          />
        </label>
      </div>

      <label className="block">
        <span className={labelClass}>설명</span>
        <textarea
          name="description"
          defaultValue={tour?.description}
          rows={2}
          className={`${fieldClass} resize-none`}
        />
      </label>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <label>
          <span className={labelClass}>포함사항 (한 줄에 하나씩)</span>
          <textarea
            name="included"
            defaultValue={tour?.included.join("\n")}
            rows={5}
            className={`${fieldClass} resize-none`}
          />
        </label>
        <label>
          <span className={labelClass}>불포함사항 (한 줄에 하나씩)</span>
          <textarea
            name="excluded"
            defaultValue={tour?.excluded.join("\n")}
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
          name="schedule"
          defaultValue={tour?.schedule ? JSON.stringify(tour.schedule, null, 2) : ""}
          rows={8}
          placeholder={'[\n  { "time": "09:00", "activity": "호텔 픽업" }\n]'}
          className={`${fieldClass} resize-none font-mono text-[12.5px]`}
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
