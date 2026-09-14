"use client";

import { useActionState } from "react";
import { loginAction } from "@/lib/admin/actions";

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, undefined);

  return (
    <form action={formAction} className="space-y-5">
      <label className="block">
        <span className="mb-1.5 block text-[13px] font-medium text-text-soft">
          이메일
        </span>
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          className="w-full border-b border-border bg-transparent py-2.5 text-[15px] text-text outline-none focus:border-forest"
        />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-[13px] font-medium text-text-soft">
          비밀번호
        </span>
        <input
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="w-full border-b border-border bg-transparent py-2.5 text-[15px] text-text outline-none focus:border-forest"
        />
      </label>

      {state?.error ? (
        <p className="text-[13px] font-medium text-red-600">{state.error}</p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-sm bg-forest px-6 py-3.5 text-[15px] font-medium text-white transition-colors hover:bg-forest-light disabled:opacity-60"
      >
        {pending ? "로그인 중..." : "로그인"}
      </button>
    </form>
  );
}
