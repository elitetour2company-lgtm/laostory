import { SITE_NAME, SITE_NAME_EN, SITE_URL, CONTACT } from "@/lib/config";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: SITE_NAME,
    alternateName: SITE_NAME_EN,
    url: SITE_URL,
    telephone: CONTACT.phone,
    sameAs: [CONTACT.kakaoUrl, CONTACT.telegramUrl, CONTACT.instagramUrl, CONTACT.facebookUrl].filter(
      (url) => url && url !== "#"
    ),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function productSchema({
  name,
  description,
  image,
  price,
  path,
}: {
  name: string;
  description: string;
  image?: string;
  price: number;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    ...(image ? { image: [`${SITE_URL}${image}`] } : {}),
    brand: { "@type": "Brand", name: SITE_NAME },
    offers: {
      "@type": "Offer",
      price,
      priceCurrency: "KRW",
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}${path}`,
    },
  };
}

export function faqPageSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
