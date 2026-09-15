"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import Button from "@/components/ui/Button";
import { formatPrice, formatPriceUsd } from "@/lib/format";

type Props = {
  itemName: string;
  price: number;
  originalPrice?: number;
  priceUsd?: number;
  originalPriceUsd?: number;
  topLabel?: string;
  unitLabel?: string;
  maxGuests?: number;
  enableCalculator?: boolean;
  compact?: boolean;
};

export default function GuestPriceCalculator({
  itemName,
  price,
  originalPrice,
  priceUsd,
  originalPriceUsd,
  topLabel,
  unitLabel = "1인기준",
  maxGuests = 20,
  enableCalculator = true,
  compact = false,
}: Props) {
  const [guests, setGuests] = useState(1);

  const hasDiscount = Boolean(originalPrice && originalPrice > price);
  const discountPercent =
    hasDiscount && originalPrice
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : 0;
  const hasUsdDiscount = Boolean(
    originalPriceUsd && priceUsd && originalPriceUsd > priceUsd
  );

  const decrement = () => setGuests((g) => Math.max(1, g - 1));
  const increment = () => setGuests((g) => Math.min(maxGuests, g + 1));

  if (price === 0) {
    // No public price (matches how 블루투어 shows "금액별도문의" for this item) —
    // skip the calculator entirely and go straight to a quote request.
    const inquiryHref = `/consultation?items=${encodeURIComponent(
      `${itemName} - 가격 문의`
    )}`;
    const flatLabel = topLabel ?? unitLabel;

    if (compact) {
      return (
        <>
          <div>
            {flatLabel ? <p className="text-[11px] text-text-soft">{flatLabel}</p> : null}
            <p className="text-[16px] font-semibold text-forest">가격 문의</p>
          </div>
          <Button href={inquiryHref} variant="primary" className="flex-shrink-0">
            상담 신청
          </Button>
        </>
      );
    }

    return (
      <>
        <div>
          {flatLabel ? <p className="text-[13px] text-text-soft">{flatLabel}</p> : null}
          <p className="mt-1 text-[22px] font-semibold text-forest">가격 문의</p>
          <p className="mt-1 text-[13px] text-text-soft">
            일정·인원에 따라 견적이 달라져 상담 후 안내해드립니다.
          </p>
        </div>
        <Button href={inquiryHref} variant="primary" className="mt-5 w-full">
          1:1 상담 신청
        </Button>
      </>
    );
  }

  if (!enableCalculator) {
    // Flat price display, no guest stepper — used for per-vehicle ("1대기준")
    // pricing where multiplying by guest count would be misleading.
    const flatLabel = topLabel ?? unitLabel;
    const bookingHref = `/consultation?items=${encodeURIComponent(
      `${itemName} - ${formatPrice(price)}${priceUsd ? ` (${formatPriceUsd(priceUsd)})` : ""}`
    )}`;

    if (compact) {
      return (
        <>
          <div>
            {flatLabel ? <p className="text-[11px] text-text-soft">{flatLabel}</p> : null}
            {hasDiscount ? (
              <span className="mr-1.5 text-[11px] text-text-soft/70 line-through">
                {formatPrice(originalPrice!)}
              </span>
            ) : null}
            <p
              className={`${hasDiscount ? "inline " : ""}text-[16px] font-semibold text-forest`}
            >
              {formatPrice(price)}
            </p>
            {priceUsd ? (
              <span className="ml-1 text-[10.5px] text-text-soft">
                · {formatPriceUsd(priceUsd)}
              </span>
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
          {flatLabel ? <p className="text-[13px] text-text-soft">{flatLabel}</p> : null}
          {hasDiscount ? (
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-[13px] text-text-soft/70 line-through">
                {formatPrice(originalPrice!)}
              </span>
              <span className="text-[13px] font-semibold text-red-600">
                {discountPercent}% 할인
              </span>
            </div>
          ) : null}
          <p className="mt-1 text-[22px] font-semibold text-forest">{formatPrice(price)}</p>
          {priceUsd ? (
            <p className="mt-0.5 flex items-baseline gap-1.5 text-[13px] text-text-soft">
              {hasUsdDiscount ? (
                <span className="text-text-soft/70 line-through">
                  {formatPriceUsd(originalPriceUsd!)}
                </span>
              ) : null}
              {formatPriceUsd(priceUsd)}
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

  const total = price * guests;
  const totalUsd = priceUsd !== undefined ? priceUsd * guests : undefined;
  const bookingHref = `/consultation?items=${encodeURIComponent(
    `${itemName} - ${guests}인 - ${formatPrice(total)}${
      totalUsd !== undefined ? ` (${formatPriceUsd(totalUsd)})` : ""
    }`
  )}`;

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

  if (compact) {
    return (
      <>
        <div>
          <div className="flex items-center gap-2">
            {topLabel ? <span className="text-[11px] text-text-soft">{topLabel}</span> : null}
            <div className="ml-auto">{stepper}</div>
          </div>
          {hasDiscount ? (
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] text-text-soft/70 line-through">
                {formatPrice(originalPrice!)}
              </span>
              <span className="text-[11px] font-semibold text-red-600">
                {discountPercent}% 할인
              </span>
            </div>
          ) : null}
          <p className="mt-0.5 flex items-baseline gap-1 text-[16px] font-semibold text-forest">
            <span className="tabular-nums">{formatPrice(total)}</span>
            {unitLabel ? (
              <span className="text-[10.5px] font-normal text-text-soft">{unitLabel}</span>
            ) : null}
          </p>
          {guests > 1 ? (
            <p className="text-[10px] text-text-soft">
              {formatPrice(price)} × {guests}인
            </p>
          ) : null}
          {totalUsd !== undefined ? (
            <span className="text-[10.5px] text-text-soft">
              · <span className="tabular-nums">{formatPriceUsd(totalUsd)}</span>
            </span>
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
        {topLabel ? <p className="text-[13px] text-text-soft">{topLabel}</p> : null}
        {hasDiscount ? (
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-[13px] text-text-soft/70 line-through">
              {formatPrice(originalPrice!)}
            </span>
            <span className="text-[13px] font-semibold text-red-600">
              {discountPercent}% 할인
            </span>
          </div>
        ) : null}

        <div className="mt-3 flex items-center gap-3">
          <span className="text-[13px] text-text-soft">인원</span>
          {stepper}
        </div>

        <p className="mt-3 flex items-baseline gap-1.5 text-[22px] font-semibold text-forest">
          <span className="tabular-nums">{formatPrice(total)}</span>
          {unitLabel ? (
            <span className="text-[12px] font-normal text-text-soft">{unitLabel}</span>
          ) : null}
        </p>
        {guests > 1 ? (
          <p className="mt-0.5 text-[12px] text-text-soft">
            <span className="tabular-nums">{formatPrice(price)}</span> × {guests}인
          </p>
        ) : null}
        {totalUsd !== undefined ? (
          <p className="mt-0.5 flex items-baseline gap-1.5 text-[13px] text-text-soft">
            {hasUsdDiscount ? (
              <span className="text-text-soft/70 line-through">
                {formatPriceUsd(originalPriceUsd!)}
              </span>
            ) : null}
            <span className="tabular-nums">{formatPriceUsd(totalUsd)}</span>
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
