"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";
import { createAuthClient } from "@/lib/supabase/auth-client";

const fieldClass =
  "w-full border-b border-border bg-transparent py-2.5 text-[15px] text-text outline-none placeholder:text-text-soft/70 focus:border-forest transition-colors";
const labelClass = "mb-1.5 block text-[13px] font-medium text-text-soft";

export default function SignupPage() {
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const password = String(data.get("password") ?? "");

    if (!name || !email || !password) {
      setError("이름, 이메일, 비밀번호를 모두 입력해주세요.");
      return;
    }
    if (password.length < 6) {
      setError("비밀번호는 6자 이상이어야 합니다.");
      return;
    }

    setError(null);
    setSubmitting(true);

    const supabase = createAuthClient();
    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    setSubmitting(false);

    if (signUpError) {
      setError("회원가입 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
      return;
    }

    setSubmitted(true);
  }

  if (submitted) {
    return (
      <>
        <PageHeader eyebrow="Sign up" title="회원가입" />
        <Container className="py-10 md:py-14">
          <div className="mx-auto w-full max-w-sm rounded-xl border border-border bg-white px-6 py-16 text-center">
            <CheckCircle2 size={40} strokeWidth={1.5} className="mx-auto text-forest" />
            <p className="mt-5 text-[18px] font-semibold text-forest">
              가입 확인 메일을 보내드렸습니다.
            </p>
            <p className="mt-2 text-[14px] leading-relaxed text-text-soft">
              메일함에서 인증 링크를 확인하고 로그인해주세요.
            </p>
            <Link
              href="/login"
              className="mt-6 inline-flex rounded-sm bg-forest px-6 py-3 text-[14px] font-medium text-white hover:bg-forest-light"
            >
              로그인 페이지로 이동
            </Link>
          </div>
        </Container>
      </>
    );
  }

  return (
    <>
      <PageHeader eyebrow="Sign up" title="회원가입" description="회원 서비스를 이용하려면 계정을 만들어주세요." />

      <Container className="py-10 md:py-14">
        <div className="mx-auto w-full max-w-sm">
          <form
            onSubmit={handleSubmit}
            className="rounded-xl border border-border bg-white p-6 md:p-10"
          >
            <div className="space-y-5">
              <label className="block">
                <span className={labelClass}>이름</span>
                <input
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="홍길동"
                  className={fieldClass}
                />
              </label>
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
                  autoComplete="new-password"
                  minLength={6}
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
              {submitting ? "가입 중..." : "회원가입"}
            </button>

            <p className="mt-5 text-center text-[13px] text-text-soft">
              이미 계정이 있으신가요?{" "}
              <Link href="/login" className="font-medium text-forest hover:text-forest-light">
                로그인
              </Link>
            </p>
          </form>
        </div>
      </Container>
    </>
  );
}
