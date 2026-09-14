"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Compass, Flag, Waves, Heart, MessageCircle } from "lucide-react";
import { MOBILE_NAV } from "@/lib/nav";

const ICONS = [Home, Compass, Flag, Waves, Heart, MessageCircle];

export default function MobileNav() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) return null;

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-white/95 backdrop-blur-sm md:hidden">
      <ul className="grid grid-cols-6">
        {MOBILE_NAV.map((item, i) => {
          const Icon = ICONS[i];
          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex flex-col items-center gap-1 py-2.5 text-[11px] transition-colors ${
                  active ? "text-forest" : "text-text-soft"
                }`}
              >
                <Icon size={19} strokeWidth={active ? 2 : 1.5} />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
