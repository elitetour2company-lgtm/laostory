import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import WishlistView from "@/components/wishlist/WishlistView";

export const metadata: Metadata = {
  title: "찜한 상품",
  description: "관심 있는 라오스 여행상품, 골프장, 투어를 모아두고 비교해보세요.",
};

export default function WishlistPage() {
  return (
    <>
      <PageHeader
        eyebrow="Wishlist"
        title="찜한 상품"
        description="관심 있는 상품을 모아두고 비교해보세요."
      />
      <WishlistView />
    </>
  );
}
