"use client";

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

export default function AdminSidebar({ adminName, pendingInquiries = 0 }: { adminName: string; pendingInquiries?: number }) {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-60 flex-shrink-0 flex-col border-r border-border bg-white">
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
    </aside>
  );
}
