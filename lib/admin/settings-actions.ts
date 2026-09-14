"use server";

import { revalidatePath } from "next/cache";
import { adminRpc } from "@/lib/supabase/admin-rpc";

export type SettingsFormState = { error?: string; success?: boolean };

const SETTINGS_KEYS = [
  "contact_phone",
  "kakao_url",
  "telegram_url",
  "instagram_url",
  "facebook_url",
  "business_name",
  "business_reg_number",
  "business_address",
] as const;

export async function updateSettingsAction(
  _prevState: SettingsFormState | undefined,
  formData: FormData
): Promise<SettingsFormState> {
  try {
    for (const key of SETTINGS_KEYS) {
      const value = String(formData.get(key) ?? "").trim();
      await adminRpc("admin_set_setting", { p_key: key, p_value: value });
    }
  } catch {
    return { error: "저장 중 문제가 발생했습니다." };
  }

  revalidatePath("/admin/settings");
  return { success: true };
}
