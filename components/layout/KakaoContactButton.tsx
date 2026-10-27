"use client";

import type { ReactNode } from "react";
import { openKakaoContact } from "@/components/layout/KakaoContact";

export default function KakaoContactButton({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <button type="button" onClick={openKakaoContact} className={className}>
      {children}
    </button>
  );
}
