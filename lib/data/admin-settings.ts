import { adminRpc } from "@/lib/supabase/admin-rpc";

export type SiteSettings = Record<string, string>;

export async function getAdminSettings(): Promise<SiteSettings> {
  const data = await adminRpc<Record<string, unknown>>("admin_get_settings");
  const result: SiteSettings = {};
  for (const [key, value] of Object.entries(data ?? {})) {
    result[key] = typeof value === "string" ? value : JSON.stringify(value);
  }
  return result;
}
