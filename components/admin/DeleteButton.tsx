"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";

export default function DeleteButton({
  id,
  action,
  confirmMessage = "삭제하시겠습니까?",
}: {
  id: string;
  action: (id: string) => Promise<void>;
  confirmMessage?: string;
}) {
  const [pending, startTransition] = useTransition();

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
      className="inline-flex items-center gap-1 text-[12.5px] font-medium text-red-600 hover:text-red-700 disabled:opacity-50"
    >
      <Trash2 size={12.5} strokeWidth={2} />
      {pending ? "삭제 중..." : "삭제"}
    </button>
  );
}
