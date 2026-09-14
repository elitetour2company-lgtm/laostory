import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/config";
import { getProductSlugs } from "@/lib/data/products";
import { getVillaSlugs } from "@/lib/data/villas";
import { getGolfCourseSlugs } from "@/lib/data/golf";
import { getTourSlugs } from "@/lib/data/tours";
import { getGuideArticleSlugs } from "@/lib/data/guide";
import { getDestinationSlugs } from "@/lib/data/destinations";
import { STYLE_CONFIG } from "@/app/travel-style/[style]/page";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [productSlugs, villaSlugs, golfSlugs, tourSlugs, guideSlugs, destinationSlugs] =
    await Promise.all([
      getProductSlugs(),
      getVillaSlugs(),
      getGolfCourseSlugs(),
      getTourSlugs(),
      getGuideArticleSlugs(),
      getDestinationSlugs(),
    ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "daily", priority: 1 },
    { url: `${SITE_URL}/travel`, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/villas`, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/golf`, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/tours`, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/transport`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/guide`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/guide/faq`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/reviews`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/consultation`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/legal/terms`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/legal/privacy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/legal/refund-policy`, changeFrequency: "yearly", priority: 0.2 },
  ];

  const dynamicRoutes: MetadataRoute.Sitemap = [
    ...productSlugs.map((slug) => ({
      url: `${SITE_URL}/travel/${slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...villaSlugs.map((slug) => ({
      url: `${SITE_URL}/villas/${slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...golfSlugs.map((slug) => ({
      url: `${SITE_URL}/golf/courses/${slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...tourSlugs.map((slug) => ({
      url: `${SITE_URL}/tours/${slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...guideSlugs.map((slug) => ({
      url: `${SITE_URL}/guide/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...destinationSlugs.map((slug) => ({
      url: `${SITE_URL}/destinations/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...Object.keys(STYLE_CONFIG).map((style) => ({
      url: `${SITE_URL}/travel-style/${style}`,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];

  return [...staticRoutes, ...dynamicRoutes];
}
