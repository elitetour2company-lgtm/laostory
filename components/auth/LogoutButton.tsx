"use client";

import { useRouter } from "next/navigation";
import { createAuthClient } from "@/lib/supabase/auth-client";

export default function LogoutButton({
  className = "",
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) {
  const router = useRouter();

  async function handleLogout() {
    onClick?.();
    const supabase = createAuthClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <button type="button" onClick={handleLogout} className={className}>
      로그아웃
    </button>
  );
}
