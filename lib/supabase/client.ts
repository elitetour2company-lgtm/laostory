import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/**
 * Browser-safe Supabase client (anon key, RLS-restricted).
 * Content tables are public-read; `inquiries` is public-insert-only.
 * Safe to import from Client Components.
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
