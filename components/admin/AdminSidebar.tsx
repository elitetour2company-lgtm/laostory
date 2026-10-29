"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Flag,
  Compass,
  Car,
  MessageSquare,
  Star,
  BookOpen,
  Image as ImageIcon,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { logoutAction } from "@/lib/admin/actions";
import { SITE_NAME } from "@/lib/config";

const NAV = [
  { label: "대시보드", href: "/admin", icon: LayoutDashboard },
  { label: "여행상품 관리", href: "/admin/products", icon: Package },
  { label: "골프장 관리", href: "/admin/golf", icon: Flag },
  { label: "투어 관리", href: "/admin/tours", icon: Compass },
  { label: "차량 관리", href: "/admin/transport", icon: Car },
  { label: "문의 관리", href: "/admin/inquiries", icon: MessageSquare },
  { label: "후기 관리", href: "/admin/reviews", icon: Star },
  { label: "여행정보 관리", href: "/admin/guide", icon: BookOpen },
  { label: "배너 관리", href: "/admin/banners", icon: ImageIcon },
  { label: "사이트 설정", href: "/admin/settings", icon: Settings },
];

function SidebarBody({
  adminName,
  pendingInquiries,
  pathname,
}: {
  adminName: string;
  pendingInquiries: number;
  pathname: string;
}) {
  return (
    <>
      <div className="border-b border-border px-6 py-5">
        <p className="text-[15px] font-semibold text-forest">{SITE_NAME}</p>
        <p className="mt-0.5 text-[10px] tracking-[0.3em] text-gold">ADMIN</p>
      </div>

      <nav className="flex-1 overflow-y-auto py-4">
        {NAV.map((item) => {
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-6 py-2.5 text-[13.5px] font-medium transition-colors ${
                isActive
                  ? "bg-forest/5 text-forest"
                  : "text-text-soft hover:bg-forest/5 hover:text-text"
              }`}
            >
              <Icon size={16} strokeWidth={1.75} />
              {item.label}
              {item.href === "/admin/inquiries" && pendingInquiries > 0 ? (
                <span className="ml-auto rounded-full bg-red-500 px-2 py-0.5 text-[11px] font-semibold leading-none text-white">
                  {pendingInquiries}
                </span>
              ) : null}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border px-6 py-4">
        <p className="text-[12.5px] text-text-soft">{adminName}님</p>
        <form action={logoutAction}>
          <button
            type="submit"
            className="mt-2 inline-flex items-center gap-1.5 text-[12.5px] font-medium text-text-soft hover:text-forest"
          >
            <LogOut size={13} strokeWidth={1.75} />
            로그아웃
          </button>
        </form>
      </div>
    </>
  );
}

export default function AdminSidebar({ adminName, pendingInquiries = 0 }: { adminName: string; pendingInquiries?: number }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the phone menu after navigating to another admin page.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Phone: top bar with a menu button */}
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-border bg-white px-4 py-3 md:hidden">
        <div>
          <p className="text-[14px] font-semibold text-forest">{SITE_NAME}</p>
          <p className="text-[9px] tracking-[0.3em] text-gold">ADMIN</p>
        </div>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="메뉴 열기"
          className="relative rounded-md p-2 text-forest"
        >
          <Menu size={22} strokeWidth={1.75} />
          {pendingInquiries > 0 ? (
            <span className="absolute right-0.5 top-0.5 h-2.5 w-2.5 rounded-full bg-red-500" />
          ) : null}
        </button>
      </header>

      {open ? (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            type="button"
            aria-label="메뉴 닫기"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/40"
          />
          <aside className="absolute inset-y-0 left-0 flex w-64 flex-col bg-white shadow-xl">
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="메뉴 닫기"
              className="absolute right-3 top-3 rounded-md p-1.5 text-text-soft"
            >
              <X size={18} strokeWidth={1.75} />
            </button>
            <SidebarBody adminName={adminName} pendingInquiries={pendingInquiries} pathname={pathname} />
          </aside>
        </div>
      ) : null}

      {/* Desktop: fixed-width sidebar as before */}
      <aside className="hidden h-screen w-60 flex-shrink-0 flex-col border-r border-border bg-white md:flex">
        <SidebarBody adminName={adminName} pendingInquiries={pendingInquiries} pathname={pathname} />
      </aside>
    </>
  );
}
