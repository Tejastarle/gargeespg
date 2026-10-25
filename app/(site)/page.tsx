import { AmenitiesSection } from "@/components/site/AmenitiesSection";
import { CapsuleSection } from "@/components/site/CapsuleSection";
import { FaqSection } from "@/components/site/FaqSection";
import { FinalCTA } from "@/components/site/FinalCTA";
import { GallerySection } from "@/components/site/GallerySection";
import { Hero } from "@/components/site/Hero";
import { LocationSection } from "@/components/site/LocationSection";
import { StaySection } from "@/components/site/StaySection";
import { TestimonialsSection } from "@/components/site/TestimonialsSection";
import { TrustEnquirySection } from "@/components/site/TrustEnquirySection";
import { VisitSection } from "@/components/site/VisitSection";
import { WhySection } from "@/components/site/WhySection";
import { getSiteContent, seoFor } from "@/lib/content";
import { faqSchema, JsonLd } from "@/lib/schema";
import type { Metadata } from "next";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const c = await getSiteContent();
  const o = seoFor(c, "/");
  if (!o) return { alternates: { canonical: "/" } };
  return {
    title: { absolute: o.title },
    description: o.description,
    keywords: o.keywords ?? undefined,
    alternates: { canonical: "/" },
    openGraph: o.og_image ? { images: [o.og_image] } : undefined,
  };
}

export default async function HomePage() {
  const c = await getSiteContent();
  return (
    <>
      <JsonLd data={faqSchema(c.faqs)} />
      <Hero image={c.gallery[0]?.image_url} />
      <LocationSection points={c.locations} />
      <StaySection rooms={c.rooms} />
      <CapsuleSection />
      <AmenitiesSection amenities={c.amenities} />
      <WhySection />
      <GallerySection items={c.gallery} />
      <TrustEnquirySection availability={c.availability} />
      {c.content.show_testimonials && <TestimonialsSection items={c.testimonials} />}
      <FaqSection faqs={c.faqs} />
      <VisitSection />
      <FinalCTA />
    </>
  );
}
