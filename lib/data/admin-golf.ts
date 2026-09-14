import { adminRpc } from "@/lib/supabase/admin-rpc";

export type AdminGolfCourseRow = {
  id: string;
  slug: string;
  name: string;
  location: string;
  holes: number;
  par: number;
  difficulty: string;
  description: string;
  price: number;
  original_price: number | null;
  price_usd: number | null;
  original_price_usd: number | null;
  image: string | null;
  gallery: string[];
  yardage: number | null;
  location_note: string | null;
  includes_caddie: boolean;
  includes_cart: boolean;
  facilities: string[];
};

export async function getAdminGolfCourses(): Promise<AdminGolfCourseRow[]> {
  return adminRpc<AdminGolfCourseRow[]>("admin_get_rows", { p_table: "golf_courses" });
}

export async function getAdminGolfCourseById(id: string): Promise<AdminGolfCourseRow | null> {
  const rows = await getAdminGolfCourses();
  return rows.find((r) => r.id === id) ?? null;
}
