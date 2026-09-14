"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";
import { createAuthClient } from "@/lib/supabase/auth-client";

const fieldClass =
  "w-full border-b border-border bg-transparent py-2.5 text-[15px] text-text outline-none placeholder:text-text-soft/70 focus:border-forest transition-colors";
const labelClass = "mb-1.5 block text-[13px] font-medium text-text-soft";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const email = String(data.get("email") ?? "").trim();
    const password = String(data.get("password") ?? "");

    if (!email || !password) {
      setError("이메일과 비밀번호를 입력해주세요.");
      return;
    }

    setError(null);
    setSubmitting(true);

    const supabase = createAuthClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setSubmitting(false);

    if (signInError) {
      setError("이메일 또는 비밀번호가 올바르지 않습니다.");
      return;
    }

    router.push("/mypage");
    router.refresh();
  }

  return (
    <>
      <PageHeader eyebrow="Login" title="로그인" description="회원 서비스를 이용하려면 로그인해주세요." />

      <Container className="py-10 md:py-14">
        <div className="mx-auto w-full max-w-sm">
          <form
            onSubmit={handleSubmit}
            className="rounded-xl border border-border bg-white p-6 md:p-10"
          >
            <div className="space-y-5">
              <label className="block">
                <span className={labelClass}>이메일</span>
                <input
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  className={fieldClass}
                />
              </label>
              <label className="block">
                <span className={labelClass}>비밀번호</span>
                <input
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className={fieldClass}
                />
              </label>
            </div>

            {error ? (
              <p className="mt-4 text-[13px] font-medium text-red-600">{error}</p>
            ) : null}

            <button
              type="submit"
              disabled={submitting}
              className="mt-7 w-full rounded-sm bg-forest px-6 py-3.5 text-[15px] font-medium text-white transition-colors hover:bg-forest-light disabled:opacity-60"
            >
              {submitting ? "로그인 중..." : "로그인"}
            </button>

            <p className="mt-5 text-center text-[13px] text-text-soft">
              계정이 없으신가요?{" "}
              <Link href="/signup" className="font-medium text-forest hover:text-forest-light">
                회원가입
              </Link>
            </p>
          </form>
        </div>
      </Container>
    </>
  );
}
