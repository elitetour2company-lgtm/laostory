"use server";

import { revalidatePath } from "next/cache";
import { adminRpc } from "@/lib/supabase/admin-rpc";

export async function updateInquiryStatus(id: string, status: string) {
  await adminRpc("admin_update_inquiry_status", { p_id: id, p_status: status });
  revalidatePath("/admin/inquiries");
  revalidatePath("/admin");
}
