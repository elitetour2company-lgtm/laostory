"use client";

import { useActionState } from "react";
import { upsertGolfCourseAction, GolfFormState } from "@/lib/admin/golf-actions";
import { AdminGolfCourseRow } from "@/lib/data/admin-golf";
import { serializeExtraFees, serializeSpecialRates } from "@/lib/golf-special-rates";

const DIFFICULTY_OPTIONS = [
  { value: "EASY", label: "쉬움" },
  { value: "NORMAL", label: "보통" },
  { value: "HARD", label: "어려움" },
];

const fieldClass =
  "w-full rounded-sm border border-border bg-white px-3.5 py-2.5 text-[14px] text-text outline-none focus:border-forest";
const labelClass = "mb-1.5 block text-[12.5px] font-medium text-text-soft";

export default function GolfCourseForm({ course }: { course?: AdminGolfCourseRow }) {
  const action = upsertGolfCourseAction.bind(null, course?.id ?? null);
  const [state, formAction, pending] = useActionState<GolfFormState | undefined, FormData>(
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
            defaultValue={course?.slug}
            required
            className={fieldClass}
            placeholder="vientiane-golf-example"
          />
        </label>
        <label>
          <span className={labelClass}>골프장명 *</span>
          <input name="name" defaultValue={course?.name} required className={fieldClass} />
        </label>
        <label>
          <span className={labelClass}>지역</span>
          <input name="location" defaultValue={course?.location} className={fieldClass} />
        </label>
        <label>
          <span className={labelClass}>난이도</span>
          <select
            name="difficulty"
            defaultValue={course?.difficulty ?? "NORMAL"}
            className={fieldClass}
          >
            {DIFFICULTY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span className={labelClass}>홀 수</span>
          <input
            name="holes"
            type="number"
            defaultValue={course?.holes ?? 18}
            className={fieldClass}
          />
        </label>
        <label>
          <span className={labelClass}>파(Par)</span>
          <input name="par" type="number" defaultValue={course?.par ?? 72} className={fieldClass} />
        </label>
        <label>
          <span className={labelClass}>야드 (전장 — 선택, 아는 경우에만)</span>
          <input
            name="yardage"
            type="number"
            defaultValue={course?.yardage ?? ""}
            className={fieldClass}
          />
        </label>
        <label>
          <span className={labelClass}>
            위치 설명 (선택, 예: 비엔티안 시내에서 약 13km · 차량 30분)
          </span>
          <input
            name="locationNote"
            defaultValue={course?.location_note ?? ""}
            className={fieldClass}
          />
        </label>
        <label>
          <span className={labelClass}>가격 (원) *</span>
          <input
            name="price"
            type="number"
            defaultValue={course?.price}
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
            defaultValue={course?.original_price ?? ""}
            className={fieldClass}
          />
        </label>
        <label>
          <span className={labelClass}>가격 (달러 — 선택, 입력 시 원화 옆에 함께 표시됩니다)</span>
          <input
            name="priceUsd"
            type="number"
            defaultValue={course?.price_usd ?? ""}
            className={fieldClass}
          />
        </label>
        <label>
          <span className={labelClass}>할인 전 정가 (달러 — 선택)</span>
          <input
            name="originalPriceUsd"
            type="number"
            defaultValue={course?.original_price_usd ?? ""}
            className={fieldClass}
          />
        </label>
        <label>
          <span className={labelClass}>
            주말(토·일) 가격 (원 — 선택, 비워두면 평일과 동일한 가격으로 표시됩니다)
          </span>
          <input
            name="weekendPrice"
            type="number"
            defaultValue={course?.weekend_price ?? ""}
            className={fieldClass}
          />
        </label>
        <label>
          <span className={labelClass}>주말(토·일) 가격 (달러 — 선택)</span>
          <input
            name="weekendPriceUsd"
            type="number"
            defaultValue={course?.weekend_price_usd ?? ""}
            className={fieldClass}
          />
        </label>
        <label className="sm:col-span-2">
          <span className={labelClass}>
            특별 요금 (요일·오후 할인 — 선택, 한 줄에 하나씩)
          </span>
          <textarea
            name="specialRates"
            rows={5}
            defaultValue={serializeSpecialRates(course?.special_rates ?? undefined)}
            placeholder={
              "스포츠데이(월·목) | 66 | 92000 | 4월~9월 | 월,목 |\n오후 특가(평일) | 80 | 112000 | 10월~10월 | 화,수,금 | 오후"
            }
            className={`${fieldClass} font-mono text-[12.5px]`}
          />
          <span className="mt-1 block text-[11.5px] text-text-soft">
            형식: 이름 | 달러 | 원 | 적용 월(비우면 연중) | 요일(비우면 매일) | 옵션. 옵션의 &quot;오후&quot;는 오후 티타임 선택 시에만,
            &quot;표시만&quot;은 계산에 넣지 않고 안내만 합니다.
          </span>
        </label>
        <label className="sm:col-span-2">
          <span className={labelClass}>
            불포함·현장 지불 비용 (캐디팁, 렌탈비 등 — 선택, 한 줄에 하나씩)
          </span>
          <textarea
            name="extraFees"
            rows={4}
            defaultValue={serializeExtraFees(course?.extra_fees ?? undefined)}
            placeholder={"캐디팁 | 18홀 기준 최소 30만낍(약 15달러)\n클럽 렌탈 | 약 35달러"}
            className={`${fieldClass} font-mono text-[12.5px]`}
          />
          <span className="mt-1 block text-[11.5px] text-text-soft">형식: 항목 | 내용</span>
        </label>
        <label>
          <span className={labelClass}>
            중간 시즌 구간 (예: 10월~11월 — 선택, 기본 요금과 성수기 사이 요금이 있는 골프장만 입력)
          </span>
          <input
            name="midSeasonLabel"
            type="text"
            placeholder="예: 10월~11월"
            defaultValue={course?.mid_season_label ?? ""}
            className={fieldClass}
          />
        </label>
        <label>
          <span className={labelClass}>중간 시즌 가격 (원 — 선택)</span>
          <input
            name="midSeasonPrice"
            type="number"
            defaultValue={course?.mid_season_price ?? ""}
            className={fieldClass}
          />
        </label>
        <label>
          <span className={labelClass}>중간 시즌 가격 (달러 — 선택)</span>
          <input
            name="midSeasonPriceUsd"
            type="number"
            defaultValue={course?.mid_season_price_usd ?? ""}
            className={fieldClass}
          />
        </label>
        <label>
          <span className={labelClass}>중간 시즌 주말 가격 (원 — 선택)</span>
          <input
            name="midSeasonWeekendPrice"
            type="number"
            defaultValue={course?.mid_season_weekend_price ?? ""}
            className={fieldClass}
          />
        </label>
        <label>
          <span className={labelClass}>중간 시즌 주말 가격 (달러 — 선택)</span>
          <input
            name="midSeasonWeekendPriceUsd"
            type="number"
            defaultValue={course?.mid_season_weekend_price_usd ?? ""}
            className={fieldClass}
          />
        </label>
        <label>
          <span className={labelClass}>
            성수기 구간 (예: 12월~3월 — 선택, 비워두면 연중 동일 가격으로 표시됩니다)
          </span>
          <input
            name="peakSeasonLabel"
            type="text"
            placeholder="예: 12월~3월"
            defaultValue={course?.peak_season_label ?? ""}
            className={fieldClass}
          />
        </label>
        <label>
          <span className={labelClass}>성수기 가격 (원 — 선택)</span>
          <input
            name="peakSeasonPrice"
            type="number"
            defaultValue={course?.peak_season_price ?? ""}
            className={fieldClass}
          />
        </label>
        <label>
          <span className={labelClass}>성수기 가격 (달러 — 선택)</span>
          <input
            name="peakSeasonPriceUsd"
            type="number"
            defaultValue={course?.peak_season_price_usd ?? ""}
            className={fieldClass}
          />
        </label>
        <label>
          <span className={labelClass}>
            성수기 주말 가격 (원 — 선택, 성수기에도 주중/주말 가격이 다른 골프장만 입력)
          </span>
          <input
            name="peakSeasonWeekendPrice"
            type="number"
            defaultValue={course?.peak_season_weekend_price ?? ""}
            className={fieldClass}
          />
        </label>
        <label>
          <span className={labelClass}>성수기 주말 가격 (달러 — 선택)</span>
          <input
            name="peakSeasonWeekendPriceUsd"
            type="number"
            defaultValue={course?.peak_season_weekend_price_usd ?? ""}
            className={fieldClass}
          />
        </label>
        <label>
          <span className={labelClass}>홀수 인원 카트비 주말 추가요금 (원 — 선택, 평일과 다를 때만)</span>
          <input
            name="oddHeadcountCartFeeWeekend"
            type="number"
            defaultValue={course?.odd_headcount_cart_fee_weekend ?? ""}
            className={fieldClass}
          />
        </label>
        <label>
          <span className={labelClass}>홀수 인원 카트비 주말 추가요금 (달러 — 선택)</span>
          <input
            name="oddHeadcountCartFeeWeekendUsd"
            type="number"
            defaultValue={course?.odd_headcount_cart_fee_weekend_usd ?? ""}
            className={fieldClass}
          />
        </label>
        <label>
          <span className={labelClass}>
            홀수 인원 카트비 추가요금 (원 — 선택, 2인 1카트 기준 홀수 인원일 때 인당 추가되는 금액)
          </span>
          <input
            name="oddHeadcountCartFee"
            type="number"
            defaultValue={course?.odd_headcount_cart_fee ?? ""}
            className={fieldClass}
          />
        </label>
        <label>
          <span className={labelClass}>홀수 인원 카트비 추가요금 (달러 — 선택)</span>
          <input
            name="oddHeadcountCartFeeUsd"
            type="number"
            defaultValue={course?.odd_headcount_cart_fee_usd ?? ""}
            className={fieldClass}
          />
        </label>
        <label>
          <span className={labelClass}>대표 이미지 키 (data/images.ts 참고)</span>
          <input name="image" defaultValue={course?.image ?? ""} className={fieldClass} />
        </label>
        <label>
          <span className={labelClass}>부대시설 (쉼표로 구분, 예: 클럽하우스,레스토랑)</span>
          <input
            name="facilities"
            defaultValue={course?.facilities.join(", ")}
            className={fieldClass}
          />
        </label>
      </div>

      <label className="block">
        <span className={labelClass}>
          갤러리 이미지 키 (쉼표로 구분, data/images.ts 참고 — 상세페이지 대표 사진 아래 그리드로 표시됨)
        </span>
        <textarea
          name="gallery"
          defaultValue={course?.gallery.join(", ")}
          rows={2}
          className={`${fieldClass} resize-none`}
          placeholder="course-mekong-cc-2, course-mekong-cc-3, ..."
        />
      </label>

      <label className="block">
        <span className={labelClass}>설명</span>
        <textarea
          name="description"
          defaultValue={course?.description}
          rows={3}
          className={`${fieldClass} resize-none`}
        />
      </label>

      <div className="flex items-center gap-6">
        <label className="flex items-center gap-2.5">
          <input
            type="checkbox"
            name="includesCaddie"
            defaultChecked={course?.includes_caddie}
            className="h-4 w-4 accent-forest"
          />
          <span className="text-[13.5px] text-text">캐디 포함</span>
        </label>
        <label className="flex items-center gap-2.5">
          <input
            type="checkbox"
            name="includesCart"
            defaultChecked={course?.includes_cart}
            className="h-4 w-4 accent-forest"
          />
          <span className="text-[13.5px] text-text">카트 포함</span>
        </label>
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
