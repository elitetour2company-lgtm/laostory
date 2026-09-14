import type { Metadata } from "next";
import LoginForm from "@/components/admin/LoginForm";
import { SITE_NAME } from "@/lib/config";

export const metadata: Metadata = {
  title: "관리자 로그인",
};

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-bg px-5">
      <div className="w-full max-w-sm">
        <p className="text-center text-[19px] font-semibold text-forest">
          {SITE_NAME}
        </p>
        <p className="mt-1 text-center text-[11px] tracking-[0.3em] text-gold">
          ADMIN
        </p>

        <div className="mt-8 rounded-md border border-border bg-white p-7">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
