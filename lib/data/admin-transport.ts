import { adminRpc } from "@/lib/supabase/admin-rpc";

export type AdminTransportRow = {
  id: string;
  slug: string;
  title: string;
  category: string;
  route: string;
  vehicle_or_seat: string;
  duration: string;
  price: number;
  image: string | null;
  description: string;
};

export async function getAdminTransportOptions(): Promise<AdminTransportRow[]> {
  return adminRpc<AdminTransportRow[]>("admin_get_rows", { p_table: "transport_options" });
}

export async function getAdminTransportOptionById(id: string): Promise<AdminTransportRow | null> {
  const rows = await getAdminTransportOptions();
  return rows.find((r) => r.id === id) ?? null;
}
