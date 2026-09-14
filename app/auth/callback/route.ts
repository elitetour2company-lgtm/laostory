import { NextRequest, NextResponse } from "next/server";
import { createAuthServerClient } from "@/lib/supabase/auth-server";

// Handles Supabase's email-confirmation / magic-link redirect: exchanges the
// `code` query param for a session, then sends the user on to /mypage.
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    const supabase = await createAuthServerClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}/mypage`);
    }
  }

  return NextResponse.redirect(`${origin}/login`);
}
