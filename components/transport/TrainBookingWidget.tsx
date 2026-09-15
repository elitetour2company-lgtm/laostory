"use client";

import { useState } from "react";
import { Clock, Minus, Plus, Train } from "lucide-react";
import { TRAIN_SCHEDULES } from "@/lib/data/train-schedules";
import { formatPrice } from "@/lib/format";
import { getImage } from "@/data/images";
import CoverImage from "@/components/ui/CoverImage";

function todayISO(): string {
  const d = new Date();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

function formatDateKorean(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  const weekday = ["일", "월", "화", "수", "목", "금", "토"][date.getDay()];
  return `${y}년 ${m}월 ${d}일 (${weekday})`;
}

export default function TrainBookingWidget({
  slug,
  title,
  route,
  price,
}: {
  slug: string;
  title: string;
  route: string;
  price: number;
}) {
  const scheduleKey = slug.replace(/^train-/, "");
  const departures = TRAIN_SCHEDULES[scheduleKey] ?? [];

  const [date, setDate] = useState("");
  const [selectedCode, setSelectedCode] = useState<string | null>(null);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  const selected = departures.find((d) => d.code === selectedCode) ?? null;
  const total = price * (adults + children);

  const min = todayISO();

  function handleDateChange(value: string) {
    setDate(value);
    setSelectedCode(null);
  }

  const applyHref = (() => {
    if (!date || !selected) return null;
    const items = `${title} / ${formatDateKorean(date)} ${selected.code}편 (${selected.depart} 출발) / 성인 ${adults}명${
      children > 0 ? `, 아동 ${children}명` : ""
    }`;
    const params = new URLSearchParams({
      travelDate: date,
      items,
      style: "자유여행",
    });
    return `/consultation?${params.toString()}`;
  })();

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-white">
      <div className="relative aspect-[16/9] w-full">
        <CoverImage src={getImage("train-lcr-exterior")} alt={title} sizes="(min-width: 1024px) 50vw, 100vw" />
      </div>

      <div className="p-4">
      <div className="flex items-start gap-2.5">
        <span className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-forest/10 text-forest">
          <Train size={15} strokeWidth={2} />
        </span>
        <div>
          <p className="text-[15px] font-semibold text-text">{title}</p>
          <p className="mt-0.5 text-[12.5px] text-text-soft">{route}</p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto]">
        <label className="block">
          <span className="mb-1 block text-[12.5px] font-medium text-text-soft">
            출발일
          </span>
          <input
            type="date"
            min={min}
            value={date}
            onChange={(e) => handleDateChange(e.target.value)}
            className="w-full rounded-sm border border-border px-3 py-2.5 text-[14px] text-text outline-none focus:border-forest"
          />
        </label>
      </div>

      {date && departures.length > 0 ? (
        <div className="mt-3">
          <p className="mb-2 text-[12.5px] font-medium text-text-soft">
            {formatDateKorean(date)} 시간대 선택
          </p>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {departures.map((d) => {
              const isSelected = selectedCode === d.code;
              return (
                <button
                  key={d.code}
                  type="button"
                  onClick={() => setSelectedCode(d.code)}
                  className={`flex items-center justify-between rounded-sm border px-3 py-2.5 text-left text-[13px] transition-colors ${
                    isSelected
                      ? "border-forest bg-forest/10 text-forest"
                      : "border-border text-text hover:border-forest/40"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Clock size={13} strokeWidth={1.5} />
                    {d.depart} → {d.arrive}
                  </span>
                  <span className="text-[11.5px] text-text-soft">
                    {d.code} · {d.duration}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      ) : null}

      {selected ? (
        <div className="mt-4 border-t border-border pt-4">
          <div className="flex items-center justify-between">
            <span className="text-[13px] text-text-soft">성인</span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label="성인 인원 줄이기"
                onClick={() => setAdults((n) => Math.max(1, n - 1))}
                className="flex h-7 w-7 items-center justify-center rounded-full border border-border text-text-soft hover:border-forest hover:text-forest"
              >
                <Minus size={13} strokeWidth={2} />
              </button>
              <span className="w-4 text-center text-[14px] font-medium text-text">
                {adults}
              </span>
              <button
                type="button"
                aria-label="성인 인원 늘리기"
                onClick={() => setAdults((n) => n + 1)}
                className="flex h-7 w-7 items-center justify-center rounded-full border border-border text-text-soft hover:border-forest hover:text-forest"
              >
                <Plus size={13} strokeWidth={2} />
              </button>
            </div>
          </div>
          <div className="mt-2.5 flex items-center justify-between">
            <span className="text-[13px] text-text-soft">아동</span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label="아동 인원 줄이기"
                onClick={() => setChildren((n) => Math.max(0, n - 1))}
                className="flex h-7 w-7 items-center justify-center rounded-full border border-border text-text-soft hover:border-forest hover:text-forest"
              >
                <Minus size={13} strokeWidth={2} />
              </button>
              <span className="w-4 text-center text-[14px] font-medium text-text">
                {children}
              </span>
              <button
                type="button"
                aria-label="아동 인원 늘리기"
                onClick={() => setChildren((n) => n + 1)}
                className="flex h-7 w-7 items-center justify-center rounded-full border border-border text-text-soft hover:border-forest hover:text-forest"
              >
                <Plus size={13} strokeWidth={2} />
              </button>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between rounded-sm bg-ivory px-3 py-2.5">
            <span className="text-[13px] text-text-soft">총 예상 금액</span>
            <span className="text-[15px] font-semibold text-forest">
              {formatPrice(total)}
            </span>
          </div>
        </div>
      ) : null}

      <a
        href={applyHref ?? undefined}
        aria-disabled={!applyHref}
        className={`mt-4 flex w-full items-center justify-center rounded-sm px-5 py-3 text-[14.5px] font-medium transition-colors ${
          applyHref
            ? "bg-forest text-white hover:bg-forest-light"
            : "pointer-events-none bg-surface-soft text-text-soft/60"
        }`}
      >
        {applyHref ? "신청하기" : "날짜와 시간을 선택해주세요"}
      </a>
      </div>
    </div>
  );
}

