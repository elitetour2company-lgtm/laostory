"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { adminRpc } from "@/lib/supabase/admin-rpc";

export type TransportFormState = { error?: string };

export async function upsertTransportOptionAction(
  id: string | null,
  _prevState: TransportFormState | undefined,
  formData: FormData
): Promise<TransportFormState> {
  const slug = String(formData.get("slug") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const price = Number(formData.get("price"));

  if (!slug || !title || !price) {
    return { error: "슬러그, 상품명, 가격은 필수 입력 항목입니다." };
  }

  const payload = {
    slug,
    title,
    category: String(formData.get("category") ?? "AIRPORT_TRANSFER"),
    route: String(formData.get("route") ?? "").trim(),
    vehicleOrSeat: String(formData.get("vehicleOrSeat") ?? "").trim(),
    duration: String(formData.get("duration") ?? "").trim(),
    price,
    image: String(formData.get("image") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
  };

  try {
    await adminRpc("admin_upsert_transport_option", { p_id: id, p_data: payload });
  } catch {
    return { error: "저장 중 문제가 발생했습니다. 슬러그 중복 여부를 확인해주세요." };
  }

  revalidatePath("/admin/transport");
  revalidatePath("/transport");
  redirect("/admin/transport");
}

export async function deleteTransportOptionAction(id: string) {
  await adminRpc("admin_delete_row", { p_table: "transport_options", p_id: id });
  revalidatePath("/admin/transport");
  revalidatePath("/transport");
}
