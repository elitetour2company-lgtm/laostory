"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { adminRpc } from "@/lib/supabase/admin-rpc";

export type NoticeFormState = { error?: string };

function parseParagraphs(value: string): string[] {
  return value
    .split("\n\n")
    .map((p) => p.trim())
    .filter(Boolean);
}

export async function upsertNoticeAction(
  id: string | null,
  _prevState: NoticeFormState | undefined,
  formData: FormData
): Promise<NoticeFormState> {
  const title = String(formData.get("title") ?? "").trim();
  const slug =
    String(formData.get("slug") ?? "").trim() ||
    `notice-${new Date().toISOString().replace(/\D/g, "").slice(0, 14)}`;

  if (!title) {
    return { error: "제목은 필수 입력 항목입니다." };
  }

  const payload = {
    slug,
    title,
    excerpt: String(formData.get("excerpt") ?? "").trim(),
    content: parseParagraphs(String(formData.get("content") ?? "")),
  };

  try {
    await adminRpc("admin_upsert_notice", { p_id: id, p_data: payload });
  } catch {
    return { error: "저장 중 문제가 발생했습니다. 슬러그 중복 여부를 확인해주세요." };
  }

  revalidatePath("/admin/notices");
  revalidatePath("/notices");
  revalidatePath("/");
  redirect("/admin/notices");
}

export async function deleteNoticeAction(id: string) {
  await adminRpc("admin_delete_row", { p_table: "notices", p_id: id });
  revalidatePath("/admin/notices");
  revalidatePath("/notices");
  revalidatePath("/");
}
