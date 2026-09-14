export const categories = [
  {
    label: "패키지 여행",
    description: "검증된 일정으로 편안하게 떠나는 라오스",
    href: "/travel?type=package",
    imageKey: "category-package",
  },
  {
    label: "자유여행",
    description: "나만의 속도로 즐기는 라오스 여행",
    href: "/travel?type=free",
    imageKey: "category-freetravel",
  },
  {
    label: "풀빌라·호텔",
    description: "프라이빗한 휴식을 위한 엄선된 숙소",
    href: "/villas",
    imageKey: "category-villa",
  },
  {
    label: "골프여행",
    description: "라오스 명문 코스에서 즐기는 라운딩",
    href: "/golf",
    imageKey: "category-golf",
  },
  {
    label: "투어·액티비티",
    description: "자연과 문화를 경험하는 다양한 투어",
    href: "/tours",
    imageKey: "category-tour",
  },
  {
    label: "차량·픽업",
    description: "공항 픽업부터 전용차량까지",
    href: "/transport",
    imageKey: "category-transport",
  },
] as const;

export const travelStyles = [
  { label: "커플", href: "/travel-style/couple" },
  { label: "가족", href: "/travel-style/family" },
  { label: "친구", href: "/travel-style/friends" },
  { label: "골프", href: "/travel-style/golf" },
  { label: "휴양", href: "/travel-style/relax" },
] as const;
