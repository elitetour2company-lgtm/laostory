"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { adminRpc } from "@/lib/supabase/admin-rpc";

export type BannerFormState = { error?: string };

export async function upsertBannerAction(
  id: string | null,
  _prevState: BannerFormState | undefined,
  formData: FormData
): Promise<BannerFormState> {
  const title = String(formData.get("title") ?? "").trim();
  const image = String(formData.get("image") ?? "").trim();

  if (!title || !image) {
    return { error: "배너명, 이미지 키는 필수 입력 항목입니다." };
  }

  const payload = {
    title,
    image,
    href: String(formData.get("href") ?? "").trim(),
    isActive: formData.get("isActive") === "on",
    sortOrder: Number(formData.get("sortOrder")) || 0,
  };

  try {
    await adminRpc("admin_upsert_banner", { p_id: id, p_data: payload });
  } catch {
    return { error: "저장 중 문제가 발생했습니다." };
  }

  revalidatePath("/admin/banners");
  revalidatePath("/");
  redirect("/admin/banners");
}

export async function deleteBannerAction(id: string) {
  await adminRpc("admin_delete_row", { p_table: "banners", p_id: id });
  revalidatePath("/admin/banners");
  revalidatePath("/");
}
