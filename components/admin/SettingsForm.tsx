"use client";

import { useActionState } from "react";
import { updateSettingsAction, SettingsFormState } from "@/lib/admin/settings-actions";
import { SiteSettings } from "@/lib/data/admin-settings";

const fieldClass =
  "w-full rounded-sm border border-border bg-white px-3.5 py-2.5 text-[14px] text-text outline-none focus:border-forest";
const labelClass = "mb-1.5 block text-[12.5px] font-medium text-text-soft";

const FIELDS: { key: string; label: string; placeholder?: string }[] = [
  { key: "contact_phone", label: "대표 상담 전화번호" },
  { key: "kakao_url", label: "카카오톡 채널 링크" },
  { key: "telegram_url", label: "텔레그램 링크" },
  { key: "instagram_url", label: "인스타그램 링크" },
  { key: "facebook_url", label: "페이스북 링크" },
  { key: "business_name", label: "대표자명" },
  { key: "business_reg_number", label: "사업자등록번호" },
  { key: "business_address", label: "사업장 주소" },
];

export default function SettingsForm({ settings }: { settings: SiteSettings }) {
  const [state, formAction, pending] = useActionState<SettingsFormState | undefined, FormData>(
    updateSettingsAction,
    undefined
  );

  return (
    <form action={formAction} className="space-y-6">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {FIELDS.map((f) => (
          <label key={f.key}>
            <span className={labelClass}>{f.label}</span>
            <input
              name={f.key}
              defaultValue={settings[f.key] ?? ""}
              className={fieldClass}
              placeholder={f.placeholder}
            />
          </label>
        ))}
      </div>

      {state?.error ? (
        <p className="text-[13px] font-medium text-red-600">{state.error}</p>
      ) : null}
      {state?.success ? (
        <p className="text-[13px] font-medium text-forest">저장되었습니다.</p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="rounded-sm bg-forest px-7 py-3 text-[14px] font-medium text-white hover:bg-forest-light disabled:opacity-60"
      >
        {pending ? "저장 중..." : "저장"}
      </button>
    </form>
  );
}
