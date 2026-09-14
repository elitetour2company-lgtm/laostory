"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { supabaseServer } from "@/lib/supabase/server";
import { createSessionToken, SESSION_COOKIE, SESSION_DURATION } from "./session";

export async function loginAction(
  _prevState: { error?: string } | undefined,
  formData: FormData
): Promise<{ error?: string }> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "이메일과 비밀번호를 입력해주세요." };
  }

  const { data, error } = await supabaseServer.rpc("verify_admin_credentials", {
    p_email: email,
    p_password: password,
  });

  if (error || !data || data.length === 0) {
    return { error: "이메일 또는 비밀번호가 올바르지 않습니다." };
  }

  const admin = data[0];
  const token = await createSessionToken({
    adminId: admin.id,
    email: admin.email,
    name: admin.name,
  });

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DURATION,
  });

  redirect("/admin");
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
  redirect("/admin/login");
}
