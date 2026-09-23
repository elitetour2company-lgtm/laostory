"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import Button from "@/components/ui/Button";
import { formatPrice, formatPriceUsd } from "@/lib/format";
import type { GolfSpecialRate } from "@/types";

type Props = {
  itemName: string;
  price: number;
  priceUsd?: number;
  weekendPrice?: number;
  weekendPriceUsd?: number;
  peakSeasonLabel?: string;
  peakSeasonPrice?: number;
  peakSeasonPriceUsd?: number;
  peakSeasonWeekendPrice?: number;
  peakSeasonWeekendPriceUsd?: number;
  midSeasonLabel?: string;
  midSeasonPrice?: number;
  midSeasonPriceUsd?: number;
  midSeasonWeekendPrice?: number;
  midSeasonWeekendPriceUsd?: number;
  specialRates?: GolfSpecialRate[];
  oddHeadcountCartFee?: number;
  oddHeadcountCartFeeUsd?: number;
  oddHeadcountCartFeeWeekend?: number;
  oddHeadcountCartFeeWeekendUsd?: number;
  maxGuests?: number;
  compact?: boolean;
};

function todayISO(): string {
  const d = new Date();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

function isWeekend(iso: string): boolean {
  const [y, m, d] = iso.split("-").map(Number);
  const day = new Date(y, m - 1, d).getDay();
  return day === 0 || day === 6;
}

// Labels look like "12월~3월" — parse the two month numbers, which may wrap
// across a calendar year (e.g. Oct through Mar).
function parseSeasonMonths(label?: string): [number, number] | null {
  if (!label) return null;
  const match = label.match(/(\d+)월\s*~\s*(\d+)월/);
  if (!match) return null;
  return [Number(match[1]), Number(match[2])];
}

function isMonthInSeason(month: number, [start, end]: [number, number]): boolean {
  return start <= end ? month >= start && month <= end : month >= start || month <= end;
}

function formatDateKorean(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  const weekday = ["일", "월", "화", "수", "목", "금", "토"][date.getDay()];
  return `${y}년 ${m}월 ${d}일 (${weekday})`;
}

export default function GolfPriceCalculator({
  itemName,
  price,
  priceUsd,
  weekendPrice,
  weekendPriceUsd,
  peakSeasonLabel,
  peakSeasonPrice,
  peakSeasonPriceUsd,
  peakSeasonWeekendPrice,
  peakSeasonWeekendPriceUsd,
  midSeasonLabel,
  midSeasonPrice,
  midSeasonPriceUsd,
  midSeasonWeekendPrice,
  midSeasonWeekendPriceUsd,
  specialRates,
  oddHeadcountCartFee,
  oddHeadcountCartFeeUsd,
  oddHeadcountCartFeeWeekend,
  oddHeadcountCartFeeWeekendUsd,
  maxGuests = 20,
  compact = false,
}: Props) {
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState(1);
  const [afternoon, setAfternoon] = useState(false);

  const weekend = date ? isWeekend(date) : false;
  const seasonMonths = parseSeasonMonths(peakSeasonLabel);
  const isPeakSeason = Boolean(
    date && seasonMonths && peakSeasonPrice && isMonthInSeason(Number(date.split("-")[1]), seasonMonths)
  );

  const midMonths = parseSeasonMonths(midSeasonLabel);
  const isMidSeason = Boolean(
    !isPeakSeason &&
      date &&
      midMonths &&
      midSeasonPrice &&
      isMonthInSeason(Number(date.split("-")[1]), midMonths)
  );

  const regularUnitPrice = isPeakSeason
    ? weekend && peakSeasonWeekendPrice
      ? peakSeasonWeekendPrice
      : peakSeasonPrice!
    : isMidSeason
      ? weekend && midSeasonWeekendPrice
        ? midSeasonWeekendPrice
        : midSeasonPrice!
      : weekend && weekendPrice
        ? weekendPrice
        : price;
  const regularUnitPriceUsd = isPeakSeason
    ? weekend && peakSeasonWeekendPriceUsd
      ? peakSeasonWeekendPriceUsd
      : peakSeasonPriceUsd
    : isMidSeason
      ? weekend && midSeasonWeekendPriceUsd
        ? midSeasonWeekendPriceUsd
        : midSeasonPriceUsd
      : weekend && weekendPriceUsd
        ? weekendPriceUsd
        : priceUsd;
  const dayIndex = date
    ? (() => {
        const [y, m, d] = date.split("-").map(Number);
        return new Date(y, m - 1, d).getDay();
      })()
    : null;
  const monthNumber = date ? Number(date.split("-")[1]) : null;
  const rateApplies = (r: GolfSpecialRate) => {
    if (r.showOnly || dayIndex === null || monthNumber === null) return false;
    if (r.afternoon && !afternoon) return false;
    if (r.days && !r.days.includes(dayIndex)) return false;
    if (r.months) {
      const window = parseSeasonMonths(r.months);
      if (!window || !isMonthInSeason(monthNumber, window)) return false;
    }
    return true;
  };
  const specialRate = (specialRates ?? [])
    .filter(rateApplies)
    .sort((a, b) => a.price - b.price)[0];
  const useSpecial = Boolean(specialRate && specialRate.price < regularUnitPrice);
  const unitPrice = useSpecial ? specialRate!.price : regularUnitPrice;
  const unitPriceUsd = useSpecial ? specialRate!.priceUsd : regularUnitPriceUsd;
  const hasAfternoonRate = (specialRates ?? []).some((r) => r.afternoon && !r.showOnly);
  const hasWeekendRate = Boolean(
    isPeakSeason
      ? peakSeasonWeekendPrice && peakSeasonWeekendPrice !== peakSeasonPrice
      : isMidSeason
        ? midSeasonWeekendPrice && midSeasonWeekendPrice !== midSeasonPrice
        : weekendPrice && weekendPrice !== price
  );
  const hasPeakSeason = Boolean(seasonMonths && peakSeasonPrice);
  const hasMidSeason = Boolean(midMonths && midSeasonPrice);
  const otherSeasonLabels = [
    hasMidSeason ? midSeasonLabel : null,
    hasPeakSeason ? peakSeasonLabel : null,
  ].filter(Boolean);
  const rateNote = useSpecial
    ? `${specialRate!.label} 요금이 적용돼요`
    : !date
    ? hasPeakSeason || hasMidSeason
      ? `${otherSeasonLabels.join(", ")}에는 시즌 요금이 적용돼요`
      : null
    : isPeakSeason
      ? `성수기(${peakSeasonLabel})${hasWeekendRate ? ` ${weekend ? "주말" : "평일"}` : ""} 요금이 적용돼요`
      : isMidSeason
        ? `${midSeasonLabel}${hasWeekendRate ? ` ${weekend ? "주말" : "평일"}` : ""} 요금이 적용돼요`
        : hasWeekendRate
          ? `${weekend ? "주말(토·일)" : "평일"} 요금이 적용돼요`
          : hasPeakSeason || hasMidSeason
            ? `${otherSeasonLabels.join(", ")} 외에는 지금 요금이 적용돼요`
            : null;

  // A lone golfer has no cart to split, so the surcharge only kicks in once a
  // group of 3+ can't divide evenly into 2-seat carts.
  const needsOddCart = guests >= 3 && guests % 2 !== 0;
  const oddFee = weekend && oddHeadcountCartFeeWeekend ? oddHeadcountCartFeeWeekend : oddHeadcountCartFee;
  const oddFeeUsd =
    weekend && oddHeadcountCartFeeWeekendUsd ? oddHeadcountCartFeeWeekendUsd : oddHeadcountCartFeeUsd;
  const cartSurcharge = needsOddCart && oddFee ? oddFee : 0;
  const cartSurchargeUsd = needsOddCart && oddFeeUsd ? oddFeeUsd : 0;

  const total = unitPrice * guests + cartSurcharge;
  const totalUsd = unitPriceUsd !== undefined ? unitPriceUsd * guests + cartSurchargeUsd : undefined;

  const decrement = () => setGuests((g) => Math.max(1, g - 1));
  const increment = () => setGuests((g) => Math.min(maxGuests, g + 1));

  const bookingHref = `/consultation?${new URLSearchParams({
    items: `${itemName} - ${date ? `${formatDateKorean(date)} · ` : ""}${guests}인 - ${formatPrice(total)}${
      totalUsd !== undefined ? ` (${formatPriceUsd(totalUsd)})` : ""
    }`,
    ...(date ? { travelDate: date } : {}),
  }).toString()}`;

  const stepper = (
    <div className={`flex items-center ${compact ? "gap-1.5" : "gap-3"}`}>
      <button
        type="button"
        onClick={decrement}
        disabled={guests === 1}
        aria-label="인원 감소"
        className={`flex items-center justify-center rounded-full border border-border transition-colors hover:border-forest disabled:opacity-40 disabled:hover:border-border ${
          compact ? "h-6 w-6" : "h-8 w-8"
        }`}
      >
        <Minus size={compact ? 12 : 15} strokeWidth={2} />
      </button>
      <span
        className={`text-center font-semibold tabular-nums text-text ${
          compact ? "w-4 text-[13px]" : "w-5 text-[15px]"
        }`}
      >
        {guests}
      </span>
      <button
        type="button"
        onClick={increment}
        disabled={guests === maxGuests}
        aria-label="인원 증가"
        className={`flex items-center justify-center rounded-full border border-border transition-colors hover:border-forest disabled:opacity-40 disabled:hover:border-border ${
          compact ? "h-6 w-6" : "h-8 w-8"
        }`}
      >
        <Plus size={compact ? 12 : 15} strokeWidth={2} />
      </button>
    </div>
  );

  const afternoonToggle = hasAfternoonRate ? (
    <label
      className={`flex cursor-pointer items-center gap-1.5 text-text-soft ${
        compact ? "mt-1 text-[10.5px]" : "mt-3 text-[12.5px]"
      }`}
    >
      <input
        type="checkbox"
        checked={afternoon}
        onChange={(e) => setAfternoon(e.target.checked)}
        className="h-3.5 w-3.5 accent-forest"
      />
      오후 특가 티타임 (13:30 이후)
    </label>
  ) : null;

  const dateField = (
    <label className="block">
      <span className={`mb-1 block text-text-soft ${compact ? "text-[10.5px]" : "text-[12.5px] font-medium"}`}>
        라운딩 날짜
      </span>
      <input
        type="date"
        min={todayISO()}
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className={`w-full rounded-sm border border-border text-text outline-none focus:border-forest ${
          compact ? "px-2 py-1.5 text-[12.5px]" : "px-3 py-2.5 text-[14px]"
        }`}
      />
    </label>
  );

  if (compact) {
    return (
      <>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <div className="w-28 flex-shrink-0">{dateField}</div>
            <div className="ml-auto">{stepper}</div>
          </div>
          {afternoonToggle}
          <p className="mt-1 flex items-baseline gap-1 text-[16px] font-semibold text-forest">
            <span className="tabular-nums">{formatPrice(total)}</span>
            <span className="text-[10.5px] font-normal text-text-soft">1인기준</span>
          </p>
          {date && (hasWeekendRate || isPeakSeason || isMidSeason || useSpecial) ? (
            <p className="text-[10px] text-text-soft">
              {useSpecial ? "특별가" : isPeakSeason ? "성수기가" : isMidSeason ? "시즌가" : weekend ? "주말가" : "평일가"} {formatPrice(unitPrice)} × {guests}인
            </p>
          ) : null}
          {cartSurcharge > 0 ? (
            <p className="text-[10px] text-text-soft">홀수 인원 카트비 +{formatPrice(cartSurcharge)}</p>
          ) : null}
        </div>
        <Button href={bookingHref} variant="primary" className="flex-shrink-0">
          예약하기
        </Button>
      </>
    );
  }

  return (
    <>
      <div>
        <p className="text-[13px] text-text-soft">그린피</p>

        <div className="mt-3">{dateField}</div>

        {afternoonToggle}

        {rateNote ? <p className="mt-1.5 text-[12px] text-text-soft">{rateNote}</p> : null}

        <div className="mt-3 flex items-center gap-3">
          <span className="text-[13px] text-text-soft">인원</span>
          {stepper}
        </div>

        <p className="mt-3 flex items-baseline gap-1.5 text-[22px] font-semibold text-forest">
          <span className="tabular-nums">{formatPrice(total)}</span>
          <span className="text-[12px] font-normal text-text-soft">1인기준</span>
        </p>
        {guests > 1 ? (
          <p className="mt-0.5 text-[12px] text-text-soft">
            <span className="tabular-nums">{formatPrice(unitPrice)}</span> × {guests}인
          </p>
        ) : null}
        {cartSurcharge > 0 ? (
          <p className="mt-0.5 text-[12px] text-text-soft">
            홀수 인원 카트비 +<span className="tabular-nums">{formatPrice(cartSurcharge)}</span>
          </p>
        ) : null}
        {totalUsd !== undefined ? (
          <p className="mt-0.5 text-[13px] text-text-soft">
            <span className="tabular-nums">{formatPriceUsd(totalUsd)}</span>
          </p>
        ) : null}
        {weekendPrice && weekendPrice !== price ? (
          <p className="mt-2 text-[11.5px] text-text-soft">
            평일 {formatPrice(price)} · 주말 {formatPrice(weekendPrice)}
          </p>
        ) : null}
        {(specialRates ?? []).map((r) => (
          <p key={r.label + (r.months ?? "")} className="mt-0.5 text-[11.5px] text-text-soft">
            {r.label}
            {r.months ? ` ${r.months}` : ""} {formatPrice(r.price)}
            {r.priceUsd ? ` (${formatPriceUsd(r.priceUsd)})` : ""}
          </p>
        ))}
        {hasMidSeason ? (
          <p className="mt-0.5 text-[11.5px] text-text-soft">
            {midSeasonLabel}{" "}
            {midSeasonWeekendPrice && midSeasonWeekendPrice !== midSeasonPrice
              ? `평일 ${formatPrice(midSeasonPrice!)} · 주말 ${formatPrice(midSeasonWeekendPrice)}`
              : formatPrice(midSeasonPrice!)}
          </p>
        ) : null}
        {hasPeakSeason ? (
          <p className="mt-0.5 text-[11.5px] text-text-soft">
            {peakSeasonLabel} 성수기{" "}
            {peakSeasonWeekendPrice && peakSeasonWeekendPrice !== peakSeasonPrice
              ? `평일 ${formatPrice(peakSeasonPrice!)} · 주말 ${formatPrice(peakSeasonWeekendPrice)}`
              : formatPrice(peakSeasonPrice!)}
          </p>
        ) : null}
      </div>
      <Button href={bookingHref} variant="primary" className="mt-5 w-full">
        예약하기
      </Button>
      <Button href={bookingHref} variant="ghost" className="mt-2.5 w-full">
        1:1 여행상담
      </Button>
    </>
  );
}
