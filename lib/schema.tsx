import { SITE_URL } from "./env";
import type { Amenity, Faq, SiteSettings } from "./types";

export function lodgingSchema(site: SiteSettings, amenities: Amenity[], image: string) {
  const phones = [site.phone_mobile, site.phone_office_1, site.phone_office_2, site.contact_person_phone].filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": ["LodgingBusiness", "Hostel"],
    "@id": `${SITE_URL}/#business`,
    name: site.business_name,
    alternateName: [site.brand, "Gargees PG Belapur", "Gargees Seamen Hostel", "Gargee's PG CBD Belapur"],
    description:
      "PG, AC dormitory and seamen hostel in Bay View Tower, Sector 11, CBD Belapur, Navi Mumbai — 24-hour AC, free Wi-Fi, fresh linen for every guest, open 24/7.",
    url: SITE_URL,
    image: image.startsWith("http") ? image : `${SITE_URL}${image}`,
    logo: `${SITE_URL}/media/img/gargees-logo.png`,
    telephone: `+91${site.phone_mobile}`,
    ...(site.email ? { email: site.email } : {}),
    address: {
      "@type": "PostalAddress",
      streetAddress: `${site.address_line_1}, ${site.address_line_2}${site.landmarks ? `, ${site.landmarks}` : ""}`,
      addressLocality: `${site.locality}, ${site.city}`,
      addressRegion: site.region,
      postalCode: site.postal_code,
      addressCountry: site.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: site.latitude, longitude: site.longitude },
    hasMap: site.maps_url,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "00:00",
        closes: "23:59",
      },
    ],
    checkinTime: "00:00",
    amenityFeature: amenities.map((a) => ({ "@type": "LocationFeatureSpecification", name: a.title, value: true })),
    contactPoint: phones.map((p) => ({
      "@type": "ContactPoint",
      telephone: `+91${p}`,
      contactType: "reservations",
      areaServed: "IN",
      availableLanguage: ["en", "hi", "mr"],
    })),
    priceRange: "₹",
    keywords: "PG in Belapur, PG in CBD Belapur, seamen hostel Belapur, AC dormitory Navi Mumbai",
  };
}

export function faqSchema(faqs: Pick<Faq, "question" | "answer">[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.path}`,
    })),
  };
}

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is escaped for "<" to prevent breaking out of the script tag
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
