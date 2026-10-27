"use client";

import { useEffect, useState } from "react";
import { Check, Copy, X } from "lucide-react";
import { CONTACT } from "@/lib/config";

const OPEN_EVENT = "open-kakao-contact";

export function openKakaoContact() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export default function KakaoContactModal() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const show = () => setOpen(true);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener(OPEN_EVENT, show);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener(OPEN_EVENT, show);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  async function copyId() {
    try {
      await navigator.clipboard.writeText(CONTACT.kakaoId);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/45 p-4 md:items-center"
      onClick={() => setOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-label="카카오톡 상담"
    >
      <div
        className="relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="닫기"
          className="absolute right-3 top-3 rounded-full p-2 text-text-soft hover:bg-ivory"
        >
          <X size={18} />
        </button>

        <p className="text-[17px] font-semibold text-forest">카카오톡 상담</p>
        <p className="mt-1.5 text-[13.5px] leading-relaxed text-text-soft">
          카카오톡에서 아래 ID로 친구 추가하고 편하게 문의해 주세요.
        </p>

        <div className="mt-5 flex items-center justify-between gap-3 rounded-xl bg-ivory px-4 py-3.5">
          <div>
            <p className="text-[11.5px] text-text-soft">카카오톡 ID</p>
            <p className="text-[18px] font-semibold tracking-tight text-text">
              {CONTACT.kakaoId}
            </p>
          </div>
          <button
            type="button"
            onClick={copyId}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#FEE500] px-4 py-2 text-[13px] font-semibold text-[#3C1E1E]"
          >
            {copied ? <Check size={15} /> : <Copy size={15} />}
            {copied ? "복사됨" : "ID 복사"}
          </button>
        </div>

        {CONTACT.kakaoQrLink && (
          <a
            href={CONTACT.kakaoQrLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex items-center justify-center rounded-xl bg-forest px-4 py-3 text-[14px] font-semibold text-white md:hidden"
          >
            카카오톡에서 바로 친구 추가
          </a>
        )}

        {CONTACT.kakaoQr && (
          <div className="mt-5 hidden text-center md:block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={CONTACT.kakaoQr}
              alt="카카오톡 친구 추가 QR코드"
              className="mx-auto h-44 w-44 rounded-lg border border-border object-contain"
            />
            <p className="mt-2 text-[12.5px] text-text-soft">
              카카오톡 &gt; 친구 추가 &gt; QR코드 로 스캔하세요
            </p>
          </div>
        )}

        <p className="mt-5 text-[12.5px] leading-relaxed text-text-soft">
          카카오톡 &gt; 친구 추가 &gt; <b>ID 검색</b>에서 위 ID를 입력하면 찾을
          수 있어요.
        </p>
      </div>
    </div>
  );
}
