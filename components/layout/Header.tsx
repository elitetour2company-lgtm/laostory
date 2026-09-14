"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { Search, Menu, X, Heart } from "lucide-react";
import Container from "@/components/ui/Container";
import Logo from "./Logo";
import LogoutButton from "@/components/auth/LogoutButton";
import { createAuthClient } from "@/lib/supabase/auth-client";
import { MAIN_NAV } from "@/lib/nav";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const supabase = createAuthClient();

    supabase.auth.getUser().then(({ data }) => setUser(data.user));

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!searchOpen && !mobileOpen) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setSearchOpen(false);
        setMobileOpen(false);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [searchOpen, mobileOpen]);

  const solid = !isHome || scrolled || mobileOpen || searchOpen;

  if (pathname.startsWith("/admin")) return null;

  function handleSearchSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
    setSearchOpen(false);
    setMobileOpen(false);
    setQuery("");
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid
          ? "border-b border-border bg-white/95 backdrop-blur-sm"
          : "bg-transparent"
      }`}
    >
      <Container className="flex h-16 items-center justify-between md:h-20">
        <Logo dark={solid} />

        <nav className="hidden items-center gap-9 lg:flex">
          {MAIN_NAV.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium tracking-wide transition-colors ${
                  active
                    ? solid
                      ? "text-forest"
                      : "text-gold-soft"
                    : solid
                      ? "text-text hover:text-forest"
                      : "text-white hover:text-gold-soft"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          <button
            type="button"
            aria-label="검색"
            aria-expanded={searchOpen}
            aria-controls="header-search-panel"
            onClick={() => setSearchOpen((v) => !v)}
            className={`hidden rounded-full p-3 transition-colors lg:inline-flex ${
              solid ? "text-text hover:bg-forest/5" : "text-white hover:bg-white/10"
            }`}
          >
            <Search size={19} strokeWidth={1.5} />
          </button>
          {user ? (
            <div className="hidden items-center lg:flex">
              <Link
                href="/mypage"
                className={`rounded-full px-3 py-2.5 text-sm font-medium transition-colors ${
                  solid ? "text-text hover:bg-forest/5" : "text-white hover:bg-white/10"
                }`}
              >
                마이페이지
              </Link>
              <LogoutButton
                className={`rounded-full px-3 py-2.5 text-sm font-medium transition-colors ${
                  solid ? "text-text hover:bg-forest/5" : "text-white hover:bg-white/10"
                }`}
              />
            </div>
          ) : (
            <Link
              href="/login"
              className={`hidden rounded-full px-3 py-2.5 text-sm font-medium transition-colors lg:inline-flex ${
                solid ? "text-text hover:bg-forest/5" : "text-white hover:bg-white/10"
              }`}
            >
              로그인
            </Link>
          )}
          <Link
            href="/wishlist"
            aria-label="찜한 상품"
            className={`hidden rounded-full p-3 transition-colors lg:inline-flex ${
              solid ? "text-text hover:bg-forest/5" : "text-white hover:bg-white/10"
            }`}
          >
            <Heart size={19} strokeWidth={1.5} />
          </Link>
          <Link
            href="/consultation"
            className="hidden rounded-sm bg-forest px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-forest-light lg:inline-flex"
          >
            1:1 상담하기
          </Link>
          <button
            type="button"
            aria-label="메뉴"
            aria-expanded={mobileOpen}
            aria-controls="header-mobile-panel"
            onClick={() => setMobileOpen((v) => !v)}
            className={`inline-flex rounded-full p-3 lg:hidden ${
              solid ? "text-text" : "text-white"
            }`}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </Container>

      {searchOpen && (
        <div id="header-search-panel" className="hidden border-t border-border bg-white md:block">
          <Container className="py-4">
            <form onSubmit={handleSearchSubmit}>
              <input
                autoFocus
                type="text"
                name="q"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="지역, 상품, 숙소를 검색해보세요"
                className="w-full border-b border-border bg-transparent py-2 text-[15px] text-text outline-none placeholder:text-text-soft"
              />
            </form>
          </Container>
        </div>
      )}

      {mobileOpen && (
        <div id="header-mobile-panel" className="border-t border-border bg-white lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            <div className="mb-3 border-b border-border pb-3">
              <form onSubmit={handleSearchSubmit}>
                <input
                  type="text"
                  name="q"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="지역, 상품, 숙소를 검색해보세요"
                  className="w-full border-b border-border bg-transparent py-2 text-[15px] text-text outline-none placeholder:text-text-soft"
                />
              </form>
            </div>
            {MAIN_NAV.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`rounded-sm px-2 py-3 text-base font-medium ${
                    active ? "text-forest" : "text-text"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/wishlist"
              onClick={() => setMobileOpen(false)}
              className="rounded-sm px-2 py-3 text-base font-medium text-text"
            >
              찜한 상품
            </Link>
            {user ? (
              <>
                <Link
                  href="/mypage"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-sm px-2 py-3 text-base font-medium text-text"
                >
                  마이페이지
                </Link>
                <LogoutButton
                  onClick={() => setMobileOpen(false)}
                  className="rounded-sm px-2 py-3 text-left text-[16px] font-medium text-text"
                />
              </>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="rounded-sm px-2 py-3 text-base font-medium text-text"
              >
                로그인
              </Link>
            )}
            <Link
              href="/consultation"
              onClick={() => setMobileOpen(false)}
              className="mt-2 rounded-sm bg-forest px-2 py-3.5 text-center text-[15px] font-medium text-white"
            >
              1:1 상담하기
            </Link>
          </Container>
        </div>
      )}
    </header>
  );
}
