"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "@/components/ui/Container";
import { SITE_NAME, SITE_NAME_EN, CONTACT } from "@/lib/config";

const FOOTER_LINKS = [
  {
    title: "상품",
    links: [
      { label: "여행상품", href: "/travel" },
      { label: "풀빌라·호텔", href: "/villas" },
      { label: "골프", href: "/golf" },
      { label: "투어·액티비티", href: "/tours" },
      { label: "차량·픽업", href: "/transport" },
      { label: "찜한 상품", href: "/wishlist" },
    ],
  },
  {
    title: "정보",
    links: [
      { label: "회사소개", href: "/about" },
      { label: "여행정보", href: "/guide" },
      { label: "여행지", href: "/destinations" },
      { label: "후기", href: "/reviews" },
      { label: "1:1 여행상담", href: "/consultation" },
    ],
  },
  {
    title: "고객지원",
    links: [
      { label: "자주 묻는 질문", href: "/guide/faq" },
      { label: "예약·취소 규정", href: "/legal/refund-policy" },
      { label: "이용약관", href: "/legal/terms" },
      { label: "개인정보처리방침", href: "/legal/privacy" },
    ],
  },
];

const SOCIAL = [
  { label: "카카오톡", mark: "K", href: CONTACT.kakaoUrl },
  { label: "텔레그램", mark: "T", href: CONTACT.telegramUrl },
  { label: "인스타그램", mark: "IG", href: CONTACT.instagramUrl },
  { label: "페이스북", mark: "FB", href: CONTACT.facebookUrl },
];

export default function Footer() {
  const pathname = usePathname();
  const year = new Date().getFullYear();

  if (pathname.startsWith("/admin")) return null;

  return (
    <footer className="border-t border-border bg-forest text-white/70">
      <Container className="py-14 md:py-16">
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <p className="text-[19px] font-semibold text-white">{SITE_NAME}</p>
            <p className="mt-1 text-xs tracking-[0.3em] text-gold">
              {SITE_NAME_EN}
            </p>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/55">
              라오스 현지에서 직접 준비하는 한국인 맞춤 여행. 자유여행부터
              골프, 풀빌라, 단체여행까지 라오스 전문가가 함께합니다.
            </p>
            <div className="mt-6 flex gap-3">
              {SOCIAL.filter((item) => item.href && item.href !== "#").map(({ label, href, mark }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-[11px] font-medium tracking-tight text-white/70 transition-colors hover:border-gold hover:text-gold"
                >
                  {mark}
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Footer" className="contents">
            {FOOTER_LINKS.map((group) => (
              <div key={group.title}>
                <h3 className="text-sm font-semibold tracking-wide text-white">
                  {group.title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-white/55 transition-colors hover:text-gold"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-14 border-t border-white/10 pt-8 text-xs leading-relaxed text-white/60">
          <p>
            {SITE_NAME} (LAOS GOLF GOOD TOUR SOLE CO., LTD.) | 대표 : Bang
            Thipphachom Anoulack | 사업자등록번호 : 01B-0010428 | 관광사업
            운영허가번호 : 13/26 ອທ.ນວ
          </p>
          <p className="mt-1.5">
            주소 : Ban Haynamngern, Xaythany District, Vientiane Capital, Laos
            | 대표전화 : {CONTACT.phone} | 현지 연락처 : +856 20 5204 7483 |
            이메일 : {CONTACT.email}
          </p>
          <p className="mt-4 text-white/50">
            © {year} {SITE_NAME_EN}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
