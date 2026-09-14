"use client";

import { useState, FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import Button from "@/components/ui/Button";
import { supabase } from "@/lib/supabase/client";

const REGIONS = ["전체", "비엔티안", "방비엥", "루앙프라방", "팍세"];
const STYLES = ["자유여행", "커플", "가족", "골프", "휴양", "친구"];
const GUESTS = ["1~2명", "3~4명", "5~8명", "9명+"];
const BUDGETS = ["50만원 미만", "50~100만원", "100~200만원", "200만원 이상", "협의"];

const fieldClass =
  "w-full border-b border-border bg-transparent py-2.5 text-[15px] text-text outline-none placeholder:text-text-soft/70 focus:border-forest transition-colors";
const labelClass = "mb-1.5 block text-[13px] font-medium text-text-soft";

export default function ConsultationForm() {
  const searchParams = useSearchParams();
  const itemsParam = searchParams.get("items");
  const initialMessage = itemsParam ? `[찜한 상품] ${itemsParam}\n\n` : "";
  const initialTravelDate = searchParams.get("travelDate") ?? "";
  const initialStyle = searchParams.get("style");
  const defaultStyle =
    initialStyle && (STYLES as readonly string[]).includes(initialStyle)
      ? initialStyle
      : STYLES[0];

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const travelDate = String(data.get("travelDate") ?? "").trim();
    const guests = String(data.get("guests") ?? "");
    const region = String(data.get("region") ?? "");
    const style = String(data.get("style") ?? "");
    const budget = String(data.get("budget") ?? "");
    const consent = data.get("consent");

    if (!name || !phone || !message) {
      setError("이름, 연락처, 문의 내용은 필수 입력 항목입니다.");
      return;
    }
    if (!consent) {
      setError("개인정보 수집 및 이용에 동의해주세요.");
      return;
    }

    setError(null);
    setSubmitting(true);

    const { error: insertError } = await supabase.from("inquiries").insert({
      name,
      phone,
      message,
      travel_date: travelDate || null,
      guests,
      region,
      style,
      budget,
    });

    setSubmitting(false);

    if (insertError) {
      setError("접수 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
      return;
    }

    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-xl border border-border bg-white px-6 py-16 text-center">
        <CheckCircle2 size={40} strokeWidth={1.5} className="mx-auto text-forest" />
        <p className="mt-5 text-[18px] font-semibold text-forest">
          상담 신청이 접수되었습니다.
        </p>
        <p className="mt-2 text-[14px] leading-relaxed text-text-soft">
          입력하신 연락처로 담당자가 빠르게 연락드리겠습니다.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-border bg-white p-6 md:p-10"
    >
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <label>
          <span className={labelClass}>이름 *</span>
          <input name="name" type="text" placeholder="홍길동" className={fieldClass} />
        </label>
        <label>
          <span className={labelClass}>연락처 *</span>
          <input
            name="phone"
            type="tel"
            placeholder="010-0000-0000"
            className={fieldClass}
          />
        </label>
        <label>
          <span className={labelClass}>여행 예정일</span>
          <input
            name="travelDate"
            type="date"
            defaultValue={initialTravelDate}
            className={fieldClass}
          />
        </label>
        <label>
          <span className={labelClass}>인원</span>
          <select name="guests" defaultValue={GUESTS[0]} className={fieldClass}>
            {GUESTS.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span className={labelClass}>희망 지역</span>
          <select name="region" defaultValue={REGIONS[0]} className={fieldClass}>
            {REGIONS.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span className={labelClass}>여행 스타일</span>
          <select name="style" defaultValue={defaultStyle} className={fieldClass}>
            {STYLES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>
        <label className="sm:col-span-2">
          <span className={labelClass}>예산</span>
          <select name="budget" defaultValue={BUDGETS[0]} className={fieldClass}>
            {BUDGETS.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </label>
        <label className="sm:col-span-2">
          <span className={labelClass}>문의 내용 *</span>
          <textarea
            name="message"
            rows={5}
            defaultValue={initialMessage}
            placeholder="희망하시는 여행 일정, 궁금하신 점을 자유롭게 남겨주세요."
            className={`${fieldClass} resize-none`}
          />
        </label>
      </div>

      <label className="mt-7 flex items-start gap-2.5 text-[13px] text-text-soft">
        <input
          name="consent"
          type="checkbox"
          className="mt-0.5 h-4 w-4 flex-shrink-0 accent-forest"
        />
        <span>
          개인정보 수집 및 이용에 동의합니다. 입력하신 정보는 상담 목적으로만
          사용되며, 상담 완료 후 안전하게 파기됩니다.
        </span>
      </label>

      {error ? (
        <p className="mt-4 text-[13px] font-medium text-red-600">{error}</p>
      ) : null}

      <Button
        type="submit"
        variant="primary"
        className="mt-7 w-full sm:w-auto"
        disabled={submitting}
      >
        {submitting ? "접수 중..." : "상담 신청하기"}
      </Button>
    </form>
  );
}
