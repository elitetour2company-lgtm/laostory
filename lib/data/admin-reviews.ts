import { adminRpc } from "@/lib/supabase/admin-rpc";

export type AdminReviewRow = {
  id: string;
  customer_name: string;
  destination: string;
  product: string;
  category: string;
  date: string;
  rating: number;
  content: string;
  is_sample: boolean;
  photos: string[];
};

export async function getAdminReviews(): Promise<AdminReviewRow[]> {
  return adminRpc<AdminReviewRow[]>("admin_get_rows", { p_table: "reviews" });
}

export async function getAdminReviewById(id: string): Promise<AdminReviewRow | null> {
  const rows = await getAdminReviews();
  return rows.find((r) => r.id === id) ?? null;
}
