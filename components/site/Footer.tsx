"use client";

import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { WhatsAppIcon } from "@/components/brand/SocialIcons";
import { directionsHref, formatPhone, phoneList, telHref, whatsappHref } from "@/lib/contact";
import { LANDING_PAGES } from "@/lib/landing-pages";
import { Magnetic } from "@/components/ui/motion";
import { useSite } from "./SiteShell";

const QUICK = [
  { label: "Home", href: "/" },
  { label: "Stay", href: "/#stay" },
  { label: "Amenities", href: "/#amenities" },
  { label: "Location", href: "/#location" },
  { label: "Gallery", href: "/#gallery" },
  { label: "FAQ", href: "/#faq" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  const { site, content, openEnquiry } = useSite();
  const phones = phoneList(site);

  return (
    <footer className="relative overflow-hidden border-t border-linen/10 bg-charcoal pb-28 pt-20 md:pb-12">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-10 border-b border-linen/10 pb-14 lg:flex-row lg:items-end">
          <div>
            <Logo className="h-16 w-auto md:h-20" />
            <p className="mt-4 text-[0.95rem] tracking-wide text-linen/60">{site.tagline}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Magnetic>
              <button type="button" onClick={() => openEnquiry("footer")} className="btn btn-light">
                {content.cta_secondary}
              </button>
            </Magnetic>
            <a href={whatsappHref(site)} target="_blank" rel="noopener" className="btn btn-ghost" data-track="whatsapp_click" data-track-location="footer">
              <WhatsAppIcon className="h-4 w-4" /> WhatsApp us
            </a>
          </div>
        </div>

        <div className="grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h3 className="text-sm font-semibold text-linen">Visit</h3>
            <address className="mt-4 not-italic leading-relaxed text-linen/65">
              {site.address_line_1},<br />
              {site.address_line_2},<br />
              {site.locality}, {site.city} – {site.postal_code}
            </address>
            {site.landmarks && <p className="mt-2 text-sm leading-relaxed text-linen/50">{site.landmarks}</p>}
            <a href={directionsHref(site)} target="_blank" rel="noopener" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-bay hover:text-linen" data-track="directions_click" data-track-location="footer">
              <MapPin className="h-4 w-4" /> Get directions <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
            <p className="mt-5 text-sm text-linen/50">{site.hours_label}</p>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-sm font-semibold text-linen">Call or write</h3>
            <ul className="mt-4 space-y-2.5">
              {phones.map((p) => (
                <li key={p.number}>
                  <a href={telHref(p.number)} className="inline-flex flex-wrap items-center gap-x-2 text-linen/70 hover:text-linen" data-track="phone_click" data-track-location="footer">
                    <Phone className="h-3.5 w-3.5 text-linen/40" /> {formatPhone(p.number)}
                    <span className="text-xs text-linen/40">{p.label}</span>
                  </a>
                </li>
              ))}
              {site.phone_landline && (
                <li>
                  <a href={telHref(site.phone_landline)} className="inline-flex items-center gap-2 text-linen/70 hover:text-linen" data-track="phone_click" data-track-location="footer">
                    <Phone className="h-3.5 w-3.5 text-linen/40" /> {site.phone_landline}
                  </a>
                </li>
              )}
              {site.email && (<li>
                <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 break-all text-linen/70 hover:text-linen" data-track="email_click" data-track-location="footer">
                  <Mail className="h-3.5 w-3.5 shrink-0 text-linen/40" /> {site.email}
                </a>
              </li>)}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold text-linen">Explore</h3>
            <ul className="mt-4 space-y-2.5">
              {QUICK.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-linen/70 hover:text-linen">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-sm font-semibold text-linen">Stay in Belapur</h3>
            <ul className="mt-4 space-y-2.5">
              {LANDING_PAGES.map((p) => (
                <li key={p.slug}>
                  <Link href={`/${p.slug}`} className="text-linen/70 hover:text-linen">{p.navLabel}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col-reverse items-start justify-between gap-6 border-t border-linen/10 pt-8 text-sm text-linen/45 md:flex-row md:items-center">
          <p suppressHydrationWarning>© {new Date().getFullYear()} {site.brand} — {site.business_name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
