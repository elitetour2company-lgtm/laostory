import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Server Supabase client for authenticated-user features (Server Components,
 * Route Handlers). Separate from `lib/supabase/server.ts`, which stays
 * dedicated to public anonymous content reads used across the site.
 */
export async function createAuthServerClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Server Components can't set cookies. proxy.ts refreshes the
            // session on every request, so this is safe to ignore.
          }
        },
      },
    }
  );
}
