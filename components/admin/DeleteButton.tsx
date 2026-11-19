"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";

export default function DeleteButton({
  id,
  action,
  confirmMessage = "삭제하시겠습니까?",
  variant = "link",
}: {
  id: string;
  action: (id: string) => Promise<void>;
  confirmMessage?: string;
  /** "button" = bigger phone-friendly outline button (used in mobile cards). */
  variant?: "link" | "button";
}) {
  const [pending, startTransition] = useTransition();

  const className =
    variant === "button"
      ? "inline-flex h-10 min-w-[84px] items-center justify-center gap-1.5 rounded-sm border border-red-200 px-4 text-[13.5px] font-medium text-red-600 active:bg-red-50 disabled:opacity-50"
      : "inline-flex items-center gap-1 text-[12.5px] font-medium text-red-600 hover:text-red-700 disabled:opacity-50";

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (!window.confirm(confirmMessage)) return;
        startTransition(() => {
          action(id);
        });
      }}
      className={className}
    >
      <Trash2 size={variant === "button" ? 14 : 12.5} strokeWidth={2} />
      {pending ? "삭제 중..." : "삭제"}
    </button>
  );
}
