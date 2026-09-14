import Link from "next/link";
import { SITE_NAME, SITE_NAME_EN } from "@/lib/config";

export default function Logo({ dark = true }: { dark?: boolean }) {
  return (
    <Link href="/" className="flex flex-col leading-none">
      <span
        className={`text-[19px] font-semibold tracking-tight transition-colors ${
          dark ? "text-forest" : "text-white"
        }`}
      >
        {SITE_NAME}
      </span>
      <span
        className={`mt-1 text-[9.5px] font-medium tracking-[0.3em] transition-colors ${
          dark ? "text-gold" : "text-white/75"
        }`}
      >
        {SITE_NAME_EN}
      </span>
    </Link>
  );
}
