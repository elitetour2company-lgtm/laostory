"use client";

import { usePathname } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { CONTACT } from "@/lib/config";

// Detail pages below render a sticky bottom booking bar on mobile
// (above the shared bottom nav), so the widget needs extra clearance there.
function hasStickyCtaBar(pathname: string): boolean {
  return (
    pathname.startsWith("/travel/") ||
    pathname.startsWith("/villas/") ||
    pathname.startsWith("/golf/courses/") ||
    pathname.startsWith("/tours/")
  );
}

export default function KakaoWidget() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) return null;

  const mobileBottom = hasStickyCtaBar(pathname) ? "bottom-48" : "bottom-20";

  return (
    <a
      href={CONTACT.kakaoUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="카카오톡 상담하기"
      className={`fixed ${mobileBottom} right-4 z-40 flex h-14 w-14 items-center justify-center gap-2 rounded-full bg-[#FEE500] text-[#3C1E1E] shadow-lg shadow-black/20 transition-transform hover:scale-105 md:bottom-8 md:right-8 md:h-auto md:w-auto md:rounded-full md:px-5 md:py-3.5`}
    >
      <MessageCircle size={24} strokeWidth={2} className="md:hidden" />
      <MessageCircle size={19} strokeWidth={2} className="hidden md:block" />
      <span className="hidden text-[14px] font-semibold md:block">카카오톡 상담</span>
    </a>
  );
}
