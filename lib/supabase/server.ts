import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/**
 * Server-side Supabase client for use in Server Components / route handlers.
 * Uses the same public anon key as the browser client — content tables are
 * public-read via RLS, so no service-role key is needed for read paths.
 */
export const supabaseServer = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { persistSession: false },
});
