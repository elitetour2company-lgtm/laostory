export type TravelTag = "커플" | "가족" | "친구" | "골퍼" | "단체" | "자유여행객";

export type ProductType = "자유여행" | "패키지여행" | "풀빌라" | "골프";

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  hotel?: string;
  meals?: string[];
  image?: string;
}

export interface CustomizationQA {
  question: string;
  answer: string;
}

export interface DestinationHighlight {
  city: string;
  title: string;
  description: string;
  image?: string;
}

export interface Product {
  slug: string;
  title: string;
  type: ProductType;
  category: string;
  destination: string;
  description: string;
  duration: string;
  price: number;
  originalPrice?: number;
  priceUsd?: number;
  originalPriceUsd?: number;
  image?: string;
  gallery: string[];
  tags: TravelTag[];
  badge?: string;
  featured?: boolean;
  included?: string[];
  excluded?: string[];
  itinerary?: ItineraryDay[];
  rating?: number;
  reviewCount?: number;
  minParticipants?: number;
  customizationQA?: CustomizationQA[];
  destinationHighlights?: DestinationHighlight[];
}

export interface Villa {
  slug: string;
  name: string;
  location: string;
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  hasPrivatePool: boolean;
  price: number;
  priceUsd?: number;
  image?: string;
  gallery: string[];
  description: string;
  facilities: string[];
  nearby: string[];
  rating?: number;
  reviewCount?: number;
}

export interface GolfCourse {
  slug: string;
  name: string;
  location: string;
  holes: number;
  par: number;
  difficulty: "쉬움" | "보통" | "어려움";
  description: string;
  price: number;
  originalPrice?: number;
  priceUsd?: number;
  originalPriceUsd?: number;
  /** Sat/Sun green fee. Undefined means the course charges the same rate every day. */
  weekendPrice?: number;
  weekendPriceUsd?: number;
  /** Label for the higher-demand months (e.g. "12월~3월"). Undefined means the course charges the same rate year-round. */
  peakSeasonLabel?: string;
  peakSeasonPrice?: number;
  peakSeasonPriceUsd?: number;
  /** Sat/Sun rate during peak season, for courses that vary by both season and weekday. */
  peakSeasonWeekendPrice?: number;
  peakSeasonWeekendPriceUsd?: number;
  /** Extra per-seat cart fee charged when the group can't split evenly into 2-seat carts. Undefined means no cart, or the course doesn't apply this surcharge. */
  oddHeadcountCartFee?: number;
  oddHeadcountCartFeeUsd?: number;
  image?: string;
  gallery: string[];
  yardage?: number;
  locationNote?: string;
  includesCaddie: boolean;
  includesCart: boolean;
  facilities: string[];
  rating?: number;
  reviewCount?: number;
}

export interface ScheduleItem {
  time: string;
  activity: string;
}

export interface Tour {
  slug: string;
  title: string;
  category: "원데이투어" | "반일투어" | "액티비티";
  destination: string;
  description: string;
  duration: string;
  price: number;
  priceUsd?: number;
  image?: string;
  gallery: string[];
  included: string[];
  excluded: string[];
  schedule: ScheduleItem[];
  meetingPoint: string;
  rating?: number;
  reviewCount?: number;
  /** Tour-specific safety/age/height notes appended after the shared "tour" TravelNotices cautions. */
  extraCautions?: string[];
  extraPreparations?: string[];
}

export interface TransportOption {
  slug: string;
  title: string;
  category: "공항 픽업·샌딩" | "전세밴" | "조인밴" | "기차표";
  route: string;
  vehicleOrSeat: string;
  duration: string;
  price: number;
  image?: string;
  description: string;
}

export interface Destination {
  slug: string;
  name: string;
  nameEn: string;
  description: string;
  image?: string;
  gallery: string[];
  highlights: string[];
  travelTips: string[];
}

export interface Review {
  id: string;
  customerName: string;
  destination: string;
  product: string;
  category: "골프" | "풀빌라" | "호텔" | "자유여행" | "패키지" | "투어";
  date: string;
  rating: number;
  content: string;
  isSample: boolean;
  photos: string[];
}

export interface GuideArticle {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  image?: string;
  content?: string[];
  images?: string[];
}

export interface Notice {
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  images: string[];
  createdAt: string;
}
