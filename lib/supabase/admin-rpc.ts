import { supabaseServer } from "./server";

/**
 * Calls a `admin_*` Postgres RPC function, which is gated by a server-only
 * shared secret (never exposed to the browser) and runs as SECURITY DEFINER
 * to bypass RLS. Use this for any admin read/write that the public anon-key
 * RLS policies don't allow (e.g. reading/updating `inquiries`).
 */
export function adminSecret() {
  const secret = process.env.ADMIN_DB_SECRET;
  if (!secret) throw new Error("ADMIN_DB_SECRET is not set");
  return secret;
}

export async function adminRpc<T = unknown>(
  fn: string,
  args: Record<string, unknown> = {}
): Promise<T> {
  const { data, error } = await supabaseServer.rpc(fn, {
    p_secret: adminSecret(),
    ...args,
  });
  if (error) throw error;
  return data as T;
}
