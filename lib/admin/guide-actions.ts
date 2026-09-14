"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { adminRpc } from "@/lib/supabase/admin-rpc";

export type GuideFormState = { error?: string };

function parseParagraphs(value: string): string[] {
  return value
    .split("\n\n")
    .map((p) => p.trim())
    .filter(Boolean);
}

export async function upsertGuideArticleAction(
  id: string | null,
  _prevState: GuideFormState | undefined,
  formData: FormData
): Promise<GuideFormState> {
  const slug = String(formData.get("slug") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();

  if (!slug || !title) {
    return { error: "슬러그, 제목은 필수 입력 항목입니다." };
  }

  const payload = {
    slug,
    title,
    category: String(formData.get("category") ?? "").trim(),
    excerpt: String(formData.get("excerpt") ?? "").trim(),
    image: String(formData.get("image") ?? "").trim(),
    content: parseParagraphs(String(formData.get("content") ?? "")),
  };

  try {
    await adminRpc("admin_upsert_guide_article", { p_id: id, p_data: payload });
  } catch {
    return { error: "저장 중 문제가 발생했습니다. 슬러그 중복 여부를 확인해주세요." };
  }

  revalidatePath("/admin/guide");
  revalidatePath("/guide");
  redirect("/admin/guide");
}

export async function deleteGuideArticleAction(id: string) {
  await adminRpc("admin_delete_row", { p_table: "guide_articles", p_id: id });
  revalidatePath("/admin/guide");
  revalidatePath("/guide");
}
