"use client";

import { useActionState } from "react";
import { upsertTransportOptionAction, TransportFormState } from "@/lib/admin/transport-actions";
import { AdminTransportRow } from "@/lib/data/admin-transport";

const CATEGORY_OPTIONS = [
  { value: "AIRPORT_TRANSFER", label: "공항 픽업·샌딩" },
  { value: "CHARTER_VAN", label: "전세밴" },
  { value: "JOIN_VAN", label: "조인밴" },
  { value: "TRAIN_TICKET", label: "기차표" },
];

const fieldClass =
  "w-full rounded-sm border border-border bg-white px-3.5 py-2.5 text-[14px] text-text outline-none focus:border-forest";
const labelClass = "mb-1.5 block text-[12.5px] font-medium text-text-soft";

export default function TransportForm({ option }: { option?: AdminTransportRow }) {
  const action = upsertTransportOptionAction.bind(null, option?.id ?? null);
  const [state, formAction, pending] = useActionState<TransportFormState | undefined, FormData>(
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
            defaultValue={option?.slug}
            required
            className={fieldClass}
            placeholder="vientiane-airport-transfer"
          />
        </label>
        <label>
          <span className={labelClass}>상품명 *</span>
          <input name="title" defaultValue={option?.title} required className={fieldClass} />
        </label>
        <label>
          <span className={labelClass}>카테고리</span>
          <select
            name="category"
            defaultValue={option?.category ?? "AIRPORT_TRANSFER"}
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
          <span className={labelClass}>구간 (예: 비엔티안 공항 ↔ 시내)</span>
          <input name="route" defaultValue={option?.route} className={fieldClass} />
        </label>
        <label>
          <span className={labelClass}>차량/좌석 (예: 9인승 밴)</span>
          <input
            name="vehicleOrSeat"
            defaultValue={option?.vehicle_or_seat}
            className={fieldClass}
          />
        </label>
        <label>
          <span className={labelClass}>소요시간</span>
          <input name="duration" defaultValue={option?.duration} className={fieldClass} />
        </label>
        <label>
          <span className={labelClass}>가격 (원) *</span>
          <input
            name="price"
            type="number"
            defaultValue={option?.price}
            required
            className={fieldClass}
          />
        </label>
        <label>
          <span className={labelClass}>이미지 키 (data/images.ts 참고)</span>
          <input name="image" defaultValue={option?.image ?? ""} className={fieldClass} />
        </label>
      </div>

      <label className="block">
        <span className={labelClass}>설명</span>
        <textarea
          name="description"
          defaultValue={option?.description}
          rows={3}
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
