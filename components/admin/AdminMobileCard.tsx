import { ReactNode } from "react";
import Link from "next/link";

// Phone-only card used by the admin list pages (tables are hidden below md).
export default function AdminMobileCard({
  title,
  meta,
  right,
  children,
}: {
  title: string;
  meta?: (string | null | undefined | false)[];
  right?: string;
  children?: ReactNode;
}) {
  const items = (meta ?? []).filter(Boolean) as string[];
  return (
    <div className="rounded-md border border-border bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <p className="min-w-0 flex-1 break-words text-[14.5px] font-semibold leading-snug text-text">
          {title}
        </p>
        {right ? (
          <span className="shrink-0 whitespace-nowrap text-[13px] font-semibold text-forest">
            {right}
          </span>
        ) : null}
      </div>
      {items.length > 0 ? (
        <p className="mt-1.5 break-words text-[12.5px] leading-relaxed text-text-soft">
          {items.join(" · ")}
        </p>
      ) : null}
      {children ? (
        <div className="mt-3 flex items-center gap-2 border-t border-border pt-3">{children}</div>
      ) : null}
    </div>
  );
}

export function MobileEditLink({ href }: { href: string }) {
  return (
    <Link
      href={href}
      className="inline-flex h-10 min-w-[84px] items-center justify-center rounded-sm border border-border px-4 text-[13.5px] font-medium text-forest active:bg-forest/5"
    >
      수정
    </Link>
  );
}
