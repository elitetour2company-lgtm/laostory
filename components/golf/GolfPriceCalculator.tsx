"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import Button from "@/components/ui/Button";
import { formatPrice, formatPriceUsd } from "@/lib/format";

type Props = {
  itemName: string;
  price: number;
  priceUsd?: number;
  weekendPrice?: number;
  weekendPriceUsd?: number;
  oddHeadcountCartFee?: number;
  oddHeadcountCartFeeUsd?: number;
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
  oddHeadcountCartFee,
  oddHeadcountCartFeeUsd,
  maxGuests = 20,
  compact = false,
}: Props) {
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState(1);

  const weekend = date ? isWeekend(date) : false;
  const unitPrice = weekend && weekendPrice ? weekendPrice : price;
  const unitPriceUsd = weekend && weekendPriceUsd ? weekendPriceUsd : priceUsd;
  const hasWeekendRate = Boolean(weekendPrice && weekendPrice !== price);

  // A lone golfer has no cart to split, so the surcharge only kicks in once a
  // group of 3+ can't divide evenly into 2-seat carts.
  const needsOddCart = guests >= 3 && guests % 2 !== 0;
  const cartSurcharge = needsOddCart && oddHeadcountCartFee ? oddHeadcountCartFee : 0;
  const cartSurchargeUsd = needsOddCart && oddHeadcountCartFeeUsd ? oddHeadcountCartFeeUsd : 0;

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
          <p className="mt-1 flex items-baseline gap-1 text-[16px] font-semibold text-forest">
            <span className="tabular-nums">{formatPrice(total)}</span>
            <span className="text-[10.5px] font-normal text-text-soft">1인기준</span>
          </p>
          {date && hasWeekendRate ? (
            <p className="text-[10px] text-text-soft">
              {weekend ? "주말가" : "평일가"} {formatPrice(unitPrice)} × {guests}인
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

        {date && hasWeekendRate ? (
          <p className="mt-1.5 text-[12px] text-text-soft">
            {weekend ? "주말(토·일)" : "평일"} 요금이 적용돼요
          </p>
        ) : null}

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
        {hasWeekendRate ? (
          <p className="mt-2 text-[11.5px] text-text-soft">
            평일 {formatPrice(price)} · 주말 {formatPrice(weekendPrice!)}
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
